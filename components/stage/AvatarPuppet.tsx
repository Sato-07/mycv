import React, { useEffect, useRef } from 'react';
import { AVATAR_CLIPS } from '@/data/profile';

// Pièces découpées dans public/avatar/parts/ (variantes générées puis recollées sur la pose) :
// chaque rectangle est identique à la pose sur ses bords, on peut donc le superposer sans jointure.
// Positions en % du cadre 720 × 1200 de la pose.
const EYES = { left: '40.556%', top: '11.833%', width: '25%', height: '6.833%' };
const MOUTH = { left: '42.5%', top: '19.167%', width: '20%', height: '6.833%' };
// Centre des yeux dans le cadre, pour savoir où regarde le visiteur par rapport à l'avatar.
const EYE_CENTER = { x: 0.53, y: 0.153 };

type Gaze = 'center' | 'left' | 'right' | 'down';
const GAZES: Exclude<Gaze, 'center'>[] = ['left', 'right', 'down'];
const MOUTH_STEPS = [null, 'half', 'open', 'half'] as const;

type AvatarPuppetProps = {
  className: string;
  // Faux tant qu'une vidéo couvre la pose : inutile d'animer ce qu'on ne voit pas.
  active: boolean;
  // Vrai pendant que la réponse s'écrit : la bouche bouge.
  talking: boolean;
};

// Image de repos « vivante » : les yeux suivent la souris, il cligne des yeux, la bouche bouge quand il répond.
// Tout passe par l'opacité de petits calques, sans rendu React à chaque mouvement.
export const AvatarPuppet: React.FC<AvatarPuppetProps> = ({ className, active, talking }) => {
  const root = useRef<HTMLDivElement>(null);
  const gazeLayers = useRef<Partial<Record<Gaze, HTMLImageElement | null>>>({});
  const halfLid = useRef<HTMLImageElement>(null);
  const closedLid = useRef<HTMLImageElement>(null);
  const mouthHalf = useRef<HTMLImageElement>(null);
  const mouthOpen = useRef<HTMLImageElement>(null);

  // Regard : vers la souris, ou de petits coups d'œil au hasard quand elle ne bouge pas (et sur mobile).
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let current: Gaze = 'center';
    let lastMove = 0;
    const look = (gaze: Gaze) => {
      if (gaze === current) return;
      current = gaze;
      GAZES.forEach((g) => {
        const el = gazeLayers.current[g];
        if (el) el.style.opacity = g === gaze ? '1' : '0';
      });
    };
    const onMove = (e: PointerEvent) => {
      const box = root.current?.getBoundingClientRect();
      if (!box) return;
      lastMove = Date.now();
      const dx = (e.clientX - (box.left + box.width * EYE_CENTER.x)) / (window.innerWidth * 0.3);
      const dy = (e.clientY - (box.top + box.height * EYE_CENTER.y)) / (window.innerHeight * 0.45);
      look(dy > 0.55 && Math.abs(dx) < 0.8 ? 'down' : dx < -0.25 ? 'left' : dx > 0.25 ? 'right' : 'center');
    };
    const idle = window.setInterval(() => {
      if (Date.now() - lastMove < 5000) return;
      const pick = Math.random();
      look(pick < 0.55 ? 'center' : pick < 0.72 ? 'left' : pick < 0.89 ? 'right' : 'down');
    }, 2600);
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.clearInterval(idle);
      look('center');
    };
  }, [active]);

  // Clignement : mi-clos, fermé, mi-clos, ouvert, toutes les 2,5 à 6 secondes.
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timers: number[] = [];
    const set = (half: boolean, closed: boolean) => {
      if (halfLid.current) halfLid.current.style.opacity = half ? '1' : '0';
      if (closedLid.current) closedLid.current.style.opacity = closed ? '1' : '0';
    };
    const blink = () => {
      set(true, false);
      timers.push(window.setTimeout(() => set(false, true), 55));
      timers.push(window.setTimeout(() => set(true, false), 150));
      timers.push(window.setTimeout(() => set(false, false), 210));
      timers.push(window.setTimeout(blink, 2500 + Math.random() * 3500));
    };
    timers.push(window.setTimeout(blink, 1200));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      set(false, false);
    };
  }, [active]);

  // Bouche : alterne fermée, entrouverte, ouverte tant que la réponse s'écrit.
  useEffect(() => {
    const show = (step: (typeof MOUTH_STEPS)[number]) => {
      if (mouthHalf.current) mouthHalf.current.style.opacity = step === 'half' ? '1' : '0';
      if (mouthOpen.current) mouthOpen.current.style.opacity = step === 'open' ? '1' : '0';
    };
    if (!active || !talking) return show(null);
    let i = 0;
    const timer = window.setInterval(() => {
      // Un peu de hasard : un rythme parfaitement régulier fait marionnette.
      i = Math.random() < 0.25 ? 0 : (i + 1) % MOUTH_STEPS.length;
      show(MOUTH_STEPS[i]);
    }, 115);
    return () => {
      window.clearInterval(timer);
      show(null);
    };
  }, [active, talking]);

  const part = 'pointer-events-none absolute opacity-0';
  return (
    <div ref={root} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={AVATAR_CLIPS.pose} alt="Avatar d'Achraf Baitar" className="avatar-mask absolute inset-0 h-full w-full object-contain object-bottom" />
      {GAZES.map((g) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={g}
          ref={(el) => {
            gazeLayers.current[g] = el;
          }}
          src={`/avatar/parts/yeux-${g === 'left' ? 'gauche' : g === 'right' ? 'droite' : 'bas'}.png`}
          alt=""
          aria-hidden
          className={`${part} transition-opacity duration-150`}
          style={EYES}
        />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={halfLid} src="/avatar/parts/yeux-mi-clos.png" alt="" aria-hidden className={part} style={EYES} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={closedLid} src="/avatar/parts/yeux-fermes.png" alt="" aria-hidden className={part} style={EYES} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={mouthHalf} src="/avatar/parts/bouche-entrouverte.png" alt="" aria-hidden className={part} style={MOUTH} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={mouthOpen} src="/avatar/parts/bouche-ouverte.png" alt="" aria-hidden className={part} style={MOUTH} />
    </div>
  );
};
