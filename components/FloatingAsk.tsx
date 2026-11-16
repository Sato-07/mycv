import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import FotoProfil from '@/public/hb7_sport.png';

// Suit le visiteur dans la page : un clic le ramène face à l'avatar, prêt à écrire.
export const FloatingAsk: React.FC<{ visible: boolean; onClick: () => void }> = ({ visible, onClick }) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full bg-light py-1.5 pl-1.5 pr-5 text-sm font-medium text-dark shadow-2xl transition hover:scale-105 sm:bottom-4 sm:right-4"
      >
        <span className="relative">
          <Image src={FotoProfil} alt="" className="h-9 w-9 rounded-full bg-dark object-cover object-top" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-light bg-emerald-500" />
        </span>
        Parler à Achraf
      </motion.button>
    )}
  </AnimatePresence>
);
