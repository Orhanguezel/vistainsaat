-- =============================================================
-- FILE: 305_vistainsaat_pages.seed.sql
-- Vista İnşaat — Kurumsal + Yasal custom page içerikleri
-- module_key = 'vistainsaat_about' | 'vistainsaat_legal'
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

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
  ('bc010001-5001-4001-9001-cccccccc0001', 'vistainsaat_about', 1, 0, 10, 10, '/uploads/projects/vista-insaat-proje-01.jpeg', NULL, '/uploads/projects/vista-insaat-proje-01.jpeg', NULL, '[]', '[]', NULL, NULL),
  ('bc010002-5002-4002-9002-cccccccc0002', 'vistainsaat_legal', 1, 0, 20, 20, NULL, NULL, NULL, NULL, '[]', '[]', NULL, NULL),
  ('bc010003-5003-4003-9003-cccccccc0003', 'vistainsaat_legal', 1, 0, 30, 30, NULL, NULL, NULL, NULL, '[]', '[]', NULL, NULL),
  ('bc010004-5004-4004-9004-cccccccc0004', 'vistainsaat_legal', 1, 0, 40, 40, NULL, NULL, NULL, NULL, '[]', '[]', NULL, NULL),
  ('bc010005-5005-4005-9005-cccccccc0005', 'vistainsaat_legal', 1, 0, 50, 50, NULL, NULL, NULL, NULL, '[]', '[]', NULL, NULL)
