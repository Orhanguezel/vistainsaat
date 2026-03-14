type FallbackItem = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  image_url?: string;
  category_name?: string;
  specifications?: Record<string, string>;
  images?: string[];
  tags?: string[];
  content?: string;
  meta_title?: string;
  meta_description?: string;
};

type FallbackGalleryItem = FallbackItem & {
  imageSrc: string;
};

type LocaleKey = 'tr' | 'en';

const fallbackProjects: Record<LocaleKey, FallbackItem[]> = {
  tr: [
    {
      id: 'fb-tr-01',
      title: 'Boğaz Manzaralı Rezidans',
      slug: 'bogaz-manzarali-rezidans',
      description: 'İstanbul Boğazı manzaralı 18 bağımsız bölümden oluşan lüks konut projesi.',
      image_url: '/uploads/projects/vista-insaat-proje-01.jpeg',
      category_name: 'Konut',
      specifications: { lokasyon: 'İstanbul, Beşiktaş', mimarlar: 'Vista Mimarlık & Mühendislik', tip: 'Konut', yil: '2024', alan: '4.200 m²', durum: 'Tamamlandı', kat: '6', malzeme: 'Betonarme', isveren: 'Özel Yatırımcı' },
      images: ['/uploads/projects/vista-insaat-proje-01.jpeg', '/uploads/projects/vista-insaat-proje-02.jpeg', '/uploads/projects/vista-insaat-proje-03.jpeg'],
      tags: ['Betonarme', 'Konut', 'Rezidans', 'Lüks', 'Boğaz Manzara'],
      content: '<p>İstanbul Beşiktaş\'ta eşsiz Boğaz manzarasına sahip <strong>18 bağımsız bölümlü, 6 katlı lüks rezidans</strong> projesi. Betonarme taşıyıcı sistem, enerji verimli cam cephe, akıllı ev sistemleri ve özel peyzaj düzenlemesi uygulanmıştır.</p>',
      meta_title: 'Boğaz Manzaralı Rezidans Beşiktaş — Vista İnşaat',
      meta_description: 'İstanbul Beşiktaş\'ta Boğaz manzaralı 18 bağımsız bölümlü 6 katlı lüks rezidans projesi. Vista İnşaat konut referansı.',
    },
    {
      id: 'fb-tr-02',
      title: 'Levent Ofis Kulesi',
      slug: 'levent-ofis-kulesi',
      description: 'A sınıfı ofis standardında 12 katlı yeşil sertifikalı ticari yapı.',
      image_url: '/uploads/projects/vista-insaat-proje-05.jpeg',
      category_name: 'Ticari',
      specifications: { lokasyon: 'İstanbul, Levent', mimarlar: 'DB Architects + Vista Mimarlık', tip: 'Ticari', yil: '2023', alan: '18.500 m²', durum: 'Tamamlandı', kat: '12', malzeme: 'Çelik + Cam Cephe', isveren: 'Kurumsal' },
      images: ['/uploads/projects/vista-insaat-proje-05.jpeg', '/uploads/projects/vista-insaat-proje-06.jpeg', '/uploads/projects/vista-insaat-proje-07.jpeg'],
      tags: ['Çelik', 'Cam Cephe', 'Ticari', 'Ofis', 'LEED', 'Yeşil Bina'],
      content: '<p>İstanbul Levent\'te <strong>12 katlı LEED sertifikalı A sınıfı ofis kulesi</strong>. Çelik konstrüksiyon ve yüksek performanslı cam cephe sistemi ile inşa edilmiştir. Yağmur suyu geri kazanımı ve akıllı bina yönetim sistemi içerir.</p>',
      meta_title: 'Levent Ofis Kulesi Yeşil Sertifikalı — Vista İnşaat',
      meta_description: 'İstanbul Levent\'te 12 katlı LEED sertifikalı A sınıfı ofis kulesi. Çelik konstrüksiyon ve cam cephe. Vista İnşaat ticari referans.',
    },
    {
      id: 'fb-tr-03',
      title: 'Kadıköy Karma Yapı Kompleksi',
      slug: 'kadikoy-karma-yapi-kompleksi',
      description: '64 konut birimi ve 3 kat ticari alandan oluşan karma kullanımlı proje.',
      image_url: '/uploads/projects/vista-insaat-proje-10.jpeg',
      category_name: 'Karma Kullanım',
      specifications: { lokasyon: 'İstanbul, Kadıköy', mimarlar: 'Vista Mimarlık & Mühendislik', tip: 'Karma Kullanım', yil: '2025', alan: '12.800 m²', durum: 'Devam Ediyor', kat: '10', malzeme: 'Betonarme', isveren: 'Özel Yatırımcı' },
      images: ['/uploads/projects/vista-insaat-proje-10.jpeg', '/uploads/projects/vista-insaat-proje-11.jpeg', '/uploads/projects/vista-insaat-proje-12.jpeg'],
      tags: ['Betonarme', 'Karma Kullanım', 'Konut', 'Ticari'],
      content: '<p>İstanbul Kadıköy\'de <strong>64 konut birimi ve 3 kat ticari alan</strong> içeren karma kullanımlı yapı kompleksi. Zemin ve üst katlarda ticari alanlar, üst katlarda farklı tiplerde konut birimleri yer almaktadır.</p>',
      meta_title: 'Kadıköy Karma Yapı Kompleksi — Vista İnşaat',
      meta_description: 'İstanbul Kadıköy\'de 64 konut ve 3 kat ticari alanlı karma yapı kompleksi. Vista İnşaat karma kullanım referansı.',
    },
    {
      id: 'fb-tr-04',
      title: 'Tarihi Han Restorasyon',
      slug: 'tarihi-han-restorasyon-projesi',
      description: '19. yüzyıl tarihi hanının özgün dokusu korunarak restore edilmesi.',
      image_url: '/uploads/projects/vista-insaat-proje-15.jpeg',
      category_name: 'Restorasyon',
      specifications: { lokasyon: 'İstanbul, Eminönü', mimarlar: 'Koruma Mimarlık + Vista Mimarlık', tip: 'Restorasyon', yil: '2022', alan: '3.400 m²', durum: 'Tamamlandı', kat: '3', malzeme: 'Yığma Taş + Ahşap', isveren: 'Kamu' },
      images: ['/uploads/projects/vista-insaat-proje-15.jpeg', '/uploads/projects/vista-insaat-proje-16.jpeg', '/uploads/projects/vista-insaat-proje-17.jpeg'],
      tags: ['Yığma Taş', 'Ahşap', 'Restorasyon', 'Tarihi Yapı', 'Koruma'],
      content: '<p>İstanbul Eminönü\'nde <strong>19. yüzyıl Osmanlı hanının kapsamlı restorasyonu</strong>. Özgün taş duvar dokusu korunarak güçlendirme yapılmış, ahşap çatı ve döşeme elemanları restore edilmiştir. Koruma Kurulu denetiminde gerçekleştirilmiştir.</p>',
      meta_title: 'Tarihi Han Restorasyonu Eminönü — Vista İnşaat',
      meta_description: 'İstanbul Eminönü\'nde 19. yüzyıl Osmanlı hanının kapsamlı restorasyonu. Vista İnşaat restorasyon referansı.',
    },
    {
      id: 'fb-tr-05',
      title: 'Gebze Lojistik Merkezi',
      slug: 'gebze-lojistik-merkezi',
      description: '8.000 m² kapalı alana sahip prefabrik çelik yapı lojistik depo kompleksi.',
      image_url: '/uploads/projects/vista-insaat-proje-20.jpeg',
      category_name: 'Endüstriyel',
      specifications: { lokasyon: 'Kocaeli, Gebze', mimarlar: 'Vista Mimarlık & Mühendislik', tip: 'Endüstriyel', yil: '2024', alan: '8.000 m²', durum: 'Tamamlandı', kat: '1', malzeme: 'Prefabrik Çelik', isveren: 'Kurumsal' },
      images: ['/uploads/projects/vista-insaat-proje-20.jpeg', '/uploads/projects/vista-insaat-proje-21.jpeg'],
      tags: ['Prefabrik Çelik', 'Endüstriyel', 'Lojistik', 'Depo'],
      content: '<p>Kocaeli Gebze\'de <strong>8.000 m² kapalı alanlı prefabrik çelik yapı</strong> lojistik depo. Yüksek tonajlı vinç kapasitesine uygun çelik yapı sistemi ve modern yükleme rampaları ile projelendirilmiştir.</p>',
      meta_title: 'Gebze Lojistik Merkezi — Vista İnşaat',
      meta_description: 'Kocaeli Gebze\'de 8.000 m² prefabrik çelik yapı lojistik depo projesi. Vista İnşaat endüstriyel referans.',
    },
    {
      id: 'fb-tr-06',
      title: 'Beşiktaş Sahil Rezidans',
      slug: 'besiktas-sahil-rezidans',
      description: 'Sahil şeridinde konumlanan 24 daireli modern konut projesi.',
      image_url: '/uploads/projects/vista-insaat-proje-25.jpeg',
      category_name: 'Konut',
      specifications: { lokasyon: 'İstanbul, Beşiktaş', mimarlar: 'Vista Mimarlık & Mühendislik', tip: 'Konut', yil: '2025', alan: '5.600 m²', durum: 'Devam Ediyor', kat: '8', malzeme: 'Betonarme', isveren: 'Özel Yatırımcı' },
      images: ['/uploads/projects/vista-insaat-proje-25.jpeg', '/uploads/projects/vista-insaat-proje-26.jpeg', '/uploads/projects/vista-insaat-proje-27.jpeg'],
      tags: ['Betonarme', 'Konut', 'Rezidans', 'Sahil', 'Modern'],
      content: '<p>İstanbul Beşiktaş sahil şeridinde <strong>24 daireli modern rezidans</strong>. Cephe kaplama, peyzaj düzenleme ve havuz inşaatı dahil tüm yapım süreçleri planlanmıştır.</p>',
      meta_title: 'Beşiktaş Sahil Rezidans — Vista İnşaat',
      meta_description: 'İstanbul Beşiktaş sahilde 24 daireli modern rezidans projesi. Vista İnşaat konut referansı.',
    },
    {
      id: 'fb-tr-07',
      title: 'Ankara Kamu Hizmet Binası',
      slug: 'ankara-kamu-hizmet-binasi',
      description: 'Bakanlık hizmet binası modernizasyonu ve ek bina inşaatı.',
      image_url: '/uploads/projects/vista-insaat-proje-30.jpeg',
      category_name: 'Kamu',
      specifications: { lokasyon: 'Ankara, Çankaya', mimarlar: 'Vista Mimarlık & Mühendislik', tip: 'Kamu', yil: '2023', alan: '22.000 m²', durum: 'Tamamlandı', kat: '7', malzeme: 'Betonarme + Cam Cephe', isveren: 'Kamu' },
      images: ['/uploads/projects/vista-insaat-proje-30.jpeg', '/uploads/projects/vista-insaat-proje-31.jpeg', '/uploads/projects/vista-insaat-proje-32.jpeg'],
      tags: ['Betonarme', 'Cam Cephe', 'Kamu', 'Hizmet Binası'],
      content: '<p>Ankara Çankaya\'da <strong>7 katlı bakanlık hizmet binası</strong>. Betonarme taşıyıcı sistem, cam cephe, deprem güçlendirme ve komple mekanik tesisat uygulamaları gerçekleştirilmiştir.</p>',
      meta_title: 'Ankara Kamu Hizmet Binası — Vista İnşaat',
      meta_description: 'Ankara Çankaya\'da 7 katlı bakanlık hizmet binası inşaatı. Vista İnşaat kamu referansı.',
    },
    {
      id: 'fb-tr-08',
      title: 'Bursa Altyapı ve Çevre Düzenlemesi',
      slug: 'bursa-altyapi-cevre-duzenlemesi',
      description: 'Organize sanayi bölgesi altyapı yenileme ve çevre düzenleme projesi.',
      image_url: '/uploads/projects/vista-insaat-proje-35.jpeg',
      category_name: 'Altyapı',
      specifications: { lokasyon: 'Bursa, Nilüfer', mimarlar: 'Vista Mimarlık & Mühendislik', tip: 'Altyapı', yil: '2024', alan: '45.000 m²', durum: 'Tamamlandı', malzeme: 'Beton + Asfalt', isveren: 'Kamu' },
      images: ['/uploads/projects/vista-insaat-proje-35.jpeg', '/uploads/projects/vista-insaat-proje-36.jpeg'],
      tags: ['Beton', 'Asfalt', 'Altyapı', 'Çevre Düzenleme'],
      content: '<p>Bursa Nilüfer OSB\'de <strong>45.000 m² alanda altyapı yenileme</strong>. Yol yapımı, kanalizasyon hatları, yağmur suyu drenaj sistemi ve peyzaj düzenlemesi tamamlanmıştır.</p>',
      meta_title: 'Bursa OSB Altyapı Yenileme — Vista İnşaat',
      meta_description: 'Bursa Nilüfer OSB\'de 45.000 m² altyapı yenileme projesi. Vista İnşaat altyapı referansı.',
    },
    {
      id: 'fb-tr-09',
      title: 'Antalya Boutique Otel',
      slug: 'antalya-boutique-otel',
      description: 'Kaleiçi bölgesinde tarihi dokuya uyumlu 32 odalı butik otel projesi.',
      image_url: '/uploads/projects/vista-insaat-proje-40.jpeg',
      category_name: 'Turizm',
      specifications: { lokasyon: 'Antalya, Kaleiçi', mimarlar: 'ARC Studio + Vista Mimarlık', tip: 'Turizm', yil: '2025', alan: '2.800 m²', durum: 'Devam Ediyor', kat: '4', malzeme: 'Yığma Taş + Ahşap', isveren: 'Özel Yatırımcı' },
      images: ['/uploads/projects/vista-insaat-proje-40.jpeg', '/uploads/projects/vista-insaat-proje-41.jpeg', '/uploads/projects/vista-insaat-proje-42.jpeg'],
      tags: ['Yığma Taş', 'Ahşap', 'Turizm', 'Otel', 'Tarihi Doku'],
      content: '<p>Antalya Kaleiçi\'nde <strong>32 odalı butik otel</strong>. UNESCO Dünya Mirası listesindeki tarihi dokuya uygun olarak yığma taş ve ahşap işçiliği ile inşa edilmektedir.</p>',
      meta_title: 'Antalya Kaleiçi Butik Otel — Vista İnşaat',
      meta_description: 'Antalya Kaleiçi\'nde tarihi dokuya uyumlu 32 odalı butik otel. Vista İnşaat turizm referansı.',
    },
    {
      id: 'fb-tr-10',
      title: 'İzmir Teknoloji Kampüsü',
      slug: 'izmir-teknoloji-kampusu',
      description: 'Yazılım ve AR-GE şirketleri için sürdürülebilir ofis kampüsü.',
      image_url: '/uploads/projects/vista-insaat-proje-45.jpeg',
      category_name: 'Ticari',
      specifications: { lokasyon: 'İzmir, Bayraklı', mimarlar: 'Vista Mimarlık & Mühendislik', tip: 'Ticari', yil: '2024', alan: '32.000 m²', durum: 'Tamamlandı', kat: '5', malzeme: 'Çelik + Cam Cephe', isveren: 'Kurumsal' },
      images: ['/uploads/projects/vista-insaat-proje-45.jpeg', '/uploads/projects/vista-insaat-proje-46.jpeg', '/uploads/projects/vista-insaat-proje-47.jpeg'],
      tags: ['Çelik', 'Cam Cephe', 'Ticari', 'Teknoloji', 'Sürdürülebilir'],
      content: '<p>İzmir Bayraklı\'da <strong>32.000 m² sürdürülebilir teknoloji ofis kampüsü</strong>. Çelik konstrüksiyon ve cam cephe sistemi, güneş panelleri, yeşil çatı uygulaması ile inşa edilmiştir.</p>',
      meta_title: 'İzmir Teknoloji Kampüsü — Vista İnşaat',
      meta_description: 'İzmir Bayraklı\'da 32.000 m² sürdürülebilir teknoloji ofis kampüsü. Vista İnşaat ticari referans.',
    },
  ],
  en: [
    {
      id: 'fb-en-01',
      title: 'Bosphorus View Residences',
      slug: 'bosphorus-view-residences',
      description: 'Luxury residential project of 18 units overlooking the Bosphorus.',
      image_url: '/uploads/projects/vista-insaat-proje-01.jpeg',
      category_name: 'Residential',
      specifications: { location: 'Istanbul, Beşiktaş', architects: 'Vista Architecture & Engineering', type: 'Residential', year: '2024', area: '4,200 m²', status: 'Completed', floors: '6', materials: 'Reinforced Concrete', client: 'Private Investor' },
      images: ['/uploads/projects/vista-insaat-proje-01.jpeg', '/uploads/projects/vista-insaat-proje-02.jpeg', '/uploads/projects/vista-insaat-proje-03.jpeg'],
      tags: ['Reinforced Concrete', 'Residential', 'Luxury', 'Bosphorus View'],
      content: '<p>An <strong>18-unit, 6-storey luxury residence</strong> with Bosphorus views in Beşiktaş, Istanbul. Features reinforced concrete structure, energy-efficient curtain wall, smart home systems and bespoke landscaping.</p>',
      meta_title: 'Bosphorus View Residence Beşiktaş — Vista Construction',
      meta_description: 'Luxury 18-unit, 6-storey residence with Bosphorus views in Beşiktaş, Istanbul. Vista Construction residential reference.',
    },
    {
      id: 'fb-en-02',
      title: 'Levent Office Tower',
      slug: 'levent-office-tower',
      description: '12-storey class-A office tower with green building certification.',
      image_url: '/uploads/projects/vista-insaat-proje-05.jpeg',
      category_name: 'Commercial',
      specifications: { location: 'Istanbul, Levent', architects: 'DB Architects + Vista Architecture', type: 'Commercial', year: '2023', area: '18,500 m²', status: 'Completed', floors: '12', materials: 'Steel + Glass Curtain Wall', client: 'Corporate' },
      images: ['/uploads/projects/vista-insaat-proje-05.jpeg', '/uploads/projects/vista-insaat-proje-06.jpeg', '/uploads/projects/vista-insaat-proje-07.jpeg'],
      tags: ['Steel', 'Glass Curtain Wall', 'Commercial', 'Office', 'LEED', 'Green Building'],
      content: '<p>A <strong>12-storey LEED-certified Class A office tower</strong> in Levent, Istanbul. Built with steel frame and high-performance curtain wall system, featuring rainwater harvesting and intelligent BMS.</p>',
      meta_title: 'Levent Office Tower LEED Certified — Vista Construction',
      meta_description: '12-storey LEED-certified Class A office tower in Levent, Istanbul. Vista Construction commercial reference.',
    },
    {
      id: 'fb-en-03',
      title: 'Kadıköy Mixed-Use Complex',
      slug: 'kadikoy-mixed-use-complex',
      description: '64 residential units and 3 commercial floors in a mixed-use development.',
      image_url: '/uploads/projects/vista-insaat-proje-10.jpeg',
      category_name: 'Mixed-Use',
      specifications: { location: 'Istanbul, Kadıköy', architects: 'Vista Architecture & Engineering', type: 'Mixed-Use', year: '2025', area: '12,800 m²', status: 'Ongoing', floors: '10', materials: 'Reinforced Concrete', client: 'Private Investor' },
      images: ['/uploads/projects/vista-insaat-proje-10.jpeg', '/uploads/projects/vista-insaat-proje-11.jpeg', '/uploads/projects/vista-insaat-proje-12.jpeg'],
      tags: ['Reinforced Concrete', 'Mixed-Use', 'Residential', 'Commercial'],
      content: '<p>A <strong>mixed-use complex with 64 residential units and 3 commercial floors</strong> in central Kadıköy, Istanbul. Ground and upper levels feature commercial spaces, with residential units above.</p>',
      meta_title: 'Kadıköy Mixed-Use Complex — Vista Construction',
      meta_description: 'Mixed-use complex with 64 residences and 3 commercial floors in Kadıköy, Istanbul. Vista Construction reference.',
    },
    {
      id: 'fb-en-04',
      title: 'Historic Caravanserai Restoration',
      slug: 'historic-caravanserai-restoration',
      description: 'Restoration of a 19th-century caravanserai preserving original character.',
      image_url: '/uploads/projects/vista-insaat-proje-15.jpeg',
      category_name: 'Restoration',
      specifications: { location: 'Istanbul, Eminönü', architects: 'Koruma Architecture + Vista Architecture', type: 'Restoration', year: '2022', area: '3,400 m²', status: 'Completed', floors: '3', materials: 'Masonry Stone + Timber', client: 'Public' },
      images: ['/uploads/projects/vista-insaat-proje-15.jpeg', '/uploads/projects/vista-insaat-proje-16.jpeg', '/uploads/projects/vista-insaat-proje-17.jpeg'],
      tags: ['Masonry Stone', 'Timber', 'Restoration', 'Historic Building', 'Heritage'],
      content: '<p>Comprehensive restoration of a <strong>19th-century Ottoman caravanserai</strong> in Eminönü, Istanbul. Original stone masonry preserved and reinforced, timber roof and floor elements restored using traditional techniques.</p>',
      meta_title: 'Historic Han Restoration Eminönü — Vista Construction',
      meta_description: 'Comprehensive restoration of a 19th-century Ottoman caravanserai in Eminönü, Istanbul. Vista Construction heritage reference.',
    },
    {
      id: 'fb-en-05',
      title: 'Gebze Logistics Centre',
      slug: 'gebze-logistics-centre',
      description: '8,000 m² prefabricated steel logistics warehouse and admin building.',
      image_url: '/uploads/projects/vista-insaat-proje-20.jpeg',
      category_name: 'Industrial',
      specifications: { location: 'Kocaeli, Gebze', architects: 'Vista Architecture & Engineering', type: 'Industrial', year: '2024', area: '8,000 m²', status: 'Completed', floors: '1', materials: 'Prefabricated Steel', client: 'Corporate' },
      images: ['/uploads/projects/vista-insaat-proje-20.jpeg', '/uploads/projects/vista-insaat-proje-21.jpeg'],
      tags: ['Prefabricated Steel', 'Industrial', 'Logistics', 'Warehouse'],
      content: '<p>An <strong>8,000 m² prefabricated steel logistics warehouse</strong> in Gebze, Kocaeli. Features heavy-duty crane-rated steel structure, ground improvement works and modern loading docks.</p>',
      meta_title: 'Gebze Logistics Centre — Vista Construction',
      meta_description: '8,000 m² prefabricated steel logistics warehouse in Gebze, Kocaeli. Vista Construction industrial reference.',
    },
    {
      id: 'fb-en-06',
      title: 'Beşiktaş Waterfront Residences',
      slug: 'besiktas-waterfront-residences',
      description: 'Modern 24-unit residential project on the waterfront.',
      image_url: '/uploads/projects/vista-insaat-proje-25.jpeg',
      category_name: 'Residential',
      specifications: { location: 'Istanbul, Beşiktaş', architects: 'Vista Architecture & Engineering', type: 'Residential', year: '2025', area: '5,600 m²', status: 'Ongoing', floors: '8', materials: 'Reinforced Concrete', client: 'Private Investor' },
      images: ['/uploads/projects/vista-insaat-proje-25.jpeg', '/uploads/projects/vista-insaat-proje-26.jpeg', '/uploads/projects/vista-insaat-proje-27.jpeg'],
      tags: ['Reinforced Concrete', 'Residential', 'Waterfront', 'Modern'],
      content: '<p>A <strong>24-unit modern waterfront residence</strong> along the Beşiktaş shoreline in Istanbul. Includes façade cladding, landscape design and swimming pool construction.</p>',
      meta_title: 'Beşiktaş Waterfront Residence — Vista Construction',
      meta_description: '24-unit modern waterfront residence in Beşiktaş, Istanbul. Vista Construction residential reference.',
    },
    {
      id: 'fb-en-07',
      title: 'Ankara Government Service Building',
      slug: 'ankara-government-service-building',
      description: 'Ministry service building modernisation and annex construction.',
      image_url: '/uploads/projects/vista-insaat-proje-30.jpeg',
      category_name: 'Public',
      specifications: { location: 'Ankara, Çankaya', architects: 'Vista Architecture & Engineering', type: 'Public', year: '2023', area: '22,000 m²', status: 'Completed', floors: '7', materials: 'Reinforced Concrete + Glass Curtain Wall', client: 'Public' },
      images: ['/uploads/projects/vista-insaat-proje-30.jpeg', '/uploads/projects/vista-insaat-proje-31.jpeg', '/uploads/projects/vista-insaat-proje-32.jpeg'],
      tags: ['Reinforced Concrete', 'Glass Curtain Wall', 'Public', 'Government'],
      content: '<p>A <strong>7-storey ministry services building</strong> in Çankaya, Ankara. Reinforced concrete structure, curtain wall glazing, seismic reinforcement and full mechanical services installation.</p>',
      meta_title: 'Ankara Government Services Building — Vista Construction',
      meta_description: '7-storey government ministry building in Çankaya, Ankara. Vista Construction public sector reference.',
    },
    {
      id: 'fb-en-08',
      title: 'Bursa Infrastructure & Landscaping',
      slug: 'bursa-infrastructure-landscaping',
      description: 'Industrial zone infrastructure renewal and landscaping project.',
      image_url: '/uploads/projects/vista-insaat-proje-35.jpeg',
      category_name: 'Infrastructure',
      specifications: { location: 'Bursa, Nilüfer', architects: 'Vista Architecture & Engineering', type: 'Infrastructure', year: '2024', area: '45,000 m²', status: 'Completed', materials: 'Concrete + Asphalt', client: 'Public' },
      images: ['/uploads/projects/vista-insaat-proje-35.jpeg', '/uploads/projects/vista-insaat-proje-36.jpeg'],
      tags: ['Concrete', 'Asphalt', 'Infrastructure', 'Landscaping'],
      content: '<p><strong>45,000 m² infrastructure renewal and site development</strong> at an organised industrial zone in Nilüfer, Bursa. Includes road construction, sewerage, stormwater drainage and landscaping.</p>',
      meta_title: 'Bursa OIZ Infrastructure Renewal — Vista Construction',
      meta_description: '45,000 m² infrastructure renewal at Bursa Nilüfer OIZ. Vista Construction infrastructure reference.',
    },
    {
      id: 'fb-en-09',
      title: 'Antalya Boutique Hotel',
      slug: 'antalya-boutique-hotel',
      description: '32-room boutique hotel harmonising with the historic Kaleiçi district.',
      image_url: '/uploads/projects/vista-insaat-proje-40.jpeg',
      category_name: 'Tourism',
      specifications: { location: 'Antalya, Kaleiçi', architects: 'ARC Studio + Vista Architecture', type: 'Tourism', year: '2025', area: '2,800 m²', status: 'Ongoing', floors: '4', materials: 'Masonry Stone + Timber', client: 'Private Investor' },
      images: ['/uploads/projects/vista-insaat-proje-40.jpeg', '/uploads/projects/vista-insaat-proje-41.jpeg', '/uploads/projects/vista-insaat-proje-42.jpeg'],
      tags: ['Masonry Stone', 'Timber', 'Tourism', 'Hotel', 'Historic'],
      content: '<p>A <strong>32-room boutique hotel</strong> in Kaleiçi, Antalya. Stone masonry and timber craftsmanship blended with modern comfort standards, in keeping with the UNESCO-listed historic fabric.</p>',
      meta_title: 'Antalya Kaleiçi Boutique Hotel — Vista Construction',
      meta_description: '32-room boutique hotel in historic Kaleiçi, Antalya. Vista Construction hospitality reference.',
    },
    {
      id: 'fb-en-10',
      title: 'İzmir Technology Campus',
      slug: 'izmir-technology-campus',
      description: 'Sustainable office campus for software and R&D companies.',
      image_url: '/uploads/projects/vista-insaat-proje-45.jpeg',
      category_name: 'Commercial',
      specifications: { location: 'İzmir, Bayraklı', architects: 'Vista Architecture & Engineering', type: 'Commercial', year: '2024', area: '32,000 m²', status: 'Completed', floors: '5', materials: 'Steel + Glass Curtain Wall', client: 'Corporate' },
      images: ['/uploads/projects/vista-insaat-proje-45.jpeg', '/uploads/projects/vista-insaat-proje-46.jpeg', '/uploads/projects/vista-insaat-proje-47.jpeg'],
      tags: ['Steel', 'Glass Curtain Wall', 'Commercial', 'Technology', 'Sustainable'],
      content: '<p>A <strong>32,000 m² sustainable technology office campus</strong> in Bayraklı, İzmir. Steel frame and curtain wall system with solar panels, green roof and energy-efficient HVAC.</p>',
      meta_title: 'İzmir Technology Campus — Vista Construction',
      meta_description: '32,000 m² sustainable technology office campus in Bayraklı, İzmir. Vista Construction commercial reference.',
    },
  ],
};

