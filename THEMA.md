# THEMA.md — Vista İnşaat Tema Sistemi

> **Bu doküman Vista İnşaat projesinin tema kontratıdır.**
> Tema sistemi, SEO, sayfa standartı veya tipografi değişirse bu dosya güncellenir.
> Kaynak: `frontend/src/styles/globals.css` + `frontend/src/theme/templates.ts`

---

## 1. Kimlik

| Alan | Değer |
|------|-------|
| **Template adı** | `vista-construction` |
| **Template intent** | `premium-editorial-neutral-gold` |
| **Renk stratejisi** | 80% Nötr · 10% Altın (brand) · 10% Antrasit (accent) |
| **Tipografi** | Syne (başlık) + DM Sans (body) |
| **Dark mode** | Destekleniyor — token sistemi, ilk günden |
| **Tailwind** | v4 (CSS-first, @import "tailwindcss") |

---

## 2. Mimari — 5 Katman

```
Katman 1: Primitive Tokenlar          → ham palet (--gold-500, --anthracite-900)
Katman 2: Surface Ara Tokenlar        → --surface-base, --text-strong, --border-subtle
Katman 3: Semantic Tokenlar           → --color-bg, --color-brand, --color-text-primary
Katman 4: Surface Utility Sınıfları   → .surface-card, .surface-dark-shell, .btn-primary
Katman 5: Pattern Componentler        → <SectionHeader>, <FeatureCard>, <MediaOverlayCard>
```

**Kural:** Component yalnızca Katman 3 ve 4'ü görür. Raw hex veya Katman 1 token'ı component içinde kullanılmaz.

---

## 3. Primitive Tokenlar

### 3.1 Altın / Şampanya Skalası
```css
--gold-50:  #faf8f4;
--gold-100: #f3eee3;
--gold-200: #e8dcc8;
--gold-300: #dccfaf;
--gold-400: #d4c4a0;
--gold-500: #b8a98a;   /* ← Ana marka rengi */
--gold-600: #9e8f6f;
--gold-700: #8b7962;
--gold-800: #6b5d48;
--gold-900: #4e4436;
--gold-950: #2e271f;
```

### 3.2 Antrasit / Volkanik Nötr Skalası
```css
--anthracite-0:   #ffffff;
--anthracite-50:  #f5f5f4;
--anthracite-100: #e8e7e5;
--anthracite-200: #d4d2ce;
--anthracite-300: #b8b5b0;
--anthracite-400: #8e8b87;
--anthracite-500: #6b6864;
--anthracite-600: #4e4b47;
--anthracite-700: #3c3a37;
--anthracite-800: #2e2c29;
--anthracite-900: #1e1c1a;   /* ← Koyu zemin */
--anthracite-950: #141311;
--anthracite-1000: #09080700;
```

### 3.3 Status Tokenları
```css
--status-success:        #25d366;
--status-success-strong: #1faa52;
--status-warning:        #f59e0b;
--status-danger:         #dc2626;
```

---

## 4. Surface Ara Tokenlar (Mode-aware)

Surface tokenlar ham primitive ile semantic token arasındaki köprüdür.
`--color-*` tokenların doğrudan referans ettiği katmandır.

### 4.1 Light Mode
```css
html[data-theme-mode='light'],
:root:not([data-theme-mode]) {
  --surface-base:        var(--anthracite-50);    /* Sayfa zemini */
  --surface-raised:      var(--anthracite-0);     /* Kart zemini */
  --surface-muted:       var(--anthracite-100);   /* Soluk zemin */
  --surface-dark:        var(--anthracite-900);   /* Koyu section */
  --surface-dark-strong: var(--anthracite-1000);  /* Tam siyah */

  --text-strong:         var(--anthracite-900);   /* Başlıklar */
  --text-body:           var(--anthracite-600);   /* Paragraf */
  --text-muted:          var(--anthracite-400);   /* Yardımcı metin */
  --text-inverse:        var(--anthracite-50);    /* Koyu zeminde metin */
  --text-soft-inverse:   var(--anthracite-300);   /* Koyu zeminde soluk metin */

  --border-subtle:       var(--anthracite-200);   /* İnce border */
  --border-strong:       var(--anthracite-300);   /* Belirgin border */

  --color-glass-bg:           rgb(255 255 255 / 0.06);
  --color-glass-bg-strong:    rgb(255 255 255 / 0.10);
  --color-glass-border:       rgb(255 255 255 / 0.14);
  --color-glass-hover:        rgb(255 255 255 / 0.10);
  --color-border-on-dark:     rgb(255 255 255 / 0.12);
  --color-dark-link-hover:    var(--text-inverse);

  /* Hero glow — altın tonu */
  --color-hero-glow-brand: color-mix(in srgb, var(--gold-400) 16%, transparent);
  --color-hero-glow-muted: rgb(255 255 255 / 0.06);
}
```

