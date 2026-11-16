import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Ouverture : écran noir, une ligne de lumière se trace au centre, puis deux volets s'écartent
// comme un œil qui s'ouvre sur la scène. Retiré du DOM une fois fini (aucun coût ensuite).
export const CinemaOpening: React.FC = () => {
  const [done, setDone] = useState(false);
  const ease = [0.76, 0, 0.24, 1] as const;
  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="opening" aria-hidden className="pointer-events-none fixed inset-0 z-50" exit={{ opacity: 0 }}>
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-dark"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ delay: 0.9, duration: 1.3, ease }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-dark"
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ delay: 0.9, duration: 1.3, ease }}
            onAnimationComplete={() => setDone(true)}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 bg-light shadow-[0_0_24px_4px_rgba(245,245,245,0.55)]"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.5, 1], ease: 'easeInOut' }}
          />
          <motion.p
            className="absolute left-1/2 top-1/2 mt-6 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-light/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.3, times: [0, 0.4, 1] }}
          >
            Connexion au double
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
