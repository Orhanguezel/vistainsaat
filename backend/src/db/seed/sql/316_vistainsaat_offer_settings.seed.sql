-- =============================================================
-- FILE: 316_vistainsaat_offer_settings.seed.sql
-- Vista İnşaat — Offer module admin notifications
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- OFFERS ADMIN EMAIL — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES 
(UUID(), 'offers_admin_email', '*', 'orhanguzell@gmail.com', NOW(3), NOW(3)),
(UUID(), 'vistainsaat__offers_admin_email', '*', 'orhanguzell@gmail.com', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- OFFERS ADMIN USER IDS — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES 
(UUID(), 'offers_admin_user_ids', '*', '4f618a8d-6fdb-498c-898a-395d368b2193', NOW(3), NOW(3)),
(UUID(), 'vistainsaat__offers_admin_user_ids', '*', '4f618a8d-6fdb-498c-898a-395d368b2193', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

COMMIT;
