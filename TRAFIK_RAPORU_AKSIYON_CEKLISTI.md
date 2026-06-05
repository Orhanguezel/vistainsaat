# Vista İnşaat — Trafik Raporu Aksiyon Çeklisti

> Kaynak: `reports/vistainsaat-ziyaretci-raporu-2026-06-05.pdf` (22 May – 5 Haz 2026 log analizi)
> Tarih: 5 Haziran 2026
> Etiketler: **[KOD]** = repo içinde yapılır · **[SUNUCU]** = kod harici (nginx/VPS), *sonra yapılacak*

---

## 1. Ayrı Log Altyapısı  `[SUNUCU — sonra]`

**Sorun:** `vistainsaat` vhost'unda `access_log` direktifi yok → tüm istekler ~13 siteyle paylaşılan,
**host alanı içermeyen** ortak `/var/log/nginx/access.log`'a yazıyor. Üstelik loglar yalnızca **14 gün**
tutuluyor (`rotate 14`). Bu yüzden gerçek "aylık" ve site-bazlı analiz mümkün değil; her seferinde
referrer-host ile demux + ağır bot ayıklama gerekiyor.

- [ ] `[SUNUCU]` `/etc/nginx/nginx.conf` (http bloğu) içine `$host` taşıyan log_format ekle:
  ```nginx
  log_format vhostlog '$host $remote_addr - $remote_user [$time_local] '
                      '"$request" $status $body_bytes_sent '
                      '"$http_referer" "$http_user_agent"';
  ```
- [ ] `[SUNUCU]` `/etc/nginx/sites-available/vistainsaat` → **www** server bloğuna ekle:
  ```nginx
  access_log /var/log/nginx/vistainsaat.access.log vhostlog;
  ```
- [ ] `[SUNUCU]` Aynısını `panel.vistainsaat.com` ve `api.vistainsaat.com` blokları için de ekle
  (`vistainsaat-panel.access.log`, `vistainsaat-api.access.log`) — vistaseed kurulumundaki gibi.
- [ ] `[SUNUCU]` `/etc/logrotate.d/nginx` retention'ı artır: `rotate 14` → **`rotate 30`** (tercihen 90).
- [ ] `[SUNUCU]` `nginx -t && systemctl reload nginx` ile devreye al, yeni log dosyasının oluştuğunu doğrula.
- [ ] `[SUNUCU]` (Opsiyonel) `GoAccess` kur → gerçek zamanlı/aylık otomatik trafik paneli
  (`goaccess vistainsaat.access.log --log-format=VCOMBINED`).

---

## 2. Hata Düzeltmeleri

### 2.1 `/galeri/null` 404  `[KOD]` ✅ TAMAMLANDI
**Sorun:** Eski/önbellekli `/galeri/null` URL'leri crawler'lar tarafından çekiliyordu.
**Tespit:** Detay sayfası zaten doğru 404 dönüyordu (`notFound()`); canlı veride null slug **yok** —
sorun stale-index/crawl gürültüsü. Sitemap `fetchItems` zaten `item?.slug` ile filtreliyordu ama
string `"null"`/`"undefined"` geçebiliyordu.

- [x] `[KOD]` `sitemap.ts` — `isValidSlug()` helper'ı eklendi; `"null"`/`"undefined"`/boş slug'lar elendi
  (tüm modüller `fetchItems` üzerinden geçtiği için projeler/hizmetler/haberler/galeri hepsi korunuyor).
- [x] `[KOD]` `galeri/[slug]/page.tsx` — geçersiz slug'da API çağrısı yapılmadan doğrudan 404 (savunma katmanı).
- [x] `[VERİ]` Canlı API kontrol edildi: 3 galeri, hepsi geçerli slug — temiz. (Kalıcı: backend `slug NOT NULL` constraint önerisi durur.)

