// =============================================================
// FILE: src/modules/offer/admin.routes.ts
// Vista İnşaat – Offer Module Admin Routes
//   - Auth + Admin guard
// =============================================================

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { requireAuth } from "@/common/middleware/auth";
import { requireAdmin } from "@/common/middleware/roles";

import {
  listOffersAdmin,
  getOfferAdmin,
  createOfferAdmin,
  updateOfferAdmin,
  removeOfferAdmin,
  generateOfferPdfAdmin,
  sendOfferEmailAdmin,
  sendOfferAdmin,
} from "./admin.controller";
import { sendVistaMail } from "@/core/vista-mail";
import { getOfferById } from "./repository";
import { sendTemplatedEmail } from "@/modules/email-templates/mailer";

const BASE = "/offers";

export async function registerOfferAdmin(app: FastifyInstance) {
  const adminGuard = async (req: FastifyRequest, reply: FastifyReply) => {
    await requireAuth(req, reply);
    if (reply.sent) return;
    await requireAdmin(req, reply);
  };

  app.get(
    `${BASE}`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    listOffersAdmin,
  );

  app.get(
    `${BASE}/:id`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    getOfferAdmin,
  );

  app.post(
    `${BASE}`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    createOfferAdmin,
  );

  app.patch(
    `${BASE}/:id`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    updateOfferAdmin,
  );

  app.delete(
    `${BASE}/:id`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    removeOfferAdmin,
  );

  // ✅ YENİ: sadece PDF üret
  app.post(
    `${BASE}/:id/pdf`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    generateOfferPdfAdmin,
  );

  // ✅ YENİ: sadece email gönder
  app.post(
    `${BASE}/:id/email`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    sendOfferEmailAdmin,
  );

  // eski: PDF üret + mail gönder
  app.post(
    `${BASE}/:id/send`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    sendOfferAdmin,
  );

  // Doğrudan e-posta gönder (template tabanlı)
  app.post(
    `${BASE}/:id/direct-email`,
    { preHandler: adminGuard, config: { auth: true, admin: true } },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string };
      const body = req.body as { subject?: string; message?: string; template_key?: string } | null;

      const offer = await getOfferById(id);
      if (!offer) return reply.code(404).send({ error: { message: 'Teklif bulunamadı' } });

      const to = offer.email;
      if (!to) return reply.code(400).send({ error: { message: 'Müşteri e-postası yok' } });

      const currency = offer.currency || 'TRY';
      const formatPrice = (v: any) => v != null ? `${Number(v).toLocaleString('tr-TR')} ${currency}` : '-';
      const locale = offer.locale || 'tr';
      const templateKey = body?.template_key || 'offer_sent_customer';

      // Template params
      const params: Record<string, unknown> = {
        offer_no: offer.offer_no || '-',
        customer_name: offer.customer_name || '',
        company_name: offer.company_name || '',
        email: offer.email || '',
        phone: offer.phone || '',
        subject: offer.subject || '',
        message: body?.message || '',
        currency,
        net_total: offer.net_total != null ? formatPrice(offer.net_total) : '-',
        vat_total: offer.vat_total != null ? formatPrice(offer.vat_total) : '-',
        gross_total: offer.gross_total != null ? formatPrice(offer.gross_total) : '-',
        valid_until: offer.valid_until ? new Date(offer.valid_until).toLocaleDateString('tr-TR') : '-',
        pdf_url: offer.pdf_url || '',
        site_name: 'Vista İnşaat',
      };

      try {
        // Önce DB template dene
        const rendered = await sendTemplatedEmail({
          to,
          key: templateKey,
          locale,
          params,
          allowMissing: true,
        });
        return reply.send({ ok: true, message: `Teklif e-postası ${to} adresine gönderildi (şablon: ${templateKey})` });
      } catch (templateErr: any) {
        // Template bulunamazsa fallback inline HTML
        const fallbackSubject = body?.subject || `Vista İnşaat — Teklif ${offer.offer_no || ''}`;
        const customMessage = body?.message || '';

        const html = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e1c1a">
          <div style="background:#b8a98a;padding:20px;text-align:center"><h1 style="color:#fff;margin:0;font-size:22px">Vista İnşaat</h1></div>
          <div style="padding:24px;background:#fafaf8;border:1px solid #e8e4de">
            <h2 style="margin-top:0">Teklif Bilgileri</h2>
            ${customMessage ? `<p style="background:#f0ede8;padding:12px;border-radius:6px">${customMessage.replace(/\n/g, '<br>')}</p>` : ''}
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <tr><td style="padding:6px 0;color:#666">Teklif No</td><td style="padding:6px 0;font-weight:600">${offer.offer_no || '-'}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Müşteri</td><td style="padding:6px 0">${offer.customer_name}</td></tr>
              ${offer.gross_total != null ? `<tr><td style="padding:6px 0;color:#666;font-weight:600">Toplam</td><td style="padding:6px 0;font-weight:700;font-size:18px">${formatPrice(offer.gross_total)}</td></tr>` : ''}
            </table>
            ${offer.pdf_url ? `<p><a href="${offer.pdf_url}" style="background:#b8a98a;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;display:inline-block">PDF Teklif</a></p>` : ''}
          </div>
          <div style="padding:12px;text-align:center;color:#999;font-size:11px">Vista İnşaat | info@vistainsaat.com</div>
        </div>`;

        try {
          await sendVistaMail({ to, subject: fallbackSubject, html });
          return reply.send({ ok: true, message: `Teklif e-postası ${to} adresine gönderildi (fallback)` });
        } catch (err: any) {
          return reply.code(500).send({ error: { message: err.message || 'E-posta gönderilemedi' } });
        }
      }
    },
  );
}
