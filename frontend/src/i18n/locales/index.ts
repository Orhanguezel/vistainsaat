import type { AbstractIntlMessages } from 'next-intl';
import en from '../../../public/locales/en.json';
import tr from '../../../public/locales/tr.json';

// Yalnızca gerçek çevirisi olan diller yayınlanır. Diğer diller (de, fr, ru, ar, it, es,
// zh, ja, nl, pt, pl, sv, da, uk) içerik çevirisi olmadığı için Türkçe duplicate üretiyordu
// ve indexlemeye zarar veriyordu (yinelenen içerik / crawl bütçesi israfı). Bir dil gerçekten
// çevrildiğinde JSON'u import edip buraya ekleyerek tekrar aktif edilebilir.
export const LOCALE_MESSAGES: Record<string, AbstractIntlMessages> = {
  tr,
  en,
};

export const AVAILABLE_LOCALES = Object.keys(LOCALE_MESSAGES);
export const FALLBACK_LOCALE = 'tr';

export function hasLocale(locale: string): boolean {
  return locale in LOCALE_MESSAGES;
}

export function getLocaleMessages(locale: string): AbstractIntlMessages {
  return LOCALE_MESSAGES[locale] ?? (LOCALE_MESSAGES[FALLBACK_LOCALE] as AbstractIntlMessages);
}
