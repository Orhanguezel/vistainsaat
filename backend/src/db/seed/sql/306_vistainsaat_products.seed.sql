-- =============================================================
-- FILE: 306_vistainsaat_products.seed.sql
-- Vista İnşaat — Örnek proje verileri (TR/EN)
-- item_type = 'vistainsaat'
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

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
  ('kd010001-7001-4001-9001-dddddddd0001', 'vistainsaat', 'cccc0001-4001-4001-8001-cccccccc0001', NULL, 0.00, 'https://picsum.photos/seed/vista-res/800/600', NULL, JSON_ARRAY('https://picsum.photos/seed/vista-res/800/600','https://picsum.photos/seed/vista-res2/800/600'), JSON_ARRAY(), 1, 1, 10, 'VIS-KNT-001', 0, 5.00, 0),
  ('kd010002-7002-4002-9002-dddddddd0002', 'vistainsaat', 'cccc0002-4002-4002-8002-cccccccc0002', NULL, 0.00, 'https://picsum.photos/seed/vista-office/800/600', NULL, JSON_ARRAY('https://picsum.photos/seed/vista-office/800/600','https://picsum.photos/seed/vista-office2/800/600'), JSON_ARRAY(), 1, 1, 20, 'VIS-TIC-001', 0, 5.00, 0),
  ('kd010003-7003-4003-9003-dddddddd0003', 'vistainsaat', 'cccc0003-4003-4003-8003-cccccccc0003', NULL, 0.00, 'https://picsum.photos/seed/vista-mixed/800/600', NULL, JSON_ARRAY('https://picsum.photos/seed/vista-mixed/800/600','https://picsum.photos/seed/vista-mixed2/800/600'), JSON_ARRAY(), 1, 1, 30, 'VIS-KRM-001', 0, 5.00, 0),
  ('kd010004-7004-4004-9004-dddddddd0004', 'vistainsaat', 'cccc0004-4004-4004-8004-cccccccc0004', NULL, 0.00, 'https://picsum.photos/seed/vista-resto/800/600', NULL, JSON_ARRAY('https://picsum.photos/seed/vista-resto/800/600','https://picsum.photos/seed/vista-resto2/800/600'), JSON_ARRAY(), 1, 0, 40, 'VIS-RST-001', 0, 5.00, 0),
  ('kd010005-7005-4005-9005-dddddddd0005', 'vistainsaat', 'cccc0006-4006-4006-8006-cccccccc0006', NULL, 0.00, 'https://picsum.photos/seed/vista-logi/800/600', NULL, JSON_ARRAY('https://picsum.photos/seed/vista-logi/800/600','https://picsum.photos/seed/vista-logi2/800/600'), JSON_ARRAY(), 1, 0, 50, 'VIS-END-001', 0, 5.00, 0)
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
  -- Proje 1 — Konut (TR)
  ('kd010001-7001-4001-9001-dddddddd0001', 'tr', 'Boğaz Manzaralı Rezidans', 'bogaz-manzarali-rezidans',
   '<p>İstanbul Boğazı manzarasına hâkim, 18 bağımsız bölümden oluşan lüks konut projesi. Modern mimari anlayışıyla geleneksel dokuyu harmanlayan proje; doğal taş cepheler, geniş teraslar ve özel bahçe düzenlemesiyle öne çıkmaktadır.</p><p>Vista İnşaat bu projede anahtar teslim taahhüt kapsamında temel kazı, betonarme, dış cephe ve iç mimari bitişi dahil tüm yapım süreçlerini yönetmiştir.</p>',
   'Boğaz Manzaralı Rezidans — Vista İnşaat konut projesi',
   JSON_ARRAY('konut', 'rezidans', 'lüks', 'İstanbul', 'boğaz manzarası'),
   JSON_OBJECT('lokasyon', 'İstanbul, Beşiktaş', 'yıl', '2023', 'alan', '4.200 m²', 'tip', 'Konut', 'durum', 'Tamamlandı'),
   'Boğaz Manzaralı Rezidans | Vista İnşaat',
   'İstanbul Boğazı manzaralı 18 bağımsız bölümlü lüks rezidans projesi. Vista İnşaat anahtar teslim yapım yönetimi.'),
  -- Proje 1 — Konut (EN)
  ('kd010001-7001-4001-9001-dddddddd0001', 'en', 'Bosphorus View Residences', 'bosphorus-view-residences',
   '<p>A luxury residential project of 18 independent units overlooking the Bosphorus. The project blends modern architecture with traditional textures through natural stone facades, spacious terraces, and private landscaping.</p><p>Vista Construction managed all construction phases under a turnkey contract, including excavation, reinforced concrete, cladding, and interior finishing.</p>',
   'Bosphorus View Residences — Vista Construction residential project',
   JSON_ARRAY('residential', 'luxury residences', 'Istanbul', 'Bosphorus view'),
   JSON_OBJECT('location', 'Istanbul, Beşiktaş', 'year', '2023', 'area', '4,200 m²', 'type', 'Residential', 'status', 'Completed'),
   'Bosphorus View Residences | Vista Construction',
   'Luxury 18-unit residential project overlooking the Bosphorus in Istanbul. Turnkey construction management by Vista Construction.'),
  -- Proje 2 — Ticari (TR)
  ('kd010002-7002-4002-9002-dddddddd0002', 'tr', 'Levent Ofis Kulesi', 'levent-ofis-kulesi',
   '<p>Levent iş merkezinde yükselen 12 katlı ofis kulesi; A sınıfı ofis alanları, konferans katı ve zemin katta perakende birimlerden oluşmaktadır. Yeşil bina sertifikasyonuna uygun tasarımı ile enerji verimliliğini ön plana çıkarmaktadır.</p><p>Vista İnşaat; yapısal sistem, dış cephe giydirme, mekanik-elektrik altyapı ve bitişi anahtar teslim olarak tamamlamıştır.</p>',
   'Levent Ofis Kulesi — Vista İnşaat ticari yapı projesi',
   JSON_ARRAY('ticari', 'ofis', 'kule', 'A sınıfı ofis', 'İstanbul'),
   JSON_OBJECT('lokasyon', 'İstanbul, Levent', 'yıl', '2022', 'alan', '18.500 m²', 'tip', 'Ticari / Ofis', 'durum', 'Tamamlandı'),
   'Levent Ofis Kulesi | Vista İnşaat',
   '12 katlı A sınıfı ofis kulesi, konferans alanı ve perakende birimleri. Vista İnşaat anahtar teslim ticari yapı projesi.'),
  -- Proje 2 — Ticari (EN)
  ('kd010002-7002-4002-9002-dddddddd0002', 'en', 'Levent Office Tower', 'levent-office-tower',
   '<p>A 12-storey class-A office tower in the Levent business district, featuring premium office floors, a conference level, and ground-floor retail units. Designed to meet green building certification standards with a focus on energy efficiency.</p>',
   'Levent Office Tower — Vista Construction commercial project',
   JSON_ARRAY('commercial', 'office tower', 'class-A office', 'Istanbul'),
   JSON_OBJECT('location', 'Istanbul, Levent', 'year', '2022', 'area', '18,500 m²', 'type', 'Commercial / Office', 'status', 'Completed'),
   'Levent Office Tower | Vista Construction',
   '12-storey class-A office tower with conference level and retail units. Turnkey commercial construction by Vista Construction.'),
  -- Proje 3 — Karma (TR)
  ('kd010003-7003-4003-9003-dddddddd0003', 'tr', 'Kadıköy Karma Yapı Kompleksi', 'kadikoy-karma-yapi-kompleksi',
   '<p>Kadıköy''de hayata geçirilen karma kullanımlı yapı kompleksi; 64 konut birimi, 3 kat ticari alan ve bodrum katta otoparktan oluşmaktadır. Canlı kentsel dokuya entegre edilen proje, yaya odaklı zemin kat tasarımıyla dikkat çekmektedir.</p>',
   'Kadıköy Karma Yapı Kompleksi — Vista İnşaat karma proje',
   JSON_ARRAY('karma kullanım', 'konut ve ticaret', 'kentsel dönüşüm', 'Kadıköy'),
   JSON_OBJECT('lokasyon', 'İstanbul, Kadıköy', 'yıl', '2024', 'alan', '9.800 m²', 'tip', 'Karma Kullanım', 'durum', 'Tamamlandı'),
   'Kadıköy Karma Yapı Kompleksi | Vista İnşaat',
   '64 konut birimi ve ticari katlardan oluşan karma kullanımlı yapı kompleksi. Vista İnşaat anahtar teslim yapım.'),
  -- Proje 3 — Karma (EN)
  ('kd010003-7003-4003-9003-dddddddd0003', 'en', 'Kadıköy Mixed-Use Complex', 'kadikoy-mixed-use-complex',
   '<p>A mixed-use development in Kadıköy comprising 64 residential units, three commercial floors, and a basement car park. The project integrates into the vibrant urban fabric with a pedestrian-focused ground floor design.</p>',
   'Kadıköy Mixed-Use Complex — Vista Construction mixed-use project',
   JSON_ARRAY('mixed-use', 'residential and commercial', 'urban regeneration', 'Kadıköy'),
   JSON_OBJECT('location', 'Istanbul, Kadıköy', 'year', '2024', 'area', '9,800 m²', 'type', 'Mixed-Use', 'status', 'Completed'),
   'Kadıköy Mixed-Use Complex | Vista Construction',
   '64-unit residential and commercial mixed-use development. Turnkey construction by Vista Construction.'),
  -- Proje 4 — Restorasyon (TR)
  ('kd010004-7004-4004-9004-dddddddd0004', 'tr', 'Tarihi Han Restorasyon Projesi', 'tarihi-han-restorasyon-projesi',
   '<p>19. yüzyıldan kalma tarihi hanın özgün mimari dokusunu koruyarak günümüz kullanım standartlarına uygun hale getirilmesi projesi. Taş cephe temizliği, ahşap çatı yenileme ve iç mekân özgün detayların korunması projenin temel ilkeleri arasındaydı.</p>',
   'Tarihi Han Restorasyon Projesi — Vista İnşaat',
   JSON_ARRAY('restorasyon', 'tarihi yapı', 'kültürel miras', 'taş cephe'),
   JSON_OBJECT('lokasyon', 'İstanbul, Eminönü', 'yıl', '2021', 'alan', '1.200 m²', 'tip', 'Restorasyon', 'durum', 'Tamamlandı'),
   'Tarihi Han Restorasyon Projesi | Vista İnşaat',
   '19. yüzyıl tarihi hanının özgün dokusu korunarak restore edilmesi. Vista İnşaat kültürel miras projesi.'),
  -- Proje 4 — Restorasyon (EN)
  ('kd010004-7004-4004-9004-dddddddd0004', 'en', 'Historic Caravanserai Restoration', 'historic-caravanserai-restoration',
   '<p>Restoration of a 19th-century caravanserai to contemporary use standards while preserving its original architectural character. Key works included stone facade cleaning, timber roof renewal, and conservation of original interior details.</p>',
   'Historic Caravanserai Restoration — Vista Construction',
   JSON_ARRAY('restoration', 'historic building', 'cultural heritage', 'stone facade'),
   JSON_OBJECT('location', 'Istanbul, Eminönü', 'year', '2021', 'area', '1,200 m²', 'type', 'Restoration', 'status', 'Completed'),
   'Historic Caravanserai Restoration | Vista Construction',
   'Restoration of a 19th-century caravanserai preserving its original character. Vista Construction cultural heritage project.'),
  -- Proje 5 — Endüstriyel (TR)
  ('kd010005-7005-4005-9005-dddddddd0005', 'tr', 'Gebze Lojistik Merkezi', 'gebze-lojistik-merkezi',
   '<p>Gebze Organize Sanayi Bölgesi''nde inşa edilen 8.000 m² kapalı alana sahip lojistik deposu ve idari bina kompleksi. Prefabrik çelik strüktür, ısı yalıtımlı sandviç panel cephe ve gelişmiş yükleme rampalarıyla tasarlanmıştır.</p>',
   'Gebze Lojistik Merkezi — Vista İnşaat endüstriyel yapı',
   JSON_ARRAY('lojistik', 'depo', 'sanayi yapısı', 'çelik strüktür', 'Gebze'),
   JSON_OBJECT('lokasyon', 'Kocaeli, Gebze', 'yıl', '2023', 'alan', '8.000 m²', 'tip', 'Endüstriyel', 'durum', 'Tamamlandı'),
   'Gebze Lojistik Merkezi | Vista İnşaat',
   '8.000 m² lojistik depo ve idari bina kompleksi. Vista İnşaat prefabrik çelik yapı projesi.'),
  -- Proje 5 — Endüstriyel (EN)
  ('kd010005-7005-4005-9005-dddddddd0005', 'en', 'Gebze Logistics Centre', 'gebze-logistics-centre',
   '<p>An 8,000 m² logistics warehouse and administrative building complex in the Gebze Organized Industrial Zone. Designed with a prefabricated steel structure, thermally insulated sandwich panel facades, and advanced loading docks.</p>',
   'Gebze Logistics Centre — Vista Construction industrial building',
   JSON_ARRAY('logistics', 'warehouse', 'industrial building', 'steel structure', 'Gebze'),
   JSON_OBJECT('location', 'Kocaeli, Gebze', 'year', '2023', 'area', '8,000 m²', 'type', 'Industrial', 'status', 'Completed'),
   'Gebze Logistics Centre | Vista Construction',
   '8,000 m² logistics warehouse and admin building complex. Vista Construction prefabricated steel structure project.')
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
