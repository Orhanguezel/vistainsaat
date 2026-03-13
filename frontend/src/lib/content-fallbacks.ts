type FallbackItem = {
  title: string;
  description: string;
  image_url?: string;
  category_name?: string;
};

type FallbackGalleryItem = FallbackItem & {
  imageSrc: string;
};

type LocaleKey = 'tr' | 'en';

const fallbackProjects: Record<LocaleKey, FallbackItem[]> = {
  tr: [
    {
      title: 'Boğaz Manzaralı Rezidans',
      description: 'İstanbul Boğazı manzaralı 18 bağımsız bölümden oluşan lüks konut projesi.',
      image_url: 'https://picsum.photos/seed/vista-res/800/600',
      category_name: 'Konut',
    },
    {
      title: 'Levent Ofis Kulesi',
      description: 'A sınıfı ofis standardında 12 katlı yeşil sertifikalı ticari yapı.',
      image_url: 'https://picsum.photos/seed/vista-office/800/600',
      category_name: 'Ticari',
    },
    {
      title: 'Kadıköy Karma Yapı Kompleksi',
      description: '64 konut birimi ve 3 kat ticari alandan oluşan karma kullanımlı proje.',
      image_url: 'https://picsum.photos/seed/vista-mixed/800/600',
      category_name: 'Karma Kullanım',
    },
    {
      title: 'Tarihi Han Restorasyon',
      description: '19. yüzyıl tarihi hanının özgün dokusu korunarak restore edilmesi.',
      image_url: 'https://picsum.photos/seed/vista-resto/800/600',
      category_name: 'Restorasyon',
    },
    {
      title: 'Gebze Lojistik Merkezi',
      description: '8.000 m² kapalı alana sahip prefabrik çelik yapı lojistik depo kompleksi.',
      image_url: 'https://picsum.photos/seed/vista-logi/800/600',
      category_name: 'Endüstriyel',
    },
    {
      title: 'Beşiktaş Sahil Rezidans',
      description: 'Sahil şeridinde konumlanan 24 daireli modern konut projesi.',
      image_url: 'https://picsum.photos/seed/vista-shore/800/600',
      category_name: 'Konut',
    },
  ],
  en: [
    {
      title: 'Bosphorus View Residences',
      description: 'Luxury residential project of 18 units overlooking the Bosphorus.',
      image_url: 'https://picsum.photos/seed/vista-res/800/600',
      category_name: 'Residential',
    },
    {
      title: 'Levent Office Tower',
      description: '12-storey class-A office tower with green building certification.',
      image_url: 'https://picsum.photos/seed/vista-office/800/600',
      category_name: 'Commercial',
    },
    {
      title: 'Kadıköy Mixed-Use Complex',
      description: '64 residential units and 3 commercial floors in a mixed-use development.',
      image_url: 'https://picsum.photos/seed/vista-mixed/800/600',
      category_name: 'Mixed-Use',
    },
    {
      title: 'Historic Caravanserai Restoration',
      description: 'Restoration of a 19th-century caravanserai preserving original character.',
      image_url: 'https://picsum.photos/seed/vista-resto/800/600',
      category_name: 'Restoration',
    },
    {
      title: 'Gebze Logistics Centre',
      description: '8,000 m² prefabricated steel logistics warehouse and admin building.',
      image_url: 'https://picsum.photos/seed/vista-logi/800/600',
      category_name: 'Industrial',
    },
    {
      title: 'Beşiktaş Waterfront Residences',
      description: 'Modern 24-unit residential project on the waterfront.',
      image_url: 'https://picsum.photos/seed/vista-shore/800/600',
      category_name: 'Residential',
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