### 2.2 `/api/monitoring/seo-issues` 404  `[KOD]` ✅ TAMAMLANDI (gerçek kök neden bulundu)
**Gerçek kök neden:** nginx, `www.vistainsaat.com/api/*` isteklerini **backend'e (Fastify, :8086)** yönlendiriyor
(`GET /api/site_settings/...` → 200 backend yanıtı ile doğrulandı). Bu yüzden frontend'deki Next route handler
(`/api/monitoring/seo-issues`) **hiçbir zaman ulaşılamıyordu** — istek backend'e gidip 404 alıyordu.
İlk "stale deploy" tahmini yanlıştı. (WebVitals prod'da POST atmıyor — yalnızca dev log; düzeltme gerekmez.)

- [x] `[KOD]` Route `/api/monitoring/seo-issues` → **`/monitoring/seo-issues`** taşındı (api dışı namespace,
  nginx `location /` ile frontend'e gidiyor). Build: `ƒ /monitoring/seo-issues`.
- [x] `[KOD]` `SeoIssueBeacon.tsx` yeni yola POST ediyor.
- Not: Alternatif `[SUNUCU]` çözüm (nginx'te `/api/monitoring` hariç tutma) gerekmedi.

### 2.3 Mobil hero video 499 abort (×14)  `[KOD]` ✅ TAMAMLANDI
**Sorun:** Ağır hero mp4 sayfa açılışında indirilirken kullanıcı ayrılıyordu (499).

- [x] `[KOD]` `HeroVideoPlayer.tsx` — `preload="metadata"` eklendi; **mobilde + ilk paint'te yalnızca poster**
  gösteriliyor (otomatik video indirme yok), video tam ekranda tıklayınca talep üzerine yükleniyor.
- [x] `[KOD]` Bonus: `min-h-[520px]` → `min-h-130` (Tailwind v4 canonical class kuralı).
- [ ] `[İÇERİK]` (Opsiyonel) Daha düşük bitrate'li ayrı `hero-mobile.mp4` üret — kalite/bant genişliği için.

### 2.4 İyi huylu — aksiyon gerekmez (kayıt amaçlı)
- [x] `/api/auth/user` 401 (×181): kullanıcı giriş yapmamışken normal davranış. **Düzeltme gerekmez.**

---

## 3. Ölçümleme / Analitik  `[KOD]` (öncelik 1) ✅ KOD HAZIR — sadece ENV gerekiyor

**Tespit:** `GoogleAnalytics` + `GoogleTagManager` bileşenleri zaten var ve `ClientShell`'de yüklü;
yalnızca env ID'leri boştu (script yüklenmiyordu). Olay (event) takibi hiç yoktu — eklendi.

- [x] `[KOD]` `lib/analytics.ts` helper eklendi (`trackEvent`/`trackLead`/`trackContactClick`) — GA4 + GTM
  dataLayer'a güvenli gönderim, araç yoksa no-op.
- [x] `[KOD]` Teklif formu (`OfferForm`) submit başarısında `generate_lead` (GA4 önerilen) event'i tetikleniyor.
- [x] `[KOD]` İletişim tıklamaları: WhatsApp (`onClick`) + tel/mailto (global `OutboundLinkTracker` delege listener) → `contact_click`.
- [x] `[KOD]` `.env.example`'a `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_WHATSAPP_NUMBER` dokümante edildi.
- [ ] `[KOD HARİCİ]` GA4 (veya Plausible) hesabı aç, ölçüm ID'sini prod `.env`'e gir, deploy et → olaylar akmaya başlar.
- [ ] `[KOD HARİCİ]` (Opsiyonel) CSP header'ı googletagmanager.com'a izin verecek şekilde güncelle (nginx/next config).

---

## 4. SEO / GEO (AI-arama görünürlüğü)  `[KOD]`

**Bağlam:** GPTBot (360), Applebot (288), ClaudeBot crawler ilgisi yüksek — AI-arama fırsatı.
Bir ziyaretçi siteye `chatgpt.com` referrer'ı ile geldi (erken sinyal).

- [x] `[KOD]` `public/llms.txt` eklendi (canlı API'den hizmet + proje listesiyle, TR/EN ana sayfalar).
- [x] `[KOD]` JSON-LD doğrulandı: anasayfa Organization + WebSite, proje detay CreativeWork + BreadcrumbList,
  `localBusiness`/`service` builder'ları mevcut, `robots.ts` tüm AI crawler'lara açık + sitemap referanslı. **Coverage yeterli.**
- [ ] `[İÇERİK]` `vista-lagoon` yıldız sayfası modelini diğer projelere taşı (görsel + açıklama + JSON-LD)
  → organik trafiği büyüt. (İçerik işi — kod değişikliği değil.)
- [ ] `[SUNUCU/KOD]` (Opsiyonel) Vietnam referrer-spam aralıklarını (`14.x`, `113.x`, `69.12.x`) nginx
  `deny` veya Cloudflare ile engelle — hacim düşük, zorunlu değil.

---

## 5. Pazarlama / Trafik Büyütme  `[KOD HARİCİ]`

- [ ] Gerçek insan trafiği düşük (~39 tekil / 15 gün). Google Ads kampanyası başlat (gclid trafiği yok).
- [ ] Instagram bio link'e UTM ekle (`utm_source=ig&utm_medium=social`) → sosyal trafik ölçülebilir olsun.
- [ ] 30 gün sonra (yeni ayrı log + analitik ile) **gerçek aylık** takip raporu üret.

---

### Öncelik Sırası (öneri)
1. **`[KOD]` 2.1 `/galeri/null` fix** (canlı 404, hızlı)
2. **`[KOD]` 3. Analitik kurulumu** (ölçüm olmadan ilerlemiyoruz)
3. **`[SUNUCU]` 1. Ayrı log + retention** (sonraki rapor için altyapı)
4. **`[KOD]` 2.3 Hero video** + **4. SEO/GEO**
5. **2.2, 5.** pazarlama
