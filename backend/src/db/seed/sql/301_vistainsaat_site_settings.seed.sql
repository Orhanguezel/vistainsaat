-- =============================================================
-- FILE: 301_vistainsaat_site_settings.seed.sql
-- Vista İnşaat — site_settings (vistainsaat__ prefix)
-- Keys: app_locales, seo, logo, site_logo, site_favicon, site_apple_touch_icon, site_og_default_image, contact_info, branding
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- =============================================================
-- APP LOCALES — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__app_locales',
  '*',
  JSON_ARRAY(
    JSON_OBJECT('code', 'tr', 'label', 'Türkçe', 'is_default', true, 'is_active', true),
    JSON_OBJECT('code', 'en', 'label', 'English', 'is_default', false, 'is_active', true),
    JSON_OBJECT('code', 'de', 'label', 'Deutsch', 'is_default', false, 'is_active', false)
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SEO — TR
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__seo',
  'tr',
  JSON_OBJECT(
    'site_title',       'Vista İnşaat | Güvenilir İnşaat ve Mimarlık Hizmetleri',
    'site_description', 'Konut, ticari ve karma kullanım projelerinde kaliteli, zamanında ve güvenilir inşaat çözümleri.',
    'keywords',         'inşaat, mimarlık, konut projeleri, ticari projeler, proje yönetimi, anahtar teslim, Vista İnşaat',
    'og_image',         '',
    'og_type',          'website'
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SEO — EN
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__seo',
  'en',
  JSON_OBJECT(
    'site_title',       'Vista Construction | Reliable Construction and Architecture Services',
    'site_description', 'Quality, on-time and reliable construction solutions for residential, commercial and mixed-use projects.',
    'keywords',         'construction, architecture, residential projects, commercial projects, project management, turnkey, Vista Construction',
    'og_image',         '',
    'og_type',          'website'
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOGO — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__logo',
  '*',
  JSON_OBJECT(
    'logo_url',         '',
    'logo_alt',         'Vista İnşaat',
    'favicon_url',      '',
    'logo_dark_url',    ''
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SITE LOGO — global (locale='*')
-- Standard site_settings media keys under vistainsaat__ prefix
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__site_logo',
  '*',
  JSON_OBJECT(
    'logo_url',              '',
    'logo_alt',              'Vista İnşaat',
    'logo_dark_url',         '',
    'favicon_url',           '',
    'apple_touch_icon_url',  ''
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SITE FAVICON — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__site_favicon',
  '*',
  JSON_OBJECT(
    'url', '',
    'alt', 'Vista İnşaat Favicon'
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SITE APPLE TOUCH ICON — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__site_apple_touch_icon',
  '*',
  JSON_OBJECT(
    'url', '',
    'alt', 'Vista İnşaat Apple Touch Icon'
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- SITE OG DEFAULT IMAGE — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__site_og_default_image',
  '*',
  JSON_OBJECT(
    'url', '',
    'alt', 'Vista İnşaat OG Default Image'
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- CONTACT INFO — TR
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__contact_info',
  'tr',
  JSON_OBJECT(
    'company_name',     'Vista İnşaat',
    'address',          '',
    'city',             '',
    'country',          'Türkiye',
    'phone',            '',
    'phone_2',          '',
    'email',            'info@vistainsaat.com',
    'email_2',          '',
    'working_hours',    'Pazartesi - Cuma: 08:00 - 17:00',
    'maps_embed_url',   '',
    'maps_lat',         '',
    'maps_lng',         ''
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- CONTACT INFO — EN
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__contact_info',
  'en',
  JSON_OBJECT(
    'company_name',     'Vista İnşaat',
    'address',          '',
    'city',             '',
    'country',          'Turkey',
    'phone',            '',
    'phone_2',          '',
    'email',            'info@vistainsaat.com',
    'email_2',          '',
    'working_hours',    'Monday - Friday: 08:00 - 17:00',
    'maps_embed_url',   '',
    'maps_lat',         '',
    'maps_lng',         ''
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- BRANDING — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES (
  UUID(),
  'vistainsaat__branding',
  '*',
  JSON_OBJECT(
    'brand_name',       'Vista İnşaat',
    'brand_tagline_tr', 'Kalite · Güven · Zamanında Teslim',
    'brand_tagline_en', 'Quality · Trust · On-Time Delivery',
    'primary_color',    '#b8a98a',
    'accent_color',     '#d4c4a0',
    'dark_color',       '#141311',
    'font_family',      'DM Sans',
    'font_display',     'Syne'
  ),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
