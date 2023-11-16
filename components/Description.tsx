import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type DescriprionProps = {
  show?: boolean;
  title: string;
};

const Description: React.FC<DescriprionProps> = ({ show, title}) => {
  const [animatedTitle, setAnimatedTitle] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      if (title) {
        animateText(title, setAnimatedTitle);
      }
    }
  }, [inView, title]);

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
          className='flex justify-center font-normal items-center !text-4xl !text-left pt-4 pb-3'
        >
          {animatedTitle}
        </motion.div>

      </div>
    ) : null
  );
};

export default Description;

