-- =============================================================
-- FILE: 300_vistainsaat_categories.seed.sql
-- Vista İnşaat — Proje kategorileri + i18n (TR/EN)
-- module_key = 'vistainsaat'
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- =========================
-- 1) CATEGORIES (BASE)
-- =========================
INSERT INTO `categories`
(
  `id`,
  `module_key`,
  `image_url`,
  `storage_asset_id`,
  `alt`,
  `icon`,
  `is_active`,
  `is_featured`,
  `display_order`
)
VALUES
  ('cccc0001-4001-4001-8001-cccccccc0001', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 1, 10),
  ('cccc0002-4002-4002-8002-cccccccc0002', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 1, 20),
  ('cccc0003-4003-4003-8003-cccccccc0003', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 1, 30),
  ('cccc0004-4004-4004-8004-cccccccc0004', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 0, 40),
  ('cccc0005-4005-4005-8005-cccccccc0005', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 0, 50),
  ('cccc0006-4006-4006-8006-cccccccc0006', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 0, 60),
  ('cccc0007-4007-4007-8007-cccccccc0007', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 0, 70),
  ('cccc0008-4008-4008-8008-cccccccc0008', 'vistainsaat', NULL, NULL, NULL, NULL, 1, 0, 80)
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`),
  `is_active` = VALUES(`is_active`),
  `display_order` = VALUES(`display_order`);

-- =========================
-- 2) CATEGORY I18N — TR
-- =========================
INSERT INTO `category_i18n`
(
  `category_id`,
  `locale`,
  `name`,
  `slug`,
  `description`
)
VALUES
  ('cccc0001-4001-4001-8001-cccccccc0001', 'tr', 'Konut Projeleri', 'konut-projeleri', 'Villalar, apartmanlar ve rezidans gibi konut yapı projeleri'),
  ('cccc0002-4002-4002-8002-cccccccc0002', 'tr', 'Ticari Projeler', 'ticari-projeler', 'Ofis, AVM, otel ve ticari yapı projeleri'),
  ('cccc0003-4003-4003-8003-cccccccc0003', 'tr', 'Karma Kullanım', 'karma-kullanim', 'Konut ve ticari alanların bir arada yer aldığı karma projeler'),
  ('cccc0004-4004-4004-8004-cccccccc0004', 'tr', 'Restorasyon', 'restorasyon', 'Tarihi yapılar ve mevcut binaların yenilenmesi'),
  ('cccc0005-4005-4005-8005-cccccccc0005', 'tr', 'Altyapı ve Çevre Düzenlemesi', 'altyapi-cevre-duzenlemesi', 'Yol, park, peyzaj ve altyapı projeleri'),
  ('cccc0006-4006-4006-8006-cccccccc0006', 'tr', 'Endüstriyel Yapılar', 'endustriyel-yapilar', 'Fabrika, depo ve endüstriyel tesis projeleri'),
  ('cccc0007-4007-4007-8007-cccccccc0007', 'tr', 'Mimari Tasarım', 'mimari-tasarim', 'Özel tasarım ve mimari proje çözümleri'),
  ('cccc0008-4008-4008-8008-cccccccc0008', 'tr', 'Markalar', 'markalar', 'Proje ve imalat süreçlerimizde kullandığımız dünya devi markalar')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `slug` = VALUES(`slug`),
  `description` = VALUES(`description`);

-- =========================
-- 3) CATEGORY I18N — EN
-- =========================
INSERT INTO `category_i18n`
(
  `category_id`,
  `locale`,
  `name`,
  `slug`,
  `description`
)
VALUES
  ('cccc0001-4001-4001-8001-cccccccc0001', 'en', 'Residential Projects', 'residential-projects', 'Villas, apartments, and residential building projects'),
  ('cccc0002-4002-4002-8002-cccccccc0002', 'en', 'Commercial Projects', 'commercial-projects', 'Office, shopping mall, hotel, and commercial building projects'),
  ('cccc0003-4003-4003-8003-cccccccc0003', 'en', 'Mixed-Use Development', 'mixed-use-development', 'Projects combining residential and commercial spaces'),
  ('cccc0004-4004-4004-8004-cccccccc0004', 'en', 'Restoration', 'restoration', 'Renovation of historic buildings and existing structures'),
  ('cccc0005-4005-4005-8005-cccccccc0005', 'en', 'Infrastructure & Landscaping', 'infrastructure-landscaping', 'Road, park, landscaping, and infrastructure projects'),
  ('cccc0006-4006-4006-8006-cccccccc0006', 'en', 'Industrial Buildings', 'industrial-buildings', 'Factory, warehouse, and industrial facility projects'),
  ('cccc0007-4007-4007-8007-cccccccc0007', 'en', 'Architectural Design', 'architectural-design', 'Custom design and architectural project solutions'),
  ('cccc0008-4008-4008-8008-cccccccc0008', 'en', 'Brands', 'brands', 'World-leading brands we use in our project and production processes')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `slug` = VALUES(`slug`),
  `description` = VALUES(`description`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
