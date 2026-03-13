import 'server-only';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/utils';
import { JsonLd, buildPageMetadata, jsonld, localizedPath, localizedUrl } from '@/seo';
import { ListingCard } from '@/components/patterns/ListingCard';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { getFallbackProjects } from '@/lib/content-fallbacks';
import { buildMediaAlt } from '@/lib/media-seo';
import { SeoIssueBeacon } from '@/components/monitoring/SeoIssueBeacon';

async function fetchProjects(locale: string, categorySlug?: string) {
  const params = new URLSearchParams({
    module_key: 'vistainsaat',
    is_active: '1',
    locale,
    limit: '50',
  });
  if (categorySlug) params.set('category_slug', categorySlug);
  try {
    const res = await fetch(`${API_BASE_URL}/projects?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as any)?.items ?? [];
  } catch {
    return [];
  }
}

async function fetchCategories(locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/categories?module_key=vistainsaat&is_active=1&locale=${locale}`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as any)?.items ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return buildPageMetadata({
    locale,
    pathname: '/projeler',
    title: locale.startsWith('en')
      ? `${t('title')} - Construction Portfolio`
      : `${t('title')} - İnşaat Portföyü`,
    description: t('description'),
    noIndex: Boolean(category),
  });
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations({ locale });

  const [projects, categories] = await Promise.all([
    fetchProjects(locale, category),
    fetchCategories(locale),
  ]);
  const fallbackProjects = getFallbackProjects(locale);
  const visibleProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <div className="section-py">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <JsonLd
          data={jsonld.graph([
            jsonld.collectionPage({
              name: t('projects.title'),
              description: t('projects.description'),
              url: localizedUrl(locale, '/projeler'),
              mainEntity: jsonld.itemList(
                visibleProjects.slice(0, 12).map((item: any) => ({
                  name: item.title,
                  url: item.slug ? localizedUrl(locale, `/projeler/${item.slug}`) : localizedUrl(locale, '/teklif'),
                })),
              ),
            }),
          ])}
        />
        <SectionHeader
          title={t('projects.title')}
          description={t('projects.description')}
        />

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href={localizedPath(locale, '/projeler')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !category
                  ? 'chip-brand'
                  : 'chip-muted hover:bg-[var(--color-border-strong)]'
              }`}
            >
              {t('projects.allCategories')}
            </Link>
            {categories.map((c: any) => (
              <Link
                key={c.id}
                href={`${localizedPath(locale, '/projeler')}?category=${encodeURIComponent(c.slug)}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === c.slug
                    ? 'chip-brand'
                    : 'chip-muted hover:bg-[var(--color-border-strong)]'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}

        {/* Project grid */}
        {projects.length === 0 ? (
          <>
            <SeoIssueBeacon
              type="soft-404"
              pathname={localizedPath(locale, '/projeler')}
              reason={category ? 'category-filter-empty' : 'projects-list-empty'}
            />
            <p className="mt-12 text-center text-[var(--color-text-secondary)]">
              {t('projects.noProjects')}
            </p>
            <p className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
              {locale === 'en'
                ? 'Sample project titles are shown below until the live project feed becomes available.'
                : 'Canlı proje akışı gelene kadar aşağıda örnek proje başlıkları gösterilmektedir.'}
            </p>
          </>
        ) : (
          null
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProjects.map((p: any) => (
            <ListingCard
              key={p.id ?? p.title}
              href={p.slug ? localizedPath(locale, `/projeler/${p.slug}`) : `${localizedPath(locale, '/teklif')}?proje=${encodeURIComponent(p.title)}`}
              title={p.title}
              description={p.description}
              imageSrc={p.image_url}
              imageAlt={buildMediaAlt({
                locale,
                kind: 'project',
                title: p.title,
                alt: p.alt,
                caption: p.caption,
                description: p.description,
              })}
              imageSizes="(max-width: 768px) 50vw, 25vw"
              imageAspectClassName="aspect-[4/3]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
