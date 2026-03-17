// =============================================================
// FILE: src/modules/offer/pdfTemplate.ts
// Vista İnşaat – Offer PDF HTML Template
//   - Teklif PDF'inde kullanılacak HTML + inline CSS
//   - Kaynak: OfferRow (offers tablosu)
//   - Dil: site_settings.app_locales + offer.locale + default_locale
//   - Firma bilgisi + logo: site_settings.company_brand
// =============================================================

import type { OfferRow } from './schema';
import { getAppLocales, getDefaultLocale } from '@/modules/siteSettings/service';
import { db } from '@/db/client';
import { siteSettings } from '@/modules/siteSettings/schema';
import { and, inArray, eq } from 'drizzle-orm';

type PdfTemplateContext = OfferRow & {
  site_name?: string | null;
  product_name?: string | null;
  service_name?: string | null;
};

function safe(value: unknown): string {
  if (value == null) return '';
  return String(value);
}

function safeText(value: unknown): string {
  const s = safe(value);
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ✅ Label dilleri (TR/EN/DE)
type LabelLocale = 'tr' | 'en' | 'de';

function toIntlLocale(locale: LabelLocale): string {
  if (locale === 'tr') return 'tr-TR';
  if (locale === 'de') return 'de-DE';
  return 'en-US';
}

function formatDate(d: Date | string | null | undefined, locale: LabelLocale) {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  const intlLocale = toIntlLocale(locale);

  try {
    return date.toLocaleDateString(intlLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return date.toISOString().substring(0, 10);
  }
}

function formatMoney(
  value: string | number | null | undefined,
  currency: string | null | undefined,
  locale: LabelLocale,
) {
  if (value == null) return '';

  const raw = typeof value === 'string' ? value.trim() : value;
  if (raw === '') return '';

  const num = typeof raw === 'number' ? raw : Number(raw);
  if (Number.isNaN(num)) return typeof value === 'string' ? value : '';

  const c = currency || 'EUR';
  const intlLocale = toIntlLocale(locale);

  try {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency: c,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${num.toFixed(2)} ${c}`;
  }
}

function normalizeNumberish(input: string): string {
  let s = input.trim();
  s = s.replace(/%/g, '').trim();
  s = s.replace(/\s+/g, '');

  if (s.includes(',') && s.includes('.')) {
    s = s.replace(/\./g, '').replace(',', '.');
    return s;
  }
  if (s.includes(',') && !s.includes('.')) {
    s = s.replace(',', '.');
    return s;
  }
  return s;
}

function parseDecimal(v: unknown): number | null {
  if (v == null) return null;

  if (typeof v === 'number') return Number.isFinite(v) ? v : null;

  if (typeof v === 'string') {
    const s = normalizeNumberish(v);
    if (!s) return null;
    const n = Number(s);
    return Number.isNaN(n) || !Number.isFinite(n) ? null : n;
  }

  if (typeof v === 'object') {
    const s = (v as any)?.toString?.();
    if (typeof s === 'string' && s.trim()) return parseDecimal(s);
  }

  return null;
}

function parseJsonRecord(v: unknown): Record<string, unknown> | null {
  if (!v) return null;
  if (typeof v === 'object') return v as Record<string, unknown>;
  if (typeof v !== 'string') return null;
  try {
    const parsed = JSON.parse(v);
    return typeof parsed === 'object' && parsed !== null
      ? (parsed as Record<string, unknown>)
      : { raw: parsed };
  } catch {
    return null;
  }
}

function pickFirstString(...vals: unknown[]): string | null {
  for (const v of vals) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return null;
}

// -------------------------------------------------------------
// app_locales + default_locale → dinamik locale çözümü
// -------------------------------------------------------------

// No module-level cache — always fetch fresh from DB for PDF generation

function normalizeLocaleShort(input?: string | null): string | null {
  const s = String(input || '')
    .trim()
    .toLowerCase()
    .replace('_', '-');
  if (!s) return null;
  return (s.split('-')[0] || '').trim() || null;
}

async function ensureAppLocales(): Promise<string[]> {
  try {
    const list = await getAppLocales();
    if (Array.isArray(list) && list.length) {
      const uniq: string[] = [];
      for (const x of list) {
        const n = normalizeLocaleShort(x);
        if (n && !uniq.includes(n)) uniq.push(n);
      }
      if (uniq.length) return uniq;
    }
  } catch (err) {
    console.error('offer_pdf:getAppLocales_failed', err);
  }

  return ['de', 'en', 'tr'];
}

async function ensureDefaultLocale(): Promise<string | null> {
  try {
    const v = await getDefaultLocale();
    const n = normalizeLocaleShort(v);
    if (n) return n;
  } catch (err) {
    console.error('offer_pdf:getDefaultLocale_failed', err);
  }

  return null;
}

/**
 * Runtime locale:
 *   - Önce offer.locale (örn: "de", "en", "tr-TR" vs.)
 *   - app_locales içinde exact/prefix match
 *   - Bulunamazsa DB default_locale
 *   - O da yoksa app_locales[0]
 */
async function resolveRuntimeLocale(rawLocale?: string | null): Promise<string> {
  const appLocales = await ensureAppLocales();
  const dbDefault = await ensureDefaultLocale();
  const fallback = dbDefault || appLocales[0] || 'en';

  if (!rawLocale) return fallback;

  const lcFull = String(rawLocale).trim().toLowerCase().replace('_', '-');
  const lcShort = normalizeLocaleShort(lcFull);

  if (!lcShort) return fallback;

  // exact match (short)
  if (appLocales.includes(lcShort)) return lcShort;

  // prefix match: "tr-tr" startsWith "tr"
  const prefix = appLocales.find((l) => lcFull.startsWith(`${l.toLowerCase()}`));
  if (prefix) return prefix;

  return fallback;
}

/**
 * Label set için desteklediğimiz diller: "tr" | "en" | "de"
 * Runtime locale başka ise label tarafında en yakınını seç.
 */
function toLabelLocale(runtimeLocale: string): LabelLocale {
  const lc = String(runtimeLocale || '').toLowerCase();
  if (lc.startsWith('tr')) return 'tr';
  if (lc.startsWith('de')) return 'de';
  return 'en';
}

// -------------------------------------------------------------
// Firma bilgisi (company_brand) – site_settings'den
// -------------------------------------------------------------

type CompanyBrandSettings = {
  name: string;
  shortName: string | null;
  website: string | null;
  logoUrl: string | null;
  logoWidth: number | null;
  logoHeight: number | null;
};

async function getCompanyBrandSettings(runtimeLocale: string): Promise<CompanyBrandSettings> {

  const langPart = runtimeLocale.split('-')[0].toLowerCase();
  const candidateLocales = Array.from(new Set<string>([runtimeLocale, langPart, 'en', 'de', 'tr']));

  let brand: CompanyBrandSettings = {
    name: 'Vista İnşaat',
    shortName: null,
    website: null,
    logoUrl: null,
    logoWidth: null,
    logoHeight: null,
  };

  try {
    const rows = await db
      .select({
        locale: siteSettings.locale,
        value: siteSettings.value,
      })
      .from(siteSettings)
      .where(
        and(eq(siteSettings.key, 'company_brand'), inArray(siteSettings.locale, candidateLocales)),
      );

    let picked: { locale: string; value: string } | undefined;

    for (const loc of candidateLocales) {
      const row = rows.find((r) => r.locale === loc);
      if (row) {
        picked = row as { locale: string; value: string };
        break;
      }
    }

    if (picked) {
      try {
        const parsed = JSON.parse(picked.value);
        brand = {
          name: parsed.name || brand.name,
          shortName: typeof parsed.shortName === 'string' ? parsed.shortName : null,
          website: typeof parsed.website === 'string' ? parsed.website : null,
          logoUrl: parsed.logo && typeof parsed.logo.url === 'string' ? parsed.logo.url : null,
          logoWidth:
            parsed.logo && typeof parsed.logo.width === 'number' ? parsed.logo.width : null,
          logoHeight:
            parsed.logo && typeof parsed.logo.height === 'number' ? parsed.logo.height : null,
        };
      } catch (err) {
        console.error('offer_pdf:parse_company_brand_failed', err);
      }
    }
  } catch (err) {
    console.error('offer_pdf:load_company_brand_failed', err);
  }

  return brand;
}

// -------------------------------------------------------------
// i18n – TR / EN / DE label fallback set
// -------------------------------------------------------------

const LABELS: Record<
  LabelLocale,
  {
    title: string;
    quoteNo: string;
    date: string;
    validity: string;
    status: string;

    customerInfo: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    formLanguage: string;
    product: string;
    service: string;

    summary: string;
    subject: string;
    noMessage: string;

    pricing: string;
    net: string;
    vat: string;
    shipping: string;
    total: string;
    pricingEmpty: string;

    notes: string;
    notesLegal: (validUntilStr: string) => string;
    internalNotes: string;

    footerLeft: (siteName: string) => string;
    footerRight: string;
  }
> = {
  tr: {
    title: 'Teklif',
    quoteNo: 'Teklif No',
    date: 'Tarih',
    validity: 'Geçerlilik',
    status: 'Durum',
    customerInfo: 'Müşteri Bilgileri',
    name: 'Ad Soyad',
    company: 'Firma',
    email: 'E-posta',
    phone: 'Telefon',
    country: 'Ülke',
    formLanguage: 'Form dili',
    product: 'Ürün',
    service: 'Hizmet',
    summary: 'Teklif Özeti',
    subject: 'Konu',
    noMessage: 'Müşteri mesajı bulunmamaktadır.',
    pricing: 'Fiyatlandırma',
    net: 'Net Tutar',
    vat: 'KDV',
    shipping: '',
    total: 'Genel Toplam',
    pricingEmpty: 'Fiyatlandırma henüz eklenmemiştir; bu belge ön teklif niteliğindedir.',
    notes: 'Notlar',
    notesLegal: (validUntilStr) =>
      validUntilStr ? `Bu teklif ${validUntilStr} tarihine kadar geçerlidir.` : '',
    internalNotes: '',
    footerLeft: (siteName) => `${siteName} – Otomatik Teklif Sistemi`,
    footerRight: 'Bu PDF sistem tarafından oluşturulmuştur, imza gerektirmez.',
  },

  en: {
    title: 'Offer',
    quoteNo: 'Offer No',
    date: 'Date',
    validity: 'Valid Until',
    status: 'Status',
    customerInfo: 'Customer Information',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    formLanguage: 'Form language',
    product: 'Product',
    service: 'Service',
    summary: 'Offer Summary',
    subject: 'Subject',
    noMessage: 'No customer message has been provided.',
    pricing: 'Pricing',
    net: 'Net Amount',
    vat: 'VAT',
    shipping: '',
    total: 'Grand Total',
    pricingEmpty:
      'Pricing has not been added yet; this document should be considered a preliminary offer.',
    notes: 'Notes',
    notesLegal: (validUntilStr) =>
      validUntilStr ? `This offer is valid until ${validUntilStr}.` : '',
    internalNotes: '',
    footerLeft: (siteName) => `${siteName} – Automated Offer System`,
    footerRight: 'This PDF is generated by the system and does not require a signature.',
  },

  de: {
    title: 'Angebot',
    quoteNo: 'Angebots-Nr.',
    date: 'Datum',
    validity: 'Gültig bis',
    status: 'Status',
    customerInfo: 'Kundendaten',
    name: 'Name',
    company: 'Firma',
    email: 'E-Mail',
    phone: 'Telefon',
    country: 'Land',
    formLanguage: 'Formularsprache',
    product: 'Produkt',
    service: 'Leistung',
    summary: 'Angebotsübersicht',
    subject: 'Betreff',
    noMessage: 'Es wurde keine Kundenmitteilung angegeben.',
    pricing: 'Preisübersicht',
    net: 'Nettobetrag',
    vat: 'MwSt.',
    shipping: '',
    total: 'Gesamtbetrag',
    pricingEmpty:
      'Preise wurden noch nicht hinterlegt; dieses Dokument ist ein unverbindlicher Vorab-Entwurf.',
    notes: 'Hinweise',
    notesLegal: (validUntilStr) =>
      validUntilStr ? `Dieses Angebot ist gültig bis ${validUntilStr}.` : '',
    internalNotes: '',
    footerLeft: (siteName) => `${siteName} – Automatisiertes Angebotssystem`,
    footerRight: 'Dieses PDF wurde automatisch erstellt und benötigt keine Unterschrift.',
  },
};

// -------------------------------------------------------------
// MAIN RENDER
// -------------------------------------------------------------

export async function renderOfferPdfHtml(ctx: PdfTemplateContext): Promise<string> {
  const runtimeLocale = await resolveRuntimeLocale(ctx.locale || undefined);
  const labelLocale = toLabelLocale(runtimeLocale);
  const t = LABELS[labelLocale];

  const companyBrand = await getCompanyBrandSettings(runtimeLocale);
  const siteName = companyBrand.name || ctx.site_name || 'Vista İnşaat';

  const offerNo = (ctx as any).offer_no || ctx.id;
  const createdAtStr = formatDate((ctx as any).created_at ?? null, labelLocale);
  const validUntilStr = formatDate((ctx as any).valid_until ?? null, labelLocale);

  const formData = parseJsonRecord((ctx as any).form_data);

  const formProductName = formData
    ? pickFirstString(
        (formData as any).product_name,
        (formData as any).productName,
        (formData as any).product_title,
        (formData as any).productTitle,
        (formData as any).product,
        (formData as any).item_name,
        (formData as any).itemName,
      )
    : null;

  const formServiceName = formData
    ? pickFirstString(
        (formData as any).service_name,
        (formData as any).serviceName,
        (formData as any).service_title,
        (formData as any).serviceTitle,
        (formData as any).service,
        (formData as any).requested_service,
        (formData as any).requestedService,
      )
    : null;

  const productDisplay = pickFirstString(ctx.product_name, formProductName) ?? null;
  const serviceDisplay = pickFirstString(ctx.service_name, formServiceName) ?? null;

  const currency = (ctx as any).currency;

  const netNum = parseDecimal((ctx as any).net_total);
  const vatNumFromRow = parseDecimal((ctx as any).vat_total);
  const grossNumFromRow = parseDecimal((ctx as any).gross_total);
  let vatNum: number | null = vatNumFromRow;
  let grossNum: number | null = grossNumFromRow;

  const vatRateRaw = (ctx as any).vat_rate as number | string | null | undefined;
  const vatRate = parseDecimal(vatRateRaw);

  if (vatNum == null && vatRate != null && netNum != null) {
    const ratio = vatRate / 100;
    if (Number.isFinite(ratio)) vatNum = netNum * ratio;
  }

  if (grossNum == null && netNum != null) {
    grossNum = netNum + (vatNum ?? 0);
  }

  const netStr = netNum != null ? formatMoney(netNum.toFixed(2), currency, labelLocale) : '';
  const vatStr = vatNum != null ? formatMoney(vatNum.toFixed(2), currency, labelLocale) : '';
  const grossStr = grossNum != null ? formatMoney(grossNum.toFixed(2), currency, labelLocale) : '';

  const vatLabel =
    vatRate != null && Number.isFinite(vatRate) ? `${t.vat} (${vatRate.toFixed(0)}%)` : `${t.vat}`;

  // Resolve logo: try base64 embed for reliable PDF rendering
  let logoUrl = companyBrand.logoUrl;
  if (logoUrl && logoUrl.startsWith('/')) {
    try {
      const fs = require('fs');
      const path = require('path');
      const localRoot = process.env.LOCAL_STORAGE_ROOT || '/uploads';
      // Strip /uploads prefix to get relative file path
      const relPath = logoUrl.replace(/^\/uploads\/?/, '');
      const candidates = [
        path.resolve(process.cwd(), 'uploads', relPath),
        path.resolve(localRoot, relPath),
        path.resolve(process.cwd(), logoUrl.replace(/^\//, '')),
      ];
      for (const fp of candidates) {
        if (fs.existsSync(fp)) {
          const buf = fs.readFileSync(fp);
          const ext = path.extname(fp).replace('.', '').toLowerCase();
          const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : 'image/jpeg';
          logoUrl = `data:${mime};base64,${buf.toString('base64')}`;
          break;
        }
      }
    } catch {
      // fallback: keep relative URL
      const publicUrl = process.env.PUBLIC_URL || process.env.STORAGE_PUBLIC_API_BASE || 'http://127.0.0.1:8086';
      logoUrl = `${publicUrl.replace(/\/$/, '')}${logoUrl}`;
    }
  }
  const logoWidth = companyBrand.logoWidth || 160;
  const logoHeight = companyBrand.logoHeight || 60;

  const countryDisplay = (ctx as any).country_code
    ? String((ctx as any).country_code).toUpperCase()
    : '';
  const formLangDisplay = runtimeLocale || '';

  let websiteDisplay = '';
  if (companyBrand.website) {
    websiteDisplay = String(companyBrand.website).trim();
    if (websiteDisplay.startsWith('https://')) websiteDisplay = websiteDisplay.slice(8);
    else if (websiteDisplay.startsWith('http://')) websiteDisplay = websiteDisplay.slice(7);
    if (websiteDisplay.endsWith('/')) websiteDisplay = websiteDisplay.slice(0, -1);
  }

  return `<!DOCTYPE html>
<html lang="${safeText(runtimeLocale)}">
<head>
  <meta charset="UTF-8" />
  <title>${safeText(siteName)} – ${safeText(t.title)} ${safeText(offerNo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 11px; color: #1e1c1a; background: #fff; }
    body { padding: 0; }
    .page { width: 100%; min-height: 100vh; display: flex; flex-direction: column; }

    /* ── Header ── */
    .header { padding: 32px 48px 24px; display: flex; justify-content: space-between; align-items: flex-start; }
    .header-brand { display: flex; align-items: center; gap: 14px; }
    .header-logo { height: 48px; width: auto; display: block; }
    .brand-text { display: flex; flex-direction: column; }
    .brand-name { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: #1e1c1a; letter-spacing: 0.02em; }
    .brand-sub { font-size: 10px; font-weight: 500; color: #b8a98a; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 2px; }
    .header-meta { text-align: right; font-size: 10px; line-height: 1.6; color: #666; }
    .header-meta strong { color: #1e1c1a; font-weight: 600; }

    /* ── Gold divider ── */
    .divider { height: 2px; background: linear-gradient(90deg, #b8a98a 0%, #d4c9b0 60%, transparent 100%); margin: 0 48px; }
    .divider-thin { height: 1px; background: #e8e3db; margin: 0 48px; }

    /* ── Document title bar ── */
    .title-bar { padding: 16px 48px; display: flex; justify-content: space-between; align-items: center; }
    .title-bar h1 { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #b8a98a; }
    .title-bar .ref { font-size: 10px; color: #999; }

    /* ── Content ── */
    .content { padding: 0 48px; flex: 1; }

    /* ── Section ── */
    .section { margin-bottom: 20px; }
    .section-head { font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #b8a98a; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid #e8e3db; }

    /* ── Info table ── */
    .info-table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
    .info-table td { padding: 4px 0; vertical-align: top; }
    .info-table .lbl { width: 120px; font-weight: 600; color: #888; text-transform: uppercase; font-size: 9px; letter-spacing: 0.06em; }
    .info-table .val { color: #1e1c1a; }

    /* ── Two column layout ── */
    .two-col { display: flex; gap: 40px; }
    .two-col .col { flex: 1; }

    /* ── Message box ── */
    .msg-box { background: #faf9f7; border-left: 3px solid #b8a98a; padding: 12px 16px; font-size: 10.5px; line-height: 1.6; color: #333; }
    .msg-box .subject-line { font-weight: 600; color: #1e1c1a; margin-bottom: 6px; }
    .msg-box .body-text { white-space: pre-wrap; }
    .msg-muted { color: #aaa; font-style: italic; font-size: 10px; }

    /* ── Pricing table ── */
    .pricing-table { width: 320px; margin-left: auto; border-collapse: collapse; font-size: 11px; }
    .pricing-table td { padding: 6px 0; }
    .pricing-table .p-label { color: #666; font-weight: 500; }
    .pricing-table .p-value { text-align: right; font-weight: 600; color: #1e1c1a; font-variant-numeric: tabular-nums; }
    .pricing-table .total-row td { border-top: 2px solid #b8a98a; padding-top: 10px; }
    .pricing-table .total-row .p-label { font-weight: 700; color: #1e1c1a; font-size: 12px; }
    .pricing-table .total-row .p-value { font-weight: 700; color: #1e1c1a; font-size: 13px; }
    .pricing-empty { color: #aaa; font-style: italic; font-size: 10px; text-align: right; }

    /* ── Notes ── */
    .notes-box { background: #faf9f7; border-radius: 4px; padding: 12px 16px; font-size: 9.5px; line-height: 1.5; color: #888; }

    /* ── Footer ── */
    .footer { margin-top: auto; padding: 16px 48px 24px; }
    .footer-line { height: 1px; background: linear-gradient(90deg, #b8a98a 0%, #d4c9b0 40%, transparent 100%); margin-bottom: 10px; }
    .footer-content { display: flex; justify-content: space-between; align-items: center; font-size: 8.5px; color: #aaa; }
    .footer-content .left { }
    .footer-content .right { text-align: right; }
  </style>
</head>
<body>
  <div class="page">

    <!-- Header -->
    <div class="header">
      <div class="header-brand">
        ${logoUrl ? `<img src="${safeText(logoUrl)}" alt="${safeText(siteName)}" class="header-logo" />` : ''}
        <div class="brand-text">
          <div class="brand-name">${safeText(siteName)}</div>
          <div class="brand-sub">${safeText(websiteDisplay)}</div>
        </div>
      </div>
      <div class="header-meta">
        <div><strong>${safeText(t.quoteNo)}:</strong> ${safeText(offerNo)}</div>
        <div><strong>${safeText(t.date)}:</strong> ${safeText(createdAtStr)}</div>
        ${validUntilStr ? `<div><strong>${safeText(t.validity)}:</strong> ${safeText(validUntilStr)}</div>` : ''}
      </div>
    </div>
    <div class="divider"></div>

    <!-- Title bar -->
    <div class="title-bar">
      <h1>${safeText(t.title)}</h1>
    </div>

    <div class="content">

      <!-- Customer Info -->
      <div class="section">
        <div class="section-head">${safeText(t.customerInfo)}</div>
        <div class="two-col">
          <div class="col">
            <table class="info-table">
              <tr><td class="lbl">${safeText(t.name)}</td><td class="val">${safeText((ctx as any).customer_name)}</td></tr>
              ${(ctx as any).company_name ? `<tr><td class="lbl">${safeText(t.company)}</td><td class="val">${safeText((ctx as any).company_name)}</td></tr>` : ''}
              <tr><td class="lbl">${safeText(t.email)}</td><td class="val">${safeText((ctx as any).email)}</td></tr>
              ${(ctx as any).phone ? `<tr><td class="lbl">${safeText(t.phone)}</td><td class="val">${safeText((ctx as any).phone)}</td></tr>` : ''}
              ${countryDisplay ? `<tr><td class="lbl">${safeText(t.country)}</td><td class="val">${safeText(countryDisplay)}</td></tr>` : ''}
            </table>
          </div>
          <div class="col">
            <table class="info-table">
              ${productDisplay ? `<tr><td class="lbl">${safeText(t.product)}</td><td class="val">${safeText(productDisplay)}</td></tr>` : ''}
              ${serviceDisplay ? `<tr><td class="lbl">${safeText(t.service)}</td><td class="val">${safeText(serviceDisplay)}</td></tr>` : ''}
            </table>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="section">
        <div class="section-head">${safeText(t.summary)}</div>
        <div class="msg-box">
          ${(ctx as any).subject ? `<div class="subject-line">${safeText((ctx as any).subject)}</div>` : ''}
          ${(ctx as any).message
            ? `<div class="body-text">${safeText((ctx as any).message)}</div>`
            : `<div class="msg-muted">${safeText(t.noMessage)}</div>`}
        </div>
      </div>

      <!-- Pricing -->
      <div class="section">
        <div class="section-head">${safeText(t.pricing)}</div>
        ${netStr || vatStr || grossStr ? `
        <table class="pricing-table">
          <tbody>
            ${netStr ? `<tr><td class="p-label">${safeText(t.net)}</td><td class="p-value">${safeText(netStr)}</td></tr>` : ''}
            ${vatStr ? `<tr><td class="p-label">${safeText(vatLabel)}</td><td class="p-value">${safeText(vatStr)}</td></tr>` : ''}
            ${grossStr ? `<tr class="total-row"><td class="p-label">${safeText(t.total)}</td><td class="p-value">${safeText(grossStr)}</td></tr>` : ''}
          </tbody>
        </table>` : `<div class="pricing-empty">${safeText(t.pricingEmpty)}</div>`}
      </div>

      <!-- Notes -->
      ${validUntilStr ? `
      <div class="section">
        <div class="section-head">${safeText(t.notes)}</div>
        <div class="notes-box">${safeText(t.notesLegal(validUntilStr))}</div>
      </div>` : ''}

    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-line"></div>
      <div class="footer-content">
        <div class="left">${safeText(t.footerLeft(siteName))}</div>
        <div class="right">${safeText(t.footerRight)}</div>
      </div>
    </div>

  </div>
</body>
</html>`;
}