### 4.2 Dark Mode
```css
html[data-theme-mode='dark'] {
  --surface-base:        #0f0e0d;    /* Sayfa zemini — sıcak siyah */
  --surface-raised:      #1a1816;    /* Kart zemini */
  --surface-muted:       #201e1b;    /* Soluk zemin */
  --surface-dark:        #0a0908;    /* Section dark */
  --surface-dark-strong: #000000;

  --text-strong:         #f0ece6;    /* Başlıklar — sıcak beyaz */
  --text-body:           #c8c2b8;    /* Paragraf */
  --text-muted:          #8c8880;    /* Yardımcı */
  --text-inverse:        #f5f4f2;
  --text-soft-inverse:   #c4bfb8;

  --border-subtle:       #2a2825;
  --border-strong:       #3a3835;

  --color-glass-bg:           rgb(255 240 210 / 0.04);
  --color-glass-bg-strong:    rgb(255 240 210 / 0.08);
  --color-glass-border:       rgb(255 240 210 / 0.10);
  --color-glass-hover:        rgb(255 240 210 / 0.08);
  --color-border-on-dark:     rgb(255 255 255 / 0.10);
  --color-dark-link-hover:    #ffffff;

  /* Hero glow — dark modda altın daha belirgin */
  --color-hero-glow-brand: color-mix(in srgb, var(--gold-500) 20%, transparent);
  --color-hero-glow-muted: rgb(184 169 138 / 0.08);
}
```

---

## 5. Semantic Tokenlar (Tüm Modlar)

```css
/* Her iki mod için ortak — surface ara tokenlarına bağlı */

--color-bg:             var(--surface-base);
--color-bg-secondary:   var(--surface-raised);
--color-bg-muted:       var(--surface-muted);
--color-bg-dark:        var(--surface-dark);

--color-text-primary:   var(--text-strong);
--color-text-secondary: var(--text-body);
--color-text-muted:     var(--text-muted);
--color-text-on-dark:   var(--text-inverse);

--color-border:         var(--border-subtle);
--color-border-strong:  var(--border-strong);

/* Marka — mode'a göre farklı primitive'e bağlanır */

/* Light modda: */
--color-brand:          var(--gold-500);   /* #b8a98a */
--color-brand-light:    var(--gold-300);   /* #dccfaf */
--color-brand-dark:     var(--gold-700);   /* #8b7962 */
--color-accent:         var(--anthracite-800);
--color-on-brand:       var(--anthracite-950);  /* altın üzerinde koyu metin */

/* Dark modda: */
--color-brand:          var(--gold-400);   /* #d4c4a0 — biraz açık */
--color-brand-light:    var(--gold-300);
--color-brand-dark:     var(--gold-600);
--color-accent:         var(--gold-500);
--color-on-brand:       var(--anthracite-950);

/* Status */
--color-success:        var(--status-success);
--color-success-dark:   var(--status-success-strong);
```

---

## 6. Tipografi

### 6.1 Google Fonts (layout.tsx veya globals.css)
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
```

### 6.2 Token Tanımları
```css
--font-heading: 'Syne', system-ui, sans-serif;
--font-body:    'DM Sans', system-ui, sans-serif;
```

### 6.3 Uygulama Kuralları
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;    /* ← prime-frontend standardı */
  text-wrap: balance;          /* ← headline kalitesi */
  color: var(--text-strong);
}

body {
  font-family: var(--font-body);
  line-height: 1.6;
}

/* Body metin bloğu maksimum genişlik */
.prose-block {
  max-width: 65ch;
}
```

