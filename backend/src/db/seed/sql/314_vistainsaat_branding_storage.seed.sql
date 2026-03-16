-- =============================================================
-- FILE: 314_vistainsaat_branding_storage.seed.sql
-- Vista İnşaat — Branding dosyalarını storage_assets'e kaydet
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

INSERT INTO `storage_assets` (`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `metadata`, `created_at`, `updated_at`)
VALUES
  ('sa-brand-0001-0001-0001-000000000001', NULL, 'logo-light.svg', 'logo', 'branding/logo-light.svg', 'logo', 'image/svg+xml', 1807, NULL, NULL, '/uploads/logo/logo-light.svg', 'local', 'branding/logo-light.svg', 'image', 'svg', '{"label": "Vista İnşaat Logo (Light)"}', NOW(3), NOW(3)),
  ('sa-brand-0002-0002-0002-000000000002', NULL, 'logo-dark.svg', 'logo', 'branding/logo-dark.svg', 'logo', 'image/svg+xml', 1807, NULL, NULL, '/uploads/logo/logo-dark.svg', 'local', 'branding/logo-dark.svg', 'image', 'svg', '{"label": "Vista İnşaat Logo (Dark)"}', NOW(3), NOW(3)),
  ('sa-brand-0003-0003-0003-000000000003', NULL, 'favicon-32.png', 'logo', 'branding/favicon-32.png', 'logo', 'image/png', 1037, 32, 32, '/uploads/logo/favicon-32.png', 'local', 'branding/favicon-32.png', 'image', 'png', '{"label": "Favicon 32x32"}', NOW(3), NOW(3)),
  ('sa-brand-0004-0004-0004-000000000004', NULL, 'favicon-64.png', 'logo', 'branding/favicon-64.png', 'logo', 'image/png', 2462, 64, 64, '/uploads/logo/favicon-64.png', 'local', 'branding/favicon-64.png', 'image', 'png', '{"label": "Favicon 64x64"}', NOW(3), NOW(3)),
  ('sa-brand-0005-0005-0005-000000000005', NULL, 'apple-touch-icon.png', 'logo', 'branding/apple-touch-icon.png', 'logo', 'image/png', 6289, 180, 180, '/uploads/logo/apple-touch-icon.png', 'local', 'branding/apple-touch-icon.png', 'image', 'png', '{"label": "Apple Touch Icon"}', NOW(3), NOW(3)),
  ('sa-brand-0006-0006-0006-000000000006', NULL, 'icon-192.png', 'logo', 'branding/icon-192.png', 'logo', 'image/png', 7777, 192, 192, '/uploads/logo/icon-192.png', 'local', 'branding/icon-192.png', 'image', 'png', '{"label": "App Icon 192x192"}', NOW(3), NOW(3)),
  ('sa-brand-0007-0007-0007-000000000007', NULL, 'icon-512.png', 'logo', 'branding/icon-512.png', 'logo', 'image/png', 23022, 512, 512, '/uploads/logo/icon-512.png', 'local', 'branding/icon-512.png', 'image', 'png', '{"label": "App Icon 512x512"}', NOW(3), NOW(3)),
  ('sa-brand-0008-0008-0008-000000000008', NULL, 'maskable-512.png', 'logo', 'branding/maskable-512.png', 'logo', 'image/png', 23022, 512, 512, '/uploads/logo/maskable-512.png', 'local', 'branding/maskable-512.png', 'image', 'png', '{"label": "Maskable Icon 512x512"}', NOW(3), NOW(3)),
  ('sa-logo-og01-og01-og01-000000000001', NULL, 'og.png', 'logo', 'logo/og.png', 'logo', 'image/png', 565729, 604, 602, '/uploads/logo/og.png', 'local', 'logo/og.png', 'image', 'png', '{"label": "OG Default Image"}', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `url` = VALUES(`url`), `updated_at` = VALUES(`updated_at`);
