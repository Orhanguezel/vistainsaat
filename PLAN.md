# Vista İnşaat — Master Uygulama Planı

> **Bu doküman projenin temel dayanağıdır.**
> Her tamamlanan adım `- [x]` ile işaretlenir.
> Tüm kararlar, kural değişiklikleri ve teknik seçimler buraya yansıtılır.

---

## Proje Kimliği

| Özellik                | Değer                                                      |
| ----------------------- | ----------------------------------------------------------- |
| **Firma**         | Vista İnşaat                                              |
| **Domain**        | https://www.vistainsaat.com                                 |
| **İlham**        | ArchDaily.com — editorial, proje-fotoğraf dominant        |
| **Renk Paleti**   | Altın `#b8a98a`, Beyaz `#ffffff`, Antrasit `#1e1c1a` |
| **Tipografi**     | Syne (başlık) + DM Sans (body)                            |
| **Dark mode**     | İlk günden — token sistemi                               |
| **Dil**           | TR + EN                                                     |
| **Frontend Port** | 3030                                                        |
| **Backend Port**  | 8086                                                        |
| **Admin Port**    | 3004                                                        |

---

## Dizin Yapısı

```
vistainsaat/
  frontend/      ← karbonkompozit kopyası (adapte edildi)
  backend/       ← kompozit_backend kopyası (adapte edilecek)
  admin_panel/   ← kompozit_admin_panel kopyası (adapte edilecek)
  karbonkompozit/     ← referans (dokunma)
  kompozit_backend/   ← referans (dokunma)
  kompozit_admin_panel/ ← referans (dokunma)
```

---

## Faz 0 — Altyapı Hazırlığı

- [X] `karbonkompozit` → `frontend/` kopyalandı (node_modules hariç)
- [X] `kompozit_backend` → `backend/` kopyalandı (node_modules hariç)
- [X] `kompozit_admin_panel` → `admin_panel/` kopyalandı (node_modules hariç)
- [X] `frontend/` içinde `bun install` çalıştırıldı
- [X] `backend/` içinde `bun install` çalıştırıldı
- [X] `admin_panel/` içinde `npm install` çalıştırıldı
- [X] `.env` dosyaları oluşturuldu (backend + frontend)

---

## Faz 1 — Backend Adaptasyonu

### 1.1 Paket & Namespace Rename

- [X] `backend/package.json` → `name: vistainsaat-backend`
- [X] `backend/src/core/env.ts` → tüm `ensotek`/`kompozit` prefix'leri güncellendi
- [X] Tüm dosyalarda global rename:
  - `ensotek-backend` → `vistainsaat-backend`
  - `MOE Kompozit` → `Vista İnşaat`

### 1.2 Module Key Güncellemeleri

Tüm `src/modules/*/` içinde `module_key` değerleri:

| Alan                 | Eski Değer                  | Yeni Değer                     |
| -------------------- | ---------------------------- | ------------------------------- |
| site_settings prefix | `kompozit__`               | `vistainsaat__`               |
| gallery              | `module_key=kompozit`      | `module_key=vistainsaat`      |
| blog/library         | `module_key=kompozit_blog` | `module_key=vistainsaat_blog` |
| products/services    | `item_type=kompozit`       | `item_type=vistainsaat`       |
| categories           | `module_key=kompozit`      | `module_key=vistainsaat`      |

- [X] `backend/src/modules/gallery/` — module_key güncellendi
- [X] `backend/src/modules/services/` — module_key güncellendi
- [X] `backend/src/modules/projects/` — module_key güncellendi
- [X] `backend/src/modules/references/` — module_key güncellendi
- [X] `backend/src/modules/faqs/` — module_key güncellendi
- [X] `backend/src/modules/siteSettings/` — prefix güncellendi
- [X] `backend/src/modules/library/` (blog) — module_key güncellendi

### 1.3 Vista İnşaat Seed Verisi

**Dosya:** `backend/src/db/seed/index.ts`

- [X] Şirket site_settings seed yazıldı:
  - Şirket adı: `Vista İnşaat`
  - Slogan: (belirlenecek)
  - Adres, telefon, email
  - Logo path
