-- =============================================================
-- FILE: 313_vistainsaat_general_settings.seed.sql
-- Vista İnşaat — Genel ayarlar (socials, businessHours, company_profile, ui_header)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- =============================================================
-- SOCIALS — TR
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__socials',
  'tr',
  CAST(JSON_OBJECT(
    'instagram', 'https://www.instagram.com/vistainsaat',
    'facebook', 'https://www.facebook.com/vistainsaat',
    'linkedin', 'https://www.linkedin.com/company/vistainsaat',
    'youtube', '',
    'x', '',
    'tiktok', '',
    'whatsapp', '+905323100000'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SOCIALS — EN
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__socials',
  'en',
  CAST(JSON_OBJECT(
    'instagram', 'https://www.instagram.com/vistainsaat',
    'facebook', 'https://www.facebook.com/vistainsaat',
    'linkedin', 'https://www.linkedin.com/company/vistainsaat',
    'youtube', '',
    'x', '',
    'tiktok', '',
    'whatsapp', '+905323100000'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- BUSINESS HOURS — TR
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__businessHours',
  'tr',
  CAST(JSON_ARRAY(
    JSON_OBJECT('day', 'Pazartesi', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Salı', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Çarşamba', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Perşembe', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Cuma', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Cumartesi', 'open', '09:00', 'close', '14:00', 'closed', false),
    JSON_OBJECT('day', 'Pazar', 'open', '00:00', 'close', '00:00', 'closed', true)
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- BUSINESS HOURS — EN
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__businessHours',
  'en',
  CAST(JSON_ARRAY(
    JSON_OBJECT('day', 'Monday', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Tuesday', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Wednesday', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Thursday', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Friday', 'open', '08:00', 'close', '18:00', 'closed', false),
    JSON_OBJECT('day', 'Saturday', 'open', '09:00', 'close', '14:00', 'closed', false),
    JSON_OBJECT('day', 'Sunday', 'open', '00:00', 'close', '00:00', 'closed', true)
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- COMPANY PROFILE — TR
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__company_profile',
  'tr',
  CAST(JSON_OBJECT(
    'company_name', 'Vista İnşaat',
    'slogan', 'Kalite · Güven · Zamanında Teslim',
    'about', 'Vista İnşaat, Antalya merkezli olarak konut, ticari ve endüstriyel projelerde anahtar teslim inşaat çözümleri sunan güvenilir bir inşaat ve mimarlık firmasıdır. Deneyimli mühendis kadromuz ve modern yapı teknolojileri ile projelerinizi zamanında ve bütçe dahilinde tamamlıyoruz.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- COMPANY PROFILE — EN
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__company_profile',
  'en',
  CAST(JSON_OBJECT(
    'company_name', 'Vista Construction',
    'slogan', 'Quality · Trust · On-Time Delivery',
    'about', 'Vista Construction is a reliable construction and architecture firm based in Antalya, offering turnkey building solutions for residential, commercial and industrial projects. Our experienced engineering team and modern construction technologies ensure your projects are completed on time and within budget.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- UI HEADER — TR
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__ui_header',
  'tr',
  CAST(JSON_OBJECT(
    'nav_home', 'Ana Sayfa',
    'nav_products', 'Projeler',
    'nav_services', 'Hizmetler',
    'nav_gallery', 'Galeri',
    'nav_news', 'Haberler',
    'nav_about', 'Hakkımızda',
    'nav_contact', 'İletişim',
    'cta_label', 'Teklif Al'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- UI HEADER — EN
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__ui_header',
  'en',
  CAST(JSON_OBJECT(
    'nav_home', 'Home',
    'nav_products', 'Projects',
    'nav_services', 'Services',
    'nav_gallery', 'Gallery',
    'nav_news', 'News',
    'nav_about', 'About',
    'nav_contact', 'Contact',
    'cta_label', 'Get a Quote'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);