### 6.4 Tipografi Ölçeği (Major Third 1.25)
| Token | Değer | Kullanım |
|-------|-------|---------|
| `--text-xs` | 0.75rem | Chip, badge, meta |
| `--text-sm` | 0.875rem | Alt yazı, footer |
| `--text-base` | 1rem | Body |
| `--text-lg` | 1.25rem | Lead paragraph |
| `--text-xl` | 1.5rem | Kart başlığı |
| `--text-2xl` | 2rem | Section başlığı |
| `--text-3xl` | 2.5rem | Alt sayfa H1 |
| `--text-4xl` | 3.5rem | Ana sayfa H1 |
| `--text-5xl` | clamp(3rem, 6vw, 5rem) | Hero başlığı |

---

## 7. Spacing & Layout
```css
--section-py:    clamp(4rem, 8vw, 7rem);   /* Section dikey padding */
--container-px:  clamp(1rem, 4vw, 2rem);   /* Container yatay padding */
--container-max: 1200px;                    /* Max genişlik */
```

---

## 8. Radius
```css
--radius-sm: 0.25rem;    /* Chip, input */
--radius-md: 0.5rem;     /* Kart */
--radius-lg: 0.75rem;    /* Modal, büyük kart */
--radius-xl: 1rem;       /* Özel durumlar */
```

---

## 9. Surface Utility Sözleşmesi

Component'ler yüzey oluştururken önce bu sınıflardan birini seçer.
Ham token kombinasyonu yerine utility class kullanmak zorunludur.

### 9.1 Standart Yüzeyler
```css
/* Sayfa kartı */
.surface-card {
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

/* Soluk / muted kart */
.surface-card-muted {
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-muted);
  color: var(--color-text-primary);
}

/* Cam efekti — koyu section içi */
.surface-glass-dark {
  border: 1px solid var(--color-glass-border);
  background-color: var(--color-glass-bg);
  backdrop-filter: blur(16px);
}
```

### 9.2 Koyu Section Yüzeyleri
```css
/* Koyu section wrapper */
.surface-dark-shell {
  position: relative;
  overflow: hidden;
  background-color: var(--color-bg-dark);
}

/* Koyu section — altın gradient overlay (vista-construction spesifik) */
.surface-dark-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgb(184 169 138 / 0.14), transparent 30%),
    linear-gradient(135deg, rgb(20 19 17 / 0.97), rgb(30 28 26 / 0.94));
  pointer-events: none;
}

/* Koyu section başlık rengi */
.surface-dark-heading {
  color: var(--color-text-on-dark) !important;
}

/* Koyu section paragraf — soluk beyaz */
.surface-dark-text {
  color: var(--text-soft-inverse) !important;
}

/* Koyu section genel metin */
.surface-dark-panel {
  color: var(--color-text-on-dark) !important;
}

/* Koyu section link */
.surface-dark-link {
  color: var(--text-soft-inverse);
}
.surface-dark-link:hover {
  color: var(--color-dark-link-hover);
}

/* Koyu section border */
.surface-dark-border {
  border-color: var(--color-border-on-dark);
}
```

### 9.3 Marka CTA Yüzeyi
```css
/* Altın brand CTA paneli — vista-construction spesifik */
.surface-brand-cta {
  border: 1px solid rgb(184 169 138 / 0.30);
  background: linear-gradient(
    135deg,
    rgb(158 143 111 / 0.95),   /* gold-600 */
    rgb(139 121 98 / 0.95)     /* gold-700 */
  );
  color: var(--anthracite-950);   /* Koyu metin — altın üzerinde */
  box-shadow: 0 20px 60px rgb(184 169 138 / 0.18);
}

.surface-brand-cta-subtle {
  color: rgb(20 19 17 / 0.70);
}
```

### 9.4 Hero Glow Yüzeyleri
```css
.surface-hero-glow-brand {
  background-color: var(--color-hero-glow-brand);
}
.surface-hero-glow-muted {
  background-color: var(--color-hero-glow-muted);
}
```

