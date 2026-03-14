'use client';

import { useRef, useState, useCallback } from 'react';
import { Play, X } from 'lucide-react';

interface HeroVideoPlayerProps {
  src: string;
  poster?: string;
  badge?: string;
  title: string;
  subtitle?: string;
}

export function HeroVideoPlayer({ src, poster, badge, title, subtitle }: HeroVideoPlayerProps) {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
    }
  }, []);

  return (
    <>
      {/* Background auto-playing video */}
      <div
        className="group relative flex flex-1 cursor-pointer flex-col overflow-hidden"
        onClick={openFullscreen}
      >
        <div className="relative flex-1 overflow-hidden">
          <video
            ref={bgVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
          {/* Video badge — top left */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-sm bg-white px-3 py-1.5 text-xs font-semibold text-(--color-text-primary)">
            <Play className="size-3 fill-current" />
            Video
          </div>
        </div>
        {/* Title area — below video */}
        <div className="bg-(--color-bg) pt-3 pb-1">
          {badge && (
            <p className="text-xs font-medium uppercase tracking-wider text-(--color-brand)">
              {badge}
            </p>
          )}
          <h1
            className="mt-1 text-lg font-semibold leading-snug text-(--color-brand) lg:text-xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-(--color-text-secondary)">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute right-6 top-6 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="size-5" />
          </button>
          <video
            ref={fullVideoRef}
            autoPlay
            controls
            playsInline
            className="max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
