-- =============================================================
-- SEED: Vista İnşaat Services (6 hizmet, TR + EN i18n)
-- =============================================================

-- 1) Konut İnşaatı
INSERT INTO services (id, module_key, is_active, is_featured, display_order, image_url, storage_asset_id)
VALUES ('sv010001-0001-4001-9001-000000000001', 'vistainsaat', 1, 1, 1, '/uploads/services/konut-insaat-hizmeti.jpg', 'sa-svc-0001-0001-0001-000000000001');

INSERT INTO services_i18n (service_id, locale, title, slug, description, content, alt, tags, meta_title, meta_description)
VALUES
('sv010001-0001-4001-9001-000000000001', 'tr', 'Konut İnşaatı', 'konut-insaati',
 'Modern yaşam standartlarına uygun, estetik ve dayanıklı konut projeleri inşa ediyoruz.',
 '<p>Vista İnşaat olarak, müstakil konutlardan toplu konut projelerine kadar geniş bir yelpazede hizmet sunuyoruz. Her projemizde depreme dayanıklı yapı teknolojileri, enerji verimli malzemeler ve çağdaş mimari anlayışı bir arada kullanıyoruz. Müşterilerimizin yaşam kalitesini en üst düzeye çıkarmak için detaylara özen gösteriyoruz.</p>',
 'Vista İnşaat konut inşaatı hizmetleri',
 '["konut", "inşaat", "rezidans", "villa"]',
 'Konut İnşaatı | Vista İnşaat',
 'Vista İnşaat ile modern, depreme dayanıklı ve enerji verimli konut projeleri. Müstakil konut, villa ve toplu konut inşaatı hizmetleri.'),
('sv010001-0001-4001-9001-000000000001', 'en', 'Residential Construction', 'residential-construction',
 'We build aesthetic and durable residential projects that meet modern living standards.',
 '<p>At Vista Construction, we offer a wide range of services from detached houses to mass housing projects. In every project, we combine earthquake-resistant building technologies, energy-efficient materials, and contemporary architectural understanding. We pay attention to details to maximize our customers'' quality of life.</p>',
 'Vista Construction residential construction services',
 '["residential", "construction", "villa", "housing"]',
 'Residential Construction | Vista Construction',
 'Modern, earthquake-resistant and energy-efficient residential projects with Vista Construction. Detached house, villa and mass housing construction services.');

-- 2) Ticari İnşaat
INSERT INTO services (id, module_key, is_active, is_featured, display_order, image_url, storage_asset_id)
VALUES ('sv010001-0001-4001-9001-000000000002', 'vistainsaat', 1, 1, 2, '/uploads/services/ticari-insaat-hizmeti.jpg', 'sa-svc-0002-0002-0002-000000000002');

INSERT INTO services_i18n (service_id, locale, title, slug, description, content, alt, tags, meta_title, meta_description)
VALUES
('sv010001-0001-4001-9001-000000000002', 'tr', 'Ticari İnşaat', 'ticari-insaat',
 'Ofis binaları, alışveriş merkezleri ve endüstriyel tesisler için profesyonel ticari inşaat çözümleri.',
 '<p>Ticari yapılar, iş dünyasının ihtiyaçlarına cevap verecek şekilde tasarlanmalı ve inşa edilmelidir. Vista İnşaat, ofis binaları, alışveriş merkezleri, otel projeleri ve endüstriyel tesislerin yapımında uzmanlaşmıştır. Projelerimizde fonksiyonellik, estetik ve sürdürülebilirlik ilkelerini ön planda tutuyoruz.</p>',
 'Vista İnşaat ticari inşaat hizmetleri',
 '["ticari", "ofis", "alışveriş merkezi", "endüstriyel"]',
 'Ticari İnşaat | Vista İnşaat',
 'Ofis binaları, AVM ve endüstriyel tesis inşaatı. Vista İnşaat ile profesyonel ticari inşaat çözümleri.'),
('sv010001-0001-4001-9001-000000000002', 'en', 'Commercial Construction', 'commercial-construction',
 'Professional commercial construction solutions for office buildings, shopping centers and industrial facilities.',
 '<p>Commercial buildings must be designed and constructed to meet the needs of the business world. Vista Construction specializes in the construction of office buildings, shopping centers, hotel projects, and industrial facilities. In our projects, we prioritize functionality, aesthetics, and sustainability principles.</p>',
 'Vista Construction commercial construction services',
 '["commercial", "office", "shopping center", "industrial"]',
 'Commercial Construction | Vista Construction',
 'Office buildings, shopping centers and industrial facility construction. Professional commercial construction solutions with Vista Construction.');