### 9.5 Medya Overlay Yüzeyleri
```css
/* Fotoğraf üzeri gradient overlay — proje grid kartları */
.media-overlay {
  background: linear-gradient(
    180deg,
    rgb(20 19 17 / 0.04),
    rgb(20 19 17 / 0.82)
  );
}

.media-overlay-title {
  color: var(--color-text-on-dark);
}

.media-overlay-text {
  color: var(--text-soft-inverse);
}
```

### 9.6 Form Alan Yüzeyi
```css
.field-input {
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
}
.field-input::placeholder {
  color: var(--color-text-muted);
}
.field-input:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
```

---

## 10. Buton Utility Sözleşmesi

### Primary (Altın CTA)
```css
.btn-primary {
  background-color: var(--color-brand);
  color: var(--color-on-brand);   /* koyu metin üzerinde */
  border: none;
  transition: background-color 150ms ease;
}
.btn-primary:hover {
  background-color: var(--color-brand-dark);
}
```

### Secondary (Outline)
```css
.btn-secondary {
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}
.btn-secondary:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
```

### Ghost (Koyu Section İçi)
```css
.btn-contrast {
  border: 1px solid var(--color-glass-border);
  background-color: transparent;
  color: var(--color-brand);
}
.btn-contrast:hover {
  opacity: 0.88;
}
```

---

## 11. Chip / Badge Utility
```css
.chip-muted {
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-muted);
  color: var(--color-text-secondary);
}
.chip-brand {
  border: 1px solid var(--color-brand);
  background-color: var(--color-brand);
  color: var(--color-on-brand);
}
.chip-outline {
  border: 1px solid var(--color-border-strong);
  background-color: transparent;
  color: var(--color-text-primary);
}
```

---

## 12. Gölge Utility
```css
.shadow-hero-panel {
  box-shadow: 0 30px 80px rgb(20 19 17 / 0.42);
}
.shadow-dark-panel {
  box-shadow: 0 24px 70px rgb(20 19 17 / 0.24);
}
.shadow-card {
  box-shadow: 0 4px 24px rgb(20 19 17 / 0.08);
}
```

---

## 13. Prose (Zengin Metin)
```css
.prose-theme {
  color: var(--color-text-secondary);
}
.prose-theme :where(h1, h2, h3, h4, h5, h6) {
  color: var(--color-text-primary);
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
}
.prose-theme :where(p, li, strong, em, blockquote) {
  color: inherit;
}
.prose-theme :where(a) {
  color: var(--color-brand);
}
.prose-theme :where(a:hover) {
  color: var(--color-brand-dark);
}
.prose-theme :where(code) {
  color: var(--color-text-primary);
}
```

---

## 14. Animasyon & Motion

### Keyframe'ler
```css
@keyframes fade-up-in {
  from { opacity: 0; transform: translate3d(0, 28px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translate3d(34px, 0, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes float-soft {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%       { transform: translate3d(0, -6px, 0); }
}
```

### Motion Utility Sınıfları
```css
.motion-fade-up {
  animation: fade-up-in 860ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.motion-slide-right {
  animation: slide-in-right 920ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.motion-float-soft {
  animation: float-soft 5.8s ease-in-out 1.2s infinite;
}
.motion-delay-1 { animation-delay: 120ms; }
.motion-delay-2 { animation-delay: 220ms; }
.motion-delay-3 { animation-delay: 320ms; }
.motion-delay-4 { animation-delay: 420ms; }
```

