-- =============================================================
-- FILE: 312_vistainsaat_seo_pages.seed.sql
-- Vista İnşaat — Sayfa bazlı SEO verileri
-- Key: vistainsaat__seo_pages (locale: tr, en)
-- Frontend'deki hardcoded SEO değerlerinin backend karşılığı
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- =============================================================
-- SEO PAGES — TR
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__seo_pages',
  'tr',
  CAST(JSON_OBJECT(
    'home', JSON_OBJECT(
      'title', 'Güvenilir İnşaat ve Mimarlık Hizmetleri',
      'description', 'Vista İnşaat – Antalya merkezli konut, ticari ve karma kullanım projelerinde kaliteli, zamanında ve güvenilir inşaat çözümleri.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'projeler', JSON_OBJECT(
      'title', 'Projelerimiz - İnşaat Portföyü',
      'description', 'Vista İnşaat tarafından tamamlanan ve devam eden konut, ticari ve endüstriyel inşaat projeleri portföyü.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'hizmetler', JSON_OBJECT(
      'title', 'Faaliyet Alanlarımız',
      'description', 'Konut inşaatı, ticari yapılar, restorasyon, proje yönetimi ve mimari tasarım hizmetlerimiz.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'galeri', JSON_OBJECT(
      'title', 'Galeri - İnşaat Proje Görselleri',
      'description', 'Vista İnşaat projelerinden yapım süreci fotoğrafları, mimari detaylar ve tamamlanan uygulamalar.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'haberler', JSON_OBJECT(
      'title', 'Haberler - Mimarlık ve İnşaat Haberleri',
      'description', 'İnşaat sektörü haberleri, proje güncellemeleri ve Vista İnşaat blog yazıları.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'hakkimizda', JSON_OBJECT(
      'title', 'Hakkımızda',
      'description', 'Vista İnşaat – Antalya merkezli, konut ve ticari projelerde uzmanlaşmış güvenilir inşaat ve mimarlık firması.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'iletisim', JSON_OBJECT(
      'title', 'İletişim',
      'description', 'Vista İnşaat ile iletişime geçin. Antalya ofisimiz, telefon, e-posta ve konum bilgileri.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'teklif', JSON_OBJECT(
      'title', 'Teklif Al - Proje Değerlendirme',
      'description', 'İnşaat projeniz için Vista İnşaat''tan ücretsiz teklif ve proje değerlendirmesi alın.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'legal_privacy', JSON_OBJECT(
      'title', 'Gizlilik Politikası',
      'description', 'Vista İnşaat ile paylaşılan iletişim, teklif ve teknik proje verilerinin nasıl ele alındığına dair özet bilgi.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'legal_terms', JSON_OBJECT(
      'title', 'Kullanım Koşulları',
      'description', 'Vista İnşaat web sitesi, teknik içerikler ve teklif iletişim kanallarının kullanımına dair genel koşullar.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SEO PAGES — EN
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__seo_pages',
  'en',
  CAST(JSON_OBJECT(
    'home', JSON_OBJECT(
      'title', 'Reliable Construction and Architecture Services',
      'description', 'Vista Construction – Quality, on-time and reliable construction solutions for residential, commercial and mixed-use projects in Antalya.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'projeler', JSON_OBJECT(
      'title', 'Our Projects - Construction Portfolio',
      'description', 'Portfolio of completed and ongoing residential, commercial and industrial construction projects by Vista Construction.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'hizmetler', JSON_OBJECT(
      'title', 'Our Activity Areas',
      'description', 'Residential construction, commercial buildings, restoration, project management and architectural design services.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'galeri', JSON_OBJECT(
      'title', 'Gallery - Construction Project Images',
      'description', 'Construction process photos, architectural details and completed applications from Vista Construction projects.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'haberler', JSON_OBJECT(
      'title', 'News - Architecture & Construction News',
      'description', 'Construction industry news, project updates and Vista Construction blog articles.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'hakkimizda', JSON_OBJECT(
      'title', 'About Us',
      'description', 'Vista Construction – A reliable construction and architecture firm based in Antalya, specializing in residential and commercial projects.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'iletisim', JSON_OBJECT(
      'title', 'Contact',
      'description', 'Get in touch with Vista Construction. Our Antalya office, phone, email and location information.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'teklif', JSON_OBJECT(
      'title', 'Get a Quote - Project Evaluation',
      'description', 'Get a free quote and project evaluation from Vista Construction for your building project.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'legal_privacy', JSON_OBJECT(
      'title', 'Privacy Policy',
      'description', 'Overview of how Vista Construction handles contact, quotation and technical project data.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    ),
    'legal_terms', JSON_OBJECT(
      'title', 'Terms of Use',
      'description', 'General terms for using the Vista Construction website, technical content and quotation communication channels.',
      'og_image', '/uploads/logo/og.png',
      'no_index', false
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);
