# Vista İnşaat — Çalışma Kuralları

## Proje Tanımı

Vista İnşaat firması için geliştirilen kurumsal web sitesi ve içerik yönetim sistemi.
Domain: `https://www.vistainsaat.com`
Logo: altın/şampanya tonlarında V harfi logotype (kahverengi-bej palet).

## Workspace Yapısı

```
vistainsaat/
  frontend/     <- Next.js 16, TypeScript, Tailwind CSS v4 (port 3030)
  backend/      <- Fastify, Drizzle ORM, MySQL (Ensotek backend tabanli)
  admin_panel/  <- React admin paneli (Ensotek admin_panel tabanli)
```

## Kaynak Repo

Bu proje Ensotek altyapısı üzerine kurulmuştur:
- `frontend/` ← `/Ensotek/karbonkompozit` kopyası, Vista'ya özelleştirilecek
- `backend/` ← `/Ensotek/backend` kopyası, Vista modülleri eklenecek
- `admin_panel/` ← `/Ensotek/admin_panel` kopyası, Vista sidebar'ı eklenecek

## Adlandırma ve Marka

- Proje slug: `vistainsaat`
- Tema template: `vista-construction` (karbonkompozit'ten farklılaştırılacak)
- Renk paleti: altın/şampanya (`#b8a98a` tonu), beyaz, koyu nötr
- Tüm karbonkompozit/MOE Kompozit referansları Vista'ya dönüştürülmeli

## Çalışma Kuralları

1. `karbonkompozit` veya `MOE` içeren her referans `vistainsaat` / `Vista İnşaat` olarak değiştirilmeli
2. `ensotek-backend` / `ensotek` referansları backend'de `vistainsaat-backend` olarak güncellenmeli
3. Port 3030 frontend için sabittir
4. Her anlamlı değişiklikten önce `build + type-check` çalıştırılmalı
5. `project.portfolio.json` tek doğru metadata kaynağıdır — güncellenmeli

## İçerik Modülleri (Planlanan)

- Projeler (proje listeleme + detay + galeri)
- Hizmetler
- Hakkımızda
- Blog
- İletişim / Teklif formu
- Referanslar

## SEO Kontrakt

- Her sayfa için `generateMetadata` zorunlu
- Canonical + hreflang + OG image her sayfada olmalı
- JSON-LD: Organization, LocalBusiness (inşaat sektörü), BreadcrumbList
- Domain: `https://www.vistainsaat.com`

## Deployment

- Nginx config: `frontend/nginx-vistainsaat.conf` (oluşturulacak)
- PM2 config: `frontend/ecosystem.config.cjs` (güncellenecek)
- SSL: Let's Encrypt via Certbot
