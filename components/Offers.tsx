import React from 'react';
import { motion } from 'framer-motion';
import { bookingHref, offers } from '@/data/profile';

export const Offers: React.FC = () => {
  return (
    <section id="offres" className="scroll-mt-24 border-t border-light/10 px-10 py-32 lg:py-20 sm:px-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">02 — Offres</p>
      <div className="mt-4 flex items-end justify-between gap-10 lg:flex-col lg:items-start">
        <h2 className="text-8xl font-medium leading-none lg:text-6xl sm:text-5xl">Prix fixés d'avance</h2>
        <p className="max-w-sm font-light text-light/60">Vous savez ce que vous payez et ce que vous recevez avant que je commence.</p>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-light/10 bg-light/10 lg:grid-cols-1">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col bg-dark p-10 transition-colors duration-300 hover:bg-light hover:text-dark sm:p-7"
          >
            <span className="font-mono text-xs opacity-40">0{index + 1}</span>
            <h3 className="mt-8 text-3xl font-normal">{offer.title}</h3>
            <p className="mt-2 text-xl font-light opacity-70">{offer.price}</p>
            <p className="mt-6 font-light opacity-80">{offer.description}</p>
            <ul className="mb-10 mt-6 flex-grow space-y-2 text-sm font-light opacity-70">
              {offer.items.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
            <a
              href={bookingHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start border-b border-current pb-0.5 text-sm font-medium"
            >
              En parler →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
