import 'server-only';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Play, Bookmark } from 'lucide-react';

import { absoluteAssetUrl, API_BASE_URL } from '@/lib/utils';
import { JsonLd, buildPageMetadata, jsonld, localizedPath, organizationJsonLd, siteUrlBase, readSettingValue, asStr } from '@/seo';
import { NewsletterForm } from '@/components/sections/NewsletterForm';
import { SectionHeader } from '@/components/patterns/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { HeroVideoPlayer } from '@/components/ui/HeroVideoPlayer';
import { getFallbackBlogPosts, getFallbackBrands, getFallbackProjects } from '@/lib/content-fallbacks';
import { buildMediaAlt } from '@/lib/media-seo';
import { BrandCarousel } from '@/components/sections/BrandCarousel';
import { ProjectFeed } from '@/components/sections/ProjectFeed';
import { fetchSetting } from '@/i18n/server';
import { SaveProjectButton } from '@/components/projects/SaveProjectButton';
function resolveImageUrl(value?: string | null): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/media/')) return value;
  return absoluteAssetUrl(value);
}

const BLOG_PLACEHOLDER_SRC = '/media/blog-placeholder.svg';

async function fetchFeaturedProducts(locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products?item_type=vistainsaat&is_active=1&is_featured=1&locale=${locale}&limit=8`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as any)?.items ?? [];
  } catch {
    return [];
  }
}

async function fetchReferences(locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/references?module_key=vistainsaat&is_active=1&locale=${locale}&limit=30`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as any)?.items ?? [];
  } catch {
    return [];
  }
}

