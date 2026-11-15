import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { AVATAR_CLIPS } from '@/data/profile';

type TalkingAvatarProps = {
  speaking: boolean;
  thinking: boolean;
  analyserRef: MutableRefObject<AnalyserNode | null>;
  // Incrémenté pour rejouer le coucou (clic sur « Écouter Achraf »).
  waveSignal: number;
};

// Calques superposés : pose de repos (ou boucle de repos), boucle de parole, coucou d'intro.
// Le conteneur est fusionné en « lighten » avec la page : le fond noir des clips disparaît.
export const TalkingAvatar: React.FC<TalkingAvatarProps> = ({ speaking, thinking, analyserRef, waveSignal }) => {
  const halo = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLVideoElement>(null);
  const talkingVideo = useRef<HTMLVideoElement>(null);
  const [introPlaying, setIntroPlaying] = useState(Boolean(AVATAR_CLIPS.intro));
  // Visible pendant l'unique lecture de la vidéo de parole, même si la voix s'arrête avant la fin.
  const [clipOn, setClipOn] = useState(false);
  const playedThisTurn = useRef(false);

  // Coucou à l'arrivée, puis à chaque signal ; sans mouvement réduit seulement.
  useEffect(() => {
    const el = intro.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroPlaying(false);
      return;
    }
    el.currentTime = 0;
    setIntroPlaying(true);
    el.play().catch(() => setIntroPlaying(false));
  }, [waveSignal]);

  // La vidéo de parole se joue une seule fois par réponse, du début à la fin, puis il revient au repos
  // même s'il parle encore : la répéter rendait les longues réponses pénibles à regarder.
  useEffect(() => {
    const el = talkingVideo.current;
    if (!speaking) {
      playedThisTurn.current = false;
      return;
    }
    if (!el || playedThisTurn.current) return;
    playedThisTurn.current = true;
    el.currentTime = 0;
    setClipOn(true);
    void el.play().catch(() => setClipOn(false));
  }, [speaking]);

  // Le halo sous l'avatar grossit avec le volume réel de la voix.
  useEffect(() => {
    if (!speaking) {
      if (halo.current) halo.current.style.transform = 'translateX(-50%) scale(1)';
      return;
    }
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const level = data.slice(2, 16).reduce((a, b) => a + b, 0) / (14 * 255);
      if (halo.current) halo.current.style.transform = `translateX(-50%) scale(${(1 + level * 0.35).toFixed(3)})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speaking, analyserRef]);

  // Au repos, l'avatar reste immobile (une « respiration » sur un avatar de cette taille distrait).
  // Sans boucle de parole générée, la pose fixe bouge seulement pendant qu'il parle.
  const poseMotion = speaking && !AVATAR_CLIPS.talking ? 'animate-talk' : '';
  const layer = 'absolute inset-0 h-full w-full object-contain object-bottom';

  return (
    <div className="relative mx-auto aspect-[3/4] h-full min-h-[280px]">
      <div
        ref={halo}
        aria-hidden
        className={`absolute bottom-[6%] left-1/2 h-[40%] w-[80%] rounded-full bg-light blur-[90px] ${
          speaking ? 'opacity-[0.14]' : thinking ? 'animate-pulse opacity-[0.09]' : 'opacity-[0.06]'
        }`}
        style={{ transform: 'translateX(-50%)', transition: 'transform 80ms linear, opacity 700ms' }}
      />
      <div className="relative isolate h-full w-full mix-blend-lighten [mask-image:linear-gradient(to_bottom,black_78%,transparent)]">
        <div className={`absolute inset-0 ${introPlaying ? '' : poseMotion}`}>
          {AVATAR_CLIPS.idle ? (
            <video src={AVATAR_CLIPS.idle} poster={AVATAR_CLIPS.pose} className={layer} autoPlay muted loop playsInline aria-hidden />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={AVATAR_CLIPS.pose} alt="Avatar d'Achraf Baitar" className={layer} />
          )}
        </div>
        {AVATAR_CLIPS.talking && (
          <video
            ref={talkingVideo}
            src={AVATAR_CLIPS.talking}
            className={`${layer} transition-opacity duration-300 ${clipOn && !introPlaying ? 'opacity-100' : 'opacity-0'}`}
            muted
            playsInline
            preload="auto"
            onEnded={() => setClipOn(false)}
            aria-hidden
          />
        )}
        {AVATAR_CLIPS.intro && (
          <video
            ref={intro}
            src={AVATAR_CLIPS.intro}
            poster={AVATAR_CLIPS.pose}
            className={`${layer} transition-opacity duration-500 ${introPlaying ? 'opacity-100' : 'opacity-0'}`}
            muted
            playsInline
            preload="auto"
            onEnded={() => setIntroPlaying(false)}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
};
