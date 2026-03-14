-- =============================================================
-- FILE: 131_vistainsaat_storage_assets.seed.sql
-- Vista İnşaat — Local Storage Assets (uploads/)
-- provider = 'local', bucket = folder name
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- =========================
-- NEWS IMAGES
-- =========================
INSERT INTO `storage_assets`
(`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `hash`, `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `provider_version`, `etag`, `metadata`, `created_at`, `updated_at`)
VALUES
  ('sa-news-0001-0001-0001-000000000001', NULL, 'tolgahan-sahin-tolkan-mimarlik.jpg', 'news', 'news/tolgahan-sahin-tolkan-mimarlik.jpg', 'news', 'image/jpeg', 134950, 1200, 800, '/uploads/news/tolgahan-sahin-tolkan-mimarlik.jpg', NULL, 'local', 'news/tolgahan-sahin-tolkan-mimarlik.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-news-0002-0002-0002-000000000002', NULL, 'tolkan-mimarlik-ofis-projesi.jpg', 'news', 'news/tolkan-mimarlik-ofis-projesi.jpg', 'news', 'image/jpeg', 336633, 1200, 800, '/uploads/news/tolkan-mimarlik-ofis-projesi.jpg', NULL, 'local', 'news/tolkan-mimarlik-ofis-projesi.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-news-0003-0003-0003-000000000003', NULL, 'tolkan-mimarlik-roportaj-dergi.jpg', 'news', 'news/tolkan-mimarlik-roportaj-dergi.jpg', 'news', 'image/jpeg', 699096, 1200, 800, '/uploads/news/tolkan-mimarlik-roportaj-dergi.jpg', NULL, 'local', 'news/tolkan-mimarlik-roportaj-dergi.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-news-0004-0004-0004-000000000004', NULL, 'istanbul-levent-ofis-kulesi.jpg', 'news', 'news/istanbul-levent-ofis-kulesi.jpg', 'news', 'image/jpeg', 134318, 1200, 800, '/uploads/news/istanbul-levent-ofis-kulesi.jpg', NULL, 'local', 'news/istanbul-levent-ofis-kulesi.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-news-0005-0005-0005-000000000005', NULL, 'depreme-dayanikli-yapi.jpg', 'news', 'news/depreme-dayanikli-yapi.jpg', 'news', 'image/jpeg', 167669, 1200, 800, '/uploads/news/depreme-dayanikli-yapi.jpg', NULL, 'local', 'news/depreme-dayanikli-yapi.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-news-0006-0006-0006-000000000006', NULL, 'akilli-sehir-altyapi.jpg', 'news', 'news/akilli-sehir-altyapi.jpg', 'news', 'image/jpeg', 51607, 1200, 800, '/uploads/news/akilli-sehir-altyapi.jpg', NULL, 'local', 'news/akilli-sehir-altyapi.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-news-0007-0007-0007-000000000007', NULL, 'moduler-yapi-sistemleri.jpg', 'news', 'news/moduler-yapi-sistemleri.jpg', 'news', 'image/jpeg', 89188, 1200, 800, '/uploads/news/moduler-yapi-sistemleri.jpg', NULL, 'local', 'news/moduler-yapi-sistemleri.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `url` = VALUES(`url`),
  `size` = VALUES(`size`),
  `updated_at` = NOW();

-- =========================
-- SERVICE IMAGES
-- =========================
INSERT INTO `storage_assets`
(`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `hash`, `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `provider_version`, `etag`, `metadata`, `created_at`, `updated_at`)
VALUES
  ('sa-svc-0001-0001-0001-000000000001', NULL, 'konut-insaat-hizmeti.jpg', 'services', 'services/konut-insaat-hizmeti.jpg', 'services', 'image/jpeg', 139183, 1200, 800, '/uploads/services/konut-insaat-hizmeti.jpg', NULL, 'local', 'services/konut-insaat-hizmeti.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-svc-0002-0002-0002-000000000002', NULL, 'ticari-insaat-hizmeti.jpg', 'services', 'services/ticari-insaat-hizmeti.jpg', 'services', 'image/jpeg', 99435, 1200, 800, '/uploads/services/ticari-insaat-hizmeti.jpg', NULL, 'local', 'services/ticari-insaat-hizmeti.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-svc-0003-0003-0003-000000000003', NULL, 'restorasyon-hizmeti.jpg', 'services', 'services/restorasyon-hizmeti.jpg', 'services', 'image/jpeg', 184864, 1200, 800, '/uploads/services/restorasyon-hizmeti.jpg', NULL, 'local', 'services/restorasyon-hizmeti.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-svc-0004-0004-0004-000000000004', NULL, 'proje-yonetimi-hizmeti.jpg', 'services', 'services/proje-yonetimi-hizmeti.jpg', 'services', 'image/jpeg', 208260, 1200, 800, '/uploads/services/proje-yonetimi-hizmeti.jpg', NULL, 'local', 'services/proje-yonetimi-hizmeti.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `url` = VALUES(`url`),
  `size` = VALUES(`size`),
  `updated_at` = NOW();

-- =========================
-- PROJECT IMAGES (all 58)
-- =========================
INSERT INTO `storage_assets`
(`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `hash`, `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `provider_version`, `etag`, `metadata`, `created_at`, `updated_at`)
VALUES
  ('sa-prj-0001-0001-0001-000000000001', NULL, 'vista-insaat-proje-01.jpeg', 'projects', 'projects/vista-insaat-proje-01.jpeg', 'projects', 'image/jpeg', 986089, NULL, NULL, '/uploads/projects/vista-insaat-proje-01.jpeg', NULL, 'local', 'projects/vista-insaat-proje-01.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0002-0002-0002-000000000002', NULL, 'vista-insaat-proje-02.jpeg', 'projects', 'projects/vista-insaat-proje-02.jpeg', 'projects', 'image/jpeg', 1100853, NULL, NULL, '/uploads/projects/vista-insaat-proje-02.jpeg', NULL, 'local', 'projects/vista-insaat-proje-02.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0003-0003-0003-000000000003', NULL, 'vista-insaat-proje-03.jpeg', 'projects', 'projects/vista-insaat-proje-03.jpeg', 'projects', 'image/jpeg', 1353397, NULL, NULL, '/uploads/projects/vista-insaat-proje-03.jpeg', NULL, 'local', 'projects/vista-insaat-proje-03.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0004-0004-0004-000000000004', NULL, 'vista-insaat-proje-04.jpeg', 'projects', 'projects/vista-insaat-proje-04.jpeg', 'projects', 'image/jpeg', 844950, NULL, NULL, '/uploads/projects/vista-insaat-proje-04.jpeg', NULL, 'local', 'projects/vista-insaat-proje-04.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0005-0005-0005-000000000005', NULL, 'vista-insaat-proje-05.jpeg', 'projects', 'projects/vista-insaat-proje-05.jpeg', 'projects', 'image/jpeg', 746495, NULL, NULL, '/uploads/projects/vista-insaat-proje-05.jpeg', NULL, 'local', 'projects/vista-insaat-proje-05.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0006-0006-0006-000000000006', NULL, 'vista-insaat-proje-06.jpeg', 'projects', 'projects/vista-insaat-proje-06.jpeg', 'projects', 'image/jpeg', 179029, NULL, NULL, '/uploads/projects/vista-insaat-proje-06.jpeg', NULL, 'local', 'projects/vista-insaat-proje-06.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0007-0007-0007-000000000007', NULL, 'vista-insaat-proje-07.jpeg', 'projects', 'projects/vista-insaat-proje-07.jpeg', 'projects', 'image/jpeg', 1213154, NULL, NULL, '/uploads/projects/vista-insaat-proje-07.jpeg', NULL, 'local', 'projects/vista-insaat-proje-07.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0008-0008-0008-000000000008', NULL, 'vista-insaat-proje-08.jpeg', 'projects', 'projects/vista-insaat-proje-08.jpeg', 'projects', 'image/jpeg', 1092097, NULL, NULL, '/uploads/projects/vista-insaat-proje-08.jpeg', NULL, 'local', 'projects/vista-insaat-proje-08.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0009-0009-0009-000000000009', NULL, 'vista-insaat-proje-09.jpeg', 'projects', 'projects/vista-insaat-proje-09.jpeg', 'projects', 'image/jpeg', 914979, NULL, NULL, '/uploads/projects/vista-insaat-proje-09.jpeg', NULL, 'local', 'projects/vista-insaat-proje-09.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0010-0010-0010-000000000010', NULL, 'vista-insaat-proje-10.jpeg', 'projects', 'projects/vista-insaat-proje-10.jpeg', 'projects', 'image/jpeg', 737977, NULL, NULL, '/uploads/projects/vista-insaat-proje-10.jpeg', NULL, 'local', 'projects/vista-insaat-proje-10.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0011-0011-0011-000000000011', NULL, 'vista-insaat-proje-11.jpeg', 'projects', 'projects/vista-insaat-proje-11.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-11.jpeg', NULL, 'local', 'projects/vista-insaat-proje-11.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0012-0012-0012-000000000012', NULL, 'vista-insaat-proje-12.jpeg', 'projects', 'projects/vista-insaat-proje-12.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-12.jpeg', NULL, 'local', 'projects/vista-insaat-proje-12.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0013-0013-0013-000000000013', NULL, 'vista-insaat-proje-13.jpeg', 'projects', 'projects/vista-insaat-proje-13.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-13.jpeg', NULL, 'local', 'projects/vista-insaat-proje-13.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0014-0014-0014-000000000014', NULL, 'vista-insaat-proje-14.jpeg', 'projects', 'projects/vista-insaat-proje-14.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-14.jpeg', NULL, 'local', 'projects/vista-insaat-proje-14.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0015-0015-0015-000000000015', NULL, 'vista-insaat-proje-15.jpeg', 'projects', 'projects/vista-insaat-proje-15.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-15.jpeg', NULL, 'local', 'projects/vista-insaat-proje-15.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0016-0016-0016-000000000016', NULL, 'vista-insaat-proje-16.jpeg', 'projects', 'projects/vista-insaat-proje-16.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-16.jpeg', NULL, 'local', 'projects/vista-insaat-proje-16.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0017-0017-0017-000000000017', NULL, 'vista-insaat-proje-17.jpeg', 'projects', 'projects/vista-insaat-proje-17.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-17.jpeg', NULL, 'local', 'projects/vista-insaat-proje-17.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0018-0018-0018-000000000018', NULL, 'vista-insaat-proje-18.jpeg', 'projects', 'projects/vista-insaat-proje-18.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-18.jpeg', NULL, 'local', 'projects/vista-insaat-proje-18.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0019-0019-0019-000000000019', NULL, 'vista-insaat-proje-19.jpeg', 'projects', 'projects/vista-insaat-proje-19.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-19.jpeg', NULL, 'local', 'projects/vista-insaat-proje-19.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0020-0020-0020-000000000020', NULL, 'vista-insaat-proje-20.jpeg', 'projects', 'projects/vista-insaat-proje-20.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-20.jpeg', NULL, 'local', 'projects/vista-insaat-proje-20.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0021-0021-0021-000000000021', NULL, 'vista-insaat-proje-21.jpeg', 'projects', 'projects/vista-insaat-proje-21.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-21.jpeg', NULL, 'local', 'projects/vista-insaat-proje-21.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0022-0022-0022-000000000022', NULL, 'vista-insaat-proje-22.jpeg', 'projects', 'projects/vista-insaat-proje-22.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-22.jpeg', NULL, 'local', 'projects/vista-insaat-proje-22.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0023-0023-0023-000000000023', NULL, 'vista-insaat-proje-23.jpeg', 'projects', 'projects/vista-insaat-proje-23.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-23.jpeg', NULL, 'local', 'projects/vista-insaat-proje-23.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0024-0024-0024-000000000024', NULL, 'vista-insaat-proje-24.jpeg', 'projects', 'projects/vista-insaat-proje-24.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-24.jpeg', NULL, 'local', 'projects/vista-insaat-proje-24.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0025-0025-0025-000000000025', NULL, 'vista-insaat-proje-25.jpeg', 'projects', 'projects/vista-insaat-proje-25.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-25.jpeg', NULL, 'local', 'projects/vista-insaat-proje-25.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0026-0026-0026-000000000026', NULL, 'vista-insaat-proje-26.jpeg', 'projects', 'projects/vista-insaat-proje-26.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-26.jpeg', NULL, 'local', 'projects/vista-insaat-proje-26.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0027-0027-0027-000000000027', NULL, 'vista-insaat-proje-27.jpeg', 'projects', 'projects/vista-insaat-proje-27.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-27.jpeg', NULL, 'local', 'projects/vista-insaat-proje-27.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0028-0028-0028-000000000028', NULL, 'vista-insaat-proje-28.jpeg', 'projects', 'projects/vista-insaat-proje-28.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-28.jpeg', NULL, 'local', 'projects/vista-insaat-proje-28.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0029-0029-0029-000000000029', NULL, 'vista-insaat-proje-29.jpeg', 'projects', 'projects/vista-insaat-proje-29.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-29.jpeg', NULL, 'local', 'projects/vista-insaat-proje-29.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0030-0030-0030-000000000030', NULL, 'vista-insaat-proje-30.jpeg', 'projects', 'projects/vista-insaat-proje-30.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-30.jpeg', NULL, 'local', 'projects/vista-insaat-proje-30.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0031-0031-0031-000000000031', NULL, 'vista-insaat-proje-31.jpeg', 'projects', 'projects/vista-insaat-proje-31.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-31.jpeg', NULL, 'local', 'projects/vista-insaat-proje-31.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0032-0032-0032-000000000032', NULL, 'vista-insaat-proje-32.jpeg', 'projects', 'projects/vista-insaat-proje-32.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-32.jpeg', NULL, 'local', 'projects/vista-insaat-proje-32.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0033-0033-0033-000000000033', NULL, 'vista-insaat-proje-33.jpeg', 'projects', 'projects/vista-insaat-proje-33.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-33.jpeg', NULL, 'local', 'projects/vista-insaat-proje-33.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0034-0034-0034-000000000034', NULL, 'vista-insaat-proje-34.jpeg', 'projects', 'projects/vista-insaat-proje-34.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-34.jpeg', NULL, 'local', 'projects/vista-insaat-proje-34.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0035-0035-0035-000000000035', NULL, 'vista-insaat-proje-35.jpeg', 'projects', 'projects/vista-insaat-proje-35.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-35.jpeg', NULL, 'local', 'projects/vista-insaat-proje-35.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0036-0036-0036-000000000036', NULL, 'vista-insaat-proje-36.jpeg', 'projects', 'projects/vista-insaat-proje-36.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-36.jpeg', NULL, 'local', 'projects/vista-insaat-proje-36.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0037-0037-0037-000000000037', NULL, 'vista-insaat-proje-37.jpeg', 'projects', 'projects/vista-insaat-proje-37.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-37.jpeg', NULL, 'local', 'projects/vista-insaat-proje-37.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0038-0038-0038-000000000038', NULL, 'vista-insaat-proje-38.jpeg', 'projects', 'projects/vista-insaat-proje-38.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-38.jpeg', NULL, 'local', 'projects/vista-insaat-proje-38.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0039-0039-0039-000000000039', NULL, 'vista-insaat-proje-39.jpeg', 'projects', 'projects/vista-insaat-proje-39.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-39.jpeg', NULL, 'local', 'projects/vista-insaat-proje-39.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0040-0040-0040-000000000040', NULL, 'vista-insaat-proje-40.jpeg', 'projects', 'projects/vista-insaat-proje-40.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-40.jpeg', NULL, 'local', 'projects/vista-insaat-proje-40.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0041-0041-0041-000000000041', NULL, 'vista-insaat-proje-41.jpeg', 'projects', 'projects/vista-insaat-proje-41.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-41.jpeg', NULL, 'local', 'projects/vista-insaat-proje-41.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0042-0042-0042-000000000042', NULL, 'vista-insaat-proje-42.jpeg', 'projects', 'projects/vista-insaat-proje-42.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-42.jpeg', NULL, 'local', 'projects/vista-insaat-proje-42.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0043-0043-0043-000000000043', NULL, 'vista-insaat-proje-43.jpeg', 'projects', 'projects/vista-insaat-proje-43.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-43.jpeg', NULL, 'local', 'projects/vista-insaat-proje-43.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0044-0044-0044-000000000044', NULL, 'vista-insaat-proje-44.jpeg', 'projects', 'projects/vista-insaat-proje-44.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-44.jpeg', NULL, 'local', 'projects/vista-insaat-proje-44.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0045-0045-0045-000000000045', NULL, 'vista-insaat-proje-45.jpeg', 'projects', 'projects/vista-insaat-proje-45.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-45.jpeg', NULL, 'local', 'projects/vista-insaat-proje-45.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0046-0046-0046-000000000046', NULL, 'vista-insaat-proje-46.jpeg', 'projects', 'projects/vista-insaat-proje-46.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-46.jpeg', NULL, 'local', 'projects/vista-insaat-proje-46.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0047-0047-0047-000000000047', NULL, 'vista-insaat-proje-47.jpeg', 'projects', 'projects/vista-insaat-proje-47.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-47.jpeg', NULL, 'local', 'projects/vista-insaat-proje-47.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0048-0048-0048-000000000048', NULL, 'vista-insaat-proje-48.jpeg', 'projects', 'projects/vista-insaat-proje-48.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-48.jpeg', NULL, 'local', 'projects/vista-insaat-proje-48.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0049-0049-0049-000000000049', NULL, 'vista-insaat-proje-49.jpeg', 'projects', 'projects/vista-insaat-proje-49.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-49.jpeg', NULL, 'local', 'projects/vista-insaat-proje-49.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0050-0050-0050-000000000050', NULL, 'vista-insaat-proje-50.jpeg', 'projects', 'projects/vista-insaat-proje-50.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-50.jpeg', NULL, 'local', 'projects/vista-insaat-proje-50.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0051-0051-0051-000000000051', NULL, 'vista-insaat-proje-51.jpeg', 'projects', 'projects/vista-insaat-proje-51.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-51.jpeg', NULL, 'local', 'projects/vista-insaat-proje-51.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0052-0052-0052-000000000052', NULL, 'vista-insaat-proje-52.jpeg', 'projects', 'projects/vista-insaat-proje-52.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-52.jpeg', NULL, 'local', 'projects/vista-insaat-proje-52.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0053-0053-0053-000000000053', NULL, 'vista-insaat-proje-53.jpeg', 'projects', 'projects/vista-insaat-proje-53.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-53.jpeg', NULL, 'local', 'projects/vista-insaat-proje-53.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0054-0054-0054-000000000054', NULL, 'vista-insaat-proje-54.jpeg', 'projects', 'projects/vista-insaat-proje-54.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-54.jpeg', NULL, 'local', 'projects/vista-insaat-proje-54.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0055-0055-0055-000000000055', NULL, 'vista-insaat-proje-55.jpeg', 'projects', 'projects/vista-insaat-proje-55.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-55.jpeg', NULL, 'local', 'projects/vista-insaat-proje-55.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0056-0056-0056-000000000056', NULL, 'vista-insaat-proje-56.jpeg', 'projects', 'projects/vista-insaat-proje-56.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-56.jpeg', NULL, 'local', 'projects/vista-insaat-proje-56.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0057-0057-0057-000000000057', NULL, 'vista-insaat-proje-57.jpeg', 'projects', 'projects/vista-insaat-proje-57.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-57.jpeg', NULL, 'local', 'projects/vista-insaat-proje-57.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW()),
  ('sa-prj-0058-0058-0058-000000000058', NULL, 'vista-insaat-proje-58.jpeg', 'projects', 'projects/vista-insaat-proje-58.jpeg', 'projects', 'image/jpeg', 500000, NULL, NULL, '/uploads/projects/vista-insaat-proje-58.jpeg', NULL, 'local', 'projects/vista-insaat-proje-58.jpeg', 'image', 'jpeg', NULL, NULL, '{}', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `url` = VALUES(`url`),
  `size` = VALUES(`size`),
  `updated_at` = NOW();

-- =========================
-- CATALOG IMAGES
-- =========================
INSERT INTO `storage_assets`
(`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `hash`, `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `provider_version`, `etag`, `metadata`, `created_at`, `updated_at`)
VALUES
  ('sa-cat-0001-0001-0001-000000000001', NULL, 'vista-insaat-katalog-kapak.jpg', 'catalog', 'catalog/vista-insaat-katalog-kapak.jpg', 'catalog', 'image/jpeg', 106720, 1200, 800, '/uploads/catalog/vista-insaat-katalog-kapak.jpg', NULL, 'local', 'catalog/vista-insaat-katalog-kapak.jpg', 'image', 'jpg', NULL, NULL, '{}', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `url` = VALUES(`url`),
  `size` = VALUES(`size`),
  `updated_at` = NOW();

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