const fallbackBlogPosts: Record<LocaleKey, FallbackItem[]> = {
  tr: [
    {
      title: 'Sürdürülebilir İnşaatta LEED Sertifikasyonu ve Avantajları',
      description: 'LEED yeşil bina sertifikasının inşaat sürecine etkisi, enerji tasarrufu ve uzun vadeli değer artışı üzerine uygulama odaklı notlar.',
    },
    {
      title: 'Akıllı Bina Teknolojileri: 2025 Trendleri',
      description: 'IoT tabanlı enerji yönetimi, iklim kontrolü ve güvenlik sistemlerinin modern konut ve ofis projelerine entegrasyonu.',
    },
    {
      title: 'Depreme Dayanıklı Yapı Tasarımında Kritik Noktalar',
      description: 'Türkiye deprem yönetmeliği çerçevesinde yapı güvenliğini artıran tasarım ve malzeme seçimleri üzerine teknik değerlendirme.',
    },
  ],
  en: [
    {
      title: 'LEED Certification in Sustainable Construction',
      description: 'Application-focused notes on how LEED green building certification impacts construction processes, energy savings and long-term value appreciation.',
    },
    {
      title: 'Smart Building Technologies: 2025 Trends',
      description: 'IoT-based energy management, climate control and security system integration into modern residential and office projects.',
    },
    {
      title: 'Critical Points in Earthquake-Resistant Building Design',
      description: 'Technical evaluation of design and material choices that improve structural safety within Turkey\'s seismic regulations.',
    },
  ],
};

