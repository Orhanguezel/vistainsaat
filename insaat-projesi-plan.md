# Proje Teslim Planı
## İnşaat Firması Kurumsal Web Sitesi

**Hazırlayan:** Orhan Güzel — Full-Stack Developer
**Tarih:** 12 Mart 2026
**Tahmini Süre:** 7 İş Günü
**İletişim:** orhanguzell@gmail.com | +49 172 3846068

---

## Proje Kapsamı

Tamamen özel kodlanmış (WordPress değil), yönetim panelinden kolayca içerik güncellenebilen, Google'da görünür ve müşteri dönüşümü odaklı kurumsal web sitesi.

### Dahil Olan Her Şey

| # | Özellik | Durum |
|---|---------|-------|
| 1 | Anasayfa — Hero animasyonu / video destekli | Dahil |
| 2 | Hizmetler sayfası | Dahil |
| 3 | Hakkımızda sayfası | Dahil |
| 4 | Referanslar / Proje listesi | Dahil |
| 5 | Proje detay sayfaları | Dahil |
| 6 | İletişim ve teklif formu | Dahil |
| 7 | Blog / içerik sistemi | Dahil |
| 8 | Türkçe + İngilizce dil desteği | Dahil |
| 9 | Yönetim paneli (içerik, proje, medya yönetimi) | Dahil |
| 10 | Teknik SEO (meta, sitemap, URL yapısı) | Dahil |
| 11 | Google PageSpeed 90+ optimizasyonu | Dahil |
| 12 | SSL kurulumu ve güvenlik | Dahil |
| 13 | Otomatik yedekleme sistemi | Dahil |
| 14 | İçerik girişi (anahtar teslim) | Dahil |
| 15 | Canlıya alma ve domain yönlendirme | Dahil |

---

## Teknik Altyapı

```
Frontend   : Next.js 15 + TypeScript + Tailwind CSS + Framer Motion
Backend    : Fastify + Drizzle ORM
Veritabanı : MySQL
Deployment : VPS + Nginx + PM2 + SSL (Let's Encrypt)
Medya      : Cloudinary (görsel optimizasyonu otomatik)
SEO        : next-sitemap + next-intl (TR/EN)
```

**Neden özel yazılım, WordPress değil?**
- Daha hızlı (PageSpeed 90+, WordPress ortalama 50-70)
- Daha güvenli (WordPress sitelerin %90'ı saldırıya açık eklentiler barındırır)
- Sonsuza kadar kullanılabilir, eklenti bağımlılığı yok
- Yönetim paneli sizin ihtiyaçlarınıza göre tasarlanır

---

## Haftalık Çalışma Planı

### Gün 1–2 | Altyapı ve Backend
- VPS sunucu kurulumu, Nginx, SSL sertifikası
- MySQL veritabanı şeması (projeler, sayfalar, medya, formlar, blog)
- Fastify REST API — tüm yönetim paneli endpoint'leri
- Authentication sistemi (admin login, JWT)

**Kontrol Noktası:** Yönetim paneli backend'i canlıda test edilebilir hale gelir.

---

### Gün 2–3 | Yönetim Paneli (Admin)
- Next.js admin arayüzü
- Proje ekleme / düzenleme / silme (görsel upload dahil)
- Sayfa içerik editörü (Hakkımızda, Hizmetler vb.)
- Blog yazısı yönetimi
- Gelen form mesajlarını görüntüleme ve yanıtlama

**Kontrol Noktası:** Yönetim paneli canlıda — tarayıcıdan içerik girebilirsiniz.

---

### Gün 3–5 | Müşteri Sitesi (Frontend)
- Anasayfa: Hero bölümü (video veya Framer Motion animasyonu)
- Hizmetler, Hakkımızda, Referanslar sayfaları
- Proje listeleme + proje detay sayfaları (galeri, açıklama, yıl, konum)
- İletişim formu + teklif talep formu (e-posta bildirimi dahil)
- Blog listesi + blog detay sayfaları
- TR/EN dil geçişi (tüm sayfalarda)

**Kontrol Noktası:** Sitenin önizleme adresi paylaşılır, görsel onay alınır.

---

### Gün 5–6 | SEO ve Performans
- Tüm sayfalar için meta başlıklar ve açıklamalar
- Otomatik sitemap.xml ve robots.txt
- URL yapısı optimizasyonu (TR: `/projeler/[slug]`, EN: `/projects/[slug]`)
- Görsel WebP dönüşümü + lazy loading
- Cache ve CDN ayarları
- **Hedef: Google PageSpeed 90+**

---

### Gün 6–7 | İçerik Girişi, Test ve Teslim
- Tüm içeriklerin yönetim panelinden girilmesi (projeler, hizmetler, hakkımızda metni)
- Mobil + masaüstü + tablet testleri
- Form gönderim testleri
- Domain yönlendirmesi ve canlıya alma
- Kısa kullanım kılavuzu (admin panel nasıl kullanılır)
- **Anahtar teslim: siteniz hazır, içerikler girilmiş, canlıda**

---

## Milestone ve Ödeme Planı

| Milestone | İçerik | Ödeme |
|-----------|--------|-------|
| **Başlangıç** | Proje başlıyor, sunucu kurulumu | %30 |
| **Milestone 1** (Gün 3) | Admin panel canlıda, içerik girişi başlıyor | %40 |
| **Milestone 2 — Teslim** (Gün 7) | Site canlıda, içerikler girilmiş, tam çalışır | %30 |

---

## Teslim Sonrası Destek

- **30 gün ücretsiz teknik destek** — bug, hata, küçük düzeltme
- Yönetim paneli kullanımında anlık destek (WhatsApp / e-posta)
- Sitenin barındırma (hosting) maliyeti tarafınıza aittir (~5-10 EUR/ay VPS)

---

## Referans: Benzer Projeler

**Kamanilan** — Çok dilli gayrimenkul platformu
Admin panel, proje listeleme, Türkçe + İngilizce, Framer Motion animasyonları
*(İnşaat sektörüyle aynı yapıda: listeleme + detay + admin + form)*

**ensotek.de** — Canlı B2B platform
Aynı teknik altyapının production ortamında çalışan örneği.
Adres: www.ensotek.de

---

## Önemli Not

Bu fiyat ve süre kapsamı yukarıda listelenen özellikler için geçerlidir.
Kapsam dışı eklemeler (e-ticaret, ödeme sistemi, müşteri paneli vb.) ayrıca fiyatlandırılır.

---

*Sorularınız için her zaman ulaşabilirsiniz.*
**Orhan Güzel** — orhanguzell@gmail.com | +49 172 3846068
