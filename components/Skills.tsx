import React from 'react';
import { motion } from 'framer-motion';

type SkillProps = {
  name: string;
  x: string;
  y: string;
};

const Skill: React.FC<SkillProps> = ({ name, x, y }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.5 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y }}
      transition={{ duration: 1.5 }}
      className="flex items-center justify-center rounded-full font-semibold
      bg-black dark:bg-light text-light dark:text-dark p-3 px-4 shadow-dark cursor-pointer absolute
       md:text-sm  md:py-1.5 md:px-3 lg:py-2 lg:px-4 xs:bg-transparent "
    >
      {name}
    </motion.div>
  );
};

type CompetencesProps = {
  skills: SkillProps[];
  show: boolean;
};

export const Skills: React.FC<CompetencesProps> = ({ skills, show }) => {
  return (
    show ? (
    <div className='relative h-full w-11/12 overflow-hidden'>
      <h2 className="font-medium  text-6xl text-center md:text-8xl mb-5 ">Skills</h2>
      <div className="w-full h-[80%] relative flex items-center justify-center rounded-full dark:bg-circularDark bg-circularLight">
        <motion.div whileHover={{ scale: 1.5 }} className="flex items-center justify-center rounded-full font-semibold bg-black dark:bg-light text-light dark:text-dark p-8 shadow-dark md:shadow-black cursor-pointer lg:p-6 md:p-4">
          Web
        </motion.div>
        {skills.map((skill, index) => (
          <Skill key={index} name={skill.name} x={skill.x} y={skill.y} />
        ))}
      </div>
    </div>
    ) : null 
  );
};

