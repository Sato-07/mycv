import React from 'react';
import { motion } from 'framer-motion';
import { experience, skills } from '@/data/profile';

export const Parcours: React.FC = () => (
  <section id="parcours" className="scroll-mt-24 border-t border-light/10 px-10 py-32 lg:py-20 sm:px-5">
    <div className="grid grid-cols-3 gap-16 lg:grid-cols-1 lg:gap-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">03 — Parcours</p>
        <h2 className="mt-4 text-6xl font-medium leading-none lg:text-5xl">Ce que je sais faire</h2>
        <ul className="mt-10 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill} className="rounded-full border border-light/15 px-3 py-1 text-sm text-light/80">
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <ol className="col-span-2 lg:col-span-1">
        {experience.map((item) => (
          <motion.li
            key={item.role}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-[120px_1fr] gap-6 border-t border-light/10 py-8 first:border-t-0 first:pt-0 sm:grid-cols-1 sm:gap-2"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-light/40">{item.time}</span>
            <div>
              <h3 className="text-2xl font-normal">
                {item.role}{' '}
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-light/50 hover:text-light">
                    @{item.place}
                  </a>
                ) : (
                  <span className="text-light/50">@{item.place}</span>
                )}
              </h3>
              <p className="mt-2 font-light text-light/70">{item.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);
