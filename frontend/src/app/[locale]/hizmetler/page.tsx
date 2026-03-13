import 'server-only';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';
import { JsonLd, buildPageMetadata, jsonld, localizedPath, localizedUrl } from '@/seo';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { ListingCard } from '@/components/patterns/ListingCard';
import { buildMediaAlt } from '@/lib/media-seo';

async function fetchServices(locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/services?module_key=vistainsaat&is_active=1&locale=${locale}&limit=50`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as any)?.items ?? [];
  } catch {
    return [];
  }
}

const FALLBACK_SERVICES = [
  { id: '1', title: 'Konut Projeleri', description: 'Villa, apartman, rezidans ve toplu konut projelerinde tasarım ve inşaat.', slug: 'konut-projeleri' },
  { id: '2', title: 'Ticari Projeler', description: 'Ofis, alışveriş merkezi ve karma kullanım yapılarında komple inşaat çözümleri.', slug: 'ticari-projeler' },
  { id: '3', title: 'Proje Yönetimi', description: 'Ruhsattan teslimata tüm sürecin profesyonel yönetimi.', slug: 'proje-yonetimi' },
  { id: '4', title: 'Restorasyon', description: 'Tarihi yapı restorasyonu, tadilat ve güçlendirme projeleri.', slug: 'restorasyon' },
  { id: '5', title: 'Mimari Tasarım', description: 'Projeye özel mimari tasarım, statik ve mühendislik çözümleri.', slug: 'mimari-tasarim' },
  { id: '6', title: 'İç Mimari', description: 'Yaşam alanlarında estetik ve işlevsel iç mekan tasarımı.', slug: 'ic-mimari' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return buildPageMetadata({
    locale,
    pathname: '/hizmetler',
    title: locale.startsWith('en') ? 'Our Services - Vista Construction' : `${t('title')} — Vista İnşaat`,
    description: t('description'),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const services = await fetchServices(locale);
  const visibleServices = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <div className="section-py">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <JsonLd
          data={jsonld.graph([
            jsonld.collectionPage({
              name: t('services.title'),
              description: t('services.description'),
              url: localizedUrl(locale, '/hizmetler'),
              mainEntity: jsonld.itemList(
                visibleServices.slice(0, 10).map((item: any) => ({
                  name: item.title,
                  url: item.slug ? localizedUrl(locale, `/hizmetler/${item.slug}`) : localizedUrl(locale, '/iletisim'),
                })),
              ),
            }),
          ])}
        />

        <SectionHeader
          title={t('services.title')}
          description={t('services.description')}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((s: any) => (
            <ListingCard
              key={s.id ?? s.title}
              href={s.slug ? localizedPath(locale, `/hizmetler/${s.slug}`) : localizedPath(locale, '/iletisim')}
              title={s.title}
              description={s.description}
              imageSrc={s.image_url}
              imageAlt={buildMediaAlt({
                locale,
                kind: 'service',
                title: s.title,
                alt: s.alt,
                description: s.description,
              })}
              imageSizes="(max-width: 768px) 100vw, 33vw"
              imageAspectClassName="aspect-[16/10]"
            />
          ))}
        </div>

        {/* CTA */}
        <div className="surface-dark-shell mt-16 rounded-[2rem] p-8 text-center lg:p-12">
          <h2 className="surface-dark-heading text-2xl font-bold lg:text-3xl">
            {t('common.offerCtaTitle')}
          </h2>
          <p className="surface-dark-text mx-auto mt-4 max-w-xl text-base leading-7">
            {t('common.offerCtaDescription')}
          </p>
          <Link
            href={localizedPath(locale, '/teklif')}
            className="btn-primary mt-8 inline-flex items-center gap-2 rounded-lg px-8 py-3 font-medium transition-colors"
          >
            {t('common.requestOffer')}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
