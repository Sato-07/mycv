import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

interface ModalProps {
  modal: { active: boolean; index: number };
  projects: { src?: string; color: string; title: string; tag: string }[];
}

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export const Modal: React.FC<ModalProps> = ({ modal, projects }) => {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {

    let xMoveContainer = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.8,
      ease: 'power3',
    });
    let yMoveContainer = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.8,
      ease: 'power3',
    });

    let xMoveCursor = gsap.quickTo(cursor.current, 'left', {
      duration: 0.5,
      ease: 'power3',
    });
    let yMoveCursor = gsap.quickTo(cursor.current, 'top', {
      duration: 0.5,
      ease: 'power3',
    });

    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', {
      duration: 0.45,
      ease: 'power3',
    });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', {
      duration: 0.45,
      ease: 'power3',
    });

    window.addEventListener('mousemove', (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="h-96 w-96 absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center"
      >
        <div style={{ top: index * -100 + '%' }} className="h-full w-full absolute transition-top duration-500 cubic-bezier(0.76, 0, 0.24, 1)">
          {projects.map((project, index) => {
            const { src, color, title, tag } = project;
            return (
              <div style={{ backgroundColor: color }} key={`modal_${index}`} className="h-full w-full flex items-center justify-center">
                {src ? (
                  <Image src={`/images/${src}`} width={300} height={300} className='h-auto' alt={title} />
                ) : (
                  // Pas encore de capture : la carte affiche le nom du projet, dans le même cadre.
                  <div className="flex flex-col items-center justify-center text-center text-light px-8">
                    <span className="text-3xl font-medium">{title}</span>
                    <span className="font-light mt-2">{tag}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div ref={cursor} className="w-20 h-20 rounded-full bg-blue-500 text-white absolute z-10 flex items-center justify-center text-sm font-light pointer-events-none" variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'}></motion.div>
      <motion.div ref={cursorLabel} className="w-20 h-20 rounded-full bg-transparent absolute z-10 flex items-center justify-center text-sm font-light pointer-events-none" variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'}>Voir</motion.div>
    </>
  );
};

