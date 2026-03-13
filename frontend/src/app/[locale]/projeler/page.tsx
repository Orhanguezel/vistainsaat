import 'server-only';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { API_BASE_URL, absoluteAssetUrl } from '@/lib/utils';
import { JsonLd, buildPageMetadata, jsonld, localizedPath, localizedUrl } from '@/seo';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { getFallbackProjects } from '@/lib/content-fallbacks';
import { buildMediaAlt } from '@/lib/media-seo';
import { SeoIssueBeacon } from '@/components/monitoring/SeoIssueBeacon';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

const PROJECT_PLACEHOLDER = '/media/gallery-placeholder.svg';

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
  const totalCount = visibleProjects.length;

  // Split: first project = featured (large left), next 2 = right column, rest = 3-col grid
  const [featured, ...rest] = visibleProjects;
  const sideProjects = rest.slice(0, 2);
  const gridProjects = rest.slice(2);

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
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

        {/* Header: Title | count */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
            }}
          >
            {t('projects.title')}
          </h1>
          <span
            style={{
              fontSize: 16,
              color: 'var(--color-text-muted)',
              fontWeight: 400,
            }}
          >
            | {totalCount} {locale === 'en' ? 'results' : 'proje'}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: 'var(--color-text-secondary)',
            marginTop: 8,
            maxWidth: 720,
            lineHeight: 1.6,
          }}
        >
          {t('projects.description')}
        </p>

        {/* Filter chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 24,
            paddingBottom: 24,
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <FilterChip
            href={localizedPath(locale, '/projeler')}
            active={!category}
            label={t('projects.allCategories')}
          />
          {categories.map((c: any) => (
            <FilterChip
              key={c.id}
              href={`${localizedPath(locale, '/projeler')}?category=${encodeURIComponent(c.slug)}`}
              active={category === c.slug}
              label={c.name}
            />
          ))}
          {/* Static filter chips when no API categories */}
          {categories.length === 0 && (
            <>
              <FilterChip href="#" active={false} label={t('projects.filters.type')} />
              <FilterChip href="#" active={false} label={t('projects.filters.city')} />
              <FilterChip href="#" active={false} label={t('projects.filters.year')} />
              <FilterChip href="#" active={false} label={t('projects.detail.area')} />
              <FilterChip href="#" active={false} label={t('projects.filters.status')} />
            </>
          )}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <>
            <SeoIssueBeacon
              type="soft-404"
              pathname={localizedPath(locale, '/projeler')}
              reason={category ? 'category-filter-empty' : 'projects-list-empty'}
            />
            <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
              {locale === 'en'
                ? 'Sample project titles are shown below until the live project feed becomes available.'
                : 'Canlı proje akışı gelene kadar aşağıda örnek proje başlıkları gösterilmektedir.'}
            </p>
          </>
        )}

        {/* Featured layout: big left + 2 right */}
        {featured && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 20,
              marginTop: 24,
            }}
            className="lg:!grid-cols-[1.6fr_1fr]"
          >
            <style>{`@media(min-width:1024px){.lg\\!grid-cols-\\[1\\.6fr_1fr\\]{grid-template-columns:1.6fr 1fr !important}}`}</style>

            {/* Featured large card */}
            <ProjectCard
              project={featured}
              locale={locale}
              aspect="aspect-[4/5]"
              titleSize={18}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Right column: 2 stacked cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {sideProjects.map((p: any) => (
                <ProjectCard
                  key={p.id ?? p.title}
                  project={p}
                  locale={locale}
                  aspect="aspect-[16/10]"
                  titleSize={16}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ))}
            </div>
          </div>
        )}

        {/* Rest: 3-column grid */}
        {gridProjects.length > 0 && (
          <div
            style={{
              display: 'grid',
              gap: 20,
              marginTop: 20,
            }}
            className="sm:grid-cols-2 lg:grid-cols-3"
          >
            {gridProjects.map((p: any) => (
              <ProjectCard
                key={p.id ?? p.title}
                project={p}
                locale={locale}
                aspect="aspect-[4/3]"
                titleSize={15}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Filter chip ─── */
function FilterChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: '6px 16px',
        borderRadius: 999,
        border: '1px solid',
        borderColor: active ? 'var(--color-text-primary)' : 'var(--color-border)',
        background: active ? 'var(--color-text-primary)' : 'var(--color-bg)',
        color: active ? 'var(--color-bg)' : 'var(--color-text-primary)',
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        transition: 'all 0.15s',
        textDecoration: 'none',
      }}
    >
      {label}
    </Link>
  );
}

/* ─── Project card (ArchDaily style) ─── */
function ProjectCard({
  project,
  locale,
  aspect,
  titleSize,
  sizes,
}: {
  project: any;
  locale: string;
  aspect: string;
  titleSize: number;
  sizes: string;
}) {
  const imageSrc = absoluteAssetUrl(project.image_url) || PROJECT_PLACEHOLDER;
  const href = project.slug
    ? localizedPath(locale, `/projeler/${project.slug}`)
    : `${localizedPath(locale, '/teklif')}?proje=${encodeURIComponent(project.title)}`;
  const categoryLabel = project.category_name || project.type || null;

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      {/* Image */}
      <div
        className={`relative overflow-hidden ${aspect}`}
        style={{ background: 'var(--color-bg-muted)', borderRadius: 0 }}
      >
        <OptimizedImage
          src={imageSrc}
          alt={buildMediaAlt({
            locale,
            kind: 'project',
            title: project.title,
            alt: project.alt,
            caption: project.caption,
            description: project.description,
          })}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes={sizes}
        />
      </div>
      {/* Meta */}
      <div style={{ paddingTop: 10 }}>
        {categoryLabel && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {categoryLabel}
          </span>
        )}
        <h3
          style={{
            fontSize: titleSize,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 1.35,
            marginTop: categoryLabel ? 2 : 0,
          }}
        >
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
