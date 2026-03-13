type FallbackItem = {
  title: string;
  description: string;
};

type FallbackGalleryItem = FallbackItem & {
  imageSrc: string;
};

type LocaleKey = 'tr' | 'en';

const fallbackProjects: Record<LocaleKey, FallbackItem[]> = {
  tr: [
    {
      title: 'Bosphorus Residence',
      description: 'İstanbul Boğazı manzaralı 42 konutluk lüks rezidans projesi. Modern mimari dil, yüksek kaliteli malzeme seçimleri ve peyzaj tasarımıyla tamamlanan örnek bir konut projesi.',
    },
    {
      title: 'Maslak Ofis Kulesi',
      description: 'A+ ofis standardında, LEED sertifikalı 28 katlı karma kullanım projesi. Sürdürülebilir enerji sistemleri ve akıllı bina teknolojisiyle donatılmıştır.',
    },
    {
      title: 'Ataşehir Ticaret Merkezi',
      description: 'Toplam 18.500 m² kiralanabilir alana sahip, çok katlı ticaret ve ofis merkezi. Modüler ofis katları ve geniş ticari zemin kattaki perakende alanları.',
    },
    {
      title: 'Kavacık Villa Projesi',
      description: 'Beykoz Kavacik\'ta dogayla ic ice 12 mustakil villadan olusan ozel konut projesi. Her villa icin bireysel peyzaj ve ozel yuzme havuzu.',
    },
  ],
  en: [
    {
      title: 'Bosphorus Residence',
      description: 'A luxury residential project of 42 units with Bosphorus views. Completed with a modern architectural language, premium material selections and landscape design.',
    },
    {
      title: 'Maslak Office Tower',
      description: 'A 28-floor mixed-use project with A+ office standards and LEED certification. Equipped with sustainable energy systems and smart building technology.',
    },
    {
      title: 'Ataşehir Commercial Center',
      description: 'A multi-storey commercial and office complex with 18,500 m² of leasable area. Modular office floors and retail spaces on a wide commercial ground floor.',
    },
    {
      title: 'Kavacık Villa Project',
      description: 'An exclusive residential project of 12 detached villas in nature in Beykoz Kavacık. Individual landscaping and private pool for each villa.',
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
