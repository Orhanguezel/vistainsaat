-- =============================================================
-- 040_site_settings.sql (Vista İnşaat) – MULTI-LOCALE (Dynamic) [FIXED]
--  - app_locales + default_locale => locale='*'
--  - localized settings => locale in ('tr','en')
--  - cookie_consent => LOCALIZED (tr/en)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- =============================================================
-- TABLE
-- =============================================================
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id`         CHAR(36)      NOT NULL,
  `key`        VARCHAR(100)  NOT NULL,
  `locale`     VARCHAR(8)    NOT NULL,
  `value`      TEXT          NOT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
               ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_locale_uq` (`key`, `locale`),
  KEY `site_settings_key_idx` (`key`),
  KEY `site_settings_locale_idx` (`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- GLOBAL: app_locales (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'app_locales',
  '*',
  CAST(
    JSON_ARRAY(
      JSON_OBJECT('code','tr','label','Türkçe','is_default', TRUE, 'is_active', TRUE),
      JSON_OBJECT('code','en','label','English','is_default', FALSE, 'is_active', TRUE)
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: default_locale (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'default_locale', '*', 'tr', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: TR içerik ayarları
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'contact_info',
  'tr',
  CAST(JSON_OBJECT(
    'companyName','Vista İnşaat',
    'phones',JSON_ARRAY(),
    'email','info@vistainsaat.com',
    'address','',
    'addressSecondary','',
    'whatsappNumber','',
    'taxOffice','',
    'taxNumber','',
    'website','https://www.vistainsaat.com'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(UUID(), 'catalog_pdf_url',        'tr', 'https://www.vistainsaat.com/uploads/vistainsaat/catalog/vistainsaat-katalog.pdf', NOW(3), NOW(3)),
(UUID(), 'catalog_pdf_filename',   'tr', 'vistainsaat-katalog.pdf', NOW(3), NOW(3)),
(UUID(), 'catalog_admin_email',    'tr', 'info@vistainsaat.com', NOW(3), NOW(3)),
(UUID(), 'site_title',             'tr', 'Vista İnşaat', NOW(3), NOW(3)),
(
  UUID(),
  'socials',
  'tr',
  CAST(JSON_OBJECT(
    'instagram','https://instagram.com/vistainsaat',
    'facebook','https://facebook.com/vistainsaat',
    'youtube','https://youtube.com/@vistainsaat',
    'linkedin','https://linkedin.com/company/vistainsaat',
    'x','https://x.com/vistainsaat',
    'tiktok','https://www.tiktok.com/@vistainsaat'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'company_profile',
  'tr',
  CAST(JSON_OBJECT(
    'headline','Vista İnşaat – Güvenilir ve Kaliteli Yapı Çözümleri',
    'subline','Konut, ticari ve endüstriyel projelerde yenilikçi inşaat çözümleri sunarak yaşam alanlarınızı şekillendiriyoruz.',
    'body','Vista İnşaat, konut, ticari ve endüstriyel yapı projelerinde kaliteli ve sürdürülebilir çözümler üreten bir inşaat firmasıdır. Müşteri memnuniyetini ön planda tutarak, modern mühendislik teknikleri ve yenilikçi tasarım anlayışıyla projeler hayata geçirmekteyiz.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'company_brand',
  'tr',
  CAST(JSON_OBJECT(
    'name','Vista İnşaat',
    'shortName','Vista İnşaat',
    'website','https://www.vistainsaat.com'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'catalog_admin_user_ids',
  'tr',
  CAST(JSON_ARRAY() AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: EN içerik ayarları
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'catalog_pdf_url',        'en', 'https://www.vistainsaat.com/uploads/vistainsaat/catalog/vistainsaat-catalog.pdf', NOW(3), NOW(3)),
(UUID(), 'catalog_pdf_filename',   'en', 'vistainsaat-catalog.pdf', NOW(3), NOW(3)),
(UUID(), 'catalog_admin_email',    'en', 'info@vistainsaat.com', NOW(3), NOW(3)),
(UUID(), 'site_title',             'en', 'Vista İnşaat', NOW(3), NOW(3)),
(
  UUID(),
  'contact_info',
  'en',
  CAST(JSON_OBJECT(
    'companyName','Vista İnşaat',
    'phones',JSON_ARRAY(),
    'email','info@vistainsaat.com',
    'address','',
    'addressSecondary','',
    'whatsappNumber','',
    'taxOffice','',
    'taxNumber','',
    'website','https://www.vistainsaat.com'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'socials',
  'en',
  CAST(JSON_OBJECT(
    'instagram','https://instagram.com/vistainsaat',
    'facebook','https://facebook.com/vistainsaat',
    'youtube','https://youtube.com/@vistainsaat',
    'linkedin','https://linkedin.com/company/vistainsaat',
    'x','https://x.com/vistainsaat',
    'tiktok',''
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'company_brand',
  'en',
  CAST(JSON_OBJECT(
    'name','Vista İnşaat',
    'shortName','Vista İnşaat',
    'website','https://www.vistainsaat.com'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'company_profile',
  'en',
  CAST(JSON_OBJECT(
    'headline','Vista İnşaat – Reliable and Quality Construction Solutions',
    'subline','We shape living spaces by providing innovative construction solutions in residential, commercial, and industrial projects.',
    'body','Vista İnşaat is a construction company that delivers high-quality and sustainable solutions for residential, commercial, and industrial building projects. Prioritizing customer satisfaction, we bring projects to life using modern engineering techniques and innovative design approaches.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: Storage (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'storage_driver',             '*', 'cloudinary',                                  NOW(3), NOW(3)),
(UUID(), 'storage_local_root',         '*', '/var/www/vistainsaat/uploads',                NOW(3), NOW(3)),
(UUID(), 'storage_local_base_url',     '*', '/uploads',                                    NOW(3), NOW(3)),
(UUID(), 'cloudinary_cloud_name',      '*', 'dbozv7wqd',                                   NOW(3), NOW(3)),
(UUID(), 'cloudinary_api_key',         '*', '644676135993432',                             NOW(3), NOW(3)),
(UUID(), 'cloudinary_api_secret',      '*', 'C2VWxsJ5j0jZpcxOhvuTOTKhaMo',                 NOW(3), NOW(3)),
(UUID(), 'cloudinary_folder',          '*', 'uploads/vistainsaat',                         NOW(3), NOW(3)),
(UUID(), 'cloudinary_unsigned_preset', '*', 'vistainsaat_unsigned',                        NOW(3), NOW(3)),
(UUID(), 'storage_cdn_public_base',    '*', 'https://res.cloudinary.com',                  NOW(3), NOW(3)),
(UUID(), 'storage_public_api_base',    '*', 'https://www.vistainsaat.com/api',             NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: Public Base URL (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'public_base_url', '*', 'https://www.vistainsaat.com', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: SMTP (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'smtp_host',       '*', 'smtp.example.com',        NOW(3), NOW(3)),
(UUID(), 'smtp_port',       '*', '465',                     NOW(3), NOW(3)),
(UUID(), 'smtp_username',   '*', 'info@vistainsaat.com',    NOW(3), NOW(3)),
(UUID(), 'smtp_password',   '*', 'change-me-in-admin',      NOW(3), NOW(3)),
(UUID(), 'smtp_from_email', '*', 'info@vistainsaat.com',    NOW(3), NOW(3)),
(UUID(), 'smtp_from_name',  '*', 'Vista İnşaat',            NOW(3), NOW(3)),
(UUID(), 'smtp_ssl',        '*', 'true',                    NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: Google OAuth (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'google_client_id',     '*', 'your-google-client-id.apps.googleusercontent.com', NOW(3), NOW(3)),
(UUID(), 'google_client_secret', '*', 'change-me-in-admin',                               NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: GTM + GA4 (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'gtm_container_id',   '*', 'GTM-XXXXXXXX', NOW(3), NOW(3)),
(UUID(), 'ga4_measurement_id', '*', 'G-XXXXXXXXXX', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);


-- =============================================================
-- GLOBAL: Site Media (locale='*')
-- Keys:
--  - site_logo
--  - site_logo_dark
--  - site_logo_light
--  - site_favicon
--  - site_apple_touch_icon   (180x180)
--  - site_app_icon_512       (512x512 manifest/icon)
--  - site_og_default_image   (1200x630 OG default)
--
-- Value format:
--  - simplest: URL string
--  - optional: JSON_OBJECT('url',..., 'width',..., 'height',..., 'asset_id',..., 'alt',...)
-- Service layer parseMediaUrl() supports both.
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'site_logo',
  '*',
  CAST(
    JSON_OBJECT(
      'url','/logo/vista-logo-light.svg',
      'dark_url','/logo/vista-logo-dark.svg',
      'width',160,
      'height',60,
      'alt','Vista İnşaat Logo'
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'site_logo_dark',
  '*',
  CAST(
    JSON_OBJECT(
      'url','/logo/vista-logo-dark.svg',
      'width',160,
      'height',60,
      'alt','Vista İnşaat Logo (Dark)'
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'site_logo_light',
  '*',
  CAST(
    JSON_OBJECT(
      'url','/logo/vista-logo-light.svg',
      'width',160,
      'height',60,
      'alt','Vista İnşaat Logo (Light)'
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'site_favicon',
  '*',
  CAST(
    JSON_OBJECT(
      'url','/favicon/favicon-32.png',
      'alt','Vista İnşaat Favicon'
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'site_apple_touch_icon',
  '*',
  CAST(
    JSON_OBJECT(
      'url','/favicon/apple-touch-icon.png',
      'alt','Vista İnşaat Apple Touch Icon'
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'site_app_icon_512',
  '*',
  CAST(
    JSON_OBJECT(
      'url','/logo/png/vista_logo_512.png',
      'alt','Vista İnşaat App Icon (512x512)'
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'site_og_default_image',
  '*',
  CAST(
    JSON_OBJECT(
      'url','/logo/png/vista_logo_512.png',
      'width',1200,
      'height',630,
      'alt','Vista İnşaat'
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: Cookie Consent Config (tr/en)
-- consent_version değişince tekrar onay al
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'cookie_consent',
  'tr',
  CAST(
    JSON_OBJECT(
      'consent_version', 1,
      'defaults', JSON_OBJECT('necessary', TRUE, 'analytics', FALSE, 'marketing', FALSE),
      'ui', JSON_OBJECT('enabled', TRUE, 'position', 'bottom', 'show_reject_all', TRUE),
      'texts', JSON_OBJECT(
        'title', 'Çerez Tercihleri',
        'description', 'Sitemizin doğru çalışmasını sağlamak ve isteğe bağlı analiz yapmak için çerezler kullanıyoruz. Tercihlerinizi yönetebilirsiniz.'
      )
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'cookie_consent',
  'en',
  CAST(
    JSON_OBJECT(
      'consent_version', 1,
      'defaults', JSON_OBJECT('necessary', TRUE, 'analytics', FALSE, 'marketing', FALSE),
      'ui', JSON_OBJECT('enabled', TRUE, 'position', 'bottom', 'show_reject_all', TRUE),
      'texts', JSON_OBJECT(
        'title', 'Cookie Preferences',
        'description', 'We use cookies to ensure the site works properly and to optionally analyze traffic. You can manage your preferences.'
      )
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
