import React from 'react';
import { motion } from 'framer-motion';

// Chaque mot qui arrive du streaming apparaît en sortant d'un léger flou : l'œil suit la lecture
// au lieu de voir le texte sauter par paquets. Les mots déjà affichés gardent leur clé et ne rejouent rien.
export const AnimatedWords: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\s+)/).map((part, index) =>
      !part || /^\s+$/.test(part) ? (
        <React.Fragment key={index}>{part}</React.Fragment>
      ) : (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {part}
        </motion.span>
      )
    )}
  </>
);