### Scroll Reveal
```css
.reveal {
  opacity: 0;
  transform: translate3d(0, 26px, 0);
  transition:
    opacity 760ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.reveal-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal, .reveal-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## 15. Pattern Bileşen Kataloğu

Pattern bileşenleri semantic token dışına çıkmaz, raw renk kullanmaz.

| Bileşen | Dosya | Kullanım |
|---------|-------|---------|
| `SectionHeader` | `components/patterns/SectionHeader.tsx` | Section başlık + alt başlık grubu |
| `FeatureCard` | `components/patterns/FeatureCard.tsx` | Hizmet / özellik kartı |
| `MediaOverlayCard` | `components/patterns/MediaOverlayCard.tsx` | Fotoğraf + overlay metin kartı |
| `DarkCtaPanel` | `components/patterns/DarkCtaPanel.tsx` | Koyu zemin CTA bölümü |
| `BrandCtaPanel` | `components/patterns/BrandCtaPanel.tsx` | Altın zemin CTA bölümü |
| `ListingCard` | `components/patterns/ListingCard.tsx` | Proje / hizmet listeleme kartı |
| `ContentPageHeader` | `components/patterns/ContentPageHeader.tsx` | İç sayfa hero başlığı |
| `InfoListPanel` | `components/patterns/InfoListPanel.tsx` | Bilgi listesi (adr, tel, vb.) |
| `LinkListPanel` | `components/patterns/LinkListPanel.tsx` | Footer / sidebar link listesi |

### Pattern Geliştirme Kuralı

Yeni bir tekrar eden section eklendiğinde:
1. Önce mevcut pattern'lardan biri kullanılmaya çalışılır
2. Yoksa pattern kataloğuna yeni bir bileşen eklenir
3. Pattern içinde yalnızca `surface-*`, `media-overlay-*`, `--color-*` kullanılır

---

## 16. Theme Mode Kontratı

### Root Contract
```
html[data-theme-mode="light"]  → Light token seti aktif
html[data-theme-mode="dark"]   → Dark token seti aktif
:root:not([data-theme-mode])   → Light fallback
```

### Pre-hydration Boot (Flicker önleme)
**Dosya:** `frontend/src/scripts/theme-boot.tsx`

```ts
// Sayfa yüklenmeden önce localStorage'dan theme-mode okunur
// html[data-theme-mode] set edilir
// color-scheme sync edilir
// Bu script <head> içinde inline çalışır
```

### Theme Toggle Utility
**Dosya:** `frontend/src/lib/preferences/theme-utils.ts`

```ts
applyThemeMode('light' | 'dark'):
  1. document.documentElement.dataset.themeMode = mode
  2. document.documentElement.style.colorScheme = mode
  3. localStorage.setItem('theme-mode', mode)
```

**Toggle'ın YAPMADIĞI şeyler:**
- Component class manipülasyonu
- Sayfa bazlı tekil renk değiştirme

### Template & Intent
**Dosya:** `frontend/src/theme/templates.ts`

```ts
export const THEME_TEMPLATE = 'vista-construction';
export const THEME_INTENT = 'premium-editorial-neutral-gold';
```

Layout bileşeni bu değerleri `html` elementine yazar:
```html
<html
  data-theme-template="vista-construction"
  data-theme-intent="premium-editorial-neutral-gold"
  data-theme-mode="light"
>
```

---

## 17. Kural Seti — Ne Yapılır, Ne Yapılmaz

### ✅ Doğru
```tsx
// Semantic token kullan
<div className="bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">

// Surface utility kullan
<div className="surface-card rounded-lg p-6">

// Dark section için özel utility kullan
<section className="surface-dark-shell">
  <h2 className="surface-dark-heading">Başlık</h2>
  <p className="surface-dark-text">Açıklama</p>
</section>

// Brand button
<button className="btn-primary px-6 py-3 rounded">Teklif Al</button>
```

### ❌ Yasak
```tsx
// Raw hex — YASAK
<div style={{ color: '#b8a98a' }}>

// Hardcoded light surface — YASAK
<div className="bg-white text-gray-900">

// Dark mode class — YASAK
<div className="bg-white dark:bg-slate-900">

// if(dark) mantığı — YASAK
{isDark ? 'text-white' : 'text-gray-900'}

// Legacy alias (migration sürecinde izin verildi, yeni kod'da YASAK)
var(--slate-500), var(--brand-500), var(--carbon-600)
```

---

## 18. Vista-Construction Özel Notlar

### Altın Üzerinde Metin Rengi
Altın (`--gold-500: #b8a98a`) açık bir renktir.
Üzerine **koyu metin** kullanılır: `--color-on-brand: var(--anthracite-950)`
Beyaz metin kullanılmaz (yeterli kontrast yok).