const fallbackGalleries: Record<LocaleKey, FallbackGalleryItem[]> = {
  tr: [
    {
      title: 'Konut Projeleri',
      description: 'Tamamlanan konut projelerinden iç mekan, dış cephe ve peyzaj görselleri.',
      imageSrc: '/media/gallery-placeholder.svg',
    },
    {
      title: 'Ticari ve Ofis Projeleri',
      description: 'Ofis kuleleri, ticaret merkezleri ve karma kullanımlı yapı projelerinden görüntüler.',
      imageSrc: '/media/gallery-placeholder.svg',
    },
    {
      title: 'İnşaat Süreci',
      description: 'Proje başlangıcından teslime kadar inşaat aşamalarını yansıtan belgeler.',
      imageSrc: '/media/gallery-placeholder.svg',
    },
  ],
  en: [
    {
      title: 'Residential Projects',
      description: 'Interior, facade and landscape visuals from completed residential projects.',
      imageSrc: '/media/gallery-placeholder.svg',
    },
    {
      title: 'Commercial and Office Projects',
      description: 'Images from office towers, commercial centers and mixed-use building projects.',
      imageSrc: '/media/gallery-placeholder.svg',
    },
    {
      title: 'Construction Process',
      description: 'Documentation reflecting construction phases from project start to handover.',
      imageSrc: '/media/gallery-placeholder.svg',
    },
  ],
};

