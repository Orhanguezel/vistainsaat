-- =============================================================
-- FILE: 304_vistainsaat_blog.seed.sql
-- Vista İnşaat — Blog / haber yazıları (custom_pages) + i18n (TR/EN)
-- module_key = 'vistainsaat_blog'
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- =========================
-- 1) CUSTOM PAGES (BASE)
-- =========================
INSERT INTO `custom_pages`
(
  `id`,
  `module_key`,
  `is_published`,
  `featured`,
  `display_order`,
  `order_num`,
  `featured_image`,
  `featured_image_asset_id`,
  `image_url`,
  `storage_asset_id`,
  `images`,
  `storage_image_ids`,
  `category_id`,
  `sub_category_id`
)
VALUES
  ('bb010001-5001-4001-9001-bbbbbbbb0001', 'vistainsaat_blog', 1, 1, 10, 10, '/uploads/projects/vista-insaat-proje-39.jpeg', NULL, '/uploads/projects/vista-insaat-proje-39.jpeg', NULL, '[]', '[]', NULL, NULL),
  ('bb010002-5002-4002-9002-bbbbbbbb0002', 'vistainsaat_blog', 1, 1, 20, 20, '/uploads/projects/vista-insaat-proje-29.jpeg', NULL, '/uploads/projects/vista-insaat-proje-29.jpeg', NULL, '[]', '[]', NULL, NULL),
  ('bb010003-5003-4003-9003-bbbbbbbb0003', 'vistainsaat_blog', 1, 0, 30, 30, '/uploads/projects/vista-insaat-proje-36.jpeg', NULL, '/uploads/projects/vista-insaat-proje-36.jpeg', NULL, '[]', '[]', NULL, NULL),
  ('bb010004-5004-4004-9004-bbbbbbbb0004', 'vistainsaat_blog', 1, 0, 40, 40, '/uploads/projects/vista-insaat-proje-30.jpeg', NULL, '/uploads/projects/vista-insaat-proje-30.jpeg', NULL, '[]', '[]', NULL, NULL)
ON DUPLICATE KEY UPDATE
  `module_key`   = VALUES(`module_key`),
  `is_published` = VALUES(`is_published`),
  `featured`     = VALUES(`featured`),
  `display_order`= VALUES(`display_order`),
  `featured_image` = VALUES(`featured_image`),
  `image_url` = VALUES(`image_url`);

