import { motion, useScroll } from 'framer-motion';
import React from 'react';

interface LiIconProps {
  reference: any;
}

const LiIcon: React.FC<LiIconProps> = ({ reference }) => {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ["center end" as const, "center center" as const],
  });

  return (
    <figure className='absolute -left-[1rem] stroke-red-800'>
      <svg className='-rotate-90' width="75" height="75" viewBox='0 0 95 100'>
        <circle cx="75" cy="50" r="20" className='stroke-primary stroke-1 fill-none' />
        <motion.circle cx="75" cy="50" r="20" className='stroke-[5px] fill-light'
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <circle cx="75" cy="50" r="10" className='animate-pulse stroke-1 fill-primary' />
      </svg>
    </figure>
  );
};

export default LiIcon;

