import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AnimatedDescriptionProps } from '@/types/type';


export const AnimatedDescription: React.FC<AnimatedDescriptionProps> = ({ show, title, subtitle, paragraph, onAnimationComplete }) => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [animatedSubtitle, setAnimatedSubtitle] = useState('');
  const [currentStep, setCurrentStep] = useState(0); 
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const animateText = (text: string, setTextFunction: (text: string) => void, onComplete?: () => void) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTextFunction(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30);
  };

  useEffect(() => {
    if (inView && currentStep === 0) {
      animateText(title, setAnimatedTitle, () => setCurrentStep(1));
    }
    if (currentStep === 1 && subtitle) {
      animateText(subtitle, setAnimatedSubtitle, () => setCurrentStep(2));
    } else if (currentStep === 1 && !subtitle) {
      setCurrentStep(2); 
    }
    if (currentStep === 2 && paragraph) {
      onAnimationComplete?.();
    }
  }, [inView, currentStep, title, subtitle, paragraph, onAnimationComplete]);

  return (
    show ? (
      <div className='w-full'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1 }}
          className='w-full justify-start !text-4xl font-normal flex flex-col mb-2'
        >
          {animatedTitle}
        </motion.div>
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentStep >= 1 ? 1 : 0, y: currentStep >= 1 ? 0 : 20 }}
            transition={{ duration: 1 }}
            className='w-full mb-2'
          >
            {animatedSubtitle}
          </motion.div>
        )}
        {paragraph && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentStep >= 2 ? 1 : 0, y: currentStep >= 2 ? 0 : 20 }}
            transition={{ duration: 1 }}
            className='flex w-[90%] ml-3 py-10 items-center justify-center'
          >
            {paragraph}
          </motion.div>
        )}
      </div>
    ) : null
  );
};