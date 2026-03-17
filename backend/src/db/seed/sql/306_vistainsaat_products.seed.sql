-- =============================================================
-- FILE: 306_vistainsaat_products.seed.sql
-- Vista İnşaat — Gerçek proje verileri (TR/EN)
-- item_type = 'vistainsaat'
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- Eski projeleri temizle
DELETE FROM `product_i18n` WHERE `product_id` IN (
  'kd010001-7001-4001-9001-dddddddd0001',
  'kd010002-7002-4002-9002-dddddddd0002',
  'kd010003-7003-4003-9003-dddddddd0003',
  'kd010004-7004-4004-9004-dddddddd0004',
  'kd010005-7005-4005-9005-dddddddd0005'
);
DELETE FROM `products` WHERE `id` IN (
  'kd010001-7001-4001-9001-dddddddd0001',
  'kd010002-7002-4002-9002-dddddddd0002',
  'kd010003-7003-4003-9003-dddddddd0003',
  'kd010004-7004-4004-9004-dddddddd0004',
  'kd010005-7005-4005-9005-dddddddd0005'
);

INSERT INTO `products`
(
  `id`,
  `item_type`,
  `category_id`,
  `sub_category_id`,
  `price`,
  `image_url`,
  `storage_asset_id`,
  `images`,
  `storage_image_ids`,
  `is_active`,
  `is_featured`,
  `order_num`,
  `product_code`,
  `stock_quantity`,
  `rating`,
  `review_count`
)
VALUES
  -- 1) Vista Sunset
  ('kd010001-7001-4001-9001-dddddddd0001', 'vistainsaat', 'cccc0001-4001-4001-8001-cccccccc0001', NULL, 0.00, '/uploads/projects/vista-insaat-proje-01.jpeg', NULL, JSON_ARRAY('/uploads/projects/vista-insaat-proje-01.jpeg','/uploads/projects/vista-insaat-proje-02.jpeg','/uploads/projects/vista-insaat-proje-03.jpeg','/uploads/projects/vista-insaat-proje-04.jpeg'), JSON_ARRAY(), 1, 1, 10, 'VIS-001', 0, 5.00, 0),
  -- 2) Vista Lagoon
  ('kd010002-7002-4002-9002-dddddddd0002', 'vistainsaat', 'cccc0001-4001-4001-8001-cccccccc0001', NULL, 0.00, '/uploads/projects/vista-insaat-proje-05.jpeg', NULL, JSON_ARRAY('/uploads/projects/vista-insaat-proje-05.jpeg','/uploads/projects/vista-insaat-proje-06.jpeg','/uploads/projects/vista-insaat-proje-07.jpeg','/uploads/projects/vista-insaat-proje-08.jpeg'), JSON_ARRAY(), 1, 1, 20, 'VIS-002', 0, 5.00, 0),
  -- 3) Vista Lara Villaları
  ('kd010003-7003-4003-9003-dddddddd0003', 'vistainsaat', 'cccc0001-4001-4001-8001-cccccccc0001', NULL, 0.00, '/uploads/projects/vista-insaat-proje-10.jpeg', NULL, JSON_ARRAY('/uploads/projects/vista-insaat-proje-10.jpeg','/uploads/projects/vista-insaat-proje-11.jpeg','/uploads/projects/vista-insaat-proje-12.jpeg','/uploads/projects/vista-insaat-proje-13.jpeg'), JSON_ARRAY(), 1, 1, 30, 'VIS-003', 0, 5.00, 0),
  -- 4) Vista Prestige
  ('kd010004-7004-4004-9004-dddddddd0004', 'vistainsaat', 'cccc0003-4003-4003-8003-cccccccc0003', NULL, 0.00, '/uploads/projects/vista-insaat-proje-15.jpeg', NULL, JSON_ARRAY('/uploads/projects/vista-insaat-proje-15.jpeg','/uploads/projects/vista-insaat-proje-16.jpeg','/uploads/projects/vista-insaat-proje-17.jpeg','/uploads/projects/vista-insaat-proje-14.jpeg'), JSON_ARRAY(), 1, 1, 40, 'VIS-004', 0, 5.00, 0)
