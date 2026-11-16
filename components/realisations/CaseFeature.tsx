import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '@/data/profile';
import { SiteVideo } from './SiteVideo';

type CaseFeatureProps = { study: CaseStudy; index: number; onAsk: (question: string, media?: string) => void };

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-light/40">{children}</dt>
);

// Un cas client : le site filmé d'un côté, l'histoire de l'autre ; les côtés alternent d'un cas à l'autre.
export const CaseFeature: React.FC<CaseFeatureProps> = ({ study, index, onAsk }) => {
  const flip = index % 2 === 1;
  return (
    <motion.li
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-[1.25fr_1fr] items-center gap-16 border-t border-light/10 py-20 xl:gap-10 lg:grid-cols-1 lg:py-14"
    >
      <div className={flip ? 'order-2 lg:order-none' : ''}>
        {study.media && <SiteVideo media={study.media} url={study.url} title={study.title} demo={study.demo} />}
      </div>

      <div>
        <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-light/50">
          <span className="text-light/30">0{index + 1}</span>
          {study.tag}
        </p>
        <h3 className="mt-4 text-5xl font-normal leading-[1.05] xl:text-4xl sm:text-3xl">{study.title}</h3>
        {study.client && <p className="mt-2 text-light/55">{study.client}</p>}

        <dl className="mt-8 space-y-5">
          <div>
            <Label>Le problème</Label>
            <dd className="mt-1.5 font-light text-light/80">{study.problem}</dd>
          </div>
          <div>
            <Label>Ce que j'ai construit</Label>
            <dd className="mt-1.5 font-light text-light/80">{study.built}</dd>
          </div>
          <div>
            <Label>Aujourd'hui</Label>
            <dd className="mt-1.5 font-light text-light">{study.result}</dd>
          </div>
        </dl>

        {study.quote && (
          <figure className="mt-8 border-l border-light/30 pl-5">
            <blockquote className="text-xl font-light italic text-light/90">« {study.quote.text} »</blockquote>
            <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-light/45">{study.quote.author}</figcaption>
          </figure>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {study.url && (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-light px-5 py-2.5 text-sm font-medium text-dark transition hover:scale-[1.03]"
            >
              Voir le site ↗
            </a>
          )}
          <button
            type="button"
            onClick={() => onAsk(`Parle-moi du projet ${study.title} : comment il fonctionne et ce qu'il apporte.`, study.media)}
            className="rounded-full border border-light/20 px-5 py-2.5 text-sm text-light/75 transition hover:border-light hover:text-light"
          >
            ▶ Achraf vous l'explique
          </button>
        </div>
      </div>
    </motion.li>
  );
};
