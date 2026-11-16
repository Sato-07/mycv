import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CINEMA, caseStudies } from '@/data/profile';
import { CinemaHud, CinemaClip } from './CinemaHud';

type CinemaSceneProps = {
  // Vrai pendant que la réponse s'écrit : il reparle.
  speaking: boolean;
  // Incrémenté par « Écouter Achraf » : reprend l'accueil, voix comprise.
  listenSignal: number;
  // La conversation a commencé : la caméra s'avance lentement vers lui.
  closeUp: boolean;
  // Projet présenté (public/realisations/<media>.mp4) : il se pousse et le montre sur son écran.
  showcase?: string | null;
  className?: string;
};

// Le plan 16:9 en plein cadre, derrière le titre et le chat.
// Trois calques empilés (intro, parole, image de repos), on ne fait varier que leur opacité :
// changer la source d'une seule vidéo laissait un flash noir le temps du chargement.
// Les projets filmés : chacun a sa vidéo où il se pousse et le montre sur l'écran.
const SHOWCASES = caseStudies.flatMap((s) => (s.media ? [s.media] : []));

export const CinemaScene: React.FC<CinemaSceneProps> = ({ speaking, listenSignal, closeUp, showcase = null, className = '' }) => {
  const intro = useRef<HTMLVideoElement>(null);
  const talking = useRef<HTMLVideoElement>(null);
  const rolls = useRef<Record<string, HTMLVideoElement | null>>({});
  const [clip, setClip] = useState<CinemaClip>('intro');
  // Le projet à l'image : changé seulement quand sa vidéo joue vraiment (pas de noir pendant le chargement).
  const [shown, setShown] = useState<string | null>(null);
  const clipRef = useRef(clip);
  clipRef.current = clip;
  const showcaseRef = useRef(showcase);
  showcaseRef.current = showcase;
  const [muted, setMuted] = useState(true);
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;

  // À l'arrivée : tout le plan depuis le début. Ensuite, « Écouter Achraf » reprend là où il se met à parler.
  useEffect(() => {
    const el = intro.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && listenSignal === 0) {
      setClip('rest');
      return;
    }
    if (talking.current) talking.current.pause();
    Object.values(rolls.current).forEach((v) => v?.pause());
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
    // Pendant une présentation, il reste à côté de l'écran : la réponse s'écrit sans le ramener au bureau.
    if (!speaking || showcaseRef.current) return;
    const el = talking.current;
    if (intro.current) intro.current.pause();
    if (!el) return;
    el.currentTime = 0;
    setClip('talking');
    void el.play().catch(() => setClip('rest'));
  }, [speaking]);

  // Un projet demandé : il pousse sa chaise et le montre, le projet déjà dans l'écran (une vidéo par projet).
  // Plus de projet : retour en fondu à l'image du bureau.
  useEffect(() => {
    if (!showcase) {
      if (clipRef.current === 'roll') setClip('rest');
      // Mise en pause après le fondu : couper tout de suite figerait l'image pendant qu'elle disparaît.
      const timer = window.setTimeout(() => Object.values(rolls.current).forEach((v) => v?.pause()), 600);
      return () => window.clearTimeout(timer);
    }
    const el = rolls.current[showcase];
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    intro.current?.pause();
    talking.current?.pause();
    Object.values(rolls.current).forEach((v) => v && v !== el && v.pause());
    // Toujours depuis le début : sa voix présente le projet dès qu'il se pousse (sauf mouvement réduit).
    el.currentTime = reduced ? CINEMA.rollEnd : 0;
    // Sa voix présente le projet (quand la vidéo en a une) : le clic sur « Achraf vous l'explique »
    // autorise le son ; si le navigateur le refuse quand même, la vidéo part muette.
    el.muted = false;
    el.play()
      .catch(() => {
        el.muted = true;
        return el.play();
      })
      .catch(() => setClip('rest'));
  }, [showcase]);

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
  const show = (c: CinemaClip) => (clip === c ? 'opacity-100' : 'opacity-0');

  return (
    <div className={`overflow-hidden bg-dark ${className}`}>
      {/* Le plan apparaît en sortant du flou et du noir, pendant que les volets s'ouvrent. */}
      <motion.div
        className="absolute inset-0"
        // Pas de parallaxe à la souris : le bureau bougeait et l'écran incrusté semblait trembler.
        style={{ transformOrigin: `${CINEMA.focus} 55%` }}
        initial={{ filter: 'blur(24px) brightness(0.2)', scale: 1.08 }}
        animate={{ filter: 'blur(0px) brightness(1)', scale: closeUp ? 1.06 : 1 }}
        transition={{
          filter: { duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
          scale: { duration: closeUp ? 6 : 3.2, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Grand écran : le plan garde ses proportions et ne dépasse pas ~1,2 fois sa taille réelle
            (personnage rendu en 720p : l'agrandissement par IA le rendait plus lisse, moins naturel ; seul l'éditeur de code est rendu en 1080p) ; ses bords fondent dans le noir.
            Mobile : il remplit le cadre, recadré sur lui. */}
        <div className="cinema-mask absolute right-0 top-1/2 aspect-video w-[min(100%,1560px,calc(100svh*16/9))] -translate-y-1/2 lg:inset-0 lg:aspect-auto lg:w-full lg:translate-y-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CINEMA.rest} alt="Achraf, son double IA, assis à son bureau" className={`${layer} ${show('rest')}`} style={{ objectPosition: `${CINEMA.focus} 50%` }} />
          {SHOWCASES.map((media) => (
            <video
              key={media}
              ref={(el) => {
                rolls.current[media] = el;
              }}
              src={CINEMA.roll(media)}
              className={`${layer} ${clip === 'roll' && shown === media ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectPosition: `${CINEMA.focus} 50%` }}
              muted
              playsInline
              preload="metadata"
              onPlaying={() => {
                if (showcaseRef.current !== media) return;
                setShown(media);
                setClip('roll');
              }}
              aria-hidden
            />
          ))}
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