- [X] Örnek hizmetler eklendi: Konut, Ticari, Karma Kullanım, Restorasyon, Proje Yönetimi
- [X] Örnek proje kategorileri eklendi
- [X] `bun run seed` başarıyla çalıştı (veriler zaten mevcut)

### 1.4 API Doğrulama

- [X] `bun dev` çalıştı, port 8086'da ayakta
- [X] `GET /api/services` → 200 + 6 Vista hizmetleri
- [X] `GET /api/products?item_type=vistainsaat` → 200 + 5 Vista projeleri
- [X] `GET /api/site_settings/socials` → 200

---

## Faz 2 — Frontend Adaptasyonu

### 2.1 Paket & Config Rename

- [X] `frontend/package.json` → `name: vistainsaat-frontend`, dev port `3030`
- [X] `frontend/project.portfolio.json` → Vista İnşaat metadata
- [X] `frontend/ecosystem.config.cjs` → app name + port 3030
- [X] `frontend/next.config.ts` → domain whitelist vistainsaat.com

### 2.2 Global String Rename (frontend/)

| Eski                                  | Yeni                            |
| ------------------------------------- | ------------------------------- |
| `karbonkompozit`                    | `vistainsaat`                 |
| `MOE Kompozit`                      | `Vista İnşaat`              |
| `moe-carbon-industrial`             | `vista-construction`          |
| `https://www.karbonkompozit.com.tr` | `https://www.vistainsaat.com` |
| `3020` (port ref)                   | `3030`                        |

- [X] `frontend/src/lib/utils.ts` → `SITE_URL`, `API_BASE_URL`
- [X] `frontend/src/theme/templates.ts` → `vista-construction`, `premium-editorial-neutral-gold`
- [X] `frontend/src/seo/helpers.ts` → canonical domain
- [X] `frontend/src/lib/content-fallbacks.ts` → Vista İnşaat fallback içeriği
- [X] `frontend/src/lib/navigation-fallback.ts` → Vista nav linkleri

### 2.3 Tema — Altın/Beyaz/Antrasit Paleti

**Dosya:** `frontend/src/styles/globals.css`

#### Primitive Tokenlar

```css
/* Altın/Şampanya */
--gold-300: #e8dcc8
--gold-400: #d4c4a0
--gold-500: #b8a98a   ← Ana marka
--gold-600: #9e8f6f
--gold-700: #8b7962
--gold-800: #6b5d48

/* Antrasit */
--anthracite-50:  #f5f5f4
--anthracite-100: #e8e7e5
--anthracite-200: #d4d2ce
--anthracite-400: #8e8b87
--anthracite-500: #6b6864
--anthracite-600: #4e4b47
--anthracite-800: #2e2c29
--anthracite-900: #1e1c1a
--anthracite-950: #141311
```

#### Semantic Tokenlar

```css
/* Light Mode */
html[data-theme-mode="light"] {
  --color-bg:             #ffffff
  --color-bg-secondary:   #f8f7f5
  --color-bg-muted:       #f0ede8
  --color-bg-dark:        var(--anthracite-900)
  --color-text-primary:   var(--anthracite-900)
  --color-text-secondary: var(--anthracite-600)
  --color-text-muted:     var(--anthracite-400)
  --color-text-on-dark:   #ffffff
  --color-border:         var(--anthracite-200)
  --color-border-strong:  var(--anthracite-400)
  --color-brand:          var(--gold-500)
  --color-brand-light:    var(--gold-300)
  --color-brand-dark:     var(--gold-700)
  --color-accent:         var(--anthracite-800)
}

/* Dark Mode */
html[data-theme-mode="dark"] {
  --color-bg:             var(--anthracite-950)
  --color-bg-secondary:   var(--anthracite-900)
  --color-bg-muted:       var(--anthracite-800)
  --color-bg-dark:        #000000
  --color-text-primary:   var(--anthracite-50)
  --color-text-secondary: var(--anthracite-200)
  --color-text-muted:     var(--anthracite-500)
  --color-text-on-dark:   #ffffff
  --color-border:         var(--anthracite-800)
  --color-border-strong:  var(--anthracite-600)
  --color-brand:          var(--gold-400)
  --color-brand-light:    var(--gold-300)
  --color-brand-dark:     var(--gold-600)
  --color-accent:         var(--gold-500)
}
```