type FallbackBrandItem = {
  title: string;
  logo_url: string;
};

const fallbackBrands: FallbackBrandItem[] = [
  { title: 'Rehau', logo_url: '/brands/rehau.svg' },
  { title: 'Weber', logo_url: '/brands/weber.svg' },
  { title: 'Schüco', logo_url: '/brands/schuco.svg' },
  { title: 'Villeroy & Boch', logo_url: '/brands/villeroy-boch.svg' },
  { title: 'Grohe', logo_url: '/brands/grohe.svg' },
  { title: 'KONE', logo_url: '/brands/kone.svg' },
  { title: 'Laufen', logo_url: '/brands/laufen.svg' },
  { title: 'Blum', logo_url: '/brands/blum.svg' },
  { title: 'dormakaba', logo_url: '/brands/dorma-kaba.svg' },
  { title: 'Knauf', logo_url: '/brands/knauf.svg' },
  { title: 'Mapei', logo_url: '/brands/mapei.svg' },
  { title: 'Daikin', logo_url: '/brands/daikin.svg' },
  { title: 'Franke', logo_url: '/brands/franke.svg' },
  { title: 'Siemens', logo_url: '/brands/siemens.svg' },
];

function normalizeLocale(locale: string): LocaleKey {
  return locale.startsWith('en') ? 'en' : 'tr';
}

export function getFallbackProjects(locale: string): FallbackItem[] {
  return fallbackProjects[normalizeLocale(locale)];
}

export function getFallbackProjectBySlug(slug: string, locale: string): FallbackItem | null {
  const items = fallbackProjects[normalizeLocale(locale)];
  return items.find((p) => p.slug === slug) ?? null;
}

/** @deprecated Use getFallbackProjects instead */
export function getFallbackProducts(locale: string): FallbackItem[] {
  return getFallbackProjects(locale);
}

export function getFallbackBlogPosts(locale: string): FallbackItem[] {
  return fallbackBlogPosts[normalizeLocale(locale)];
}

export function getFallbackGalleries(locale: string): FallbackGalleryItem[] {
  return fallbackGalleries[normalizeLocale(locale)];
}

export function getFallbackBrands(): FallbackBrandItem[] {
  return fallbackBrands;
}
