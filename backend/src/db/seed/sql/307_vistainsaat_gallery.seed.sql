-- =============================================================
-- FILE: 307_vistainsaat_gallery.seed.sql
-- Vista İnşaat — Örnek galeri verileri (TR/EN)
-- module_key = 'vistainsaat'
-- source_type = 'project'
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

INSERT INTO `galleries`
(
  `id`,
  `module_key`,
  `source_id`,
  `source_type`,
  `is_active`,
  `is_featured`,
  `display_order`
)
VALUES
  ('kg010001-8001-4001-9001-eeeeeeee0001', 'vistainsaat', 'kd010001-7001-4001-9001-dddddddd0001', 'project', 1, 1, 10),
  ('kg010002-8002-4002-9002-eeeeeeee0002', 'vistainsaat', 'kd010002-7002-4002-9002-dddddddd0002', 'project', 1, 1, 20),
  ('kg010003-8003-4003-9003-eeeeeeee0003', 'vistainsaat', 'kd010003-7003-4003-9003-dddddddd0003', 'project', 1, 0, 30)
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`),
  `source_id` = VALUES(`source_id`),
  `source_type` = VALUES(`source_type`),
  `is_active` = VALUES(`is_active`),
  `is_featured` = VALUES(`is_featured`),
  `display_order` = VALUES(`display_order`);

INSERT INTO `gallery_i18n`
(
  `gallery_id`,
  `locale`,
  `title`,
  `slug`,
  `description`,
  `meta_title`,
  `meta_description`
)
VALUES
  -- Galeri 1 — Boğaz Rezidans (TR/EN)
  ('kg010001-8001-4001-9001-eeeeeeee0001', 'tr',
   'Boğaz Manzaralı Rezidans — Yapım Süreci Galerisi',
   'bogaz-manzarali-rezidans-yapim-galerisi',
   'Boğaz Manzaralı Rezidans projesinin temel, betonarme, dış cephe ve peyzaj aşamalarını belgeleyen yapım süreci fotoğrafları.',
   'Boğaz Manzaralı Rezidans Yapım Galerisi | Vista İnşaat',
   'Boğaz Manzaralı Rezidans projesinin yapım süreci fotoğrafları. Temel, betonarme ve cephe aşamaları.'),
  ('kg010001-8001-4001-9001-eeeeeeee0001', 'en',
   'Bosphorus View Residences — Construction Progress Gallery',
   'bosphorus-view-residences-construction-gallery',
   'Construction progress photographs documenting the foundation, structural frame, facade, and landscaping phases of the Bosphorus View Residences project.',
   'Bosphorus View Residences Construction Gallery | Vista Construction',
   'Construction progress gallery for Bosphorus View Residences. Foundation, frame, and facade phases documented.'),
  -- Galeri 2 — Levent Ofis (TR/EN)
  ('kg010002-8002-4002-9002-eeeeeeee0002', 'tr',
   'Levent Ofis Kulesi — İnşaat ve Cephe Galerisi',
   'levent-ofis-kulesi-insaat-galerisi',
   'Levent Ofis Kulesi''nin çelik strüktür montajı, curtain wall giydirme ve ortak alan bitişini belgeleyen galeri.',
   'Levent Ofis Kulesi İnşaat Galerisi | Vista İnşaat',
   'Levent Ofis Kulesi çelik montaj, curtain wall ve iç bitişi yapım süreci fotoğrafları.'),
  ('kg010002-8002-4002-9002-eeeeeeee0002', 'en',
   'Levent Office Tower — Construction & Facade Gallery',
   'levent-office-tower-construction-gallery',
   'Gallery documenting steel structure erection, curtain wall installation, and common area finishing for the Levent Office Tower project.',
   'Levent Office Tower Construction Gallery | Vista Construction',
   'Steel erection, curtain wall, and interior finishing construction photos for Levent Office Tower.'),
  -- Galeri 3 — Kadıköy Karma (TR/EN)
  ('kg010003-8003-4003-9003-eeeeeeee0003', 'tr',
   'Kadıköy Karma Yapı Kompleksi — Yapım Galerisi',
   'kadikoy-karma-yapi-galerisi',
   'Kadıköy Karma Yapı Kompleksi''nin betonarme iskelet, cephe ve iç mekân bitişini belgeleyen fotoğraf serisi.',
   'Kadıköy Karma Yapı Kompleksi Yapım Galerisi | Vista İnşaat',
   'Kadıköy Karma Yapı Kompleksi yapım süreci galerisi. Betonarme, cephe ve iç mekân aşamaları.'),
  ('kg010003-8003-4003-9003-eeeeeeee0003', 'en',
   'Kadıköy Mixed-Use Complex — Construction Gallery',
   'kadikoy-mixed-use-construction-gallery',
   'Photo series documenting the reinforced concrete frame, facade system, and interior finishing of the Kadıköy Mixed-Use Complex.',
   'Kadıköy Mixed-Use Complex Construction Gallery | Vista Construction',
   'Construction gallery for Kadıköy Mixed-Use Complex. RC frame, facade, and interior finishing phases.')
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `slug` = VALUES(`slug`),
  `description` = VALUES(`description`),
  `meta_title` = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`);

