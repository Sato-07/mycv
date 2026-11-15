import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Offers } from '@/components/Offers';
import { Project } from '@/components/Project';
import { AnimatedDescription } from '@/components/ui/AnimatedDescription';
import { caseStudies, skills } from '@/data/profile';

const SHORTCUTS = [
  { label: 'Réalisations', question: 'Montre-moi ce que tu as déjà livré' },
  { label: 'Offres et prix', question: 'Quelles sont tes offres et tes prix ?' },
  { label: 'Compétences', question: 'Quelles sont tes compétences techniques ?' },
  { label: 'Parcours', question: 'Quel est ton parcours ?' },
];

const Intro: React.FC<{ onAsk: (question: string) => void }> = ({ onAsk }) => (
  <div className="flex h-full flex-col justify-center">
    <AnimatedDescription
      show
      title="Cet écran obéit à l'IA."
      paragraph="Posez une question dans le chat : l'assistant vous répond et affiche ici la bonne section, mes projets, mes offres ou mes compétences. C'est un aperçu de ce que je construis pour mes clients."
    />
    <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-1">
      {SHORTCUTS.map((shortcut, index) => (
        <motion.button
          key={shortcut.label}
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
          onClick={() => onAsk(shortcut.question)}
          className="group flex items-center justify-between rounded-2xl border border-dark/10 px-5 py-4 text-left transition hover:border-violet-500/50 hover:bg-violet-500/5 dark:border-light/10"
        >
          <span>
            <span className="block font-mono text-xs text-dark/40 dark:text-light/40">0{index + 1}</span>
            <span className="text-lg">{shortcut.label}</span>
          </span>
          <span className="text-dark/30 transition group-hover:translate-x-1 group-hover:text-violet-500 dark:text-light/30">→</span>
        </motion.button>
      ))}
    </div>
  </div>
);

type AiPanelProps = {
  activeSection: string;
  onAsk: (question: string) => void;
  setModal: (modal: { active: boolean; index: number }) => void;
};

export const AiPanel: React.FC<AiPanelProps> = ({ activeSection, onAsk, setModal }) => {
  const content = (() => {
    switch (activeSection) {
      case 'SKILLS':
        return <Skills skills={skills} show />;
      case 'EDUCATION':
        return <Experience show />;
      case 'OFFERS':
        return <Offers compact />;
      case 'PROJECT':
        return (
          <div className="w-full">
            <h2 className="mb-10 text-center text-6xl font-medium">Réalisations</h2>
            {caseStudies.map((study, index) => (
              <Project
                key={study.title}
                url={study.url}
                index={index}
                title={study.title}
                subtitle={study.tag}
                setModal={setModal}
                show
              />
            ))}
          </div>
        );
      default:
        return <Intro onAsk={onAsk} />;
    }
  })();

  return (
    <AnimatePresence mode="wait">
      {/* Fondu flouté entre deux sections : l'écran « se recompose » quand l'IA répond. */}
      <motion.div
        key={activeSection}
        className="h-full"
        initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        transition={{ duration: 0.35 }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
};
