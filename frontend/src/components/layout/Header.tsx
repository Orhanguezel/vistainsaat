'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { localizedPath } from '@/seo';

const ThemeToggle = dynamic(
  () => import('@/components/theme/ThemeToggle').then((m) => m.ThemeToggle),
  { ssr: false, loading: () => <span className="inline-block h-7 w-7" /> },
);
const LanguageSwitcher = dynamic(
  () => import('./LanguageSwitcher').then((m) => m.LanguageSwitcher),
  { ssr: false, loading: () => <span className="inline-block h-7 w-10" /> },
);

interface MenuItem {
  title?: string;
  url?: string;
  children?: MenuItem[];
  [key: string]: unknown;
}

function normalizeItems(raw: Record<string, unknown>[]): MenuItem[] {
  return raw
    .map((r) => ({
      title: String(r.title ?? r.label ?? ''),
      url: String(r.url ?? r.href ?? '#'),
      children: Array.isArray(r.children) ? normalizeItems(r.children as any) : [],
    }))
    .filter((i) => i.title);
}

export function Header({
  menuItems,
  logoUrl,
  locale,
}: {
  menuItems: Record<string, unknown>[];
  logoUrl: string;
  locale: string;
}) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);
  const compactRef = useRef<HTMLDivElement>(null);
  const items = normalizeItems(menuItems);

  // Expanded header only on homepage (e.g. /tr, /en, /tr/, /en/)
  const isHome = /^\/[a-z]{2}\/?$/.test(pathname);
  const compactOnly = !isHome;

  const onScroll = useCallback(() => {
    if (!compactRef.current) return;
    if (compactOnly) {
      compactRef.current.style.transform = 'translateY(0)';
      return;
    }
    if (!expandedRef.current) return;
    const gone = expandedRef.current.getBoundingClientRect().bottom <= 0;
    compactRef.current.style.transform = gone ? 'translateY(0)' : 'translateY(-100%)';
  }, [compactOnly]);

  useEffect(() => {
    onScroll();
    if (compactOnly) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll, compactOnly]);

  return (
    <div>
      {/* ══════════════════════════════════════════
          EXPANDED  —  sayfa tepesi, normal akışta (sticky değil)
      ══════════════════════════════════════════ */}
      {!compactOnly && (
      <header ref={expandedRef} style={{ background: 'var(--color-bg)' }}>

        {/* Row 1: utility | logo | simetri */}
        <div>
          {/* Desktop */}
          <style>{`@media(min-width:1024px){.hdr-desktop-row{display:grid !important}}`}</style>
          <div
            className="hdr-desktop-row px-8"
            style={{ display: 'none', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start', paddingTop: 16, paddingBottom: 16, maxWidth: 1440, margin: '0 auto' }}
          >
            <div className="flex items-center gap-3" style={{ paddingTop: 4 }}>
              <ThemeToggle />
              <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
              <LanguageSwitcher locale={locale} />
            </div>

            <Link href={localizedPath(locale, '/')} className="flex flex-col items-center" style={{ gap: 8 }}>
              <Image
                src="/logo-dark.svg"
                alt="Vista İnşaat"
                width={80}
                height={80}
                style={{ height: 80, width: 'auto' }}
                priority
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-secondary)',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  whiteSpace: 'nowrap' as const,
                }}
              >
                Türkiye&apos;nin lider inşaat firması
              </span>
            </Link>

            <div className="flex items-center justify-end gap-4" style={{ paddingTop: 4 }}>
              <Link
                href={localizedPath(locale, '/login')}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  transition: 'color 0.15s',
                }}
              >
                {t('login')}
              </Link>
              <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
              <Link
                href={localizedPath(locale, '/register')}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--color-text-on-dark)',
                  background: 'var(--color-accent)',
                  padding: '8px 20px',
                  borderRadius: 4,
                  transition: 'opacity 0.15s',
                }}
              >
                {t('register')}
              </Link>
              <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ padding: 6, color: 'var(--color-text-primary)' }}
                aria-label="Menü"
              >
                {mobileOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
              </button>
            </div>
          </div>

          {/* Mobil */}
          <style>{`@media(min-width:1024px){.hdr-mobile-row{display:none !important}}`}</style>
          <div className="hdr-mobile-row flex h-14 items-center justify-between px-4">
            <Link href={localizedPath(locale, '/')} className="flex items-center gap-2">
              <Image
                src="/logo-dark.svg"
                alt="Vista İnşaat"
                width={32}
                height={32}
                style={{ height: 32, width: 'auto' }}
                priority
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-primary)',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  whiteSpace: 'nowrap' as const,
                }}
              >
                Vista İnşaat
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher locale={locale} />
              <button
                type="button"
                className="rounded-md p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menü"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: nav */}
        <style>{`@media(max-width:1023px){.hdr-nav-row{display:none !important}}`}</style>
        <nav className="hdr-nav-row" aria-label="Ana navigasyon">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-8">
            {items.map((item) => (
              <div key={item.url} className="group relative flex items-center">
                <Link
                  href={item.url!}
                  style={{
                    padding: '18px 24px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    transition: 'color 0.15s',
                  }}
                  className="hover:text-(--color-brand)"
                >
                  {item.title}
                </Link>
                {(item.children?.length ?? 0) > 0 && (
                  <div
                    className="invisible absolute left-0 top-full z-20 w-52 rounded-lg p-2 shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100"
                    style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
                  >
                    {item.children!.map((child) => (
                      <Link
                        key={child.url}
                        href={child.url!}
                        className="block rounded-md px-3 py-2 text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Row 3: arama */}
        <div className="hdr-nav-row" style={{ padding: '14px 32px' }}>
          <div className="mx-auto" style={{ maxWidth: 640 }}>
            <div
              className="flex items-center gap-3"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-secondary)',
                borderRadius: 2,
                padding: '10px 16px',
              }}
            >
              <Search style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--color-text-muted)' }} />
              <input
                type="search"
                placeholder="Vista İnşaat'ta Ara"
                className="w-full bg-transparent outline-none"
                style={{ color: 'var(--color-text-primary)', fontSize: 14 }}
              />
            </div>
          </div>
        </div>

        {/* Mobil nav açılır menü */}
        {mobileOpen && (
          <nav style={{ background: 'var(--color-bg)', padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
              {items.map((item) => (
                <div key={item.url}>
                  <Link
                    href={item.url!}
                    className="block rounded-md px-3 py-2.5 text-sm font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.url}
                      href={child.url!}
                      className="block rounded-md px-6 py-2 text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </nav>
        )}
      </header>
      )}

      {/* ══════════════════════════════════════════
          COMPACT  —  expanded kaybolunca fixed olarak kayarak gelir
      ══════════════════════════════════════════ */}
      <div
        ref={compactRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
          transform: compactOnly ? 'translateY(0)' : 'translateY(-100%)',
          transition: compactOnly ? 'none' : 'transform 0.25s ease',
        }}
      >
        {/* Desktop compact */}
        <style>{`@media(min-width:1024px){.hdr-compact-desktop{display:grid !important}}`}</style>
        <div
          className="hdr-compact-desktop mx-auto max-w-7xl items-center px-8 py-2"
          style={{ display: 'none', gridTemplateColumns: 'auto auto 1fr auto', gap: 16 }}
        >
          <Link href={localizedPath(locale, '/')} className="flex items-center gap-2">
            <Image
              src="/logo-dark.svg"
              alt="Vista İnşaat"
              width={26}
              height={26}
              style={{ height: 26, width: 'auto' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text-primary)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                whiteSpace: 'nowrap' as const,
              }}
            >
              Vista İnşaat
            </span>
          </Link>

          {/* Search */}
          <div
            className="flex items-center gap-2"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-secondary)',
              borderRadius: 2,
              padding: '6px 12px',
              minWidth: 200,
              maxWidth: 320,
            }}
          >
            <Search style={{ width: 14, height: 14, flexShrink: 0, color: 'var(--color-text-muted)' }} />
            <input
              type="search"
              placeholder="Ara"
              className="w-full bg-transparent outline-none"
              style={{ color: 'var(--color-text-primary)', fontSize: 13 }}
            />
          </div>

          <nav className="flex items-center justify-center" aria-label="Compact navigasyon">
            {items.map((item) => (
              <Link
                key={item.url}
                href={item.url!}
                style={{
                  padding: '8px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  transition: 'color 0.15s',
                }}
                className="hover:text-(--color-brand)"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Link
              href={localizedPath(locale, '/login')}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                transition: 'color 0.15s',
              }}
            >
              {t('login')}
            </Link>
            <Link
              href={localizedPath(locale, '/register')}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-text-on-dark)',
                background: 'var(--color-accent)',
                padding: '6px 16px',
                borderRadius: 4,
                transition: 'opacity 0.15s',
              }}
            >
              {t('register')}
            </Link>
            <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ padding: 4, color: 'var(--color-text-primary)' }}
              aria-label="Menü"
            >
              {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>
          </div>
        </div>

        {/* Mobil compact */}
        <style>{`@media(min-width:1024px){.hdr-compact-mobile{display:none !important}}`}</style>
        <div className="hdr-compact-mobile flex h-12 items-center justify-between px-4">
          <Link href={localizedPath(locale, '/')} className="flex items-center gap-2">
            <Image src="/logo-dark.svg" alt="Vista İnşaat" width={24} height={24}
              style={{ height: 24, width: 'auto' }} />
            <span style={{
              fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const,
            }}>Vista İnşaat</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
            <button type="button" className="rounded-md p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menü">
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed compact header on non-home pages */}
      {compactOnly && <div style={{ height: 48 }} className="lg:!h-[44px]" />}
    </div>
  );
}
