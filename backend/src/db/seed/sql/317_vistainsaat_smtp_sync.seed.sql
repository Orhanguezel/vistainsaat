-- =============================================================
-- FILE: 317_vistainsaat_smtp_sync.seed.sql
-- Vista İnşaat — Sync SMTP settings with .env defaults
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- SMTP SETTINGS — global (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES 
(UUID(), 'smtp_host', '*', 'smtp.hostinger.com', NOW(3), NOW(3)),
(UUID(), 'smtp_port', '*', '465', NOW(3), NOW(3)),
(UUID(), 'smtp_username', '*', 'info@koenigsmassage.com', NOW(3), NOW(3)),
(UUID(), 'smtp_password', '*', 'Kaman@12!', NOW(3), NOW(3)),
(UUID(), 'smtp_from_email', '*', 'info@koenigsmassage.com', NOW(3), NOW(3)),
(UUID(), 'smtp_from_name', '*', 'Vista İnşaat', NOW(3), NOW(3)),
(UUID(), 'smtp_ssl', '*', 'true', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = VALUES(`updated_at`);

COMMIT;
