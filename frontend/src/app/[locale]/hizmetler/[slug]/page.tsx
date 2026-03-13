import 'server-only';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { absoluteAssetUrl, API_BASE_URL } from '@/lib/utils';
import { JsonLd, buildPageMetadata, jsonld, localizedPath, localizedUrl, organizationJsonLd } from '@/seo';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { buildMediaAlt } from '@/lib/media-seo';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { fetchRelatedContent } from '@/lib/related-content';

const PLACEHOLDER_SRC = '/media/service-placeholder.svg';

async function fetchService(slug: string, locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/services/by-slug/${slug}?locale=${locale}`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await fetchService(slug, locale);
  if (!service) return {};

  return buildPageMetadata({
    locale,
    pathname: `/hizmetler/${slug}`,
    title: service.title,
    description: service.description,
    ogImage: absoluteAssetUrl(service.image_url) || undefined,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  const service = await fetchService(slug, locale);
  if (!service) notFound();

  const imageSrc = absoluteAssetUrl(service.image_url) || PLACEHOLDER_SRC;
  const related = await fetchRelatedContent(service, slug, locale);
  const breadcrumbs = [
    { label: t('nav.home'), href: localizedPath(locale, '/') },
    { label: t('nav.services'), href: localizedPath(locale, '/hizmetler') },
    { label: service.title },
  ];

  return (
    <>
      <JsonLd
        data={jsonld.graph([
          jsonld.service({
            name: service.title,
            description: service.description,
            url: localizedUrl(locale, `/hizmetler/${slug}`),
            image: imageSrc,
          }),
          jsonld.breadcrumb(
            breadcrumbs
              .filter((b) => b.href)
              .map((b) => ({ name: b.label, url: localizedUrl(locale, b.href!) }))
          ),
        ])}
      />

      {/* Hero image */}
      <div className="relative h-64 w-full overflow-hidden bg-(--color-border) lg:h-96">
        <OptimizedImage
          src={imageSrc}
          alt={buildMediaAlt({ locale, kind: 'service', title: service.title, alt: service.alt })}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="media-overlay absolute inset-0" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mt-6 text-3xl font-bold text-(--color-text-primary) lg:text-4xl">
          {service.title}
        </h1>

        {service.description && (
          <p className="mt-4 text-lg leading-8 text-(--color-text-secondary)">
            {service.description}
          </p>
        )}

        {service.content && (
          <div
            className="prose prose-neutral mt-8 max-w-none text-(--color-text-secondary)"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        )}

        <div className="mt-10 flex gap-4">
          <Link
            href={localizedPath(locale, '/teklif')}
            className="btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
          >
            {t('services.requestService')}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={localizedPath(locale, '/hizmetler')}
            className="chip-muted inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
          >
            {t('services.viewAll')}
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <RelatedLinks
            title={t('common.relatedProducts')}
            hrefBase={localizedPath(locale, '/projeler')}
            items={related.products}
          />
          <RelatedLinks
            title={t('common.relatedGallery')}
            hrefBase={localizedPath(locale, '/galeri')}
            items={related.galleries}
          />
          <RelatedLinks
            title={t('common.relatedArticles')}
            hrefBase={localizedPath(locale, '/haberler')}
            items={related.blogPosts}
          />
        </div>
      </div>
    </>
  );
}