-- 3) Restorasyon ve Güçlendirme
INSERT INTO services (id, module_key, is_active, is_featured, display_order, image_url, storage_asset_id)
VALUES ('sv010001-0001-4001-9001-000000000003', 'vistainsaat', 1, 0, 3, '/uploads/services/restorasyon-hizmeti.jpg', 'sa-svc-0003-0003-0003-000000000003');

INSERT INTO services_i18n (service_id, locale, title, slug, description, content, alt, tags, meta_title, meta_description)
VALUES
('sv010001-0001-4001-9001-000000000003', 'tr', 'Restorasyon ve Güçlendirme', 'restorasyon-guclendirme',
 'Tarihi yapıların restorasyonu ve mevcut binaların depreme karşı güçlendirilmesi hizmetleri.',
 '<p>Kültürel mirasımızın korunması ve mevcut yapıların güvenli hale getirilmesi büyük önem taşımaktadır. Vista İnşaat, tarihi eserlerin orijinal dokusunu koruyarak restore edilmesi ve mevcut binaların modern deprem yönetmeliklerine uygun şekilde güçlendirilmesi konularında deneyimli bir ekiple hizmet vermektedir. Karbon fiber, çelik mantolama ve betonarme güçlendirme tekniklerini uyguluyoruz.</p>',
 'Vista İnşaat restorasyon ve güçlendirme hizmetleri',
 '["restorasyon", "güçlendirme", "deprem", "tarihi yapı"]',
 'Restorasyon ve Güçlendirme | Vista İnşaat',
 'Tarihi yapı restorasyonu ve depreme karşı bina güçlendirme hizmetleri. Vista İnşaat ile güvenli ve korunan yapılar.'),
('sv010001-0001-4001-9001-000000000003', 'en', 'Restoration & Reinforcement', 'restoration-reinforcement',
 'Historical building restoration and earthquake reinforcement services for existing structures.',
 '<p>Preserving our cultural heritage and making existing structures safe is of great importance. Vista Construction provides services with an experienced team in restoring historical artifacts while preserving their original texture and reinforcing existing buildings in accordance with modern earthquake regulations. We apply carbon fiber, steel jacketing, and reinforced concrete strengthening techniques.</p>',
 'Vista Construction restoration and reinforcement services',
 '["restoration", "reinforcement", "earthquake", "historical"]',
 'Restoration & Reinforcement | Vista Construction',
 'Historical building restoration and earthquake reinforcement services. Safe and preserved structures with Vista Construction.');

-- 4) Proje Yönetimi
INSERT INTO services (id, module_key, is_active, is_featured, display_order, image_url, storage_asset_id)
VALUES ('sv010001-0001-4001-9001-000000000004', 'vistainsaat', 1, 1, 4, '/uploads/services/proje-yonetimi-hizmeti.jpg', 'sa-svc-0004-0004-0004-000000000004');

INSERT INTO services_i18n (service_id, locale, title, slug, description, content, alt, tags, meta_title, meta_description)
VALUES
('sv010001-0001-4001-9001-000000000004', 'tr', 'Proje Yönetimi', 'proje-yonetimi',
 'İnşaat projelerinizin başından sonuna kadar profesyonel proje yönetimi ve danışmanlık hizmetleri.',
 '<p>Başarılı bir inşaat projesi, etkili bir proje yönetimi gerektirir. Vista İnşaat, fizibilite çalışmalarından yapı denetimine, bütçe planlamasından takvim yönetimine kadar tüm süreçlerde profesyonel proje yönetimi hizmeti sunmaktadır. Deneyimli mühendis ve yönetici kadromuzla projelerinizi zamanında ve bütçe dahilinde tamamlıyoruz.</p>',
 'Vista İnşaat proje yönetimi hizmetleri',
 '["proje yönetimi", "danışmanlık", "yapı denetimi", "planlama"]',
 'Proje Yönetimi | Vista İnşaat',
 'İnşaat proje yönetimi ve danışmanlık hizmetleri. Vista İnşaat ile projelerinizi zamanında ve bütçe dahilinde tamamlayın.'),
('sv010001-0001-4001-9001-000000000004', 'en', 'Project Management', 'project-management',
 'Professional project management and consulting services from start to finish for your construction projects.',
 '<p>A successful construction project requires effective project management. Vista Construction offers professional project management services in all processes from feasibility studies to building inspection, from budget planning to schedule management. With our experienced team of engineers and managers, we complete your projects on time and within budget.</p>',
 'Vista Construction project management services',
 '["project management", "consulting", "building inspection", "planning"]',
 'Project Management | Vista Construction',
 'Construction project management and consulting services. Complete your projects on time and within budget with Vista Construction.');

