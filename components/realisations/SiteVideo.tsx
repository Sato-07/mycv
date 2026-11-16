import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

type SiteVideoProps = { media: string; url?: string; title: string; demo?: string };

// Le vrai site filmé pendant qu'on le parcourt, dans un cadre de navigateur.
// Noir et blanc tant qu'il est loin, en couleurs quand il arrive au centre : le site reste sobre
// et chaque client prend vie au moment où on le lit. La vidéo ne se charge et ne tourne qu'à l'écran.
export const SiteVideo: React.FC<SiteVideoProps> = ({ media, url, title, demo }) => {
  const video = useRef<HTMLVideoElement>(null);
  const [near, nearInView] = useInView({ rootMargin: '300px 0px' });
  const [center, centered] = useInView({ threshold: 0.6 });

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (nearInView) void el.play().catch(() => undefined);
    else el.pause();
  }, [nearInView]);

  const host = demo ?? url?.replace(/^https?:\/\//, '') ?? '';

  return (
    <div ref={near} className="group/video relative">
      <div
        ref={center}
        className="overflow-hidden rounded-2xl border border-light/10 bg-[#111] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] transition duration-700 group-hover/video:border-light/25"
      >
        <div className="flex items-center gap-2 border-b border-light/10 px-4 py-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-light/15" />
          ))}
          <span className="ml-3 truncate rounded-full bg-light/[0.06] px-3 py-1 font-mono text-[11px] text-light/50">{host}</span>
        </div>
        <video
          ref={video}
          src={`/realisations/${media}.mp4`}
          poster={`/realisations/${media}.jpg`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={demo ? `${title} : ${demo}` : `Le site ${title}, parcouru de haut en bas`}
          className={`${demo ? 'aspect-video' : 'aspect-[16/10]'} w-full object-cover object-top transition-[filter,transform] duration-[1200ms] group-hover/video:scale-[1.015] ${
            centered ? 'grayscale-0' : 'grayscale'
          }`}
        />
      </div>
    </div>
  );
};
