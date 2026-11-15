import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { AVATAR_CLIPS } from '@/data/profile';

type TalkingAvatarProps = {
  speaking: boolean;
  thinking: boolean;
  analyserRef: MutableRefObject<AnalyserNode | null>;
  // Incrémenté pour rejouer le coucou (clic sur « Écouter Achraf »).
  waveSignal: number;
};

// Repères de public/avatar/talking.mp4 (24 images/s, 200 images) : début 0-48, milieu 49-130 dont les
// 8 dernières se fondent vers l'image 48 pour boucler sans saut, fin 131-199 qui reprend à l'image 122.
const FPS = 24;
const TALK_TIMING = { loopStart: 49 / FPS, loopEnd: 131 / FPS, exitAt: 123 / FPS, frame: 1 / FPS };

// Calques superposés : pose de repos (ou boucle de repos), boucle de parole, coucou d'intro.
// Le conteneur est fusionné en « lighten » avec la page : le fond noir des clips disparaît.
export const TalkingAvatar: React.FC<TalkingAvatarProps> = ({ speaking, thinking, analyserRef, waveSignal }) => {
  const halo = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLVideoElement>(null);
  const talkingVideo = useRef<HTMLVideoElement>(null);
  const [introPlaying, setIntroPlaying] = useState(Boolean(AVATAR_CLIPS.intro));
  // Visible du début de la parole jusqu'à la fin du geste de rangement, même si la voix s'arrête avant.
  const [clipOn, setClipOn] = useState(false);
  const speakingRef = useRef(speaking);
  const exiting = useRef(false);

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

  // La vidéo de parole est montée en trois temps (voir TALK_TIMING) : il sort les mains, fait ses gestes
  // en boucle tant qu'il parle, puis remet les mains dans les poches. Sans ce découpage, une réponse
  // longue le faisait ranger et ressortir les mains toutes les 8 secondes.
  useEffect(() => {
    speakingRef.current = speaking;
    const el = talkingVideo.current;
    if (!el || !speaking || clipOn) return;
    exiting.current = false;
    el.currentTime = 0;
    setClipOn(true);
    void el.play().catch(() => setClipOn(false));
  }, [speaking, clipOn]);

  useEffect(() => {
    const el = talkingVideo.current;
    if (!el || !clipOn) return;
    const { loopStart, loopEnd, exitAt, frame } = TALK_TIMING;
    let raf = 0;
    const tick = () => {
      const t = el.currentTime;
      if (!exiting.current && t >= loopEnd - frame * 0.6 && t < loopEnd + 0.25) {
        // Fin du milieu : on revient à son début (le raccord est fondu dans la vidéo).
        el.currentTime = loopStart;
      } else if (!speakingRef.current && !exiting.current && t >= exitAt && t < exitAt + frame * 3) {
        // Il a fini de parler : on saute à la fin, qui reprend exactement à cette image.
        exiting.current = true;
        el.currentTime = loopEnd;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clipOn]);

  const onTalkEnded = () => {
    const el = talkingVideo.current;
    // Il s'est remis à parler pendant qu'il rangeait les mains : il recommence depuis le début.
    if (el && speakingRef.current) {
      exiting.current = false;
      el.currentTime = 0;
      void el.play().catch(() => setClipOn(false));
      return;
    }
    setClipOn(false);
  };

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
            onEnded={onTalkEnded}
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
