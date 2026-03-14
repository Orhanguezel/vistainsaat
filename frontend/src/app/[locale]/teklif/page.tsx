import 'server-only';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContentPageHeader } from '@/components/patterns/ContentPageHeader';
import { InfoListPanel } from '@/components/patterns/InfoListPanel';
import { OfferFormClient } from '@/components/sections/OfferForm';
import { buildPageMetadata, localizedPath } from '@/seo';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { product } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'offer' });
  return buildPageMetadata({
    locale,
    pathname: '/teklif',
    title: locale.startsWith('en')
      ? `${t('title')} - Vista Construction Quote & Project Evaluation`
      : `${t('title')} - Teklif ve Proje Değerlendirme`,
    description: t('description'),
    noIndex: Boolean(product),
  });
}

export default async function OfferPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string }>;
}) {
  const { locale } = await params;
  const { product } = await searchParams;
  const t = await getTranslations({ locale });
  const benefitItems = Object.values(t.raw('offer.benefits.items') as Record<string, string>);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 16px 60px' }}>
      <div>
        <Breadcrumbs items={[
          { label: 'Vista İnşaat', href: localizedPath(locale, '/') },
          { label: locale.startsWith('en') ? 'Request a Quote' : 'Teklif Al' },
        ]} />
        <ContentPageHeader
          title={t('offer.title')}
          description={t('offer.description')}
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <OfferFormClient locale={locale} preselectedProduct={product} />
          <aside>
            <InfoListPanel
              title={t('offer.benefits.title')}
              items={benefitItems}
              accentText={t('common.freeOfObligation')}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
