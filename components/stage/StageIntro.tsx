import React from 'react';
import { HireMe } from '@/components/ui/HireMe';
import { bookingHref, caseStudies } from '@/data/profile';

// Colonne gauche : le message, l'action, puis la preuve. Elle commence à la hauteur de la tête
// de l'avatar et se termine sur sa ligne de pied, comme la colonne de conversation en face.
export const StageIntro: React.FC<{ onTalk: () => void }> = ({ onTalk }) => (
  <div className="flex h-full flex-col justify-between gap-12 lg:items-center lg:gap-8 lg:text-center">
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">Développeur freelance · Belgique</p>
      <h1 className="mt-6 text-[clamp(2.25rem,3vw,3.4rem)] font-normal leading-[1.04] tracking-tight [text-wrap:balance]">
        J'automatise la prospection et la gestion des PME <span className="font-light italic text-light/45">avec l'IA.</span>
      </h1>
      <p className="mt-6 max-w-sm font-light leading-relaxed text-light/60 lg:mx-auto">
        Des outils sur mesure qui font gagner du temps et des clients, livrés à prix fixé d'avance.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:justify-center">
        <a
          href={bookingHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-light px-6 py-3 text-sm font-medium text-dark transition hover:scale-[1.03]"
        >
          Réserver un appel
        </a>
        <button type="button" onClick={onTalk} className="group inline-flex items-center gap-2 text-sm text-light/80 transition hover:text-light">
          Parler à l'avatar
          <span className="transition group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>

    <div className="flex items-end justify-between gap-6 xl:hidden">
      <ul className="w-full max-w-xs">
        {caseStudies.slice(0, 3).map((study, index) => (
          <li key={study.title} className="border-t border-light/10 last:border-b">
            <a href="#realisations" className="group flex items-baseline gap-4 py-3 text-sm transition hover:text-light">
              <span className="font-mono text-[11px] text-light/35">0{index + 1}</span>
              <span className="text-light/75 transition group-hover:text-light">{study.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="shrink-0 2xl:hidden">
        <HireMe />
      </div>
    </div>
  </div>
);
