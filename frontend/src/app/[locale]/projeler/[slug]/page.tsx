import 'server-only';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, Calendar, Maximize2, Building2 } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';
import { JsonLd, buildPageMetadata, jsonld, localizedPath, localizedUrl, organizationJsonLd } from '@/seo';
import { BrandCtaPanel } from '@/components/patterns/BrandCtaPanel';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { fetchRelatedContent } from '@/lib/related-content';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { buildMediaAlt } from '@/lib/media-seo';

async function fetchProject(slug: string, locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/projects/by-slug/${encodeURIComponent(slug)}?locale=${locale}&item_type=vistainsaat`,
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
  const project = await fetchProject(slug, locale);
  if (!project) return {};
  return buildPageMetadata({
    locale,
    pathname: `/projeler/${slug}`,
    title:
      project.meta_title ||
      (locale.startsWith('en')
        ? `${project.title} — Construction Project | Vista Construction`
        : `${project.title} — Proje Detayı | Vista İnşaat`),
    description:
      project.meta_description ||
      (locale.startsWith('en')
        ? `Explore ${project.title}: project scope, location, area and architectural details by Vista Construction.`
        : `${project.title} projesi hakkında teknik kapsam, konum, alan ve mimari detayları inceleyin.`),
    ogImage: project.image_url,
    includeLocaleAlternates: false,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const project = await fetchProject(slug, locale);
  if (!project) notFound();

  const related = await fetchRelatedContent(project, slug, locale);
  const breadcrumbs = [
    { label: t('nav.home'), href: localizedPath(locale, '/') },
    { label: t('nav.projects'), href: localizedPath(locale, '/projeler') },
    { label: project.title },
  ];

  const specs = [
    project.location && { icon: MapPin, label: t('projects.detail.location'), value: project.location },
    project.year && { icon: Calendar, label: t('projects.detail.year'), value: project.year },
    project.area && { icon: Maximize2, label: t('projects.detail.area'), value: project.area },
    project.project_type && { icon: Building2, label: t('projects.detail.type'), value: project.project_type },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[];

  return (
    <>
      <JsonLd
        data={jsonld.graph([
          jsonld.org(organizationJsonLd(locale)),
          jsonld.creativeWork({
            name: project.title,
            description: project.description,
            image: project.image_url,
            url: localizedUrl(locale, `/projeler/${slug}`),
            locationCreated: project.location,
            dateCreated: project.year ? String(project.year) : undefined,
          }),
          jsonld.breadcrumb(
            breadcrumbs.map((item) => ({
              name: item.label,
              url: item.href
                ? localizedUrl(locale, item.href.replace(`/${locale}`, '') || '/')
                : localizedUrl(locale, `/projeler/${slug}`),
            })),
          ),
        ])}
      />

      {/* Hero — full-width image */}
      {project.image_url && (
        <div className="relative h-[55vh] w-full overflow-hidden bg-(--color-border) lg:h-[70vh]">
          <OptimizedImage
            src={project.image_url}
            alt={buildMediaAlt({
              locale,
              kind: 'project',
              title: project.title,
              alt: project.alt,
              caption: project.caption,
              description: project.description,
            })}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="media-overlay absolute inset-0" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="mx-auto max-w-7xl">
              <Breadcrumbs items={breadcrumbs} />
              <h1 className="text-3xl font-bold text-white lg:text-5xl">{project.title}</h1>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
        {!project.image_url && (
          <>
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="mt-6 text-3xl font-bold text-(--color-text-primary) lg:text-4xl">{project.title}</h1>
          </>
        )}

        {/* Two-column layout: content 60% + sidebar 40% */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
          {/* Left — description + gallery */}
          <div className="space-y-8">
            {project.description && (
              <div
                className="prose prose-neutral max-w-none text-(--color-text-secondary)"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}

            {/* Additional gallery images */}
            {project.gallery_images?.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {project.gallery_images.map((img: { url: string; alt?: string }, i: number) => (
                  <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-(--color-border)">
                    <OptimizedImage
                      src={img.url}
                      alt={img.alt || `${project.title} — görsel ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — project specs + CTA */}
          <div className="space-y-8">
            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="chip-muted rounded-full px-3 py-1 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Project specs */}
            {specs.length > 0 && (
              <div className="divide-y divide-(--color-border) rounded-xl border border-(--color-border) bg-(--color-bg-secondary)">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 px-5 py-4">
                    <Icon className="size-4 shrink-0 text-(--color-brand)" />
                    <span className="text-sm text-(--color-text-muted)">{label}</span>
                    <span className="ml-auto text-sm font-medium text-(--color-text-primary)">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <BrandCtaPanel
              title={t('projects.requestOffer')}
              description={t('common.offerCtaDescription')}
              action={(
                <Link
                  href={`${localizedPath(locale, '/teklif')}?project=${encodeURIComponent(project.title)}`}
                  className="btn-contrast mt-5 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
                >
                  {t('nav.offer')}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            />
          </div>
        </div>

        {/* Related links */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
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
