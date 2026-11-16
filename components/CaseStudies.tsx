import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/data/profile';
import { CaseFeature } from './realisations/CaseFeature';

// Les cas clients filmés d'abord, puis les autres projets en liste courte.
export const CaseStudies: React.FC<{ onAsk: (question: string, media?: string) => void }> = ({ onAsk }) => {
  const featured = caseStudies.filter((s) => s.media);
  const others = caseStudies.filter((s) => !s.media);

  return (
    <section id="realisations" className="scroll-mt-24 border-t border-light/10 px-10 py-32 lg:py-20 sm:px-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">01 — Réalisations</p>
      <div className="flex items-end justify-between gap-10 lg:flex-col lg:items-start lg:gap-5">
        <h2 className="mt-4 text-8xl font-medium leading-none lg:text-6xl sm:text-5xl">Ce que j'ai livré</h2>
        <p className="max-w-sm font-light text-light/55">
          De vrais clients, des projets en ligne. Les vidéos sont filmées sur les vrais sites et dans le logiciel.
        </p>
      </div>

      <ul className="mt-16 sm:mt-10">
        {featured.map((study, index) => (
          <CaseFeature key={study.title} study={study} index={index} onAsk={onAsk} />
        ))}
      </ul>

      {others.length > 0 && (
        <div className="border-t border-light/10 pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">Aussi construit</p>
          <ul className="mt-6">
            {others.map((study, index) => (
              <motion.li
                key={study.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group grid grid-cols-[1fr_1.6fr_auto] items-baseline gap-8 border-b border-light/10 py-6 lg:grid-cols-1 lg:gap-2"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-light/40">{study.tag}</p>
                  <h3 className="mt-1 text-2xl font-normal">
                    {study.url ? (
                      <a href={study.url} target="_blank" rel="noopener noreferrer" className="transition hover:text-light/60">
                        {study.title} ↗
                      </a>
                    ) : (
                      study.title
                    )}
                  </h3>
                </div>
                <p className="font-light text-light/65">{study.built}</p>
                <button
                  type="button"
                  onClick={() => onAsk(`Parle-moi du projet ${study.title} : comment il fonctionne et ce qu'il apporte.`)}
                  className="whitespace-nowrap text-sm text-light/60 transition hover:text-light lg:justify-self-start"
                >
                  ▶ Achraf vous l'explique
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
