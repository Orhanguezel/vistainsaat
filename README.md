# Vista İnşaat

**Kurumsal Web Sitesi & İçerik Yönetim Sistemi**

İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen
Next.js tabanlı kurumsal platform. Ensotek altyapısı temel alınarak Vista'ya özelleştirilmektedir.

Domain: `https://www.vistainsaat.com`

---

## Workspace Yapısı

```
vistainsaat/
  frontend/         <- Next.js 16, port 3030 (karbonkompozit tabanli)
  backend/          <- Fastify + Drizzle ORM + MySQL (Ensotek backend tabanli)
  admin_panel/      <- React admin paneli (Ensotek admin_panel tabanli)
  package.json      <- workspace root
  CLAUDE.md         <- calisma kurallari
  project.portfolio.json
```

---

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| Çok dil | next-intl (TR / EN) |
| Veri | React Query, Zod, React Hook Form |
| State | Zustand |
| UI | Radix UI, Lucide React, Embla Carousel, Sonner |
| Backend | Fastify, Drizzle ORM, MySQL |
| Admin | React (Ensotek admin_panel) |
| Deploy | Nginx, PM2, Let's Encrypt |

---

## Calistirma

```bash
# Frontend (port 3030)
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev

# Admin panel
cd admin_panel && npm install && npm run dev
```

---

## Geliştirme Durumu

**Başlangıç aşaması** — Ensotek/karbonkompozit altyapısı kopyalandı, Vista'ya özelleştirme devam ediyor.

Yapılacaklar:
- [ ] `karbonkompozit` → `vistainsaat` tüm referans değişimi
- [ ] Tema ve renk paletini Vista markasına uyarla (altın/şampanya palet)
- [ ] Logo entegrasyonu
- [ ] İçerik modüllerini inşaat sektörüne göre düzenle (Projeler, Hizmetler, Referanslar)
- [ ] Backend'de Vista-specific modülleri aktif et
- [ ] Admin panel sidebar'ını Vista modülleri ile güncelle
- [ ] Nginx config oluştur
- [ ] Domain yönlendirme ve SSL

---

## İlgili Dosyalar

| Dosya | İçerik |
|---|---|
| `CLAUDE.md` | Çalışma kuralları, marka, SEO kontrakt |
| `project.portfolio.json` | Proje metadata (tek doğru kaynak) |
| `frontend/CLAUDE.md` | Frontend-specific SEO + tema kuralları |
| `frontend/IMPLEMENTATION_PLAN.md` | Teknik SEO uygulama planı (karbonkompozit'ten) |

---

*Kaynak altyapı: Ensotek workspace (`/home/orhan/Documents/Projeler/Ensotek`)*