ON DUPLICATE KEY UPDATE
  `item_type` = VALUES(`item_type`),
  `category_id` = VALUES(`category_id`),
  `price` = VALUES(`price`),
  `image_url` = VALUES(`image_url`),
  `images` = VALUES(`images`),
  `is_active` = VALUES(`is_active`),
  `is_featured` = VALUES(`is_featured`),
  `order_num` = VALUES(`order_num`),
  `product_code` = VALUES(`product_code`);

INSERT INTO `product_i18n`
(
  `product_id`,
  `locale`,
  `title`,
  `slug`,
  `description`,
  `alt`,
  `tags`,
  `specifications`,
  `meta_title`,
  `meta_description`
)
VALUES
  -- ═══════════════════════════════════════════════════════
  -- 1) Vista Sunset (TR)
  -- ═══════════════════════════════════════════════════════
  ('kd010001-7001-4001-9001-dddddddd0001', 'tr', 'Vista Sunset', 'vista-sunset',
   '<p>Antalya, Altıntaş bölgesinde 61 üniteden oluşan Otel Konsepti size istediğiniz tüm imkanı sunuyor. Bahçe, dubleks, 1+1, 2+1, 3+1, villa, dükkan kapalı otopark, hamam, sauna ve fitness ile Otel ve Rezidans konforunu hissedin.</p>',
   'Vista Sunset — Vista İnşaat otel konsepti projesi, Antalya',
   JSON_ARRAY('otel konsepti', 'rezidans', 'Antalya', 'Altıntaş', 'villa', 'hamam', 'sauna'),
   JSON_OBJECT(
     'lokasyon', '31160.. SK. No:9/1 Aksu/Antalya',
     'alan', '11.000 m²',
     'tip', 'Otel Konsepti / Rezidans',
     'durum', 'Devam Ediyor',
     'mimarlar', 'Tolkan Mimarlık',
     'baş_mimar', 'Tolgahan Şahin',
     'müteahhit', 'Bereket Fide İnşaat'
   ),
   'Vista Sunset | Vista İnşaat — Antalya Otel Konsepti',
   'Antalya Altıntaş''ta 61 üniteli otel konsepti proje. Bahçe, dubleks, villa, hamam, sauna ve fitness. Vista İnşaat.'),

  -- 1) Vista Sunset (EN)
  ('kd010001-7001-4001-9001-dddddddd0001', 'en', 'Vista Sunset', 'vista-sunset',
   '<p>Located in Antalya''s Altıntaş district, this 61-unit Hotel Concept project offers all the amenities you desire. Experience hotel and residence comfort with garden units, duplexes, 1+1, 2+1, 3+1 apartments, villas, shops, covered parking, hammam, sauna, and fitness facilities.</p>',
   'Vista Sunset — Vista Construction hotel concept project, Antalya',
   JSON_ARRAY('hotel concept', 'residence', 'Antalya', 'villa', 'hammam', 'sauna'),
   JSON_OBJECT(
     'location', '31160.. SK. No:9/1 Aksu/Antalya',
     'area', '11,000 m²',
     'type', 'Hotel Concept / Residence',
     'status', 'In Progress',
     'architects', 'Tolkan Architecture',
     'lead_architect', 'Tolgahan Şahin',
     'contractor', 'Bereket Fide Construction'
   ),
   'Vista Sunset | Vista Construction — Antalya Hotel Concept',
   '61-unit hotel concept project in Antalya Altıntaş. Garden units, duplexes, villas, hammam, sauna and fitness. Vista Construction.'),

  -- ═══════════════════════════════════════════════════════
  -- 2) Vista Lagoon (TR)
  -- ═══════════════════════════════════════════════════════
  ('kd010002-7002-4002-9002-dddddddd0002', 'tr', 'Vista Lagoon', 'vista-lagoon',
   '<p>Antalya, Altıntaş bölgesinde 40 üniteden oluşan teraslı yapısıyla göz dolduran bir proje. Otel konsepti, kapalı otoparkı, zemin kat müstakil havuzlu daireleriyle fark yaratan bir proje.</p><p>Projede 9 adet müstakil havuz, 8 adet müstakil teras, tüm dairelerde ebeveyn banyosu, geniş daire seçenekleri ve büyük yüzme havuzuyla kompleks bir proje.</p>',
   'Vista Lagoon — Vista İnşaat teraslı otel konsepti, Antalya',
   JSON_ARRAY('otel konsepti', 'teraslı', 'havuzlu', 'Antalya', 'Altıntaş', 'rezidans'),
   JSON_OBJECT(
     'lokasyon', '31128.. SK. No:12 Aksu/Antalya',
     'alan', '7.000 m²',
     'tip', 'Otel Konsepti / Rezidans',
     'durum', 'Devam Ediyor',
     'mimarlar', 'Tolkan Mimarlık',
     'baş_mimar', 'Tolgahan Şahin',
     'müteahhit', 'Bereket Fide İnşaat'
   ),
   'Vista Lagoon | Vista İnşaat — Antalya Teraslı Proje',
   'Antalya Altıntaş''ta 40 üniteli teraslı otel konsepti. 9 müstakil havuz, müstakil teraslar. Vista İnşaat.'),

  -- 2) Vista Lagoon (EN)
  ('kd010002-7002-4002-9002-dddddddd0002', 'en', 'Vista Lagoon', 'vista-lagoon',
   '<p>An eye-catching terraced project of 40 units in Antalya''s Altıntaş district. A distinctive project with hotel concept, covered parking, and ground-floor apartments with private pools.</p><p>The project features 9 private pools, 8 private terraces, en-suite bathrooms in all units, spacious apartment options, and a large swimming pool complex.</p>',
   'Vista Lagoon — Vista Construction terraced hotel concept, Antalya',
   JSON_ARRAY('hotel concept', 'terraced', 'pool', 'Antalya', 'residence'),
   JSON_OBJECT(
     'location', '31128.. SK. No:12 Aksu/Antalya',
     'area', '7,000 m²',
     'type', 'Hotel Concept / Residence',
     'status', 'In Progress',
     'architects', 'Tolkan Architecture',
     'lead_architect', 'Tolgahan Şahin',
     'contractor', 'Bereket Fide Construction'
   ),
   'Vista Lagoon | Vista Construction — Antalya Terraced Project',
   '40-unit terraced hotel concept in Antalya Altıntaş. 9 private pools, private terraces. Vista Construction.'),

  -- ═══════════════════════════════════════════════════════
  -- 3) Vista Lara Villaları (TR)
  -- ═══════════════════════════════════════════════════════
  ('kd010003-7003-4003-9003-dddddddd0003', 'tr', 'Vista Lara Villaları', 'vista-lara-villalari',
   '<p>Antalya, Kemerağzı bölgesinde 7 blok 13 müstakil villadan oluşan kapalı otoparklı asansörlü, müstakil havuzlu güvenlikli bir Villa sitesi.</p><p>Her dairenin kendine ait bodrum katı, 7+1 geniş daire seçeneği, 70 m² ebeveyn odası, şömineli kış bahçesiyle doğanın keyfini ve huzurunu çıkarın.</p>',
   'Vista Lara Villaları — Vista İnşaat villa projesi, Antalya Kemerağzı',
   JSON_ARRAY('villa', 'müstakil havuz', 'Antalya', 'Kemerağzı', 'güvenlikli site', 'asansörlü'),
   JSON_OBJECT(
     'lokasyon', '32090.. SK. No:61 Aksu/Antalya',
     'alan', '8.500 m²',
     'tip', 'Villa Sitesi',
     'durum', 'Devam Ediyor',
     'mimarlar', 'Tolkan Mimarlık',
     'baş_mimar', 'Tolgahan Şahin',
     'müteahhit', 'Bereket Fide İnşaat'
   ),
   'Vista Lara Villaları | Vista İnşaat — Antalya Villa Projesi',
   'Antalya Kemerağzı''da 13 müstakil villa, kapalı otopark, asansör, müstakil havuz. Vista İnşaat.'),

  -- 3) Vista Lara Villaları (EN)
  ('kd010003-7003-4003-9003-dddddddd0003', 'en', 'Vista Lara Villas', 'vista-lara-villas',
   '<p>A secured villa complex of 7 blocks and 13 detached villas with covered parking, elevators, and private pools in Antalya''s Kemerağzı district.</p><p>Each unit features its own basement floor, 7+1 spacious layout, 70 m² master bedroom, and a fireplace winter garden to enjoy nature in comfort and tranquility.</p>',
   'Vista Lara Villas — Vista Construction villa project, Antalya Kemerağzı',
   JSON_ARRAY('villa', 'private pool', 'Antalya', 'gated community', 'elevator'),
   JSON_OBJECT(
     'location', '32090.. SK. No:61 Aksu/Antalya',
     'area', '8,500 m²',
     'type', 'Villa Complex',
     'status', 'In Progress',
     'architects', 'Tolkan Architecture',
     'lead_architect', 'Tolgahan Şahin',
     'contractor', 'Bereket Fide Construction'
   ),
   'Vista Lara Villas | Vista Construction — Antalya Villa Project',
   '13 detached villas with covered parking, elevators, and private pools in Antalya Kemerağzı. Vista Construction.'),

  -- ═══════════════════════════════════════════════════════
  -- 4) Vista Prestige (TR)
  -- ═══════════════════════════════════════════════════════
  ('kd010004-7004-4004-9004-dddddddd0004', 'tr', 'Vista Prestige', 'vista-prestige',
   '<p>Antalya, Altıntaş bölgesinin en Prestijli projesi, yapısıyla tasarımıyla Antalya''da ilk ve tek.</p><p>44 ofis, 6 adet dükkan rezidans ve güvenlikli lobi girişi ile lüks ofis deneyimi. Antalya''nın merkezinde eşsiz mimariye sahip kafe, restaurant, klinik, ofis ve diğer iş kollarının merkezi olacak Prestijli proje yakında sizlerle.</p>',
   'Vista Prestige — Vista İnşaat prestij karma proje, Antalya',
   JSON_ARRAY('ofis', 'karma kullanım', 'Antalya', 'Altıntaş', 'prestij', 'dükkan', 'rezidans'),
   JSON_OBJECT(
     'lokasyon', 'Kardeş Kentler Caddesi 31150. SK. Aksu/Antalya',
     'alan', '12.000 m²',
     'tip', 'Karma Kullanım / Ofis',
     'durum', 'Yakında',
     'mimarlar', 'Tolkan Mimarlık',
     'baş_mimar', 'Tolgahan Şahin',
     'müteahhit', 'Bereket Fide İnşaat'
   ),
   'Vista Prestige | Vista İnşaat — Antalya Prestij Proje',
   'Antalya Altıntaş''ta 44 ofis, 6 dükkan, rezidans ve güvenlikli lobi. Eşsiz mimari ile prestijli karma proje. Vista İnşaat.'),

  -- 4) Vista Prestige (EN)
  ('kd010004-7004-4004-9004-dddddddd0004', 'en', 'Vista Prestige', 'vista-prestige',
   '<p>The most prestigious project in Antalya''s Altıntaş district — first and only of its kind in Antalya with its structure and design.</p><p>A luxury office experience with 44 offices, 6 shop-residences, and a secured lobby entrance. This prestigious project with unique architecture will be the center of cafes, restaurants, clinics, offices, and other business sectors in the heart of Antalya.</p>',
   'Vista Prestige — Vista Construction prestigious mixed-use project, Antalya',
   JSON_ARRAY('office', 'mixed-use', 'Antalya', 'prestige', 'shop', 'residence'),
   JSON_OBJECT(
     'location', 'Kardeş Kentler Caddesi 31150. SK. Aksu/Antalya',
     'area', '12,000 m²',
     'type', 'Mixed-Use / Office',
     'status', 'Coming Soon',
     'architects', 'Tolkan Architecture',
     'lead_architect', 'Tolgahan Şahin',
     'contractor', 'Bereket Fide Construction'
   ),
   'Vista Prestige | Vista Construction — Antalya Prestigious Project',
   '44 offices, 6 shops, residence with secured lobby. Unique architecture prestigious mixed-use project in Antalya. Vista Construction.')
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `slug` = VALUES(`slug`),
  `description` = VALUES(`description`),
  `alt` = VALUES(`alt`),
  `tags` = VALUES(`tags`),
  `specifications` = VALUES(`specifications`),
  `meta_title` = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
