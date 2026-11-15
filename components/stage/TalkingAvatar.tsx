import React, { useEffect, useRef, useState } from 'react';
import { AVATAR_CLIPS } from '@/data/profile';

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
  // Une fois jouée, la vidéo de parole reste affichée sur sa dernière image : revenir à la pose
  // de départ faisait un petit saut visible. Elle reprend au début à la question suivante.
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

  // La vidéo de parole (coupée à 7,5 s : ensuite, l'original relance un geste interrompu net) se joue
  // une seule fois par réponse, du début à la fin, puis il revient au repos
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

  // Au repos, l'avatar reste immobile (une « respiration » sur un avatar de cette taille distrait).
  // Sans boucle de parole générée, la pose fixe bouge seulement pendant qu'il parle.
  const poseMotion = speaking && !AVATAR_CLIPS.talking ? 'animate-talk' : '';
  const layer = 'absolute inset-0 h-full w-full object-contain object-bottom';

  return (
    <div className="relative mx-auto aspect-[3/4] h-full min-h-[280px]">
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