-- 5) Mimari Tasarım (restorasyon resmini kullan — sonra değiştirilir)
INSERT INTO services (id, module_key, is_active, is_featured, display_order, image_url, storage_asset_id)
VALUES ('sv010001-0001-4001-9001-000000000005', 'vistainsaat', 1, 0, 5, '/uploads/services/restorasyon-hizmeti.jpg', 'sa-svc-0003-0003-0003-000000000003');

INSERT INTO services_i18n (service_id, locale, title, slug, description, content, alt, tags, meta_title, meta_description)
VALUES
('sv010001-0001-4001-9001-000000000005', 'tr', 'Mimari Tasarım', 'mimari-tasarim',
 'Estetik, fonksiyonel ve sürdürülebilir mimari tasarım çözümleri sunuyoruz.',
 '<p>Vista İnşaat mimari tasarım ekibi, her projeye özgün ve yenilikçi çözümler üretmektedir. Konut, ticari ve karma kullanımlı projelerde çağdaş mimari yaklaşımları uygulayarak, hem estetik hem de fonksiyonel mekanlar tasarlıyoruz. 3D modelleme, BIM teknolojisi ve sürdürülebilir tasarım ilkeleri projelerimizin temelini oluşturmaktadır.</p>',
 'Vista İnşaat mimari tasarım hizmetleri',
 '["mimari", "tasarım", "3D modelleme", "BIM"]',
 'Mimari Tasarım | Vista İnşaat',
 'Estetik ve fonksiyonel mimari tasarım hizmetleri. Vista İnşaat ile hayalinizdeki yapıları tasarlayın.'),
('sv010001-0001-4001-9001-000000000005', 'en', 'Architectural Design', 'architectural-design',
 'We offer aesthetic, functional, and sustainable architectural design solutions.',
 '<p>Vista Construction''s architectural design team produces unique and innovative solutions for each project. By applying contemporary architectural approaches in residential, commercial, and mixed-use projects, we design spaces that are both aesthetic and functional. 3D modeling, BIM technology, and sustainable design principles form the foundation of our projects.</p>',
 'Vista Construction architectural design services',
 '["architecture", "design", "3D modeling", "BIM"]',
 'Architectural Design | Vista Construction',
 'Aesthetic and functional architectural design services. Design your dream structures with Vista Construction.');

-- 6) İç Mimari ve Dekorasyon (konut resmini kullan — sonra değiştirilir)
INSERT INTO services (id, module_key, is_active, is_featured, display_order, image_url, storage_asset_id)
VALUES ('sv010001-0001-4001-9001-000000000006', 'vistainsaat', 1, 0, 6, '/uploads/services/konut-insaat-hizmeti.jpg', 'sa-svc-0001-0001-0001-000000000001');

INSERT INTO services_i18n (service_id, locale, title, slug, description, content, alt, tags, meta_title, meta_description)
VALUES
('sv010001-0001-4001-9001-000000000006', 'tr', 'İç Mimari ve Dekorasyon', 'ic-mimari-dekorasyon',
 'Yaşam ve çalışma alanlarınız için özel iç mimari tasarım ve dekorasyon hizmetleri.',
 '<p>İç mekan tasarımı, bir yapının ruhunu belirleyen en önemli unsurdur. Vista İnşaat iç mimari ekibi, konut ve ticari mekanlarınız için kişiye özel tasarım çözümleri sunmaktadır. Malzeme seçiminden aydınlatma planlamasına, mobilya tasarımından renk paletine kadar tüm detayları titizlikle planlıyor ve uyguluyoruz.</p>',
 'Vista İnşaat iç mimari ve dekorasyon hizmetleri',
 '["iç mimari", "dekorasyon", "tasarım", "mobilya"]',
 'İç Mimari ve Dekorasyon | Vista İnşaat',
 'Konut ve ticari mekanlar için iç mimari tasarım ve dekorasyon hizmetleri. Vista İnşaat ile yaşam alanlarınızı dönüştürün.'),
('sv010001-0001-4001-9001-000000000006', 'en', 'Interior Design & Decoration', 'interior-design-decoration',
 'Custom interior design and decoration services for your living and working spaces.',
 '<p>Interior design is the most important element that determines the soul of a building. Vista Construction''s interior design team offers personalized design solutions for your residential and commercial spaces. We meticulously plan and implement all details from material selection to lighting planning, from furniture design to color palette.</p>',
 'Vista Construction interior design and decoration services',
 '["interior design", "decoration", "design", "furniture"]',
 'Interior Design & Decoration | Vista Construction',
 'Interior design and decoration services for residential and commercial spaces. Transform your living spaces with Vista Construction.');
