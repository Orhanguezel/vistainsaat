// src/modules/siteSettings/admin.routes.ts

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  adminGetSettingsAggregate,
  adminUpsertSettingsAggregate,
  adminListSiteSettings,
  adminGetSiteSettingByKey,
  adminCreateSiteSetting,
  adminUpdateSiteSetting,
  adminBulkUpsertSiteSettings,
  adminDeleteManySiteSettings,
  adminDeleteSiteSetting,
  adminGetAppLocales,
  adminGetDefaultLocale,
} from './admin.controller';
import { sendVistaMail } from '@/core/vista-mail';
import { testCloudinary, testGoogleOAuth, testRecaptcha, testGroqAI, testOpenAI, testAnthropic, testGrokXAI } from './integration-tests';

const BASE = '/site-settings'; // hyphen
const LEGACY = '/site_settings'; // underscore

export async function registerSiteSettingsAdmin(app: FastifyInstance) {
  // Aggregate
  app.get(`${BASE}`, { config: { auth: true } }, adminGetSettingsAggregate);
  app.put(`${BASE}`, { config: { auth: true } }, adminUpsertSettingsAggregate);

  // ✅ META (STATIC) - 반드시 :key öncesi
  app.get(`${BASE}/app-locales`, { config: { auth: true } }, adminGetAppLocales);
  app.get(`${BASE}/default-locale`, { config: { auth: true } }, adminGetDefaultLocale);

  // List (STATIC) - :key öncesi
  app.get(`${BASE}/list`, { config: { auth: true } }, adminListSiteSettings);

  // Granular
  app.get(`${BASE}/:key`, { config: { auth: true } }, adminGetSiteSettingByKey);
  app.post(`${BASE}`, { config: { auth: true } }, adminCreateSiteSetting);
  app.put(`${BASE}/:key`, { config: { auth: true } }, adminUpdateSiteSetting);
  app.post(`${BASE}/bulk-upsert`, { config: { auth: true } }, adminBulkUpsertSiteSettings);
  app.delete(`${BASE}`, { config: { auth: true } }, adminDeleteManySiteSettings);
  app.delete(`${BASE}/:key`, { config: { auth: true } }, adminDeleteSiteSetting);

  // SMTP Test
  app.post(`${BASE}/smtp-test`, { config: { auth: true } }, async (req: FastifyRequest, reply: FastifyReply) => {
    const body = req.body as { to?: string } | null;
    const to = body?.to?.trim();
    if (!to) return reply.code(400).send({ error: { message: 'to alanı gerekli' } });

    try {
      await sendVistaMail({
        to,
        subject: 'Vista İnşaat — SMTP Test',
        html: `<div style="font-family:Arial,sans-serif;padding:20px">
          <h2>SMTP Test Başarılı</h2>
          <p>Bu e-posta Vista İnşaat admin panelinden gönderilmiştir.</p>
          <p style="color:#666;font-size:12px">${new Date().toISOString()}</p>
        </div>`,
      });
      return reply.send({ ok: true, message: `Test e-postası ${to} adresine gönderildi` });
    } catch (err: any) {
      return reply.code(500).send({ error: { message: err.message || 'SMTP bağlantı hatası' } });
    }
  });
  app.post(`${LEGACY}/smtp-test`, { config: { auth: true } }, async (req: FastifyRequest, reply: FastifyReply) => {
    const body = req.body as { to?: string } | null;
    const to = body?.to?.trim();
    if (!to) return reply.code(400).send({ error: { message: 'to alanı gerekli' } });
    try {
      await sendVistaMail({
        to,
        subject: 'Vista İnşaat — SMTP Test',
        html: `<div style="font-family:Arial,sans-serif;padding:20px"><h2>SMTP Test Başarılı</h2><p>${new Date().toISOString()}</p></div>`,
      });
      return reply.send({ ok: true, message: `Test e-postası ${to} adresine gönderildi` });
    } catch (err: any) {
      return reply.code(500).send({ error: { message: err.message || 'SMTP bağlantı hatası' } });
    }
  });

  // Integration tests
  app.post(`${BASE}/test/cloudinary`, { config: { auth: true } }, testCloudinary);
  app.post(`${BASE}/test/google`, { config: { auth: true } }, testGoogleOAuth);
  app.post(`${BASE}/test/recaptcha`, { config: { auth: true } }, testRecaptcha);
  app.post(`${BASE}/test/groq`, { config: { auth: true } }, testGroqAI);
  app.post(`${BASE}/test/openai`, { config: { auth: true } }, testOpenAI);
  app.post(`${BASE}/test/anthropic`, { config: { auth: true } }, testAnthropic);
  app.post(`${BASE}/test/grok`, { config: { auth: true } }, testGrokXAI);
  app.post(`${LEGACY}/test/cloudinary`, { config: { auth: true } }, testCloudinary);
  app.post(`${LEGACY}/test/google`, { config: { auth: true } }, testGoogleOAuth);
  app.post(`${LEGACY}/test/recaptcha`, { config: { auth: true } }, testRecaptcha);
  app.post(`${LEGACY}/test/groq`, { config: { auth: true } }, testGroqAI);
  app.post(`${LEGACY}/test/openai`, { config: { auth: true } }, testOpenAI);
  app.post(`${LEGACY}/test/anthropic`, { config: { auth: true } }, testAnthropic);
  app.post(`${LEGACY}/test/grok`, { config: { auth: true } }, testGrokXAI);

  // ✅ Legacy yönlendirmeler (tam)
  app.get(LEGACY, { config: { auth: true } }, adminGetSettingsAggregate);
  app.put(LEGACY, { config: { auth: true } }, adminUpsertSettingsAggregate);

  app.get(`${LEGACY}/list`, { config: { auth: true } }, adminListSiteSettings);
  app.get(`${LEGACY}/app-locales`, { config: { auth: true } }, adminGetAppLocales);
  app.get(`${LEGACY}/default-locale`, { config: { auth: true } }, adminGetDefaultLocale);

  // İstersen legacy :key da ekleyebilirsin (opsiyonel)
  app.get(`${LEGACY}/:key`, { config: { auth: true } }, adminGetSiteSettingByKey);
  app.put(`${LEGACY}/:key`, { config: { auth: true } }, adminUpdateSiteSetting);
}
