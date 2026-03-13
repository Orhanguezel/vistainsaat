import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vista İnşaat',
    short_name: 'Vista İnşaat',
    description: 'Vista İnşaat — konut, ticari ve karma kullanım projelerinde güvenilir çözüm ortağı.',
    start_url: '/tr',
    display: 'standalone',
    background_color: '#141311',
    theme_color: '#b8a98a',
    icons: [
      {
        src: '/icon',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