-- =========================
-- 2) CUSTOM PAGES I18N — TR
-- =========================
INSERT INTO `custom_pages_i18n`
(
  `id`,
  `page_id`,
  `locale`,
  `title`,
  `slug`,
  `content`,
  `summary`,
  `meta_title`,
  `meta_description`,
  `tags`
)
VALUES
  (
    'bb020001-6001-4001-a001-bbbbbbbb0001',
    'bb010001-5001-4001-9001-bbbbbbbb0001',
    'tr',
    'Sürdürülebilir Bina Tasarımında Güncel Yaklaşımlar',
    'surdurulebilir-bina-tasarimi',
    JSON_OBJECT('html', '<p>Sürdürülebilir yapı tasarımı artık bir tercih değil, inşaat sektörünün temel gereksinimi haline gelmiştir. Enerji verimliliği, su yönetimi ve malzeme döngüsü birbirini tamamlayan üç temel eksen olarak öne çıkmaktadır.</p><h2>Enerji Verimliliği</h2><p>Yüksek performanslı cephe sistemleri, ısı yalıtımı ve akıllı bina otomasyon sistemleri; yapının ömrü boyunca enerji tüketimini önemli ölçüde azaltmaktadır. Vista İnşaat projelerinde enerji modelleme, tasarım aşamasında entegre bir disiplin olarak ele alınmaktadır.</p><h2>Yeşil Sertifikasyon</h2><p>LEED ve BREEAM gibi uluslararası yeşil bina sertifikasyonları, tasarım kalitesini ve çevresel performansı belgeler. Bu standartlara uygun projeler; hem kiracı talebi hem de uzun vadeli değer açısından belirgin avantaj sağlamaktadır.</p><h2>Döngüsel Malzeme Kullanımı</h2><p>Geri dönüştürülmüş içerik oranı yüksek malzemelerin seçimi, yapım atıklarının azaltılması ve demontaj planlaması artık modern inşaat projelerinin ayrılmaz parçasıdır.</p>'),
    'Sürdürülebilir bina tasarımında enerji verimliliği, yeşil sertifikasyon ve döngüsel malzeme kullanımına dair güncel yaklaşımlar.',
    'Sürdürülebilir Bina Tasarımında Güncel Yaklaşımlar | Vista İnşaat',
    'Enerji verimliliği, LEED/BREEAM sertifikasyonu ve döngüsel malzeme kullanımı. Vista İnşaat sürdürülebilir inşaat rehberi.',
    'sürdürülebilir bina, enerji verimliliği, LEED, yeşil inşaat'
  ),
  (
    'bb020002-6002-4002-a002-bbbbbbbb0002',
    'bb010002-5002-4002-9002-bbbbbbbb0002',
    'tr',
    'Anahtar Teslim İnşaat: Proje Yönetiminde Doğru Model Seçimi',
    'anahtar-teslim-insaat-proje-yonetimi',
    JSON_OBJECT('html', '<p>Anahtar teslim inşaat modeli, işverenlere tasarım, tedarik ve yapım süreçlerini tek bir sorumluluk çatısı altında yönetme imkânı sunar. Bu yaklaşımın avantajları ve dikkat edilmesi gereken noktalar nelerdir?</p><h2>Anahtar Teslim Modelin Avantajları</h2><ul><li>Tek muhatap — koordinasyon yükü azalır</li><li>Bütçe ve program disiplini artar</li><li>Tasarım-yapım entegrasyonu sorun çözümünü hızlandırır</li><li>Garanti kapsamı daha geniş ve tutarlıdır</li></ul><h2>Dikkat Edilmesi Gereken Noktalar</h2><p>İşveren gereksinimlerinin (Employer Requirements) baştan doğru ve eksiksiz tanımlanması, bu modelin başarısında belirleyici rol oynar. Belirsiz kapsam tanımları maliyet artışı ve program gecikmesine yol açabilir.</p><h2>Vista İnşaat Yaklaşımı</h2><p>Vista İnşaat; mimari, mühendislik ve yapım disiplinlerini tek çatı altında yöneterek işverenin hedeflerine sadık, bütçe ve program disiplinini koruyan bir anahtar teslim hizmet modeli sunmaktadır.</p>'),
    'Anahtar teslim inşaat modelinin avantajları, riskleri ve doğru proje yönetimi yaklaşımına dair pratik rehber.',
    'Anahtar Teslim İnşaat ve Proje Yönetimi | Vista İnşaat',
    'Anahtar teslim inşaat modelinin avantajları, dikkat noktaları ve Vista İnşaat proje yönetimi yaklaşımı.',
    'anahtar teslim inşaat, proje yönetimi, yapım sözleşmesi'
  ),
  (
    'bb020003-6003-4003-a003-bbbbbbbb0003',
    'bb010003-5003-4003-9003-bbbbbbbb0003',
    'tr',
    'Tarihi Yapı Restorasyonunda Temel İlkeler',
    'tarihi-yapi-restorasyonu-ilkeleri',
    JSON_OBJECT('html', '<p>Tarihi yapıların restorasyonu; özgün doku ve karakterin korunmasını ön planda tutarken yapının uzun ömürlü ve işlevsel olmasını da sağlamalıdır. Bu denge, her projede özgün bir planlama ve müdahale stratejisi gerektirmektedir.</p><h2>Belgeleme ve Analiz</h2><p>Restorasyon öncesinde kapsamlı rölöve, restitüsyon ve restorasyon projelerinin hazırlanması zorunludur. Yapı fiziği analizleri, zemin incelemeleri ve malzeme karakterizasyon çalışmaları doğru müdahale kararlarının temelini oluşturur.</p><h2>Müdahale Hiyerarşisi</h2><p>Önce koruma, sonra konsolidasyon, ardından gerektiğinde minimal tamamlama — bu sıra, tarihi koruma disiplininin temel ilkesidir. Her müdahale belgelenmeli ve gelecekte geri alınabilir olmalıdır.</p><h2>Uyumlu Malzeme Seçimi</h2><p>Özgün malzemelere mekanik ve termal açıdan uyumlu malzemelerin seçimi, uzun vadeli bütünlük açısından kritiktir. Örneğin Portland çimento harçları, özgün kireç harçlı tarihi yapılarda doku hasarına yol açabilir.</p>'),
    'Tarihi yapı restorasyonunda belgeleme, müdahale hiyerarşisi ve malzeme seçimine dair temel ilkeler.',
    'Tarihi Yapı Restorasyonunda Temel İlkeler | Vista İnşaat',
    'Tarihi binaların restorasyonunda koruma ilkeleri, malzeme uyumu ve müdahale stratejisi. Vista İnşaat restorasyon uzmanlığı.',
    'tarihi yapı restorasyonu, koruma, kültürel miras, müdahale ilkeleri'
  ),
  (
    'bb020004-6004-4004-a004-bbbbbbbb0004',
    'bb010004-5004-4004-9004-bbbbbbbb0004',
    'tr',
    'Kentsel Dönüşümde Karma Kullanım Yapılarının Rolü',
    'kentsel-donusumde-karma-kullanim',
    JSON_OBJECT('html', '<p>Karma kullanımlı yapılar, kentsel yenileme projelerinde yaşam, çalışma ve ticaret alanlarını bir arada sunarak şehirlerin sosyal ve ekonomik dokusunu güçlendirmektedir. Bu yapı tipi, özellikle toplu taşıma odaklarına yakın kentsel dönüşüm alanlarında belirleyici bir rol üstlenmektedir.</p><h2>Karma Kullanımın Avantajları</h2><ul><li>Gün boyunca canlı kentsel aktivite yaratır</li><li>Trafik yükünü azaltır — iş, alışveriş ve konut yakınlaşır</li><li>Arazi değeri ve yatırım getirisi artar</li><li>Sürdürülebilirlik hedefleriyle uyumludur</li></ul><h2>Tasarım Gereksinimleri</h2><p>Karma kullanımlı projelerde farklı fonksiyonların birbirini olumsuz etkilememesi için düşey ve yatay fonksiyon ayrımı, akustik planlama ve erişim yönetimi özenle tasarlanmalıdır.</p>'),
    'Kentsel dönüşüm projelerinde karma kullanımlı yapıların rolü, avantajları ve tasarım gereksinimleri.',
    'Kentsel Dönüşümde Karma Kullanım Yapıları | Vista İnşaat',
    'Karma kullanımlı yapıların kentsel dönüşümdeki rolü, tasarım gereksinimleri ve Vista İnşaat uygulama deneyimi.',
    'karma kullanım, kentsel dönüşüm, konut ve ticaret, şehircilik'
  )
ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `slug`             = VALUES(`slug`),
  `content`          = VALUES(`content`),
  `summary`          = VALUES(`summary`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `tags`             = VALUES(`tags`);

-- =========================
-- 3) CUSTOM PAGES I18N — EN
-- =========================
INSERT INTO `custom_pages_i18n`
(
  `id`,
  `page_id`,
  `locale`,
  `title`,
  `slug`,
  `content`,
  `summary`,
  `meta_title`,
  `meta_description`,
  `tags`
)
VALUES
  (
    'bb020005-6005-4005-a005-bbbbbbbb0005',
    'bb010001-5001-4001-9001-bbbbbbbb0001',
    'en',
    'Current Approaches in Sustainable Building Design',
    'sustainable-building-design',
    JSON_OBJECT('html', '<p>Sustainable building design is no longer optional — it has become a core requirement of the construction industry. Energy efficiency, water management, and material circularity stand out as three complementary pillars.</p><h2>Energy Efficiency</h2><p>High-performance facade systems, thermal insulation, and smart building automation significantly reduce energy consumption over a building''s lifetime. At Vista Construction, energy modeling is integrated as a discipline from the design stage.</p><h2>Green Certification</h2><p>International green building certifications such as LEED and BREEAM document design quality and environmental performance. Projects built to these standards deliver clear advantages in both tenant demand and long-term value.</p><h2>Circular Material Use</h2><p>Specifying materials with high recycled content, reducing construction waste, and planning for end-of-life disassembly are now integral to modern construction projects.</p>'),
    'Current approaches to energy efficiency, green certification, and circular material use in sustainable building design.',
    'Current Approaches in Sustainable Building Design | Vista Construction',
    'Energy efficiency, LEED/BREEAM certification, and circular materials in sustainable construction. Vista Construction guide.',
    'sustainable building, energy efficiency, LEED, green construction'
  ),
  (
    'bb020006-6006-4006-a006-bbbbbbbb0006',
    'bb010002-5002-4002-9002-bbbbbbbb0002',
    'en',
    'Turnkey Construction: Choosing the Right Project Delivery Model',
    'turnkey-construction-project-delivery',
    JSON_OBJECT('html', '<p>The turnkey construction model allows clients to manage design, procurement, and construction under a single point of responsibility. What are the advantages of this approach and what should be watched out for?</p><h2>Advantages of the Turnkey Model</h2><ul><li>Single point of contact — coordination burden is reduced</li><li>Greater budget and programme discipline</li><li>Design-build integration speeds up problem resolution</li><li>Warranty coverage is broader and more consistent</li></ul><h2>Points to Watch</h2><p>Correctly and completely defining the Employer Requirements from the outset is decisive for the success of this model. Ambiguous scope definitions can lead to cost increases and programme delays.</p><h2>Vista Construction Approach</h2><p>Vista Construction delivers a turnkey service model that manages architecture, engineering, and construction under one roof — true to the client''s goals with budget and programme discipline.</p>'),
    'A practical guide to the advantages, risks, and correct project management approach in the turnkey construction model.',
    'Turnkey Construction and Project Management | Vista Construction',
    'Advantages, watch-points, and Vista Construction approach to turnkey project delivery.',
    'turnkey construction, project management, design-build, construction contract'
  ),
  (
    'bb020007-6007-4007-a007-bbbbbbbb0007',
    'bb010003-5003-4003-9003-bbbbbbbb0003',
    'en',
    'Core Principles of Historic Building Restoration',
    'historic-building-restoration-principles',
    JSON_OBJECT('html', '<p>Restoring historic buildings must preserve original character and fabric while also ensuring long-term durability and functionality. This balance requires a bespoke planning and intervention strategy for each project.</p><h2>Documentation and Analysis</h2><p>Comprehensive measured drawings, structural restitution studies, and material characterisation work form the foundation of sound intervention decisions.</p><h2>Hierarchy of Intervention</h2><p>Preserve first, consolidate second, then minimally complete where necessary — this sequence is the fundamental principle of conservation discipline. Every intervention must be documented and reversible.</p><h2>Compatible Material Selection</h2><p>Selecting materials mechanically and thermally compatible with the original fabric is critical for long-term integrity. Portland cement mortars, for instance, can cause masonry damage in historic lime-mortared structures.</p>'),
    'Core principles of documentation, intervention hierarchy, and material selection in historic building restoration.',
    'Core Principles of Historic Building Restoration | Vista Construction',
    'Conservation principles, material compatibility, and intervention strategy in historic building restoration. Vista Construction expertise.',
    'historic building restoration, conservation, cultural heritage, intervention principles'
  ),
  (
    'bb020008-6008-4008-a008-bbbbbbbb0008',
    'bb010004-5004-4004-9004-bbbbbbbb0004',
    'en',
    'The Role of Mixed-Use Buildings in Urban Regeneration',
    'mixed-use-buildings-urban-regeneration',
    JSON_OBJECT('html', '<p>Mixed-use buildings strengthen the social and economic fabric of cities by bringing living, working, and retail together in urban regeneration projects. This building type plays a decisive role particularly in transit-oriented development areas.</p><h2>Advantages of Mixed Use</h2><ul><li>Creates vibrant urban activity throughout the day</li><li>Reduces traffic load — work, shopping, and home converge</li><li>Land value and investment return increase</li><li>Aligns with sustainability goals</li></ul><h2>Design Requirements</h2><p>Vertical and horizontal function separation, acoustic planning, and access management must be carefully designed so that different functions do not interfere with each other in mixed-use projects.</p>'),
    'The role, advantages, and design requirements of mixed-use buildings in urban regeneration projects.',
    'Mixed-Use Buildings in Urban Regeneration | Vista Construction',
    'The role of mixed-use developments in urban regeneration, design requirements, and Vista Construction project experience.',
    'mixed-use, urban regeneration, residential and commercial, urbanism'
  )
ON DUPLICATE KEY UPDATE
  `title`            = VALUES(`title`),
  `slug`             = VALUES(`slug`),
  `content`          = VALUES(`content`),
  `summary`          = VALUES(`summary`),
  `meta_title`       = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `tags`             = VALUES(`tags`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
