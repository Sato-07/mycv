import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


type HireMeProps = {
    show: boolean;
  };

const Description : React.FC<HireMeProps> = ({show}) => {
  const [text, setText] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true, // Pour déclencher l'animation une seule fois
    threshold: 0.5, // Réglez ceci en fonction de la visibilité souhaitée pour déclencher l'animation
  });

  useEffect(() => {
    if (inView) {
      const textToAnimate = "Découvrez mon portfolio d'une manière unique.";
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex <= textToAnimate.length) {
          setText(textToAnimate.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
  }, [inView]);

  return (
    show ? (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 1 }}
      className=' flex justify-center items-center !text-3xl !text-left pt-4 pb-2'
    >
      {text}
    </motion.div>
    ) : null
  );
};

export default Description;
