-- =============================================================
-- FILE: 310_vistainsaat_news.seed.sql
-- Vista İnşaat — Haberler / News (custom_pages) + i18n (TR/EN)
-- module_key = 'news'
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
  -- Röportaj: Tolkan Mimarlık (Röportajlar kategorisi)
  ('nw010001-5001-4001-9001-nnnnnnnn0001', 'news', 1, 1, 10, 10,
   '/uploads/news/tolgahan-sahin-tolkan-mimarlik.jpg', 'sa-news-0001-0001-0001-000000000001',
   '/uploads/news/tolgahan-sahin-tolkan-mimarlik.jpg', 'sa-news-0001-0001-0001-000000000001',
   JSON_ARRAY('/uploads/news/tolgahan-sahin-tolkan-mimarlik.jpg', '/uploads/news/tolkan-mimarlik-ofis-projesi.jpg', '/uploads/news/tolkan-mimarlik-roportaj-dergi.jpg'),
   JSON_ARRAY('sa-news-0001-0001-0001-000000000001', 'sa-news-0002-0002-0002-000000000002', 'sa-news-0003-0003-0003-000000000003'),
   'nccc0001-4001-4001-8001-nncccccc0001', NULL),
  -- Proje Haberleri
  ('nw010002-5002-4002-9002-nnnnnnnn0002', 'news', 1, 1, 20, 20,
   '/uploads/news/istanbul-levent-ofis-kulesi.jpg', 'sa-news-0004-0004-0004-000000000004',
   '/uploads/news/istanbul-levent-ofis-kulesi.jpg', 'sa-news-0004-0004-0004-000000000004', '[]', '[]',
   'nccc0003-4003-4003-8003-nncccccc0003', NULL),
  -- Sektör Haberleri
  ('nw010003-5003-4003-9003-nnnnnnnn0003', 'news', 1, 0, 30, 30,
   '/uploads/news/depreme-dayanikli-yapi.jpg', 'sa-news-0005-0005-0005-000000000005',
   '/uploads/news/depreme-dayanikli-yapi.jpg', 'sa-news-0005-0005-0005-000000000005', '[]', '[]',
   'nccc0002-4002-4002-8002-nncccccc0002', NULL),
  -- Teknoloji
  ('nw010004-5004-4004-9004-nnnnnnnn0004', 'news', 1, 0, 40, 40,
   '/uploads/news/akilli-sehir-altyapi.jpg', 'sa-news-0006-0006-0006-000000000006',
   '/uploads/news/akilli-sehir-altyapi.jpg', 'sa-news-0006-0006-0006-000000000006', '[]', '[]',
   'nccc0004-4004-4004-8004-nncccccc0004', NULL),
  -- Sürdürülebilirlik
  ('nw010005-5005-4005-9005-nnnnnnnn0005', 'news', 1, 1, 50, 50,
   '/uploads/news/moduler-yapi-sistemleri.jpg', 'sa-news-0007-0007-0007-000000000007',
   '/uploads/news/moduler-yapi-sistemleri.jpg', 'sa-news-0007-0007-0007-000000000007', '[]', '[]',
   'nccc0005-4005-4005-8005-nncccccc0005', NULL)