- [X] Primitive tokenlar globals.css'e yazıldı
- [X] Semantic light mode tokenlar yazıldı
- [X] Semantic dark mode tokenlar yazıldı
- [X] Eski carbon/orange token'lar kaldırıldı
- [X] `npm run test:theme` — smoke test geçiyor

### 2.4 Tipografi

**Dosya:** `frontend/src/styles/globals.css` veya `layout.tsx`

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

--font-heading: 'Syne', sans-serif;
--font-body: 'DM Sans', sans-serif;

/* Heading kuralları (prime-frontend standardı) */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  text-wrap: balance;
}
body {
  font-family: var(--font-body);
  max-width: 65ch;  /* sadece body metinler için */
  line-height: 1.6;
}
```

- [X] Syne + DM Sans Google Fonts import edildi
- [X] `--font-heading`, `--font-body` token'ları tanımlandı
- [X] Heading letter-spacing ve text-wrap uygulandı
- [X] Font local'de doğrulandı (network tabında Syne yükleniyor)

### 2.5 i18n — Vista İnşaat Metinleri

**Dosyalar:** `frontend/public/locales/tr.json`, `frontend/public/locales/en.json`

#### TR Anahtar Değişiklikleri

```json
{
  "common": {
    "companyName": "Vista İnşaat",
    "tagline": "...",
    "cta": "Teklif Al"
  },
  "nav": {
    "projects": "Projeler",
    "services": "Hizmetler",
    "about": "Hakkımızda",
    "contact": "İletişim",
    "offer": "Teklif Al"
  },
  "home": { ... },
  "projects": { ... },
  "services": { ... },
  "about": { ... },
  "contact": { ... }
}
```

- [X] `tr.json` — şirket adı, slogan, nav linkleri güncellendi
- [X] `tr.json` — sayfa başlıkları ve açıklamaları Vista için yazıldı
- [X] `en.json` — TR ile paralel güncellendi
- [X] `frontend/src/lib/content-fallbacks.ts` — Vista fallback içeriği

### 2.6 Sayfa Geliştirme

#### Anasayfa (`frontend/src/app/[locale]/page.tsx`)

**Bölümler (yukarıdan aşağı):**

1. **Hero** — Full-bleed proje fotoğrafı, Syne büyük başlık, antrasit gradient overlay, altın CTA butonu
2. **Öne Çıkan Projeler** — Asimetrik 2+1 grid (sol büyük featured kart + sağda 2 küçük kart)
3. **Hizmetler Preview** — 2 kolon, ince separator, icon + başlık + özet + link
4. **İstatistikler** — Koyu antrasit bg, büyük sayılar (proje sayısı, yıl, şehir)
5. **Referanslar** — Müşteri/iş ortağı logo grid (greyscale, hover renkli)
6. **İletişim CTA** — Koyu panel, altın buton, kısa metin

- [X] Hero bölümü oluşturuldu (full-bleed fotoğraf + overlay + başlık)
- [X] Asimetrik projeler grid bölümü oluşturuldu
- [X] Hizmetler preview bölümü oluşturuldu
- [X] İstatistikler (sayaç) bölümü oluşturuldu
- [X] Referanslar logo grid bölümü oluşturuldu
- [X] İletişim CTA panel bölümü oluşturuldu
- [X] Anasayfa `generateMetadata` — Organization + LocalBusiness JSON-LD
- [X] Anasayfa mock data ile çalışıyor (API olmadan)
- [X] Anasayfa API ile bağlandı

#### Projeler Listesi (`frontend/src/app/[locale]/projeler/page.tsx`)

- [X] URL: `/projeler` (eski `/products` yolu güncellendi)
- [X] Filtreleme: Tip chip'leri (Konut / Ticari / Karma / Restorasyon)
- [X] Editorial grid: İlk kart büyük (featured), geri kalanlar standart
- [X] Kart: Fotoğraf dominant, hover overlay (ad + tip + yıl)
- [X] `noIndex: true` filtre aktifken
- [X] `generateMetadata` — CollectionPage JSON-LD
- [X] API bağlantısı: `GET /api/projects?module_key=vistainsaat`

#### Proje Detay (`frontend/src/app/[locale]/projeler/[slug]/page.tsx`)

- [X] URL: `/projeler/[slug]`
- [X] Hero: Full-screen fotoğraf (100vh)
- [X] İki kolon layout: Sol %60 galeri, Sağ %40 proje bilgileri
- [X] Proje meta: Yıl, Lokasyon, Alan (m²), Tip, Durum
- [X] Fotoğraf galerisi: Scroll-trigger animasyonlu (Reveal component ile)
- [X] Breadcrumb: Vista İnşaat → Projeler → [Proje Adı]
- [X] JSON-LD: `CreativeWork` + `BreadcrumbList`
- [X] İlgili projeler bölümü (alt kısım)
- [X] API bağlantısı: `GET /api/projects/by-slug/[slug]`

#### Hizmetler (`frontend/src/app/[locale]/hizmetler/page.tsx`)

- [X] URL: `/hizmetler`
- [X] Liste layout: Her hizmet için ince separator, icon, başlık, özet, link
- [X] `generateMetadata` — CollectionPage JSON-LD
- [X] API bağlantısı: `GET /api/services?module_key=vistainsaat`

#### Hizmet Detay (`frontend/src/app/[locale]/hizmetler/[slug]/page.tsx`)

- [X] URL: `/hizmetler/[slug]`
- [X] Breadcrumb: Vista İnşaat → Hizmetler → [Hizmet Adı]
- [X] JSON-LD: `Service` + `BreadcrumbList`
- [X] İlgili projeler bölümü (sidebar'da thumbnail + link)

#### Hakkımızda (`frontend/src/app/[locale]/hakkimizda/page.tsx`)

- [X] URL: `/hakkimizda`
- [X] Şirket hikayesi + değerler + misyon
- [ ] Ekip bölümü (opsiyonel, data varsa)
- [X] JSON-LD: `Organization` + `LocalBusiness`

#### İletişim (`frontend/src/app/[locale]/iletisim/page.tsx`)

- [X] URL: `/iletisim`
- [X] Teklif/iletişim formu (react-hook-form + zod)
- [X] Adres + telefon + email bilgileri
- [X] Google Maps embed (.env.local NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL eklendi)
- [X] JSON-LD: `LocalBusiness` (adres, telefon, çalışma saati)

### 2.7 Navigasyon & Layout

**Header** (`frontend/src/components/layout/Header.tsx`):

- [X] Logo: Vista İnşaat (logotype veya SVG)
- [X] Nav: Projeler, Hizmetler, Hakkımızda, İletişim
- [X] CTA butonu: "Teklif Al" (altın)
- [X] Dil değiştirici: TR / EN
- [X] Mobile hamburger menü

**Footer** (`frontend/src/components/layout/Footer.tsx`):

- [X] Vista İnşaat branding
- [X] Nav linkleri
- [X] İletişim bilgileri
- [X] Sosyal medya ikonları
- [X] Legal linkler

### 2.8 SEO Kontrat

**Her sayfada zorunlu:**

- [X] `generateMetadata()` — title, description, canonical
- [X] hreflang: `tr`, `en`, `x-default`
- [X] Open Graph: image, title, description, locale
- [X] Twitter Card: `summary_large_image`
- [X] `metadataBase`: `https://www.vistainsaat.com`

