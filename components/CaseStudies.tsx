import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/data/profile';

export const CaseStudies: React.FC<{ onAsk: (question: string) => void }> = ({ onAsk }) => {
  return (
    <section id="realisations" className="scroll-mt-24 border-t border-light/10 px-10 py-32 lg:py-20 sm:px-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">01 — Réalisations</p>
      <h2 className="mt-4 text-8xl font-medium leading-none lg:text-6xl sm:text-5xl">Ce que j'ai livré</h2>
      <ul className="mt-16 sm:mt-10">
        {caseStudies.map((study, index) => (
          <motion.li
            key={study.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group grid grid-cols-[80px_1fr_1.4fr] gap-10 border-t border-light/10 py-12 lg:grid-cols-1 lg:gap-5"
          >
            <span className="font-mono text-sm text-light/30">0{index + 1}</span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-light/50">{study.tag}</p>
              <h3 className="mt-3 text-4xl font-normal leading-tight transition group-hover:translate-x-1 sm:text-3xl">
                {study.url ? (
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="hover:text-light/60">
                    {study.title} ↗
                  </a>
                ) : (
                  study.title
                )}
              </h3>
              <button
                type="button"
                onClick={() => onAsk(`Parle-moi du projet ${study.title} : comment il fonctionne et ce qu'il apporte.`)}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-light/20 px-3 py-1.5 text-xs text-light/70 transition hover:border-light hover:text-light"
              >
                ▶ Achraf vous l'explique
              </button>
            </div>
            <dl className="grid grid-cols-3 gap-8 md:grid-cols-1 md:gap-4">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-light/40">Le problème</dt>
                <dd className="mt-2 font-light text-light/80">{study.problem}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-light/40">La solution</dt>
                <dd className="mt-2 font-light text-light/80">{study.built}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-light/40">Aujourd'hui</dt>
                <dd className="mt-2 font-light text-light/80">{study.result}</dd>
              </div>
            </dl>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