async function fetchAllProjects(locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/products?item_type=vistainsaat&is_active=1&locale=${locale}&limit=10`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data as any)?.items ?? [];
  } catch {
    return [];
  }
}

async function fetchFeaturedBlogPosts(locale: string) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/custom_pages?module_key=news&is_published=1&featured=1&locale=${locale}&limit=3`,
      { next: { revalidate: 300 } },
    );
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
  const seo = await fetchSeoPage(locale, 'home');
  const t = await getTranslations({ locale });

  return buildPageMetadata({
    locale,
    pathname: '/',
    title: seo?.title || (locale.startsWith('en')
      ? 'Reliable Construction and Architecture Services'
      : 'Güvenilir İnşaat ve Mimarlık Hizmetleri'),
    description: seo?.description || t('seo.defaultDescription'),
    ogImage: seo?.og_image || undefined,
    noIndex: seo?.no_index,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const [products, blogPosts, references, allProjects, heroSetting] = await Promise.all([
    fetchFeaturedProducts(locale),
    fetchFeaturedBlogPosts(locale),
    fetchReferences(locale),
    fetchAllProjects(locale),
    fetchSetting('hero', locale),
  ]);

  const h = readSettingValue(heroSetting);
  const headline = locale === 'tr' ? asStr(h.headline_tr) : asStr(h.headline_en);
  const subheadline = locale === 'tr' ? asStr(h.subheadline_tr) : asStr(h.subheadline_en);
  const ctaText = locale === 'tr' ? asStr(h.cta_text_tr) : asStr(h.cta_text_en);

  const siteUrl = siteUrlBase();
  const visibleBrands = (references.length > 0 ? references : getFallbackBrands()).map((r: any) => ({
    ...r,
    logo_url: resolveImageUrl(r.featured_image || r.logo_url || r.image_url),
  }));
  const visibleProducts = products.length > 0 ? products.slice(0, 8) : getFallbackProjects(locale);
  const visibleBlogPosts = blogPosts.length > 0 ? blogPosts.slice(0, 3) : getFallbackBlogPosts(locale);
  const featuredBlogPost = visibleBlogPosts[0];

  return (
    <main className="min-h-screen">
      <JsonLd
        data={jsonld.graph([
          jsonld.org({
            ...organizationJsonLd(locale, {
              description: t('seo.defaultDescription'),
            }),
            url: siteUrl,
          }),
          jsonld.website({
            name: 'Vista İnşaat',
            url: siteUrl,
          }),
        ])}
      />

      {/* Hero — ArchDaily editorial grid */}
      <section className="bg-(--color-bg)">
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-6 lg:px-6">
          <div className="flex flex-col gap-2.5 lg:grid lg:grid-cols-[1.15fr_1fr]" style={{ minHeight: '560px' }}>

            {/* Left — Main video panel */}
            <HeroVideoPlayer
              src={absoluteAssetUrl(asStr(h.video_desktop)) || absoluteAssetUrl('/uploads/video/hero-desktop.mp4') || ''}
              mobileSrc={absoluteAssetUrl(asStr(h.video_mobile)) || absoluteAssetUrl('/uploads/video/hero-mobile.mp4') || ''}
              poster={absoluteAssetUrl(asStr(h.video_poster)) || absoluteAssetUrl(visibleProducts[0]?.image_url) || undefined}
              badge={t('home.hero.newProjectBadge')}
              title={headline || visibleProducts[0]?.title}
              description={subheadline || undefined}
              ctaText={ctaText || undefined}
              ctaUrl={asStr(h.cta_url)?.replace('[locale]', locale) || undefined}
            />

            {/* Right — left stack + full-height news */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

                {/* Left column — stacked cards */}
                <div className="flex flex-col gap-2.5 min-h-[400px] lg:min-h-0">
                  {/* Project with play icon */}
                  {visibleProducts[0] && (
                    <Link
                      href={visibleProducts[0].slug ? localizedPath(locale, `/projeler/${visibleProducts[0].slug}`) : localizedPath(locale, '/projeler')}
                      className="group relative flex-1 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-(--color-bg-muted)">
                        {absoluteAssetUrl(visibleProducts[0].image_url) && (
                          <OptimizedImage
                            src={absoluteAssetUrl(visibleProducts[0].image_url)!}
                            alt={buildMediaAlt({ locale, kind: 'project', title: visibleProducts[0].title })}
                            fill
                            sizes="(max-width: 1024px) 50vw, 18vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="absolute left-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-sm">
                        <Play className="size-3.5 fill-(--color-text-primary) text-(--color-text-primary)" />
                      </div>
                    </Link>
                  )}

                  {/* Project image */}
                  {visibleProducts[1] && (
                    <Link
                      href={visibleProducts[1].slug ? localizedPath(locale, `/projeler/${visibleProducts[1].slug}`) : localizedPath(locale, '/projeler')}
                      className="group relative flex-1 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-(--color-bg-muted)">
                        {absoluteAssetUrl(visibleProducts[1].image_url) && (
                          <OptimizedImage
                            src={absoluteAssetUrl(visibleProducts[1].image_url)!}
                            alt={buildMediaAlt({ locale, kind: 'project', title: visibleProducts[1].title })}
                            fill
                            sizes="(max-width: 1024px) 50vw, 18vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                    </Link>
                  )}

                  {/* CTA button */}
                  <Link
                    href={localizedPath(locale, '/teklif')}
                    className="flex items-center justify-center gap-3 bg-(--color-brand) px-6 py-4 text-center transition-opacity hover:opacity-90"
                  >
                    <p className="text-sm font-bold text-white lg:text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                      {t('home.hero.ctaSecondary')}
                    </p>
                    <ArrowRight className="size-4 text-white" />
                  </Link>
                </div>

                {/* Right column — full-height news card */}
                {featuredBlogPost ? (
                  <Link
                    href={featuredBlogPost.slug ? localizedPath(locale, `/haberler/${featuredBlogPost.slug}`) : localizedPath(locale, '/haberler')}
                    className="group flex flex-col overflow-hidden min-h-[320px] lg:min-h-0"
                  >
                    <div className="relative flex-1 overflow-hidden bg-(--color-bg-muted) aspect-4/5 sm:aspect-auto">
                      <OptimizedImage
                        src={resolveImageUrl(featuredBlogPost.image_url || featuredBlogPost.featured_image) || BLOG_PLACEHOLDER_SRC}
                        alt={featuredBlogPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-(--color-bg) pt-3 pb-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-(--color-brand)">
                        {t('nav.blog')}
                      </p>
                      <h2
                        className="mt-1 text-sm font-semibold leading-snug text-(--color-brand) lg:text-base"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {featuredBlogPost.title}
                      </h2>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-(--color-bg-muted)" />
                )}

            </div>
          </div>
        </div>
      </section>


      {/* Featured Projects — ArchDaily expanded cards */}
      <section className="section-py">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="motion-fade-up mb-8">
            <SectionHeader
              title={t('home.projects.title')}
              description={t('home.projects.subtitle')}
            />
          </div>
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
            {/* Main feed */}
            <div className="space-y-10">
              {visibleProducts.slice(0, 4).map((project: any) => {
                const mainImage = absoluteAssetUrl(project.image_url);
                const thumbs = (project.images || []).slice(0, 5).map((img: string) => absoluteAssetUrl(img)).filter(Boolean) as string[];
                const extraCount = (project.images?.length || 0) - 5;
                const specs = project.specifications || {};
                const categoryName = project.category?.name || specs.tip || '';
                const location = specs.lokasyon || specs.location || '';
                const architects = specs.mimarlar || specs.architects || '';
                const area = specs.alan || specs.area || '';
                const year = specs.yıl || specs.year || '';
                const manufacturers = specs.üreticiler || specs.manufacturers || '';
                const projectHref = project.slug ? localizedPath(locale, `/projeler/${project.slug}`) : localizedPath(locale, '/projeler');

                return (
                  <article key={project.id ?? project.title} className="border-b border-(--color-border) pb-10">
                    <Link href={projectHref}>
                      <h2
                        className="text-xl font-bold text-(--color-text-primary) hover:text-(--color-brand) lg:text-2xl"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {project.title}
                        {architects ? ` / ${architects}` : ''}
                      </h2>
                    </Link>

                    {mainImage && (
                      <Link href={projectHref} className="group relative mt-4 block aspect-16/10 overflow-hidden bg-(--color-bg-muted)">
                        <OptimizedImage
                          src={mainImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 660px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </Link>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-x-1.5 text-xs font-semibold uppercase tracking-wide">
                      {categoryName && (
                        <span className="text-(--color-brand)">{categoryName}</span>
                      )}
                      {categoryName && location && (
                        <span className="text-(--color-text-muted)">·</span>
                      )}
                      {location && (
                        <span className="text-(--color-text-secondary)">{location}</span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-(--color-text-secondary)">
                      {architects && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-(--color-text-muted)">{t('projects.filters.architects')}:</span>
                          <span className="font-medium text-(--color-brand)">{architects}</span>
                        </div>
                      )}
                      {area && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-(--color-text-muted)">{t('projects.filters.area')}:</span>
                          <span className="font-medium">{area}</span>
                        </div>
                      )}
                      {year && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-(--color-text-muted)">{t('projects.filters.year')}:</span>
                          <span className="font-medium text-(--color-brand)">{year}</span>
                        </div>
                      )}
                      {manufacturers && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-(--color-text-muted)">{t('projects.manufacturers')}:</span>
                          <span className="font-medium">{manufacturers}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <SaveProjectButton 
                        projectId={project.id} 
                        label={t('projects.saveProject')} 
                      />
                      <Link
                        href={projectHref}
                        className="text-xs font-medium text-(--color-brand) hover:underline"
                      >
                        {t('common.readMore')} »
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <div className="border-b border-(--color-border) pb-6">
                  <h3
                    className="mb-4 text-lg font-bold text-(--color-text-primary)"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t('projects.loveTitle')}
                  </h3>
                  <div className="space-y-5">
                    {visibleProducts.slice(0, 4).map((p: any) => {
                      const img = absoluteAssetUrl(p.image_url);
                      return (
                        <Link
                          key={p.id}
                          href={p.slug ? localizedPath(locale, `/projeler/${p.slug}`) : localizedPath(locale, '/projeler')}
                          className="group flex gap-3"
                        >
                          {img && (
                            <div className="relative aspect-4/3 w-24 shrink-0 overflow-hidden bg-(--color-bg-muted)">
                              <OptimizedImage
                                src={img}
                                alt={p.title}
                                fill
                                sizes="96px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <h4 className="text-sm font-semibold leading-snug text-(--color-text-primary) group-hover:text-(--color-brand)">
                            {p.title}
                            {p.specifications?.mimarlar ? ` / ${p.specifications.mimarlar}` : ''}
                          </h4>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-(--color-bg-muted) p-5">
                  <p
                    className="text-sm font-bold text-(--color-text-primary)"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t('projects.getQuoteTitle')}
                  </p>
                  <p className="mt-1 text-xs text-(--color-text-secondary)">
                    {t('projects.getQuoteDesc')}
                  </p>
                  <Link
                    href={localizedPath(locale, '/teklif')}
                    className="mt-3 inline-block bg-(--color-brand) px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    {t('nav.offer')}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Brands / References */}
      <section className="section-py">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="motion-fade-up">
            <SectionHeader
              title={t('home.brands.title')}
              description={t('home.brands.subtitle')}
              align="center"
            />
          </div>
          <div className="motion-fade-up motion-delay-2 mt-10">
            <BrandCarousel brands={visibleBrands} />
          </div>
        </div>
      </section>

      {/* All Projects — ArchDaily-style infinite feed */}
      <section className="section-py border-t border-(--color-border)">
        <ProjectFeed
          initialProjects={allProjects}
          locale={locale}
          apiUrl={API_BASE_URL}
          backendUrl={API_BASE_URL.replace(/\/api\/?$/, '')}
          title={t('home.latestProjects.title')}
          subtitle={t('home.latestProjects.subtitle')}
          sidebarProjects={visibleProducts.slice(0, 4)}
          sidebarTitle={t('projects.loveTitle')}
          readMoreLabel={t('common.readMore')}
        />
      </section>

      {/* CTA */}
      <section className="bg-(--color-bg-dark)">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-3xl font-bold text-(--color-text-on-dark) lg:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('common.offerCtaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-(--color-text-on-dark)/70">
              {t('common.offerCtaDescription')}
            </p>
            <Link
              href={localizedPath(locale, '/teklif')}
              className="mt-8 inline-flex items-center gap-2 bg-(--color-brand) px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('common.requestOffer')}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-py bg-(--color-bg-muted)">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="motion-fade-up">
            <h2 className="text-2xl font-bold">{t('home.newsletter.title')}</h2>
            <p className="mt-2 text-(--color-text-secondary)">
              {t('home.newsletter.subtitle')}
            </p>
          </div>
          <div className="motion-fade-up motion-delay-2">
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
