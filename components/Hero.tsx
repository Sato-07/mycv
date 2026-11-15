import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FotoProfil from '@/public/hb7_sport.png';
import FotoProfilServer from '@/public/AB7.png';
import { HireMe } from '@/components/ui/HireMe';
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { bookingHref } from '@/data/profile';

type HeroProps = {
  showServerImage: boolean;
  onTalk: () => void;
};

export const Hero: React.FC<HeroProps> = ({ showServerImage, onTalk }) => {
  return (
    <section className="grid grid-cols-2 items-center gap-12 pt-6 lg:grid-cols-1 lg:gap-6 lg:text-center">
      <div className="relative flex justify-center">
        {/* Halo dégradé qui pulse derrière la photo : l'« aura » IA de la page. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-400 to-cyan-400 blur-3xl animate-glow lg:h-[320px] lg:w-[320px] sm:h-[240px] sm:w-[240px]"
        />
        <Image
          src={showServerImage ? FotoProfilServer : FotoProfil}
          alt="Achraf Baitar"
          width={440}
          priority
          // Le bas de la photo s'efface au lieu d'être coupé net à la taille.
          className="relative h-auto w-[440px] [mask-image:linear-gradient(to_bottom,black_75%,transparent)] lg:w-[300px] sm:w-[240px]"
        />
        <HireMe />
      </div>

      <div className="flex flex-col items-start lg:items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/60 px-3 py-1.5 font-mono text-xs backdrop-blur dark:border-light/10 dark:bg-white/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Freelance<span className="sm:hidden"> · Belgique</span> · disponible</span>
        </motion.span>

        <AnimatedTitle
          className="!text-[3.4rem] font-normal leading-[1.05] !text-left lg:!text-center xl:!text-5xl md:!text-4xl sm:!text-3xl"
          text="J'automatise la prospection et la gestion des PME avec l'IA."
          highlightFrom={8}
        />

        <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-dark/80 dark:text-light/80 sm:text-base">
          Des outils qui font gagner du temps et des clients : un logiciel de gestion en production, un radar de
          prospection, une veille des marchés publics qui lit les cahiers des charges. À prix fixé d'avance.
        </p>

        <div className="mt-8 flex items-center gap-3 sm:flex-col">
          <button
            type="button"
            onClick={onTalk}
            className="group inline-flex items-center gap-2 rounded-full bg-ai-gradient px-6 py-3 font-medium text-white shadow-lg shadow-violet-500/30 transition hover:scale-[1.03]"
          >
            <span className="font-mono">✦</span> Parler à mon IA
          </button>
          <a
            href={bookingHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-dark px-6 py-3 font-medium transition hover:bg-dark hover:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark"
          >
            Réserver un appel
          </a>
        </div>
      </div>
    </section>
  );
};
