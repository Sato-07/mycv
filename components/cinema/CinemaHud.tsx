import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type CinemaHudProps = {
  video: React.RefObject<HTMLVideoElement>;
  talking: React.RefObject<HTMLVideoElement>;
  clip: 'intro' | 'talking' | 'rest';
  speaking: boolean;
  muted: boolean;
  onToggleSound: () => void;
};

const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');

// Habillage « caméra » par-dessus le plan : coins de cadrage autour de lui, signal en direct,
// compteur d'images qui défile pendant la vidéo, et l'interrupteur du son.
export const CinemaHud: React.FC<CinemaHudProps> = ({ video, talking, clip, speaking, muted, onToggleSound }) => {
  const timecode = useRef<HTMLSpanElement>(null);

  // Compteur écrit directement dans le DOM : un rendu React à chaque image serait du gaspillage.
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const el = clip === 'talking' ? talking.current : video.current;
      const t = clip === 'rest' ? 0 : el?.currentTime ?? 0;
      if (timecode.current) timecode.current.textContent = `00:${pad(t / 60)}:${pad(t % 60)}:${pad((t % 1) * 30)}`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [clip, video, talking]);

  const live = clip !== 'rest' || speaking;
  const corner = 'absolute h-7 w-7 border-light/40';

  return (
    <>
      {/* Coins de cadrage : ils se referment sur lui à l'ouverture. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-[55%] right-[5%] top-[15%] lg:hidden"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />
        <p className="absolute -top-7 left-0 font-mono text-[10px] uppercase tracking-[0.3em] text-light/45">
          Sujet · Achraf_IA <span className="text-light/25">/ v2.0</span>
        </p>
        <p className="absolute -bottom-7 right-0 font-mono text-[10px] tracking-[0.2em] text-light/45">
          <span ref={timecode}>00:00:00:00</span>
        </p>
        <p className="absolute -bottom-7 left-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-light/45">
          <span className={`h-1.5 w-1.5 rounded-full ${live ? 'animate-pulse bg-red-500' : 'bg-light/30'}`} />
          {live ? 'En direct' : 'En veille'}
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={onToggleSound}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 }}
        aria-pressed={!muted}
        data-sound-toggle
        className="group absolute right-[5%] top-[calc(15%-2.9rem)] z-[3] flex items-center gap-3 rounded-full border border-light/15 bg-dark/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-light/70 backdrop-blur transition hover:border-light/50 hover:text-light lg:right-4 lg:top-24"
      >
        {/* Barres du son : elles bougent quand la voix passe. */}
        <span className="flex h-3 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-[2px] origin-bottom rounded-full bg-current ${!muted && clip === 'intro' ? 'animate-wave' : 'scale-y-[0.3]'}`}
              style={{ height: '100%', animationDelay: `${i * 0.13}s` }}
            />
          ))}
        </span>
        {muted ? 'Activer le son' : 'Son activé'}
      </motion.button>
    </>
  );
};