INSERT INTO `gallery_images`
(
  `id`,
  `gallery_id`,
  `storage_asset_id`,
  `image_url`,
  `display_order`,
  `is_cover`
)
VALUES
  ('kg020001-8101-4001-9001-eeeeeeee0101', 'kg010001-8001-4001-9001-eeeeeeee0001', NULL, '/media/gallery-placeholder.svg', 10, 1),
  ('kg020002-8102-4002-9002-eeeeeeee0102', 'kg010001-8001-4001-9001-eeeeeeee0001', NULL, '/media/gallery-placeholder.svg', 20, 0),
  ('kg020003-8103-4003-9003-eeeeeeee0103', 'kg010002-8002-4002-9002-eeeeeeee0002', NULL, '/media/gallery-placeholder.svg', 10, 1),
  ('kg020004-8104-4004-9004-eeeeeeee0104', 'kg010002-8002-4002-9002-eeeeeeee0002', NULL, '/media/gallery-placeholder.svg', 20, 0),
  ('kg020005-8105-4005-9005-eeeeeeee0105', 'kg010003-8003-4003-9003-eeeeeeee0003', NULL, '/media/gallery-placeholder.svg', 10, 1),
  ('kg020006-8106-4006-9006-eeeeeeee0106', 'kg010003-8003-4003-9003-eeeeeeee0003', NULL, '/media/gallery-placeholder.svg', 20, 0)
ON DUPLICATE KEY UPDATE
  `storage_asset_id` = VALUES(`storage_asset_id`),
  `image_url` = VALUES(`image_url`),
  `display_order` = VALUES(`display_order`),
  `is_cover` = VALUES(`is_cover`);

INSERT INTO `gallery_image_i18n`
(
  `image_id`,
  `locale`,
  `alt`,
  `caption`,
  `description`
)
VALUES
  ('kg020001-8101-4001-9001-eeeeeeee0101', 'tr', 'Boğaz Manzaralı Rezidans dış cephe görünümü', 'Dış cephe tamamlanma aşaması', 'Doğal taş kaplama ve cam balkon detaylarının tamamlandığı aşamaya ait fotoğraf.'),
  ('kg020001-8101-4001-9001-eeeeeeee0101', 'en', 'Bosphorus View Residences exterior facade view', 'Facade completion phase', 'Photograph from the stage where natural stone cladding and glazed balcony details were completed.'),
  ('kg020002-8102-4002-9002-eeeeeeee0102', 'tr', 'Boğaz Manzaralı Rezidans peyzaj düzenlemesi', 'Peyzaj ve ortak alan bitişi', 'Projenin teslim öncesi peyzaj ve ortak alan düzenleme çalışmalarını gösteren fotoğraf.'),
  ('kg020002-8102-4002-9002-eeeeeeee0102', 'en', 'Bosphorus View Residences landscaping works', 'Landscaping and common area finishing', 'Photograph showing landscaping and common area works before handover.'),
  ('kg020003-8103-4003-9003-eeeeeeee0103', 'tr', 'Levent Ofis Kulesi curtain wall montajı', 'Curtain wall sistemi kurulumu', 'Yüksek performanslı curtain wall sisteminin monte edildiği yapım aşamasına ait görsel.'),
  ('kg020003-8103-4003-9003-eeeeeeee0103', 'en', 'Levent Office Tower curtain wall installation', 'Curtain wall system installation', 'Visual from the construction phase where the high-performance curtain wall system was installed.'),
  ('kg020004-8104-4004-9004-eeeeeeee0104', 'tr', 'Levent Ofis Kulesi lobi iç mekan bitişi', 'Lobi bitiş çalışmaları', 'Ofis kulesinin zemin kat lobisinde iç mekân kaplama ve teknik donanım montajını gösteren fotoğraf.'),
  ('kg020004-8104-4004-9004-eeeeeeee0104', 'en', 'Levent Office Tower lobby interior finishing', 'Lobby finishing works', 'Photograph showing floor finishes and technical equipment installation in the ground-floor lobby of the office tower.'),
  ('kg020005-8105-4105-9005-eeeeeeee0105', 'tr', 'Kadıköy Karma Yapı betonarme iskelet aşaması', 'Betonarme yapım aşaması', 'Karma kullanımlı yapının bodrum ve zemin kat betonarme iskelet çalışmalarını belgeleyen fotoğraf.'),
  ('kg020005-8105-4105-9005-eeeeeeee0105', 'en', 'Kadıköy Mixed-Use Complex RC frame construction', 'RC frame construction phase', 'Photograph documenting the basement and ground-floor reinforced concrete frame works of the mixed-use complex.'),
  ('kg020006-8106-4006-9006-eeeeeeee0106', 'tr', 'Kadıköy Karma Yapı cephe giydirme', 'Cephe sistemi uygulaması', 'Karma kullanımlı yapının konut bloğunda cephe sistemi uygulama aşamasından görünüm.'),
  ('kg020006-8106-4006-9006-eeeeeeee0106', 'en', 'Kadıköy Mixed-Use Complex facade cladding', 'Facade system application', 'View from the facade system application stage on the residential block of the mixed-use complex.')
ON DUPLICATE KEY UPDATE
  `alt` = VALUES(`alt`),
  `caption` = VALUES(`caption`),
  `description` = VALUES(`description`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
