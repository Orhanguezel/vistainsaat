'use client';

import Image from 'next/image';

interface BrandItem {
  id?: number | string;
  title: string;
  logo_url?: string | null;
  image_url?: string | null;
  website_url?: string | null;
}

export function BrandCarousel({ brands }: { brands: BrandItem[] }) {
  if (!brands.length) return null;

  // Duplicate the list to create seamless infinite scroll
  const doubled = [...brands, ...brands];

  return (
    <>
      <style>{`
        @keyframes brand-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-track {
          animation: brand-scroll 30s linear infinite;
        }
        .brand-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className="brand-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 56,
            width: 'max-content',
          }}
        >
          {doubled.map((brand, i) => {
            const logoSrc = brand.logo_url || brand.image_url;
            const key = `${brand.id ?? brand.title}-${i}`;

            return (
              <div
                key={key}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 48,
                  opacity: 0.5,
                  transition: 'opacity 0.2s',
                  filter: 'grayscale(100%)',
                }}
                className="hover:!opacity-100 hover:!filter-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.filter = 'grayscale(0%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.filter = 'grayscale(100%)';
                }}
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={brand.title}
                    width={140}
                    height={48}
                    style={{ height: 40, width: 'auto', objectFit: 'contain' }}
                    unoptimized={logoSrc.endsWith('.svg')}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {brand.title}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