### Dark Mode'da Altın
Dark mode'da altın token'ı 400 seviyesine (`#d4c4a0`) çekilir.
Bu, siyah zemin üzerinde yeterli kontrast sağlar (WCAG AA).

### Dark Shell Gradient
`surface-dark-shell::before` override'ı:
```css
/* vista-construction spesifik — orange gradient YOK, altın gradient var */
radial-gradient(circle at top left, rgb(184 169 138 / 0.14), transparent 30%)
```

### Media Overlay
Proje fotoğraflarında overlay tonu: `rgb(20 19 17 / 0.82)` (sıcak siyah, soğuk değil)

---

## 19. globals.css Uygulama Sırası

`frontend/src/styles/globals.css` şu bölümleri sırayla içermelidir:

```
1. @import "tailwindcss";
2. @plugin "@tailwindcss/typography";
3. :root, html[data-theme-template='vista-construction'] { ... primitive tokenlar ... }
4. html[data-theme-mode='light'], :root:not([data-theme-mode]) { ... surface + semantic ... }
5. html[data-theme-mode='dark'] { ... surface + semantic ... }
6. /* Base reset */ html, body, headings, scrollbar, focus-visible
7. /* Utility classes */ section-py, text-balance, surface-*, media-*, btn-*, chip-*, shadow-*
8. /* Animasyonlar */ @keyframes + motion-* + .reveal
9. /* Prose */ .prose-theme
10. /* Accessibility */ prefers-reduced-motion
```

---

## 20. Tema Audit Checklist

Her anlamlı değişiklikten sonra:

### Root Contract
- [ ] `html[data-theme-mode]` çalışıyor
- [ ] `color-scheme` mode ile senkron
- [ ] Light selector dark mode'u specificity ile ezip ezmiyor

### Token Kontrolü
- [ ] `npm run test:theme` geçiyor
- [ ] Raw hex (`#ffffff`, `#000`, `#b8a98a`) component içinde yok
- [ ] `bg-white`, `text-white`, `bg-black` component içinde yok (bilinçli istisnalar hariç)
- [ ] `dark:*` class yok
- [ ] Legacy token (`--slate-*`, `--brand-*`, `--carbon-*`) yeni kodda yok

### Tipografi
- [ ] Syne font başlıklarda yükleniyor (DevTools Network)
- [ ] DM Sans body'de aktif
- [ ] `letter-spacing: -0.02em` h1-h3'de uygulanmış

### Surface Utility
- [ ] Kart bileşenler `surface-card` veya `surface-card-muted` kullanıyor
- [ ] Koyu section'lar `surface-dark-*` utility'leri kullanıyor
- [ ] CTA section `surface-brand-cta` veya `surface-dark-shell` kullanıyor

### Locale Parity
- [ ] TR ve EN locale'de aynı tema kontratı çalışıyor

### Build
- [ ] `npm run build` hata yok
- [ ] `npm run type-check` hata yok

### Audit Sırası
1. Root / layout
2. Header + Footer + Mobile menü
3. Anasayfa (hero, sections)
4. Projeler listing + kart
5. Proje detay
6. Hizmetler
7. Hakkımızda + İletişim
8. Formlar
9. Floating widgets (WhatsApp, ScrollToTop)

---

## 21. Kaynak Dosyalar

| Dosya | İçerik |
|-------|--------|
| `frontend/src/styles/globals.css` | Tüm token ve utility tanımları |
| `frontend/src/theme/templates.ts` | Template + intent sabitleri |
| `frontend/src/lib/preferences/theme.ts` | ThemeMode tipi ve sabitleri |
| `frontend/src/lib/preferences/theme-utils.ts` | applyThemeMode(), applyThemePreset() |
| `frontend/src/scripts/theme-boot.tsx` | Pre-hydration inline script |
| `frontend/src/components/theme/ThemeToggle.tsx` | Toggle UI bileşeni |

---

*Son güncelleme: 2026-03-13*
*Template: `vista-construction` | Intent: `premium-editorial-neutral-gold`*
