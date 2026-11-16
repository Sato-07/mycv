import React, { useEffect, useRef, useState } from 'react';
import { AVATAR_CLIPS } from '@/data/profile';
import { AvatarPuppet } from './AvatarPuppet';

type TalkingAvatarProps = {
  speaking: boolean;
  // Incrémenté pour rejouer le coucou (clic sur « Écouter Achraf »).
  waveSignal: number;
};

// Calques superposés : pose de repos, vidéo de parole, coucou d'intro.
// Le conteneur est fusionné en « lighten » avec la page : le fond noir des clips disparaît.
export const TalkingAvatar: React.FC<TalkingAvatarProps> = ({ speaking, waveSignal }) => {
  const intro = useRef<HTMLVideoElement>(null);
  const talkingVideo = useRef<HTMLVideoElement>(null);
  const [introPlaying, setIntroPlaying] = useState(Boolean(AVATAR_CLIPS.intro));
  // Visible pendant la vidéo de parole ; ensuite on revient à la pose animée.
  const [clipOn, setClipOn] = useState(false);
  const playedThisTurn = useRef(false);
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;

  // Coucou avec sa voix à l'arrivée, puis à chaque clic sur « Écouter Achraf ».
  useEffect(() => {
    const el = intro.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntroPlaying(false);
      return;
    }
    // Le son est dans la vidéo : les lèvres restent synchronisées sans rien caler à la main.
    el.muted = !AVATAR_CLIPS.introHasSound;
    el.currentTime = 0;
    setIntroPlaying(true);
    el.play()
      .catch(() => {
        // Son refusé par le navigateur : le coucou se joue quand même, sans voix.
        el.muted = true;
        return el.play();
      })
      .catch(() => setIntroPlaying(false));
  }, [waveSignal]);

  // Sans clic préalable, les navigateurs refusent le son : le coucou part alors muet, et le premier
  // geste du visiteur (clic, touche, toucher) lui rend sa voix là où il en est, lèvres toujours calées.
  useEffect(() => {
    if (!AVATAR_CLIPS.introHasSound) return;
    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    const unmute = () => {
      events.forEach((name) => window.removeEventListener(name, unmute));
      const el = intro.current;
      if (el && !el.paused && !el.ended && !speakingRef.current) el.muted = false;
    };
    events.forEach((name) => window.addEventListener(name, unmute, { once: true }));
    return () => events.forEach((name) => window.removeEventListener(name, unmute));
  }, []);

  // La vidéo de parole se joue une seule fois par réponse, du début à la fin, puis il revient au repos
  // même s'il parle encore : la répéter rendait les longues réponses pénibles à regarder.
  useEffect(() => {
    const el = talkingVideo.current;
    if (!speaking) {
      playedThisTurn.current = false;
      return;
    }
    // Une question coupe le message d'accueil s'il était encore en cours.
    if (intro.current) intro.current.muted = true;
    if (!el || playedThisTurn.current) return;
    playedThisTurn.current = true;
    el.currentTime = 0;
    setClipOn(true);
    void el.play().catch(() => setClipOn(false));
  }, [speaking]);

  // Au repos, l'avatar reste immobile (une « respiration » sur un avatar de cette taille distrait).
  // Sans boucle de parole générée, la pose fixe bouge seulement pendant qu'il parle.
  const poseMotion = speaking && !AVATAR_CLIPS.talking ? 'animate-talk' : '';
  const layer = 'avatar-mask absolute inset-0 h-full w-full object-contain object-bottom';

  return (
    <div className="relative mx-auto h-full min-h-[280px]" style={{ aspectRatio: AVATAR_CLIPS.aspect }}>
      <div className="relative isolate h-full w-full mix-blend-lighten">
        {/* Image de repos cachée pendant les vidéos : leurs fondus (bas, côtés) ne tombent pas au même
            endroit, et la pose transparaissait en dessous. */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${introPlaying ? 'opacity-0' : poseMotion} ${
            clipOn && !introPlaying ? 'opacity-0' : ''
          }`}
        >
          {AVATAR_CLIPS.idle ? (
            <video src={AVATAR_CLIPS.idle} poster={AVATAR_CLIPS.pose} className={layer} autoPlay muted loop playsInline aria-hidden />
          ) : AVATAR_CLIPS.puppet ? (
            <AvatarPuppet className="absolute inset-0" active={!introPlaying && !clipOn} talking={speaking} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={AVATAR_CLIPS.pose} alt="Avatar d'Achraf Baitar à son bureau" className={layer} />
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
            // Retour à la pose une fois la vidéo finie, en fondu.
            onEnded={() => setClipOn(false)}
            aria-hidden
          />
        )}
        {AVATAR_CLIPS.intro && (
          <video
            ref={intro}
            src={AVATAR_CLIPS.intro}
            poster={AVATAR_CLIPS.introPoster ?? undefined}
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
