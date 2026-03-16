-- =============================================================
-- FILE: 316_vistainsaat_offers.seed.sql
-- Vista İnşaat — Örnek teklif talepleri
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- Offer number counter
INSERT INTO `offer_number_counters` (`year`, `last_seq`, `prefix`)
VALUES (2026, 5, 'VIS')
ON DUPLICATE KEY UPDATE `last_seq` = GREATEST(`last_seq`, VALUES(`last_seq`));

-- Örnek teklifler
INSERT INTO `offers` (`id`, `offer_no`, `status`, `source`, `locale`, `country_code`, `customer_name`, `company_name`, `email`, `phone`, `subject`, `message`, `form_data`, `product_id`, `service_id`, `consent_marketing`, `consent_terms`, `currency`, `net_total`, `vat_rate`, `vat_total`, `shipping_total`, `gross_total`, `valid_until`, `admin_notes`, `created_at`, `updated_at`)
VALUES
(
  'of010001-0001-4001-9001-000000000001',
  'VIS-2026-0001',
  'quoted',
  'vistainsaat',
  'tr',
  'Türkiye',
  'Ahmet Yılmaz',
  'Yılmaz Holding A.Ş.',
  'ahmet.yilmaz@yilmazholding.com',
  '+90 532 111 22 33',
  'Antalya Villa Projesi Teklif Talebi',
  'Antalya Konyaaltı bölgesinde 450 m² arsa üzerine modern villa projesi için teklif almak istiyoruz. 3+1 müstakil villa, havuz ve peyzaj dahil.',
  '{"project_type": "villa", "estimated_area": "450 m²", "location": "Antalya / Konyaaltı", "preferred_deadline": "2026-12-01", "notes": "Havuz ve peyzaj dahil olmalı"}',
  NULL, NULL,
  1, 1,
  'TRY', 4500000.00, 20.00, 900000.00, 0.00, 5400000.00,
  '2026-06-01 00:00:00.000',
  'Müşteri ile 15 Mart''ta keşif yapıldı. Mimari proje hazırlanıyor.',
  NOW(3), NOW(3)
),
(
  'of010002-0002-4002-9002-000000000002',
  'VIS-2026-0002',
  'new',
  'vistainsaat',
  'tr',
  'Türkiye',
  'Fatma Demir',
  NULL,
  'fatma.demir@gmail.com',
  '+90 541 222 33 44',
  'Daire Renovasyon Teklifi',
  '3+1 daire iç mekan renovasyonu. Mutfak, banyo ve zemin yenileme. Yaklaşık 120 m².',
  '{"project_type": "renovation", "estimated_area": "120 m²", "location": "Antalya / Muratpaşa", "notes": "Mutfak ve banyo öncelikli"}',
  NULL, NULL,
  0, 1,
  'TRY', NULL, 20.00, NULL, NULL, NULL,
  NULL,
  NULL,
  NOW(3), NOW(3)
),
(
  'of010003-0003-4003-9003-000000000003',
  'VIS-2026-0003',
  'site_survey',
  'vistainsaat',
  'tr',
  'Türkiye',
  'Mehmet Kaya',
  'Kaya İnşaat Ltd.',
  'mehmet@kayainsaat.com',
  '+90 555 333 44 55',
  'Ticari Bina Projesi',
  '2 katlı ticari bina inşaatı. Zemin kat mağaza, üst kat ofis olarak planlanıyor. 800 m² toplam alan.',
  '{"project_type": "commercial", "estimated_area": "800 m²", "location": "Antalya / Kepez", "preferred_deadline": "2027-03-01", "notes": "Zemin kat mağaza, üst kat ofis"}',
  NULL, NULL,
  1, 1,
  'TRY', 8500000.00, 20.00, 1700000.00, 0.00, 10200000.00,
  '2026-09-01 00:00:00.000',
  'Keşif planlanıyor. Arsa ruhsatı kontrol edilecek.',
  NOW(3), NOW(3)
),
(
  'of010004-0004-4004-9004-000000000004',
  'VIS-2026-0004',
  'accepted',
  'vistainsaat',
  'en',
  'Germany',
  'Hans Mueller',
  'Mueller Properties GmbH',
  'hans@mueller-properties.de',
  '+49 171 555 6677',
  'Holiday Apartment Complex in Antalya',
  'We are looking for a construction partner for a 12-unit holiday apartment complex in Antalya Belek area. Total area approximately 2400 m².',
  '{"project_type": "residential_complex", "estimated_area": "2400 m²", "location": "Antalya / Belek", "preferred_deadline": "2027-06-01", "notes": "12 units, each ~120 m², pool area required"}',
  NULL, NULL,
  1, 1,
  'EUR', 1200000.00, 20.00, 240000.00, 0.00, 1440000.00,
  '2026-12-01 00:00:00.000',
  'Contract negotiations in progress. Client visiting Antalya next month.',
  NOW(3), NOW(3)
),
(
  'of010005-0005-4005-9005-000000000005',
  'VIS-2026-0005',
  'sent',
  'vistainsaat',
  'tr',
  'Türkiye',
  'Ayşe Çelik',
  NULL,
  'ayse.celik@outlook.com',
  '+90 538 444 55 66',
  'Bahçe Düzenleme ve Peyzaj',
  'Villa bahçesi için peyzaj düzenlemesi. Çim, ağaçlandırma, otomatik sulama sistemi ve dış aydınlatma.',
  '{"project_type": "landscaping", "estimated_area": "300 m²", "location": "Antalya / Döşemealtı", "notes": "Otomatik sulama ve dış aydınlatma dahil"}',
  NULL, NULL,
  0, 1,
  'TRY', 350000.00, 20.00, 70000.00, 0.00, 420000.00,
  '2026-05-15 00:00:00.000',
  'Teklif gönderildi, müşteri dönüş bekliyor.',
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`), `updated_at` = VALUES(`updated_at`);
