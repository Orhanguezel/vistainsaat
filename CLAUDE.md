# Vista İnşaat — Çalışma Kuralları

## Proje Tanımı

Vista İnşaat firması için geliştirilen kurumsal web sitesi ve içerik yönetim sistemi.
Domain: `https://www.vistainsaat.com`
Logo: altın/şampanya tonlarında V harfi logotype (kahverengi-bej palet).

## Workspace Yapısı

```
vistainsaat/
  frontend/     <- Next.js 16, TypeScript, Tailwind CSS v4 (port 3030)
  backend/      <- Fastify, Drizzle ORM, MySQL (port 8086)
  admin_panel/  <- React admin paneli (port 3004)
```

## Adlandırma ve Marka

- Proje slug: `vistainsaat`
- Tema template: `vista-construction`
- Intent: `premium-editorial-neutral-gold`
- Renk paleti: altın/şampanya (`#b8a98a`), beyaz (`#ffffff`), antrasit (`#1e1c1a`)
- Tipografi: Syne (başlık) + DM Sans (body)

## Çalışma Kuralları

1. Port 3030 frontend, 8086 backend, 3004 admin için sabittir
2. Her anlamlı değişiklikten önce `bun run build + bun run type-check` çalıştırılmalı
3. `project.portfolio.json` tek doğru metadata kaynağıdır
4. Component'larda `dark:` prefix YASAK — yalnızca semantic token kullanılır
5. Tailwind v4 canonical class: `bg-(--color-brand)` — köşeli parantez formatı kullanılmaz

## İçerik Modülleri

- Projeler — `/projeler`, `/projeler/[slug]`
- Hizmetler — `/hizmetler`, `/hizmetler/[slug]`
- Galeri — `/galeri`, `/galeri/[slug]`
- Haberler/Blog — `/haberler`, `/haberler/[slug]`
- Hakkımızda — `/hakkimizda`
- İletişim — `/iletisim`
- Teklif formu — `/teklif`

## SEO Kontratı

- Her sayfa için `generateMetadata` + `buildPageMetadata()` zorunlu
- Canonical + hreflang (`tr`, `en`, `x-default`) + OG image her sayfada
- JSON-LD: Organization + LocalBusiness (anasayfa), CreativeWork (proje detay), Service (hizmet detay), BreadcrumbList (tüm detay sayfaları), LocalBusiness (iletişim)
- Filtreli/query-driven sayfalarda `noIndex: true`
- Domain: `https://www.vistainsaat.com`

## API Endpoint Şablonu

```
GET /api/projects?module_key=vistainsaat&locale=tr&is_active=1
GET /api/projects/by-slug/[slug]?locale=tr
GET /api/services?module_key=vistainsaat&locale=tr
GET /api/galleries?module_key=vistainsaat&locale=tr
GET /api/custom_pages?module_key=vistainsaat_blog&locale=tr
GET /api/site_settings/[key]?prefix=vistainsaat__
```

## Deployment

- Nginx config: `frontend/nginx-vistainsaat.conf`
- Frontend PM2: `frontend/ecosystem.config.cjs` — app: `vistainsaat-frontend`, port: 3030
- Backend PM2: `backend/ecosystem.config.cjs` — app: `vistainsaat-backend`, port: 8086
- SSL: Let's Encrypt via Certbot
