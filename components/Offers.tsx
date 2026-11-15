import React from 'react';
import { motion } from 'framer-motion';
import { bookingHref, offers } from '@/data/profile';

type OffersProps = {
  // compact : version affichée dans le panneau piloté par le chatbot.
  compact?: boolean;
};

export const Offers: React.FC<OffersProps> = ({ compact = false }) => {
  return (
    <div className="w-full">
      <h2
        className={`font-medium text-center w-full ${
          compact ? 'text-6xl mb-10' : 'text-8xl lg:text-6xl sm:text-5xl mb-16 sm:mb-10'
        }`}
      >
        Offres
      </h2>
      <p className="text-center font-light mb-12 sm:mb-8">
        Un prix fixé avant de commencer : vous savez ce que vous payez et ce que vous recevez.
      </p>
      <div className={`grid gap-8 ${compact ? 'grid-cols-1' : 'grid-cols-3 lg:grid-cols-1'}`}>
        {offers.map((offer, index) => (
          <motion.div
            key={offer.title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
            className="flex flex-col rounded-3xl bg-dark dark:bg-light text-light dark:text-dark p-8 shadow-dark"
          >
            <h3 className="text-3xl font-normal">{offer.title}</h3>
            <p className="font-semibold mt-2">{offer.price}</p>
            <p className="font-light mt-4">{offer.description}</p>
            <ul className="font-light mt-4 mb-8 flex-grow">
              {offer.items.map((item) => (
                <li key={item} className="mb-1">
                  · {item}
                </li>
              ))}
            </ul>
            <a
              href={bookingHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start rounded-full border border-solid border-light dark:border-dark px-5 py-2 font-medium hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light transition-colors"
            >
              En parler
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
