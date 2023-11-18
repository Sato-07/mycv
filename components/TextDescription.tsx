import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type TextDescriptionProps = {
  show: boolean;
  title?: string;
  subtitle?: string;
  paragraph?: string;
  onAnimationComplete: () => void; // Ajoutez cette ligne

};

const TextDescription: React.FC<TextDescriptionProps> = ({ show, title, subtitle, paragraph,onAnimationComplete }) => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [animatedSubtitle, setAnimatedSubtitle] = useState('');
  const [animatedParagraph, setAnimatedParagraph] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      if (title) {
        animateText(title, setAnimatedTitle);
      }
      if (subtitle) {
        animateText(subtitle, setAnimatedSubtitle);
      }
      if (paragraph) {
        animateText(paragraph, setAnimatedParagraph);
      }

    }
  }, [inView, title, subtitle, paragraph]);
  useEffect(() => {
    if (animatedParagraph === paragraph) {
      onAnimationComplete();
    }
  }, [animatedParagraph, paragraph, onAnimationComplete]);

  const animateText = (text: string, setTextFunction: (text: string) => void) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTextFunction(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);


      }
    }, 30);

  };

  return (
    show ? (
      <div className='w-full '>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1 }}
          className='w-full justify-start font-bold text-4xl flex flex-col mb-2'
        >
          {animatedTitle}
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1 }}
          className='w-full font-semibold text-2xl mb-2'
        >
          {animatedSubtitle}
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1 }}
          className='flex w-full items-center justify-center'
        >
          {animatedParagraph}
        </motion.div>
      </div>
    ) : null
  );
};

export default TextDescription;
