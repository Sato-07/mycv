import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Bouton qui suit le visiteur dans la page : l'IA reste à un clic, même en bas des offres.
export const FloatingAsk: React.FC<{ visible: boolean; onClick: () => void }> = ({ visible, onClick }) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-ai-gradient px-5 py-3 font-medium text-white shadow-xl shadow-violet-500/30 transition hover:scale-105 sm:bottom-4 sm:right-4"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Demander à l'IA
      </motion.button>
    )}
  </AnimatePresence>
);
