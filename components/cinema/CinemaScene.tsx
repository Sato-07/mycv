import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CINEMA } from '@/data/profile';
import { CinemaHud } from './CinemaHud';

type CinemaSceneProps = {
  // Vrai pendant que la réponse s'écrit : il reparle.
  speaking: boolean;
  // Incrémenté par « Écouter Achraf » : reprend l'accueil, voix comprise.
  listenSignal: number;
  // La conversation a commencé : la caméra s'avance lentement vers lui.
  closeUp: boolean;
  className?: string;
};

type Clip = 'intro' | 'talking' | 'rest';

// Le plan 16:9 en plein cadre, derrière le titre et le chat.
// Trois calques empilés (intro, parole, image de repos), on ne fait varier que leur opacité :
// changer la source d'une seule vidéo laissait un flash noir le temps du chargement.
export const CinemaScene: React.FC<CinemaSceneProps> = ({ speaking, listenSignal, closeUp, className = '' }) => {
  const intro = useRef<HTMLVideoElement>(null);
  const talking = useRef<HTMLVideoElement>(null);
  const [clip, setClip] = useState<Clip>('intro');
  const [muted, setMuted] = useState(true);
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;

  // Parallaxe : la scène glisse un peu à l'opposé de la souris, comme vue à travers une vitre.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const x = useTransform(sx, (v) => v * -14);
  const y = useTransform(sy, (v) => v * -9);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  // À l'arrivée : tout le plan depuis le début. Ensuite, « Écouter Achraf » reprend là où il se met à parler.
  useEffect(() => {
    const el = intro.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && listenSignal === 0) {
      setClip('rest');
      return;
    }
    if (talking.current) talking.current.pause();
    el.currentTime = listenSignal === 0 ? 0 : Math.max(0, CINEMA.talkAt - 0.4);
    // Le son est dans la vidéo : les lèvres restent calées sans rien synchroniser à la main.
    el.muted = false;
    setClip('intro');
    el.play()
      .then(() => setMuted(false))
      .catch(() => {
        // Son refusé tant que le visiteur n'a rien touché : le plan part muet.
        el.muted = true;
        setMuted(true);
        return el.play();
      })
      .catch(() => setClip('rest'));
  }, [listenSignal]);

  // Le premier geste du visiteur rend la voix, là où en est la vidéo.
  useEffect(() => {
    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    const unmute = (e: Event) => {
      // Le bouton du son gère lui-même son clic : sinon ce geste rendrait la voix et le clic la recouperait.
      if (e.target instanceof Element && e.target.closest('[data-sound-toggle]')) return;
      events.forEach((name) => window.removeEventListener(name, unmute));
      const el = intro.current;
      if (el && !el.paused && !el.ended && !speakingRef.current) {
        el.muted = false;
        setMuted(false);
      }
    };
    events.forEach((name) => window.addEventListener(name, unmute));
    return () => events.forEach((name) => window.removeEventListener(name, unmute));
  }, []);

  // Une réponse du chat : la partie parlée se joue une fois, muette, puis retour au repos.
  useEffect(() => {
    if (!speaking) return;
    const el = talking.current;
    if (intro.current) intro.current.pause();
    if (!el) return;
    el.currentTime = 0;
    setClip('talking');
    void el.play().catch(() => setClip('rest'));
  }, [speaking]);

  const toggleSound = () => {
    const el = intro.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
    // Remettre le son alors que l'accueil est fini : on le rejoue depuis la parole.
    if (!next && clip !== 'intro') {
      el.currentTime = Math.max(0, CINEMA.talkAt - 0.4);
      setClip('intro');
      void el.play();
    }
  };

  // Mobile : le cadre étroit doit centrer le personnage, pas seulement garder son côté de l'image.
  const layer = 'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 lg:![object-position:93%_50%]';
  const show = (c: Clip) => (clip === c ? 'opacity-100' : 'opacity-0');

  return (
    <div className={`overflow-hidden bg-dark ${className}`}>
      {/* Le plan apparaît en sortant du flou et du noir, pendant que les volets s'ouvrent. */}
      <motion.div
        className="absolute inset-0"
        style={{ x, y, transformOrigin: `${CINEMA.focus} 55%` }}
        initial={{ filter: 'blur(24px) brightness(0.2)', scale: 1.08 }}
        animate={{ filter: 'blur(0px) brightness(1)', scale: closeUp ? 1.06 : 1 }}
        transition={{
          filter: { duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
          scale: { duration: closeUp ? 6 : 3.2, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Grand écran : le plan garde ses proportions et ne dépasse pas ~1,2 fois sa taille réelle
            (vidéo en 720p, agrandie davantage elle devenait floue) ; ses bords fondent dans le noir.
            Mobile : il remplit le cadre, recadré sur lui. */}
        <div className="cinema-mask absolute right-0 top-1/2 aspect-video w-[min(100%,1560px,calc(100svh*16/9))] -translate-y-1/2 lg:inset-0 lg:aspect-auto lg:w-full lg:translate-y-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CINEMA.rest} alt="Achraf, son double IA, assis à son bureau" className={`${layer} ${show('rest')}`} style={{ objectPosition: `${CINEMA.focus} 50%` }} />
          <video
            ref={talking}
            src={CINEMA.talking}
            className={`${layer} ${show('talking')}`}
            style={{ objectPosition: `${CINEMA.focus} 50%` }}
            muted
            playsInline
            preload="auto"
            onEnded={() => setClip('rest')}
            aria-hidden
          />
          <video
            ref={intro}
            src={CINEMA.intro}
            poster={CINEMA.poster}
            className={`${layer} ${show('intro')}`}
            style={{ objectPosition: `${CINEMA.focus} 50%` }}
            playsInline
            preload="auto"
            onEnded={() => setClip('rest')}
            aria-hidden
          />
        </div>
      </motion.div>

      {/* Lisibilité : le noir de la page remonte sur la gauche (titre, chat) et en bas. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,0.9)_30%,rgba(10,10,10,0.35)_50%,transparent_64%)] lg:bg-[linear-gradient(0deg,#0a0a0a_0%,rgba(10,10,10,0.6)_22%,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_74%_45%,transparent_35%,rgba(10,10,10,0.7)_100%)]" />
      {/* Lignes de balayage très légères : l'image fait « écran », sans gêner la lecture. */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0px,rgba(255,255,255,0.025)_1px,transparent_1px,transparent_3px)] mix-blend-overlay" />

      <CinemaHud video={intro} talking={talking} clip={clip} speaking={speaking} muted={muted} onToggleSound={toggleSound} />
    </div>
  );
};