**JSON-LD Şemaları:**

- [X] Homepage: `Organization` + `LocalBusiness` (contractor, construction)
- [X] Projeler listesi: `CollectionPage`
- [X] Proje detay: `CreativeWork` + `BreadcrumbList`
- [X] Hizmetler listesi: `CollectionPage`
- [X] Hizmet detay: `Service` + `BreadcrumbList`
- [X] Hakkımızda: `Organization` + `LocalBusiness`
- [X] İletişim: `LocalBusiness` (adres, telefon, openingHours)

**Teknik SEO:**

- [X] `frontend/public/robots.txt` — vistainsaat.com sitemap işaret
- [X] `frontend/src/app/sitemap.ts` — dinamik sitemap (projeler + hizmetler slug'ları)
- [ ] `frontend/public/sitemap.xml` — statik fallback (opsiyonel)
- [X] 404 sayfası — özel tasarım
- [X] `npm run test:seo` — geçiyor
- [X] `npm run test:media` — geçiyor

### 2.9 Build & Test

- [X] `cd frontend && npm run build` — hata yok
- [X] `cd frontend && npm run type-check` — hata yok
- [X] `npm run test:theme` — raw hex, bg-white, dark: prefix yok
- [X] `npm run test:seo` — canonical, hreflang, robots, sitemap

---

## Faz 3 — Admin Panel Adaptasyonu

### 3.1 Paket & Config

- [X] `admin_panel/package.json` → `name: vistainsaat-admin`
- [X] Port 3004 korunuyor
- [X] Tüm `kompozit`/`MOE` string'leri güncellendi

### 3.2 Tema

**Dosya:** `admin_panel/src/app/globals.css`

```css
/* Vista İnşaat marka renkleri */
--logo-gold: #b8a98a;
--logo-gold-dark: #8b7962;
--logo-anthracite: #1e1c1a;
```

- [X] `--logo-coral` → `--logo-gold: #b8a98a` güncellendi
- [X] Brand accent renkleri antrasit tabanlı ayarlandı

### 3.3 Sidebar Modülleri

**Dosya:** `admin_panel/src/navigation/sidebar/sidebar-items.ts`

Vista için aktif admin modülleri:

- [X] Projeler → `/admin/projects`
- [X] Hizmetler → `/admin/services`
- [X] Referanslar → `/admin/references`
- [X] Galeri → `/admin/gallery`
- [X] Blog/Haberler → `/admin/library`
- [X] İletişim Mesajları → `/admin/contacts`
- [X] Site Ayarları → `/admin/site-settings`
- [X] Kullanıcılar → `/admin/users`

Pasif (kaldırılan veya gizlenen) modüller:

- Ürün kataloğu (construction firması için gereksiz)

### 3.4 i18n

**Dosyalar:** `admin_panel/src/locale/tr.json`, `en.json`

- [X] Şirket adı referansları Vista İnşaat olarak güncellendi
- [X] Modül adları Türkçeye uyarlandı (Projeler, Hizmetler, vb.)

### 3.5 Admin Build Test

- [X] `cd admin_panel && npm run build` — hata yok

---

## Faz 4 — Entegrasyon & Deployment

### 4.1 Frontend ↔ Backend API Bağlantısı

- [X] `.env.local` → `NEXT_PUBLIC_API_URL=http://127.0.0.1:8086/api`
- [X] Tüm API çağrıları `vistainsaat` module_key ile çalışıyor
- [X] Fallback içerik (API kapalıyken) görünüyor

### 4.2 Deployment Konfig

- [X] `frontend/nginx-vistainsaat.conf` yazıldı
- [X] `frontend/ecosystem.config.cjs` — app: vistainsaat-frontend, port: 3030
- [X] `backend/ecosystem.config.cjs` — app: vistainsaat-backend, port: 8086

### 4.3 SSL & Domain

- [ ] DNS: `www.vistainsaat.com` → sunucu IP
- [ ] Certbot: Let's Encrypt SSL sertifikası alındı
- [ ] nginx: SSL + HTTP→HTTPS redirect
- [ ] `www.` → canonical yönlendirmesi

### 4.4 PM2 Production

- [X] `pm2 start ecosystem.config.cjs` (frontend)
- [X] `pm2 start ecosystem.config.cjs` (backend)
- [ ] `pm2 save` + `pm2 startup`

---

## Faz 5 — İçerik & SEO Finalizasyonu

### 5.1 Gerçek İçerik Girişi (Admin Panel)

- [ ] Vista İnşaat site ayarları girildi (logo, slogan, adres, telefon)
- [ ] En az 5 proje girildi (fotoğraf + açıklama + meta)
- [ ] Tüm hizmetler girildi (açıklama + görseller)
- [ ] Referans logoları yüklendi
- [X] İletişim bilgileri güncellendi

### 5.2 SEO Audit (Canlıya Almadan Önce)

- [X] Tüm sayfalar canonical var (buildPageMetadata ile)
- [X] Tüm görseller alt text var (buildMediaAlt + anlamlı fallback)
- [X] H1 her sayfada tek ve anlamlı
- [X] Sayfa başlıkları unique (duplicate yok)
- [X] robots.txt doğru (API + admin engellenmiş, sitemap.xml işaret)
- [X] sitemap.xml — hizmet detay sayfaları eklendi
- [ ] sitemap.xml Google Search Console'a gönderildi
- [ ] `technical-seo-skill` ile tam site taraması (canlıya alındıktan sonra)

### 5.3 Performance

- [X] Görseller Next/Image ile optimize (OptimizedImage component)
- [X] Font display: swap (Syne + DM Sans)
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms (canlıda test)
- [ ] AVIF + WebP formatları aktif (Cloudinary/Next Image otomatik)
- [ ] `npm run audit:lighthouse` — Lighthouse skoru > 90 (canlıda test)

---

## Teknik Referanslar

### Renk Sistemi

```
Primitive → Semantic → Surface Utility → Component
  (gold-500)  (--color-brand)  (surface-brand-cta)  (btn-primary)
```

### Tema Kuralları (THEMA.md özeti)

- Component dark/light bilmez: `dark:bg-*` YASAK
- Yalnızca semantic token: `bg-[var(--color-bg)]`
- Dark section: `surface-dark-heading`, `surface-dark-text`, `surface-dark-panel`
- Theme toggle sadece `data-theme-mode` değiştirir

### SEO Kontrat

- Her sayfada `generateMetadata()` — `buildPageMetadata()` kullanılır
- Canonical: `https://www.vistainsaat.com/[locale]/[slug]`
- hreflang: `tr`, `en`, `x-default`
- JSON-LD: her sayfaya uygun şema
- Filtreli listing sayfaları `noIndex: true`

### API Endpoint Şablonu

```
GET /api/projects?module_key=vistainsaat&locale=tr&is_active=1
GET /api/projects/by-slug/[slug]?locale=tr
GET /api/services?module_key=vistainsaat&locale=tr
GET /api/site_settings/[key]?prefix=vistainsaat__
```

### Dosya Konumları (Kritik)

| Dosya                                                   | Amaç                    |
| ------------------------------------------------------- | ------------------------ |
| `frontend/src/styles/globals.css`                     | Renk token'ları         |
| `frontend/src/theme/templates.ts`                     | Template adı            |
| `frontend/src/lib/utils.ts`                           | SITE_URL, API_BASE_URL   |
| <br />`frontend/src/seo/helpers.ts`                   | buildPageMetadata()      |
| `frontend/src/seo/jsonld.ts`                          | JSON-LD builder'ları    |
| `frontend/src/lib/content-fallbacks.ts`               | Offline fallback içerik |
| `frontend/public/locales/tr.json`                     | TR çeviriler            |
| `frontend/public/locales/en.json`                     | EN çeviriler            |
| `backend/src/db/seed/index.ts`                        | Seed data                |
| `backend/src/core/env.ts`                             | Environment config       |
| `admin_panel/src/navigation/sidebar/sidebar-items.ts` | Admin sidebar            |
| `admin_panel/src/app/globals.css`                     | Admin tema               |

---

## Kararlar & Notlar

> Bu bölüm geliştirme sürecinde verilen kararları ve açıklamaları tutar.

| Tarih      | Karar                         | Gerekçe                                                      |
| ---------- | ----------------------------- | ------------------------------------------------------------- |
| 2026-03-13 | Tipografi: Syne + DM Sans     | Modern sans, ArchDaily editorial hissi                        |
| 2026-03-13 | Dark mode ilk günden         | Token sistemi zaten hazır, altın+antrasit dark'ta muhteşem |
| 2026-03-13 | Backend + Frontend paralel    | Hızlı ilerleme, bağımsız geliştirme                     |
| 2026-03-13 | MVP: Tüm 5 sayfa aynı fazda | Firm web sitesi için minimum gereklilik                      |

---

*Son güncelleme: 2026-03-14*
