import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/data/profile';

export const CaseStudies: React.FC = () => {
  return (
    <section id="realisations" className="w-full pt-32 lg:pt-20 px-10 sm:px-5">
      <h2 className="font-medium text-8xl lg:text-6xl sm:text-5xl mb-16 sm:mb-10 text-center w-full">Réalisations</h2>
      <ul className="w-full">
        {caseStudies.map((study) => (
          <motion.li
            key={study.title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="border-t border-gray-200 dark:border-neutral-700 py-10 grid grid-cols-3 gap-10 lg:grid-cols-1 lg:gap-4"
          >
            <div>
              <p className="font-light text-sm uppercase tracking-wider">{study.tag}</p>
              <h3 className="text-4xl sm:text-3xl font-normal mt-2">
                {study.url ? (
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                    {study.title} ↗
                  </a>
                ) : (
                  study.title
                )}
              </h3>
            </div>
            <div className="col-span-2 lg:col-span-1 grid grid-cols-3 gap-6 md:grid-cols-1 md:gap-3">
              <div>
                <p className="font-semibold mb-1">Le problème</p>
                <p className="font-light">{study.problem}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Ce que j'ai construit</p>
                <p className="font-light">{study.built}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Aujourd'hui</p>
                <p className="font-light">{study.result}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
