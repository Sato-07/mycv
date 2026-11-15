import React, { useEffect, useRef } from 'react';
import { AVATAR_TURNTABLE } from '@/data/profile';

// Angle maximal (en images) vers lequel l'avatar se tourne pour suivre la souris : ±15 images = ±45°.
const MAX_TURN_FRAMES = 15;

type TurntableProps = {
  speaking: boolean;
};

// Le modèle 3D fait un tour complet à l'arrivée, puis se tourne vers la souris du visiteur.
// On ne lit pas la vidéo : on choisit l'image à afficher selon l'angle voulu (vidéo encodée tout en images clés).
export const Turntable: React.FC<TurntableProps> = ({ speaking }) => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el || !AVATAR_TURNTABLE) return;
    const { frames, fps } = AVATAR_TURNTABLE;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasMouse = window.matchMedia('(pointer: fine)').matches;

    let following = false;
    let target = 0;
    let current = 0;
    let shown = -1;
    let frame = 0;
    const start = performance.now();

    const show = (index: number) => {
      const wrapped = ((index % frames) + frames) % frames;
      if (wrapped === shown || el.seeking) return;
      shown = wrapped;
      el.currentTime = (wrapped + 0.5) / fps;
    };

    const tick = (now: number) => {
      if (!hasMouse) {
        // Pas de souris (téléphone) : léger balancement pour garder l'impression de volume.
        target = Math.sin((now - start) / 1600) * 6;
      }
      current += (target - current) * 0.12;
      show(Math.round(current));
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      // Souris à gauche → l'avatar se tourne vers la gauche de l'écran (images positives).
      const ratio = e.clientX / window.innerWidth - 0.5;
      target = -ratio * 2 * MAX_TURN_FRAMES;
    };

    const startFollowing = () => {
      if (following) return;
      following = true;
      el.pause();
      current = 0;
      window.addEventListener('pointermove', onMove);
      frame = requestAnimationFrame(tick);
    };

    // Tour d'entrée : la vidéo se lit une fois et revient de face, puis l'avatar suit la souris.
    el.onended = startFollowing;
    if (reduceMotion) {
      startFollowing();
    } else {
      el.play().catch(startFollowing);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      el.onended = null;
    };
  }, []);

  if (!AVATAR_TURNTABLE) return null;

  return (
    <div className={`h-full w-full ${speaking ? 'animate-talk' : 'animate-breathe'}`}>
      <video
        ref={video}
        src={AVATAR_TURNTABLE.src}
        poster={AVATAR_TURNTABLE.poster}
        muted
        playsInline
        preload="auto"
        aria-label="Avatar 3D d'Achraf Baitar"
        // Le fond gris de l'export se fond dans le noir de la page.
        className="h-full w-full object-contain [mask-image:radial-gradient(ellipse_47%_52%_at_50%_47%,black_62%,transparent_100%)]"
      />
    </div>
  );
};
