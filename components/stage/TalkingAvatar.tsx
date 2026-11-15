import React, { MutableRefObject, useEffect, useRef } from 'react';
import Image from 'next/image';
import FotoProfil from '@/public/hb7_sport.png';
import { AVATAR_VIDEOS } from '@/data/profile';

type TalkingAvatarProps = {
  speaking: boolean;
  thinking: boolean;
  analyserRef: MutableRefObject<AnalyserNode | null>;
};

// Deux boucles vidéo superposées (repos / parole) qui se relaient en fondu.
// Sans vidéos, l'image fixe respire et s'anime au rythme de la voix.
export const TalkingAvatar: React.FC<TalkingAvatarProps> = ({ speaking, thinking, analyserRef }) => {
  const halo = useRef<HTMLDivElement>(null);
  const talkingVideo = useRef<HTMLVideoElement>(null);

  // Le halo blanc sous l'avatar grossit avec le volume de la voix.
  useEffect(() => {
    if (!speaking) {
      if (halo.current) halo.current.style.transform = 'scale(1)';
      return;
    }
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const level = data.slice(2, 16).reduce((a, b) => a + b, 0) / (14 * 255);
      if (halo.current) halo.current.style.transform = `scale(${(1 + level * 0.35).toFixed(3)})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speaking, analyserRef]);

  // La boucle de parole repart du début à chaque prise de parole, pour ne pas commencer bouche fermée.
  useEffect(() => {
    if (speaking && talkingVideo.current) {
      talkingVideo.current.currentTime = 0;
      void talkingVideo.current.play().catch(() => undefined);
    }
  }, [speaking]);

  return (
    <div className="relative mx-auto aspect-[3/4] h-full max-h-[56vh] min-h-[280px]">
      <div
        ref={halo}
        aria-hidden
        className={`absolute bottom-[8%] left-1/2 h-[45%] w-[90%] -translate-x-1/2 rounded-full bg-light blur-[90px] transition-opacity duration-700 ${
          speaking ? 'opacity-[0.16]' : thinking ? 'opacity-[0.1] animate-pulse' : 'opacity-[0.07]'
        }`}
        style={{ transition: 'transform 80ms linear, opacity 700ms' }}
      />
      <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        {AVATAR_VIDEOS ? (
          <>
            <video
              src={AVATAR_VIDEOS.idle}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            />
            <video
              ref={talkingVideo}
              src={AVATAR_VIDEOS.talking}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                speaking ? 'opacity-100' : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              aria-hidden
            />
          </>
        ) : (
          <div className={`h-full w-full ${speaking ? 'animate-talk' : 'animate-breathe'}`}>
            <Image
              src={FotoProfil}
              alt="Avatar d'Achraf Baitar"
              priority
              className="h-full w-full object-contain object-bottom grayscale-[35%]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
