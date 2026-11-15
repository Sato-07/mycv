import React from 'react';
import { motion, Variants } from 'framer-motion';

const WORDS: { text: string; muted?: boolean }[] = [
  { text: "J'automatise" },
  { text: 'votre' },
  { text: 'PME' },
  { text: 'avec', muted: true },
  { text: "l'IA.", muted: true },
];

// Les mots montent un à un à l'arrivée, puis s'envolent en se floutant quand la conversation commence.
const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  gone: { transition: { staggerChildren: 0.04 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(10px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  gone: { opacity: 0, y: '-0.5em', filter: 'blur(12px)', transition: { duration: 0.45, ease: 'easeIn' } },
};
const line: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } },
  gone: { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

export const HeroTitle: React.FC = () => (
  <motion.div variants={container} initial="hidden" animate="shown" exit="gone">
    <motion.p variants={line} className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">
      Développeur freelance · Belgique
    </motion.p>
    <h1 className="mt-6 text-[clamp(2.5rem,min(5vw,9vh),6.25rem)] font-normal leading-[0.98] tracking-tight [text-wrap:balance]">
      {WORDS.map((w) => (
        <React.Fragment key={w.text}>
          <motion.span variants={word} className={`inline-block ${w.muted ? 'font-light italic text-light/45' : ''}`}>
            {w.text}
          </motion.span>{' '}
        </React.Fragment>
      ))}
    </h1>
    <motion.p
      variants={line}
      className="mt-[3vh] max-w-md text-lg font-light leading-relaxed text-light/60 [@media(max-height:780px)]:hidden lg:mx-auto lg:text-base lg:[@media(max-height:780px)]:block"
    >
      Prospection, devis, relances, veille : des outils sur mesure, à prix fixé d'avance. Posez votre question à mon double.
    </motion.p>
  </motion.div>
);