ON DUPLICATE KEY UPDATE
  `module_key`   = VALUES(`module_key`),
  `is_published` = VALUES(`is_published`),
  `featured`     = VALUES(`featured`),
  `display_order`= VALUES(`display_order`),
  `featured_image` = VALUES(`featured_image`),
  `image_url` = VALUES(`image_url`),
  `images`       = VALUES(`images`),
  `category_id`  = VALUES(`category_id`);

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
    'nw020001-6001-4001-a001-nnnnnnnn0001',
    'nw010001-5001-4001-9001-nnnnnnnn0001',
    'tr',
    'Bir Tasarım Ofisinden Fazlası: Tolkan Mimarlık — Tolgahan Şahin Röportajı',
    'tolkan-mimarlik-tolgahan-sahin-roportaji',
    JSON_OBJECT('html', '<p class="nd-lead"><strong>Tolkan Mimarlık''ın kurucusu Tolgahan Şahin ile bir aradayız.</strong> Doğaya, kullanıcıya ve işleve uyumlu projeler tasarlayan Tolgahan Bey, "Yalnızca bir tasarım ofisi olarak değil, aynı zamanda bir inşaat ve uygulama firması olarak da faaliyet göstermekteyiz" diyor.</p>

<h2>Merhaba Tolgahan Bey, Tolkan Mimarlık olarak nasıl yaşam alanları planlıyorsunuz? Bu mekanlar hangi ortak paydada buluşuyor?</h2>

<p>Merhaba, Tolkan Mimarlık olarak hedefimiz herhangi bir şablona bağlı olmadan bölgeye, doğaya, kullanıcıya ve işleve uyumlu proje tasarlamak. Projelerimizdeki hassasiyetimiz, kullanıcının kendini mekana ait hissedebilmesi ve yaşam alanlarının yaşanabilir ve kullanılabilir olması. Bizim amacımız mobilya yığınıyla dolmuş yaşam alanları kurmak yerine kullanıcının talebi doğrultusunda planlanan ve kullanıcıya özgü yaşam alanları tasarlamak.</p>

<h2>Proje sürecinde nasıl bir yol izliyorsunuz?</h2>

<p>Proje sürecimiz birbirine alternatif taslak çizimlerle başlıyor. Başlangıç noktası olarak tasarımımızın karakterini belirlemeye çalışıyoruz ve tasarıma bir kimlik kazandırmayı amaçlıyoruz. Bu doğrultuda belirlediğimiz taslakları arsaya oturtup şekillendirmeye başlıyoruz.</p>

<blockquote>"Uygulanabilir ve kullanılabilir tasarımın; kaliteli ve özenli işçiliğin, her zaman değer göreceğine ve saygıyı hak edeceğine inanıyorum."</blockquote>

<h2>Bir mimarlık firmasını başarıya götüren nedir?</h2>

<p>Biz daha yolun başındayız. Uygulanabilir ve kullanılabilir tasarımın; kaliteli ve özenli işçiliğin, uygulamanın her zaman değer göreceğine ve saygıyı hak edeceğine inanıyorum.</p>

<h2>Yaşam dinamikleri ve toplumun sosyal yapısı, özellikle insan odaklı mimari yapı ve mekanları temelden etkiliyor.</h2>

<p>Değişen yaşam dinamikleri ve kullanıcı alışkanlıkları sizce insanları nasıl tasarımlara yönlendiriyor? Benimsediğiniz mimari akımlar var mı?</p>

<p>İnsan ve insan yaşamı, insan odaklı mimarlığın temelidir. Değişen yaşam dinamikleri de mimarlığa yön vermekte. Geçmişten günümüze insan ve toplum yaşantısının mimariye olan etkileri ve örnekleri mevcuttur. Örneğin gotik mimariden modern mimariye olan radikal geçiş, değişen toplum ve sosyal yaşamın mimaride bulduğu karşılığın en önemli göstergesidir.</p>

<p>Devasa gotik mimari yapılardan, modernizmin getirdiği sosyal ortam ve daha işlevsel ve çok birimli yapıların, çevresine hükmeden yapılardan, çevreyle ilişki kuran yapıların tasarım ve antik mimari esinlenmelerinin yerini ortogonal tasarımlara bıraktığını görüyoruz.</p>

<h2>John Lennon ve Yoko Ono''nun yatak eylemi...</h2>

<p>Modern mimariden çağdaş mimarlığa geçiş ne radikal değil, bir birikimin ve teknolojinin sunduğu imkanlar dahilinde, çeşitli üretim biçimlerinin mimaride karşılık bulmasıyla gerçekleşmektedir. Fakat çağdaş mimarlığın içinde radikal değişimler, insan yaşantısının değişen yapısı ile mevcuttur.</p>

<p>Aklıma gelen en kapsamlı örnek, John Lennon (müzisyen, The Beatles grubu üyesi) ile sevgilisi Yoko Ono''nun yataklarında başlattığı "çalışma" eylemi (1969). Aylarca yataklarında saçlarını uzattı müzik yaptı, yemeklerini yataklarında yiyen ve yataklarında açtıkları pankartlarla günden güne sanatçılar, o dönem işçi ve iş yüküne eleştirel bir biçimde yaptıkları eylem ile çalışma disiplinlerini ve biçimlerini sorgulamışlardı.</p>

<blockquote>"Mimarlıkta geleceğin sürdürülebilir tasarım odaklı olduğunu düşünüyorum."</blockquote>

<h2>Geleceğin mimarlığı hakkında ne düşünüyorsunuz?</h2>

<p>Mimarlıkta geleceğin sürdürülebilir tasarım odaklı olduğunu düşünüyorum. Karbon ayak izi düşük ve enerji verimli yüksek malzeme kullanımı geleceğin her mimari tasarımın gerekliliği haline gelecek diye düşünüyorum.</p>

<h2>Bereket Fide ile İş Birliği</h2>

<p>Mimarlık firmamızın yanı sıra Bereket Fide İnşaat ile toplu konut ve müstakil konut üzerine çalışmalarına başladık. Bu projelerde geleceğe yönelik olarak enerji tasarrufu sağlayan konut projelerine imza atmak istiyoruz.</p>

<p>İş birliğimize Bereket Fide Merkez Ofisi''nin restorasyonu ve üretim tesisinin enerji verimliliğini artırmaya başladık. Projede mevcut kullanılabilir tüm yapı elemanlarını geri dönüştürmeye ve tekrar kullanmaya özen gösterdik. Yapıda mevcut duvar, çelik kirişler, çatı panellerini ve zemin, enerji verimliliği yüksek olarak bilinen çelik kolonlara güçlendirdik.</p>

<p>Yaklaşık 350 kW''lık GES şirketin üretim için gerekli enerji ihtiyacının büyük bir kısmını karşılıyoruz. Bir sonraki projemiz ise içinde kullanılan suyun geri dönüşümünü amaçlayan Atık Su Geri Dönüşüm Projesi. Tamamen fide üretim sektörüne örnek, öncü ve çevreci bir yaklaşım içerisinde Bereket Fide ile projelerimize devam etmeyi planlıyoruz.</p>'),
    'Tolkan Mimarlık''ın kurucusu Tolgahan Şahin ile röportaj: Doğaya, kullanıcıya ve işleve uyumlu projeler tasarlayan bir mimarlık ofisinin hikayesi.',
    'Tolkan Mimarlık Röportajı: Tolgahan Şahin | Vista İnşaat Haberleri',
    'Tolkan Mimarlık kurucusu Tolgahan Şahin ile röportaj. Sürdürülebilir tasarım, insan odaklı mimarlık ve Bereket Fide iş birliği.',
    'röportaj, tolkan mimarlık, tolgahan şahin, sürdürülebilir mimarlık, insan odaklı tasarım'
  ),
  (
    'nw020002-6002-4002-a002-nnnnnnnn0002',
    'nw010002-5002-4002-9002-nnnnnnnn0002',
    'tr',
    'İstanbul''da Yeni Bir Ofis Kulesi Projesi: Levent Bölgesi Yeniden Şekilleniyor',
    'istanbul-levent-ofis-kulesi-projesi',
    JSON_OBJECT('html', '<p>İstanbul''un finans merkezi Levent bölgesinde yeni bir A+ sınıfı ofis kulesi projesi başlıyor. 42 katlı yapı, sürdürülebilir tasarım ilkeleri ve akıllı bina teknolojileriyle dikkat çekecek.</p><h2>Proje Detayları</h2><p>Proje, toplam 85.000 m² kapalı alana sahip olacak. Yapının cephesinde yüksek performanslı çift cidarlı cam sistem kullanılacak. Bina otomasyon sistemi, enerji tüketimini gerçek zamanlı optimize edecek şekilde tasarlanıyor.</p><h2>Sürdürülebilirlik Hedefleri</h2><p>LEED Platinum sertifikasyonu hedeflenen projede, çatı bahçeleri, yağmur suyu toplama sistemleri ve elektrikli araç şarj istasyonları standart olarak yer alacak.</p><p>Projenin 2027 yılında tamamlanması planlanıyor.</p>'),
    'İstanbul Levent''te 42 katlı yeni ofis kulesi projesi: sürdürülebilir tasarım, akıllı bina ve LEED Platinum hedefi.',
    'İstanbul Levent Ofis Kulesi Projesi | Vista İnşaat Haberleri',
    'Levent bölgesinde 42 katlı A+ sınıfı ofis kulesi. LEED Platinum, akıllı bina teknolojileri ve sürdürülebilir cephe tasarımı.',
    'levent, ofis kulesi, LEED platinum, akıllı bina, istanbul'
  ),
  (
    'nw020003-6003-4003-a003-nnnnnnnn0003',
    'nw010003-5003-4003-9003-nnnnnnnn0003',
    'tr',
    'Depreme Dayanıklı Yapı Tasarımında 2025 Güncellemeleri',
    'depreme-dayanikli-yapi-tasarimi-2025',
    JSON_OBJECT('html', '<p>Türkiye Bina Deprem Yönetmeliği''nde yapılan son güncellemeler, yapı tasarımında yeni standartlar getiriyor. Özellikle yüksek sismik bölgelerdeki konut projeleri için kritik değişiklikler söz konusu.</p><h2>Yeni Gereksinimler</h2><p>Güncellenen yönetmelik; performans bazlı tasarım yaklaşımını genişletiyor, taban izolasyonu uygulamalarını teşvik ediyor ve mevcut yapı güçlendirme standartlarını yükseltiyor.</p><h2>Malzeme Standartları</h2><p>Beton dayanım sınıfları ve donatı detaylandırma kurallarında yapılan değişiklikler, özellikle kolon-kiriş birleşim bölgelerindeki süneklik performansını artırmayı hedefliyor.</p>'),
    'Türkiye deprem yönetmeliğindeki 2025 güncellemeleri ve yapı tasarımına etkileri.',
    'Depreme Dayanıklı Yapı Tasarımı 2025 Güncellemeleri | Vista İnşaat',
    'Türkiye deprem yönetmeliği 2025 güncellemeleri. Performans bazlı tasarım, taban izolasyonu ve malzeme standartları.',
    'deprem yönetmeliği, sismik tasarım, yapı güçlendirme, 2025'
  ),
  (
    'nw020004-6004-4004-a004-nnnnnnnn0004',
    'nw010004-5004-4004-9004-nnnnnnnn0004',
    'tr',
    'Akıllı Şehir Projeleri ve Altyapı Dönüşümü',
    'akilli-sehir-projeleri-altyapi-donusumu',
    JSON_OBJECT('html', '<p>Türkiye''deki büyükşehirler, akıllı şehir dönüşümünde önemli adımlar atıyor. IoT sensörleri, dijital ikiz teknolojisi ve entegre ulaşım sistemleri; kentsel altyapıyı yeniden tanımlıyor.</p><h2>Dijital İkiz Uygulamaları</h2><p>Şehirlerin dijital ikizleri, altyapı planlamasından acil durum yönetimine kadar geniş bir yelpazede karar destek sistemi olarak kullanılmaya başlandı.</p><h2>Enerji ve Su Yönetimi</h2><p>Akıllı şebeke sistemleri, su kaybını %30''a kadar azaltırken, enerji dağıtım verimliliğini önemli ölçüde artırıyor.</p>'),
    'Türkiye''de akıllı şehir projeleri, dijital ikiz teknolojisi ve altyapı dönüşümü.',
    'Akıllı Şehir Projeleri ve Altyapı Dönüşümü | Vista İnşaat',
    'Akıllı şehir dönüşümü, IoT altyapısı, dijital ikiz ve entegre ulaşım sistemleri.',
    'akıllı şehir, dijital ikiz, IoT, altyapı dönüşümü'
  ),
  (
    'nw020005-6005-4005-a005-nnnnnnnn0005',
    'nw010005-5005-4005-9005-nnnnnnnn0005',
    'tr',
    'Modüler Yapı Sistemleri: İnşaat Sektörünün Geleceği',
    'moduler-yapi-sistemleri-insaat-gelecegi',
    JSON_OBJECT('html', '<p>Modüler yapı sistemleri, geleneksel inşaat yöntemlerine alternatif olarak hızla yaygınlaşıyor. Fabrikada üretilen bileşenlerin sahada montajı, inşaat süresini %40-60 oranında kısaltabiliyor.</p><h2>Avantajlar</h2><ul><li>Hız: Temel ve üst yapı paralel ilerler</li><li>Kalite: Fabrika ortamında kontrollü üretim</li><li>Sürdürülebilirlik: %70''e kadar daha az atık</li><li>Maliyet: Tekrarlayan projelerde belirgin tasarruf</li></ul><h2>Uygulama Alanları</h2><p>Otel, öğrenci yurdu, hastane ek binaları ve toplu konut projelerinde modüler sistemler giderek daha fazla tercih ediliyor.</p>'),
    'Modüler yapı sistemlerinin avantajları, uygulama alanları ve inşaat sektöründeki geleceği.',
    'Modüler Yapı Sistemleri: İnşaat Sektörünün Geleceği | Vista İnşaat',
    'Modüler yapı teknolojisi, fabrika üretimi, hızlı montaj ve sürdürülebilir inşaat.',
    'modüler yapı, prefabrik, hızlı inşaat, sürdürülebilirlik'
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
    'nw020006-6006-4006-a006-nnnnnnnn0006',
    'nw010001-5001-4001-9001-nnnnnnnn0001',
    'en',
    'More Than a Design Office: Tolkan Architecture — Interview with Tolgahan Şahin',
    'tolkan-architecture-tolgahan-sahin-interview',
    JSON_OBJECT('html', '<p class="nd-lead"><strong>We sat down with Tolgahan Şahin, founder of Tolkan Architecture.</strong> Designing projects that are in harmony with nature, users, and function, Tolgahan says: "We operate not only as a design office, but also as a construction and implementation firm."</p>

<h2>Hello Tolgahan, how does Tolkan Architecture plan living spaces? What common ground do these spaces share?</h2>

<p>Hello, at Tolkan Architecture our goal is to design projects that are compatible with the region, nature, users, and function, without being tied to any template. Our sensitivity in our projects is that the user can feel a sense of belonging to the space, and that living areas are livable and usable. Our aim is to design living spaces planned according to user needs, rather than filling spaces with furniture.</p>

<h2>What path do you follow in the project process?</h2>

<p>Our project process begins with alternative sketch drawings. We try to determine the character of our design as a starting point, aiming to give the design an identity. Accordingly, we start placing and shaping the sketches on the site.</p>

<blockquote>"I believe that applicable and usable design, quality and careful craftsmanship, will always be valued and deserve respect."</blockquote>

<h2>What drives an architecture firm to success?</h2>

<p>We are still at the beginning of the road. I believe that applicable and usable design, quality and careful craftsmanship, will always be valued and deserve respect.</p>

<h2>Life dynamics and social structure fundamentally affect human-centered architectural buildings and spaces.</h2>

<p>How do changing life dynamics and user habits direct people toward new designs? Are there architectural movements you embrace?</p>

<p>Humans and human life are the foundation of human-centered architecture. Changing life dynamics also guide architecture. From past to present, there are effects and examples of human and social life on architecture. For example, the radical transition from Gothic architecture to modern architecture is the most important indicator of changes in society and social life reflected in architecture.</p>

<p>From massive Gothic architectural structures, we see that the social environment and more functional multi-unit buildings brought by modernism, from structures that dominate their surroundings to structures that establish relationships with their environment, and that design and ancient architectural inspirations have given way to orthogonal designs.</p>

<h2>John Lennon and Yoko Ono''s Bed-In...</h2>

<p>The transition from modern to contemporary architecture is not radical but occurs through the accumulation and possibilities offered by technology, finding expression in various production methods in architecture. However, within contemporary architecture, there are radical changes in the changing structure of human life.</p>

<p>The most comprehensive example that comes to mind is John Lennon (musician, member of The Beatles) and his partner Yoko Ono starting their "work" action in their beds (1969). For months they grew their hair in bed, made music, ate meals in bed, and with banners they hung, artists of that era questioned work discipline and its forms critically.</p>

<blockquote>"I believe the future of architecture is sustainability-focused design."</blockquote>

<h2>What do you think about the future of architecture?</h2>

<p>I believe the future of architecture is sustainability-focused design. I think using materials with low carbon footprint and high energy efficiency will become a requirement of every architectural design in the future.</p>

<h2>Partnership with Bereket Fide</h2>

<p>In addition to our architecture firm, we have started working on mass housing and detached housing with Bereket Fide Construction. In these projects, we want to sign energy-saving housing projects for the future.</p>

<p>We started our partnership by improving the energy efficiency of Bereket Fide Head Office restoration and production facility. In the project, we took care to recycle and reuse all available building elements. We strengthened existing walls, steel beams, roof panels and flooring with steel columns known for high energy efficiency.</p>

<p>We are meeting a large portion of the company''s production energy needs with an approximately 350 kW solar energy system. Our next project is the Waste Water Recycling Project aimed at recycling used water. We plan to continue our projects with Bereket Fide as a pioneering and environmentally friendly approach in the seedling production sector.</p>'),
    'Interview with Tolgahan Şahin, founder of Tolkan Architecture: A design office that creates projects in harmony with nature, users, and function.',
    'Tolkan Architecture Interview: Tolgahan Şahin | Vista Construction News',
    'Interview with Tolkan Architecture founder Tolgahan Şahin. Sustainable design, human-centered architecture and Bereket Fide partnership.',
    'interview, tolkan architecture, tolgahan sahin, sustainable architecture, human-centered design'
  ),
  (
    'nw020007-6007-4007-a007-nnnnnnnn0007',
    'nw010002-5002-4002-9002-nnnnnnnn0002',
    'en',
    'New Office Tower Project in Istanbul: Levent District Being Reshaped',
    'istanbul-levent-office-tower-project',
    JSON_OBJECT('html', '<p>A new A+ class office tower project is starting in Istanbul''s financial center, the Levent district. The 42-storey building will stand out with its sustainable design principles and smart building technologies.</p><h2>Project Details</h2><p>The project will have a total enclosed area of 85,000 m². The building facade will feature a high-performance double-skin glass system. The building automation system is designed to optimize energy consumption in real time.</p><h2>Sustainability Goals</h2><p>The project targets LEED Platinum certification and will include roof gardens, rainwater collection systems, and electric vehicle charging stations as standard.</p><p>The project is planned for completion in 2027.</p>'),
    'A new 42-storey office tower in Istanbul Levent: sustainable design, smart building and LEED Platinum target.',
    'Istanbul Levent Office Tower Project | Vista Construction News',
    'A 42-storey A+ class office tower in Levent. LEED Platinum, smart building technologies and sustainable facade design.',
    'levent, office tower, LEED platinum, smart building, istanbul'
  ),
  (
    'nw020008-6008-4008-a008-nnnnnnnn0008',
    'nw010003-5003-4003-9003-nnnnnnnn0003',
    'en',
    'Earthquake-Resistant Building Design: 2025 Updates',
    'earthquake-resistant-building-design-2025',
    JSON_OBJECT('html', '<p>Recent updates to Turkey''s Building Earthquake Regulation bring new standards to structural design. Critical changes are particularly relevant for residential projects in high seismic zones.</p><h2>New Requirements</h2><p>The updated regulation expands the performance-based design approach, encourages base isolation applications, and raises existing structural strengthening standards.</p><h2>Material Standards</h2><p>Changes in concrete strength classes and reinforcement detailing rules aim to improve ductility performance, particularly in column-beam connection zones.</p>'),
    'Turkey earthquake regulation 2025 updates and their impact on structural design.',
    'Earthquake-Resistant Building Design 2025 Updates | Vista Construction',
    'Turkey earthquake regulation 2025 updates. Performance-based design, base isolation and material standards.',
    'earthquake regulation, seismic design, structural strengthening, 2025'
  ),
  (
    'nw020009-6009-4009-a009-nnnnnnnn0009',
    'nw010004-5004-4004-9004-nnnnnnnn0004',
    'en',
    'Smart City Projects and Infrastructure Transformation',
    'smart-city-projects-infrastructure-transformation',
    JSON_OBJECT('html', '<p>Major cities in Turkey are taking significant steps in smart city transformation. IoT sensors, digital twin technology, and integrated transportation systems are redefining urban infrastructure.</p><h2>Digital Twin Applications</h2><p>Digital twins of cities have started being used as decision support systems in a wide range from infrastructure planning to emergency management.</p><h2>Energy and Water Management</h2><p>Smart grid systems reduce water loss by up to 30% while significantly increasing energy distribution efficiency.</p>'),
    'Smart city projects in Turkey, digital twin technology and infrastructure transformation.',
    'Smart City Projects and Infrastructure Transformation | Vista Construction',
    'Smart city transformation, IoT infrastructure, digital twin and integrated transportation systems.',
    'smart city, digital twin, IoT, infrastructure transformation'
  ),
  (
    'nw020010-6010-4010-a010-nnnnnnnn0010',
    'nw010005-5005-4005-9005-nnnnnnnn0005',
    'en',
    'Modular Building Systems: The Future of Construction',
    'modular-building-systems-future-construction',
    JSON_OBJECT('html', '<p>Modular building systems are rapidly becoming widespread as an alternative to traditional construction methods. Assembly of factory-produced components on site can shorten construction time by 40-60%.</p><h2>Advantages</h2><ul><li>Speed: Foundation and superstructure progress in parallel</li><li>Quality: Controlled production in factory environment</li><li>Sustainability: Up to 70% less waste</li><li>Cost: Significant savings in repetitive projects</li></ul><h2>Application Areas</h2><p>Modular systems are increasingly preferred in hotels, student dormitories, hospital extensions, and mass housing projects.</p>'),
    'Advantages, application areas and future of modular building systems in the construction sector.',
    'Modular Building Systems: The Future of Construction | Vista Construction',
    'Modular building technology, factory production, rapid assembly and sustainable construction.',
    'modular building, prefabricated, rapid construction, sustainability'
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