ON DUPLICATE KEY UPDATE
  `module_key` = VALUES(`module_key`),
  `is_published` = VALUES(`is_published`),
  `featured` = VALUES(`featured`),
  `display_order` = VALUES(`display_order`),
  `order_num` = VALUES(`order_num`),
  `featured_image` = VALUES(`featured_image`),
  `image_url` = VALUES(`image_url`);

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
    'bc020001-6001-4001-a001-cccccccc0001',
    'bc010001-5001-4001-9001-cccccccc0001',
    'tr',
    'Hakkımızda',
    'about',
    JSON_OBJECT('html', '<p>Vista İnşaat, konut, ticari ve karma kullanımlı yapı projelerinde tasarımdan teslimata kadar kapsamlı inşaat ve mimarlık hizmetleri sunan güvenilir bir çözüm ortağıdır. 15 yılı aşkın sektör deneyimiyle, her projeyi kalite, estetik ve zamanında teslim ilkeleriyle yönetiyoruz.</p><h2>Nasıl Çalışıyoruz?</h2><p>Her projeyi; arazi koşulları, yapısal gereksinimler, bütçe ve termin beklentileri ekseninde değerlendiriyoruz. Fizibilite çalışmasından mimari tasarıma, ruhsat süreçlerinden sahada uygulamaya kadar tüm aşamaları tek çatı altında yönetiyoruz. Şeffaf iletişim ve düzenli ilerleme raporlaması, iş süreçlerimizin temelini oluşturur.</p><h2>Uzmanlık Alanlarımız</h2><ul><li>Konut projeleri: villa, apartman, rezidans ve toplu konut inşaatı</li><li>Ticari projeler: ofis binaları, alışveriş merkezleri ve otel yapıları</li><li>Restorasyon ve güçlendirme: tarihi yapı restorasyonu, depreme karşı bina güçlendirme</li><li>Proje yönetimi: fizibiliteden teslimata profesyonel süreç yönetimi</li><li>Mimari tasarım: 3D modelleme, BIM teknolojisi ve sürdürülebilir tasarım</li><li>İç mimari ve dekorasyon: konut ve ticari mekanlar için özel tasarım çözümleri</li></ul><h2>Değerlerimiz</h2><p>Kalite standartlarına tam uyum, malzeme seçiminden işçiliğe her aşamada titizlik, depreme dayanıklı yapı teknolojileri ve enerji verimli çözümler temel değerlerimizdir. Müşteri memnuniyeti odaklı yaklaşımımızla, her projeyi özenle planlıyor ve uyguluyoruz.</p><h2>Ekibimiz</h2><p>Deneyimli mimar, inşaat mühendisi ve proje yöneticilerinden oluşan kadromuz, her projeye özgün çözümler üretir. Sahada güçlü uygulama ekibimiz ve güvenilir tedarikçi ağımızla projelerinizi zamanında ve eksiksiz teslim ediyoruz.</p><p>Vista İnşaat olarak, teknik bilgiyi uygulama disipliniyle birleştiren, müşterileriyle aynı dili konuşan ve sonuç odaklı bir inşaat partneri olmayı hedefliyoruz.</p>'),
    'Vista İnşaat, konut ve ticari projelerde tasarımdan teslimata güvenilir inşaat ve mimarlık hizmetleri sunar.',
    'Hakkımızda | Vista İnşaat',
    'Vista İnşaat hakkında: 15+ yıllık deneyimle konut, ticari ve karma kullanım projelerinde güvenilir inşaat ve mimarlık hizmetleri.',
    'vista inşaat, hakkımızda, inşaat firması, mimarlık, konut projeleri, ticari inşaat'
  ),
  (
    'bc020002-6002-4002-a002-cccccccc0002',
    'bc010002-5002-4002-9002-cccccccc0002',
    'tr',
    'Gizlilik Politikası',
    'privacy',
    JSON_OBJECT('html', '<p>Vista İnşaat olarak web sitesi üzerinden iletilen kişisel verilerin gizliliğini önemsiyoruz. İletişim ve teklif formlarında paylaşılan bilgiler yalnızca talep yönetimi, geri dönüş sağlama ve müşteri ilişkileri süreçleri için kullanılır.</p><h2>Toplanan Veriler</h2><ul><li>Ad soyad ve firma bilgisi</li><li>E-posta adresi ve telefon numarası</li><li>Talep içeriği, teknik dosya ve ek açıklamalar</li><li>Temel ziyaret ve performans kayıtları</li></ul><h2>Verilerin Kullanımı</h2><p>Toplanan veriler izinsiz üçüncü taraflarla pazarlama amacıyla paylaşılmaz. Yasal yükümlülükler veya açık rıza halleri dışında veri aktarımı yapılmaz.</p><h2>Haklar</h2><p>İlgili kişiler, veri işlenip işlenmediğini öğrenme, düzeltme, silme ve itiraz etme haklarına sahiptir. Taleplerinizi iletişim kanallarımız üzerinden iletebilirsiniz.</p>'),
    'Vista İnşaat kişisel veri işleme ve gizlilik esasları.',
    'Gizlilik Politikası | Vista İnşaat',
    'Vista İnşaat web sitesi gizlilik politikası ve kişisel veri işleme esasları.',
    'gizlilik politikası, kişisel veri, vista inşaat'
  ),
  (
    'bc020003-6003-4003-a003-cccccccc0003',
    'bc010003-5003-4003-9003-cccccccc0003',
    'tr',
    'Kullanım Koşulları',
    'terms',
    JSON_OBJECT('html', '<p>Bu web sitesini kullanan her ziyaretçi aşağıdaki kullanım koşullarını kabul etmiş sayılır. Sitede yer alan içerik, görsel ve teknik açıklamalar bilgilendirme amacı taşır; nihai teknik şartname yerine geçmez.</p><h2>İçerik Kullanımı</h2><p>Metin, görsel ve marka öğeleri izinsiz olarak kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.</p><h2>Sorumluluk Sınırı</h2><p>Web sitesindeki içerik güncel tutulmaya çalışılır; ancak projeye özel teknik doğrulama yapılmadan yalnızca site içeriğine dayanılarak karar verilmemelidir.</p><h2>Bağlantılar</h2><p>Harici bağlantılar bilgi amaçlıdır. Üçüncü taraf içeriklerinden doğacak sorumluluk ilgili yayıncılara aittir.</p>'),
    'Vista İnşaat web sitesi kullanım koşulları ve sorumluluk sınırları.',
    'Kullanım Koşulları | Vista İnşaat',
    'Vista İnşaat web sitesi kullanım koşulları, içerik hakları ve sorumluluk sınırları.',
    'kullanım koşulları, vista inşaat, web sitesi şartları'
  ),
  (
    'bc020004-6004-4004-a004-cccccccc0004',
    'bc010004-5004-4004-9004-cccccccc0004',
    'tr',
    'KVKK Aydınlatma Metni',
    'kvkk-aydinlatma-metni',
    JSON_OBJECT('html', '<p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla, Vista İnşaat tarafından işlenen kişisel verilere ilişkin aydınlatma bu metin ile yapılmaktadır.</p><h2>İşleme Amaçları</h2><ul><li>Teklif ve iletişim taleplerinin yönetimi</li><li>Satış ve satış sonrası süreçlerin yürütülmesi</li><li>Hizmet kalitesinin geliştirilmesi</li><li>Yasal yükümlülüklerin yerine getirilmesi</li></ul><h2>Toplama Yöntemi</h2><p>Kişisel veriler web formları, e-posta, telefon ve fiziksel evrak üzerinden toplanabilir.</p><h2>Başvuru</h2><p>KVKK kapsamındaki taleplerinizi kayıtlı iletişim kanalları üzerinden yazılı olarak iletebilirsiniz.</p>'),
    'KVKK kapsamında kişisel veri işleme ve başvuru esasları.',
    'KVKK Aydınlatma Metni | Vista İnşaat',
    'Vista İnşaat KVKK aydınlatma metni, veri işleme amaçları ve başvuru esasları.',
    'kvkk, aydınlatma metni, kişisel veri'
  ),
  (
    'bc020005-6005-4005-a005-cccccccc0005',
    'bc010005-5005-4005-9005-cccccccc0005',
    'tr',
    'Çerez Politikası',
    'cookies',
    JSON_OBJECT('html', '<p>Bu web sitesinde kullanıcı deneyimini iyileştirmek, temel performans ölçümleri almak ve teknik sorunları tespit etmek amacıyla çerezler kullanılabilir.</p><h2>Çerez Türleri</h2><ul><li>Zorunlu çerezler</li><li>Tercih çerezleri</li><li>Analitik ve performans çerezleri</li></ul><h2>Yönetim</h2><p>Tarayıcı ayarlarınız üzerinden çerez tercihlerinizi değiştirebilir veya mevcut çerezleri silebilirsiniz. Bazı çerezlerin devre dışı bırakılması site fonksiyonlarını etkileyebilir.</p>'),
    'Vista İnşaat web sitesi çerez kullanımı ve tercih yönetimi bilgileri.',
    'Çerez Politikası | Vista İnşaat',
    'Vista İnşaat web sitesi çerez politikası, çerez türleri ve tercih yönetimi bilgileri.',
    'çerez politikası, cookies, web sitesi tercihleri'
  ),
  (
    'bc020006-6006-4006-a006-cccccccc0006',
    'bc010001-5001-4001-9001-cccccccc0001',
    'en',
    'About Us',
    'about',
    JSON_OBJECT('html', '<p>Vista Construction is a trusted partner offering comprehensive construction and architecture services from design to handover for residential, commercial and mixed-use building projects. With over 15 years of industry experience, we manage every project with quality, aesthetics and on-time delivery principles.</p><h2>How We Work</h2><p>We evaluate each project through site conditions, structural requirements, budget and timeline expectations. We manage all phases under one roof — from feasibility studies to architectural design, from permit processes to on-site execution. Transparent communication and regular progress reporting form the foundation of our workflows.</p><h2>Our Areas of Expertise</h2><ul><li>Residential projects: villas, apartment buildings, residences and mass housing construction</li><li>Commercial projects: office buildings, shopping centers and hotel construction</li><li>Restoration and reinforcement: historical building restoration, earthquake-resistant structural strengthening</li><li>Project management: professional process management from feasibility to handover</li><li>Architectural design: 3D modeling, BIM technology and sustainable design</li><li>Interior design and decoration: custom design solutions for residential and commercial spaces</li></ul><h2>Our Values</h2><p>Full compliance with quality standards, meticulous attention from material selection to workmanship, earthquake-resistant building technologies and energy-efficient solutions are our core values. With our customer-centric approach, we carefully plan and execute every project.</p><h2>Our Team</h2><p>Our team of experienced architects, civil engineers and project managers produces unique solutions for each project. With our strong on-site execution team and reliable supplier network, we deliver your projects on time and in full.</p><p>At Vista Construction, we aim to be a results-oriented construction partner that combines technical knowledge with execution discipline and speaks the same language as our clients.</p>'),
    'Vista Construction delivers reliable, quality and on-time construction services for residential and commercial projects from design to handover.',
    'About Us | Vista Construction',
    'About Vista Construction: reliable construction and architecture services for residential, commercial and mixed-use projects with 15+ years of experience.',
    'vista construction, about us, construction company, architecture, residential projects, commercial construction'
  ),
  (
    'bc020007-6007-4007-a007-cccccccc0007',
    'bc010002-5002-4002-9002-cccccccc0002',
    'en',
    'Privacy Policy',
    'privacy',
    JSON_OBJECT('html', '<p>At Vista Construction, we value the privacy of personal data submitted through this website. Information shared in contact and quotation forms is used only for request handling, response management, and customer communication.</p><h2>Collected Data</h2><ul><li>Name, surname, and company details</li><li>Email address and phone number</li><li>Request content, technical files, and attachments</li><li>Basic visit and performance records</li></ul><h2>Use of Data</h2><p>Collected data is not shared with third parties for marketing purposes without consent. Data transfer occurs only where legally required or explicitly authorized.</p><h2>Rights</h2><p>Data subjects may request access, correction, deletion, or objection regarding their personal data via our communication channels.</p>'),
    'Vista Construction personal data processing and privacy principles.',
    'Privacy Policy | Vista Construction',
    'Read the Vista Construction website privacy policy and personal data processing principles.',
    'privacy policy, personal data, vista construction'
  ),
  (
    'bc020008-6008-4008-a008-cccccccc0008',
    'bc010003-5003-4003-9003-cccccccc0003',
    'en',
    'Terms of Use',
    'terms',
    JSON_OBJECT('html', '<p>By using this website, visitors are deemed to accept the following terms of use. All content, visuals, and technical statements are provided for information purposes and do not replace a project-specific specification.</p><h2>Content Usage</h2><p>Text, visuals, and brand assets may not be copied, reproduced, or commercially used without prior permission.</p><h2>Limitation of Liability</h2><p>Website content is maintained carefully; however, no project decision should be made solely on website information without technical validation.</p><h2>External Links</h2><p>External links are provided for convenience. Responsibility for third-party content belongs to the respective publishers.</p>'),
    'Vista Construction website terms of use and limitation of liability.',
    'Terms of Use | Vista Construction',
    'Vista Construction website terms of use, content rights, and limitation of liability.',
    'terms of use, website terms, vista construction'
  ),
  (
    'bc020009-6009-4009-a009-cccccccc0009',
    'bc010004-5004-4004-9004-cccccccc0004',
    'en',
    'PDPL Information Notice',
    'pdpl-information-notice',
    JSON_OBJECT('html', '<p>In accordance with the Turkish Personal Data Protection Law No. 6698, Vista Construction provides this information notice as the data controller regarding the processing of personal data.</p><h2>Processing Purposes</h2><ul><li>Managing quotation and contact requests</li><li>Running sales and after-sales processes</li><li>Improving service quality</li><li>Fulfilling legal obligations</li></ul><h2>Collection Methods</h2><p>Personal data may be collected through web forms, email, phone, and physical documents.</p><h2>Applications</h2><p>You may submit your requests regarding personal data through our registered communication channels.</p>'),
    'Information notice for personal data processing under Turkish PDPL.',
    'PDPL Information Notice | Vista Construction',
    'Vista Construction PDPL information notice, processing purposes, and application principles.',
    'pdpl, kvkk, personal data notice'
  ),
  (
    'bc020010-6010-4010-a010-cccccccc0010',
    'bc010005-5005-4005-9005-cccccccc0005',
    'en',
    'Cookie Policy',
    'cookies',
    JSON_OBJECT('html', '<p>This website may use cookies to improve user experience, collect essential performance metrics, and identify technical issues.</p><h2>Cookie Types</h2><ul><li>Strictly necessary cookies</li><li>Preference cookies</li><li>Analytics and performance cookies</li></ul><h2>Management</h2><p>You may change your cookie preferences or delete stored cookies through your browser settings. Disabling some cookies may affect certain site functions.</p>'),
    'Vista Construction website cookie usage and preference management information.',
    'Cookie Policy | Vista Construction',
    'Vista Construction website cookie policy, cookie types, and preference management information.',
    'cookie policy, cookies, website preferences'
  )
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `slug` = VALUES(`slug`),
  `content` = VALUES(`content`),
  `summary` = VALUES(`summary`),
  `meta_title` = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `tags` = VALUES(`tags`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
