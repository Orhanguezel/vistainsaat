import 'server-only';

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { API_BASE_URL, absoluteAssetUrl } from '@/lib/utils';
import { JsonLd, buildPageMetadata, jsonld, localizedPath, localizedUrl } from '@/seo';

import { buildMediaAlt } from '@/lib/media-seo';
import { SeoIssueBeacon } from '@/components/monitoring/SeoIssueBeacon';
import { ProjectsView } from '@/components/projects/ProjectsView';
import { fetchSetting } from '@/i18n/server';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import type { ProjectViewItem } from '@/components/projects/ProjectsView';

const PROJECT_PLACEHOLDER = '/media/gallery-placeholder.svg';

async function fetchProjects(locale: string) {
  const params = new URLSearchParams({
    item_type: 'vistainsaat',
    is_active: '1',
    locale,
    limit: '50',
  });
  try {
    const res = await fetch(`${API_BASE_URL}/products?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as any)?.items ?? [];
  } catch {
    return [];
  }
}

import { fetchSeoPage } from '@/seo/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await fetchSeoPage(locale, 'projeler');
  const t = await getTranslations({ locale });

  return buildPageMetadata({
    locale,
    pathname: '/projeler',
    title: seo?.title || `${t('projects.title')} - ${t('seo.defaultTitle')}`,
    description: seo?.description || t('projects.description'),
    ogImage: seo?.og_image || undefined,
    noIndex: seo?.no_index,
  });
}

function toViewItem(p: any, locale: string): ProjectViewItem {
  const specs = p.specifications as Record<string, string> | undefined;
  const isEn = locale.startsWith('en');
  return {
    id: p.id,
    title: p.title,
    href: p.slug
      ? localizedPath(locale, `/projeler/${p.slug}`)
      : `${localizedPath(locale, '/teklif')}?proje=${encodeURIComponent(p.title)}`,
    imageSrc: absoluteAssetUrl(p.image_url) || absoluteAssetUrl(p.images?.[0]) || PROJECT_PLACEHOLDER,
    alt: buildMediaAlt({
      locale,
      kind: 'project',
      title: p.title,
      alt: p.alt,
      caption: p.caption,
      description: p.description,
    }),
    category: p.category_name || p.type || (isEn ? specs?.type : specs?.tip) || undefined,
    location: (isEn ? specs?.location : specs?.lokasyon) || specs?.lokasyon || specs?.location || undefined,
    architects: (isEn ? specs?.architects : specs?.mimarlar) || specs?.mimarlar || specs?.architects || undefined,
    year: specs?.yil || specs?.year || undefined,
    area: specs?.alan || specs?.area || undefined,
    status: (isEn ? specs?.status : specs?.durum) || specs?.durum || specs?.status || undefined,
    materials: (isEn ? specs?.materials : specs?.malzeme) || specs?.malzeme || specs?.materials || undefined,
    floors: (isEn ? specs?.floors : specs?.kat) || specs?.kat || specs?.floors || undefined,
    client: (isEn ? specs?.client : specs?.isveren) || specs?.isveren || specs?.client || undefined,
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const isEn = locale.startsWith('en');

  const [projects, profile] = await Promise.all([
    fetchProjects(locale),
    fetchSetting('company_profile', locale),
  ]);

  const companyProfile = (profile?.value as any) ?? {};
  const companyName = companyProfile.company_name || 'Vista İnşaat';

  const totalCount = projects.length;
  const viewItems = projects.map((p: any) => toViewItem(p, locale));

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px 48px' }}>
        <Breadcrumbs items={[
          { label: companyName, href: localizedPath(locale, '/') },
          { label: t('projects.title') },
        ]} />
        <JsonLd
          data={jsonld.graph([
            jsonld.collectionPage({
              name: t('projects.title'),
              description: t('projects.description'),
              url: localizedUrl(locale, '/projeler'),
              mainEntity: jsonld.itemList(
                projects.slice(0, 12).map((item: any) => ({
                  name: item.title,
                  url: item.slug
                    ? localizedUrl(locale, `/projeler/${item.slug}`)
                    : localizedUrl(locale, '/teklif'),
                })),
              ),
            }),
          ])}
        />

        {/* ── Title + count ── */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 28,
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {t('projects.title')}
          </h1>
          <span style={{ fontSize: 15, color: 'var(--color-text-muted)', fontWeight: 400 }}>
            | {totalCount} {t('projects.results')}
          </span>
        </div>

        {/* ── Description ── */}
        <p
          style={{
            fontSize: 14,
            color: 'var(--color-text-secondary)',
            marginTop: 6,
            maxWidth: 720,
            lineHeight: 1.6,
          }}
        >
          {t('projects.description')}
        </p>

        {/* ── Tabs + Filters + View toggle + Content ── */}
        <div style={{ marginTop: 16 }}>
          <Suspense fallback={null}><ProjectsView
            projects={viewItems}
            locale={locale}
            labels={{
              projects: t('projects.title'),
              images: t('projects.images'),
            }}
            filterLabels={{
              category: t('projects.filters.type'),
              location: t('projects.filters.location'),
              architects: t('projects.filters.architects'),
              year: t('projects.filters.year'),
              materials: t('projects.filters.materials'),
              area: t('projects.filters.area'),
              floors: t('projects.filters.floors'),
              client: t('projects.filters.client'),
              status: t('projects.filters.status'),
              all: t('projects.filters.all'),
              search: t('projects.filters.search'),
              clearFilters: t('common.clearFilters'),
              noResults: t('common.noResults'),
              allLabel: t('common.allLabel'),
            }}
            detailLabels={{
              architects: t('projects.detail.architect'),
              location: t('projects.detail.location'),
              year: t('projects.detail.year'),
              area: t('projects.detail.area'),
            }}
          /></Suspense>
        </div>
      </div>
    </div>
  );
}
