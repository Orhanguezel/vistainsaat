/**
 * Hafif analitik olay yardımcıları.
 *
 * Mevcut altyapı: `GoogleAnalytics` (gtag, `NEXT_PUBLIC_GA_ID`) ve `GoogleTagManager`
 * (`NEXT_PUBLIC_GTM_ID`) — bkz. `components/analytics/GoogleAnalytics.tsx`.
 * Bu helper, GA veya GTM yüklü değilse sessizce no-op olur; ölçüm aracı kurulduğunda
 * (env ID girilince) olaylar otomatik akmaya başlar. Hiçbir çağrı hata fırlatmaz.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Genel amaçlı olay gönderimi (GA4 + GTM dataLayer). SSR'de no-op. */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  try {
    // GA4 (gtag.js)
    window.gtag?.('event', name, params);
    // GTM dataLayer (gtag yoksa veya GTM tag'leri için)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }
  } catch {
    // analitik asla akışı bozmaz
  }
}

/** Teklif formu başarıyla gönderildiğinde — GA4 önerilen lead event'i. */
export function trackLead(params: EventParams = {}): void {
  trackEvent('generate_lead', { currency: 'TRY', ...params });
}

/** Dışa giden iletişim tıklamaları (WhatsApp / telefon / e-posta). */
export function trackContactClick(
  channel: 'whatsapp' | 'phone' | 'email',
  params: EventParams = {},
): void {
  trackEvent('contact_click', { channel, ...params });
}
