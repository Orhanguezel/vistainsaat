'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, LogOut, User } from 'lucide-react';
import { localizedPath } from '@/seo';
import { fetchCurrentUser, logout, type AuthUser } from '@/lib/auth';

const ThemeToggle = dynamic(
  () => import('@/components/theme/ThemeToggle').then((m) => m.ThemeToggle),
  { ssr: false, loading: () => <span className="inline-block h-7 w-7" /> },
);
const LanguageSwitcher = dynamic<{ locale: string; activeLocales?: { code: string; label: string }[] }>(
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

/* ── Mega menu column data ── */
function getMegaColumns(
  locale: string,
  companyName: string,
  t: any,
  categories: any[] = [],
  services: any[] = [],
  news: any[] = []
) {
  const l = (path: string) => localizedPath(locale, path);
  return [
    {
      title: companyName,
      links: [
        { label: t('projects'), url: l('/projeler'), bold: true },
        { label: t('services'), url: l('/hizmetler'), bold: true },
        { label: t('blog'), url: l('/haberler'), bold: true },
        { label: t('gallery'), url: l('/galeri'), bold: true },
        { label: t('about'), url: l('/hakkimizda'), bold: true },
        { label: t('contact'), url: l('/iletisim'), bold: true },
        { label: t('offer'), url: l('/teklif'), bold: true },
      ],
    },
    {
      title: t('projects'),
      links: categories.length > 0 
        ? categories.map(c => ({ label: c.title, url: l(`/projeler?category=${c.slug}`) }))
        : [
            { label: t('residential'), url: l('/projeler') },
            { label: t('commercial'), url: l('/projeler') },
            { label: t('mixed'), url: l('/projeler') },
            { label: t('restoration'), url: l('/projeler') },
          ],
    },
    {
      title: t('services'),
      links: services.length > 0
        ? services.map(s => ({ label: s.title, url: l(`/hizmetler/${s.slug}`) }))
        : [
            { label: t('construction'), url: l('/hizmetler') },
            { label: t('project_management'), url: l('/hizmetler') },
            { label: t('architectural_design'), url: l('/hizmetler') },
            { label: t('interior_design'), url: l('/hizmetler') },
          ],
    },
    {
      title: t('blog'),
      links: news.map(n => ({ label: n.title, url: l(`/haberler/${n.slug}`) })),
    },
    {
      title: t('corporate'),
      links: [
        { label: t('about'), url: l('/hakkimizda') },
        { label: t('vision'), url: l('/hakkimizda') },
        { label: t('team'), url: l('/hakkimizda') },
        { label: t('career'), url: l('/iletisim') },
      ],
    },
  ];
}

export function Header({
  menuItems,
  logoUrl,
  locale,
  activeLocales,
  companyProfile,
  categories = [],
  services = [],
  news = [],
}: {
  menuItems: Record<string, unknown>[];
  logoUrl: string;
  locale: string;
  activeLocales?: { code: string; label: string }[];
  companyProfile?: Record<string, string>;
  categories?: Record<string, unknown>[];
  services?: Record<string, unknown>[];
  news?: Record<string, unknown>[];
}) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const fT = useTranslations('footer');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const compactRef = useRef<HTMLDivElement>(null);
  const items = normalizeItems(menuItems);

  const isHome = /^\/[a-z]{2}\/?$/.test(pathname);
  const compactOnly = !isHome;
  // Fetch auth user
  useEffect(() => {
    fetchCurrentUser().then(setUser);
  }, [pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [profileOpen]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setProfileOpen(false);
    window.location.href = localizedPath(locale, '/');
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

  const companyName = companyProfile?.company_name || 'Vista İnşaat';
  const megaColumns = getMegaColumns(locale, companyName, t, categories, services, news);

  return (
    <div>
      {/* ══════════════════════════════════════════
          EXPANDED — homepage top (not sticky)
      ══════════════════════════════════════════ */}
      {!compactOnly && (
      <header ref={expandedRef} style={{ background: 'var(--color-bg)' }}>
        {/* Row 1: utility | logo | actions */}
        <div>
          <style>{`@media(min-width:1024px){.hdr-desktop-row{display:grid !important}}`}</style>
          <div
            className="hdr-desktop-row mx-auto max-w-7xl px-8"
            style={{ display: 'none', gridTemplateColumns: '1fr auto 1fr', alignItems: 'start', paddingTop: 16, paddingBottom: 16 }}
          >
            <div className="flex items-center gap-3" style={{ paddingTop: 4 }}>
              <ThemeToggle />
              <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
              <LanguageSwitcher locale={locale} activeLocales={activeLocales} />
            </div>

            <Link href={localizedPath(locale, '/')} className="flex flex-col items-center" style={{ gap: 8 }}>
              <Image
                src="/logo-dark.svg"
                alt={companyName}
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
                {t('tagline')}
              </span>
            </Link>

            <div className="flex items-center justify-end gap-4" style={{ paddingTop: 4 }}>
              {user ? (
                <div ref={profileRef} style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '6px 12px', borderRadius: 4,
                      border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                      cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--color-brand)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {(user.full_name || user.email).charAt(0).toUpperCase()}
                    </span>
                    {user.full_name || user.email.split('@')[0]}
                  </button>
                  {profileOpen && (
                    <div style={{
                      position: 'absolute', top: '100%', right: 0, marginTop: 6,
                      minWidth: 200, background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)', borderRadius: 6,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 60,
                      padding: '8px 0',
                    }}>
                      <div style={{ padding: '8px 16px', fontSize: 12, color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', marginBottom: 4 }}>
                        {user.email}
                      </div>
                      <Link
                        href={localizedPath(locale, '/profil')}
                        onClick={() => setProfileOpen(false)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 16px', fontSize: 13, color: 'var(--color-text-primary)',
                          textDecoration: 'none',
                        }}
                      >
                        <User style={{ width: 14, height: 14 }} />
                        {t('profile')}
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 16px', border: 'none', background: 'none',
                          cursor: 'pointer', fontSize: 13, color: 'var(--color-text-primary)',
                          textAlign: 'left',
                        }}
                      >
                        <LogOut style={{ width: 14, height: 14 }} />
                        {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href={localizedPath(locale, '/login')}
                    style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'color 0.15s' }}
                  >
                    {t('login')}
                  </Link>
                  <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
                  <Link
                    href={localizedPath(locale, '/register')}
                    style={{
                      fontSize: 13, fontWeight: 700, color: 'var(--color-text-on-dark)',
                      background: 'var(--color-accent)', padding: '8px 20px', borderRadius: 4,
                      transition: 'opacity 0.15s',
                    }}
                  >
                    {t('register')}
                  </Link>
                </>
              )}
              <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ padding: 6, color: 'var(--color-text-primary)' }}
                aria-label="Menü"
              >
                {menuOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
              </button>
            </div>
          </div>

          {/* Mobile */}
          <style>{`@media(min-width:1024px){.hdr-mobile-row{display:none !important}}`}</style>
          <div className="hdr-mobile-row flex h-14 items-center justify-between px-4">
            <Link href={localizedPath(locale, '/')} className="flex items-center gap-2">
              <Image src="/logo-dark.svg" alt={companyName} width={32} height={32}
                style={{ height: 32, width: 'auto' }} priority />
              <span style={{
                fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)',
                fontSize: 14, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const,
              }}>{companyName}</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher locale={locale} activeLocales={activeLocales} />
              <button type="button" className="rounded-md p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: nav (desktop inline) */}
        <style>{`@media(max-width:1023px){.hdr-nav-row{display:none !important}}`}</style>
        <nav className="hdr-nav-row" aria-label="Ana navigasyon">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-8">
            {items.map((item) => (
              <div key={item.url} className="group relative flex items-center">
                <Link
                  href={item.url!}
                  style={{ padding: '18px 24px', fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', transition: 'color 0.15s' }}
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
                      <Link key={child.url} href={child.url!} className="block rounded-md px-3 py-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Row 3: search */}
        <div className="hdr-nav-row" style={{ padding: '14px 32px' }}>
          <div className="mx-auto" style={{ maxWidth: 640 }}>
            <div className="flex items-center gap-3" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', borderRadius: 2, padding: '10px 16px' }}>
              <Search style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--color-text-muted)' }} />
              <input type="search" placeholder={tc('searchIn', { company: companyName })}
                className="w-full bg-transparent outline-none" style={{ color: 'var(--color-text-primary)', fontSize: 14 }} />
            </div>
          </div>
        </div>
      </header>
      )}

      {/* ══════════════════════════════════════════
          COMPACT — fixed header when scrolled / non-home
      ══════════════════════════════════════════ */}
      <div
        ref={compactRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)',
          transform: compactOnly ? 'translateY(0)' : 'translateY(-100%)',
          transition: compactOnly ? 'none' : 'transform 0.25s ease',
        }}
      >
        <style>{`@media(min-width:1024px){.hdr-compact-desktop{display:grid !important}}`}</style>
        <div
          className="hdr-compact-desktop mx-auto max-w-7xl items-center px-8 py-2"
          style={{ display: 'none', gridTemplateColumns: 'auto auto 1fr auto', gap: 16 }}
        >
          <Link href={localizedPath(locale, '/')} className="flex items-center gap-2">
            <Image src="/logo-dark.svg" alt={companyName} width={26} height={26} style={{ height: 26, width: 'auto' }} />
            <span style={{
              fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const,
            }}>{companyName}</span>
          </Link>

          <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)', borderRadius: 2, padding: '6px 12px', minWidth: 200, maxWidth: 320 }}>
            <Search style={{ width: 14, height: 14, flexShrink: 0, color: 'var(--color-text-muted)' }} />
            <input type="search" placeholder={tc('search')} className="w-full bg-transparent outline-none" style={{ color: 'var(--color-text-primary)', fontSize: 13 }} />
          </div>

          <nav className="flex items-center justify-center" aria-label="Compact navigasyon">
            {items.map((item) => (
              <Link key={item.url} href={item.url!}
                style={{ padding: '8px 14px', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'color 0.15s' }}
                className="hover:text-(--color-brand)"
              >{item.title}</Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            {user ? (
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'var(--color-brand)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer',
                }}
              >
                {(user.full_name || user.email).charAt(0).toUpperCase()}
              </button>
            ) : (
              <>
                <Link href={localizedPath(locale, '/login')} style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', transition: 'color 0.15s' }}>
                  {t('login')}
                </Link>
                <Link href={localizedPath(locale, '/register')} style={{
                  fontSize: 12, fontWeight: 700, color: 'var(--color-text-on-dark)',
                  background: 'var(--color-accent)', padding: '6px 16px', borderRadius: 4, transition: 'opacity 0.15s',
                }}>{t('register')}</Link>
              </>
            )}
            <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} style={{ padding: 4, color: 'var(--color-text-primary)' }} aria-label="Menü">
              {menuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>
          </div>
        </div>

        {/* Mobile compact */}
        <style>{`@media(min-width:1024px){.hdr-compact-mobile{display:none !important}}`}</style>
        <div className="hdr-compact-mobile flex h-12 items-center justify-between px-4">
          <Link href={localizedPath(locale, '/')} className="flex items-center gap-2">
            <Image src="/logo-dark.svg" alt={companyName} width={24} height={24} style={{ height: 24, width: 'auto' }} />
            <span style={{
              fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const,
            }}>{companyName}</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} activeLocales={activeLocales} />
            <button type="button" className="rounded-md p-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed compact header on non-home pages */}
      {compactOnly && <div style={{ height: 48 }} className="lg:h-[44px]!" />}

      {/* ══════════════════════════════════════════
          FULLSCREEN MEGA MENU OVERLAY
      ══════════════════════════════════════════ */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--color-bg)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Top bar ── */}
          <div style={{ borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
              <div className="flex items-center gap-5">
                <ThemeToggle />
                <LanguageSwitcher locale={locale} activeLocales={activeLocales} />
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'var(--color-brand)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700,
                      }}>
                        {(user.full_name || user.email).charAt(0).toUpperCase()}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {user.full_name || user.email.split('@')[0]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setMenuOpen(false); handleLogout(); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)',
                        background: 'none', border: 'none', cursor: 'pointer',
                      }}
                    >
                      <LogOut style={{ width: 14, height: 14 }} />
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={localizedPath(locale, '/login')}
                      onClick={() => setMenuOpen(false)}
                      style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href={localizedPath(locale, '/register')}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontSize: 13, fontWeight: 700, color: 'var(--color-text-on-dark)',
                        background: 'var(--color-accent)', padding: '8px 20px', borderRadius: 4,
                      }}
                    >
                      {t('register')}
                    </Link>
                  </>
                )}
                <span style={{ width: 1, height: 16, background: 'var(--color-border)' }} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  style={{ padding: 6, color: 'var(--color-text-primary)' }}
                  aria-label={tc('closeMenu')}
                >
                  <X style={{ width: 22, height: 22 }} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Multi-column content ── */}
          <div style={{ flex: 1, padding: '48px 0' }}>
            {/* Desktop: 5 columns */}
            <style>{`
              @media(min-width:1024px){.mega-grid{display:grid !important;grid-template-columns:repeat(5,1fr);gap:40px}}
              @media(max-width:1023px){.mega-grid{display:flex !important;flex-direction:column;gap:32px}}
            `}</style>
            <div className="mega-grid mx-auto max-w-7xl px-6" style={{ display: 'none' }}>
              {megaColumns.map((col) => (
                <div key={col.title}>
                  <h3 style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: 20,
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '0.02em',
                  }}>
                    {col.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {col.links.map((link, i) => (
                      <Link
                        key={`${link.label}-${i}`}
                        href={link.url}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          fontSize: 14,
                          fontWeight: ('bold' in link && link.bold) ? 600 : 400,
                          color: 'var(--color-text-secondary)',
                          padding: '5px 0',
                          transition: 'color 0.15s',
                          textDecoration: 'none',
                        }}
                        className="hover:text-(--color-brand)"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer bar ── */}
          <div style={{ borderTop: '1px solid var(--color-border)', flexShrink: 0, padding: '20px 0' }}>
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6">
              <div className="flex flex-wrap items-center gap-5">
                <Link href={localizedPath(locale, '/hakkimizda')} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>
                  {t('about')}
                </Link>
                <Link href={localizedPath(locale, '/iletisim')} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>
                  {t('contact')}
                </Link>
                <Link href={localizedPath(locale, '/legal/privacy')} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>
                  {fT('privacy')}
                </Link>
                <Link href={localizedPath(locale, '/legal/terms')} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>
                  {fT('terms')}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/logo-dark.svg" alt={companyName} width={20} height={20} style={{ height: 20, width: 'auto', opacity: 0.5 }} />
                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                  © {new Date().getFullYear()} {companyName}. {fT('rights')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
