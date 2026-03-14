-- =============================================================
-- FILE: 309_vistainsaat_news_categories.seed.sql
-- Vista İnşaat — Haber kategorileri + i18n (TR/EN)
-- module_key = 'news'
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
  ('nccc0001-4001-4001-8001-nncccccc0001', 'news', NULL, NULL, NULL, NULL, 1, 1, 10),
  ('nccc0002-4002-4002-8002-nncccccc0002', 'news', NULL, NULL, NULL, NULL, 1, 1, 20),
  ('nccc0003-4003-4003-8003-nncccccc0003', 'news', NULL, NULL, NULL, NULL, 1, 0, 30),
  ('nccc0004-4004-4004-8004-nncccccc0004', 'news', NULL, NULL, NULL, NULL, 1, 0, 40),
  ('nccc0005-4005-4005-8005-nncccccc0005', 'news', NULL, NULL, NULL, NULL, 1, 0, 50)
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
  ('nccc0001-4001-4001-8001-nncccccc0001', 'tr', 'Röportajlar', 'roportajlar', 'Mimarlık ve inşaat sektöründen röportajlar ve söyleşiler'),
  ('nccc0002-4002-4002-8002-nncccccc0002', 'tr', 'Sektör Haberleri', 'sektor-haberleri', 'İnşaat ve mimarlık sektöründen güncel haberler'),
  ('nccc0003-4003-4003-8003-nncccccc0003', 'tr', 'Proje Haberleri', 'proje-haberleri', 'Yeni proje duyuruları ve proje güncellemeleri'),
  ('nccc0004-4004-4004-8004-nncccccc0004', 'tr', 'Teknoloji', 'teknoloji', 'Yapı teknolojileri, akıllı bina ve inovasyon haberleri'),
  ('nccc0005-4005-4005-8005-nncccccc0005', 'tr', 'Sürdürülebilirlik', 'surdurulebilirlik', 'Yeşil bina, enerji verimliliği ve çevreci yapı haberleri')
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
  ('nccc0001-4001-4001-8001-nncccccc0001', 'en', 'Interviews', 'interviews', 'Interviews and conversations from the architecture and construction sector'),
  ('nccc0002-4002-4002-8002-nncccccc0002', 'en', 'Industry News', 'industry-news', 'Current news from the construction and architecture industry'),
  ('nccc0003-4003-4003-8003-nncccccc0003', 'en', 'Project News', 'project-news', 'New project announcements and project updates'),
  ('nccc0004-4004-4004-8004-nncccccc0004', 'en', 'Technology', 'technology', 'Building technologies, smart buildings and innovation news'),
  ('nccc0005-4005-4005-8005-nncccccc0005', 'en', 'Sustainability', 'sustainability', 'Green building, energy efficiency and eco-friendly construction news')
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `slug` = VALUES(`slug`),
  `description` = VALUES(`description`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
