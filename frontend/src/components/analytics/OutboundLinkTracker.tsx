'use client';

import { useEffect } from 'react';
import { trackContactClick } from '@/lib/analytics';

/**
 * Site genelinde `tel:` ve `mailto:` tıklamalarını yakalar ve analitik olayı gönderir.
 * Delege edilmiş tek bir document listener kullanır; böylece sunucu bileşenlerindeki
 * (iletişim sayfası, footer vb.) statik linkleri değiştirmeden iletişim niyetini ölçer.
 */
export function OutboundLinkTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest('a');
      const href = anchor?.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) {
        trackContactClick('phone', { value: href.slice(4) });
      } else if (href.startsWith('mailto:')) {
        trackContactClick('email', { value: href.slice(7).split('?')[0] });
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return null;
}
