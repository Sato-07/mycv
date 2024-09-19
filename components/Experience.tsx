import React, { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

interface DetailsProps {
  position?: string;
  company: string;
  companyLink?: string;
  time: string;
  address: string;
  work: string;
}

const Details: React.FC<DetailsProps> = ({ position, company, companyLink, time, address, work }) => {

  return (
    <li  className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between'>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className='capitalize font-medium text-2xl'>
          {position}&nbsp;<a target="_blank" className='text-primary capitalize' href={companyLink}>@{company}</a>
        </h3>
        <span className='capitalize font-medium text-dark/75'>
          {time} | {address}
        </span>
        <p className='font-medium w-full'>
          {work}
        </p>
      </motion.div>
    </li>
  );
}

// Interface pour typer les props de Experience
type ExperienceProps = {
    show: boolean;
  };

const Experience: React.FC<ExperienceProps> = ({ show }) => {

  return (
    show ? (

    <div className=' flex flex-col justify-center items-center'>
      <h2 className='font-medium text-8xl justify-center flex items-center flex-col mb-20 text-center w-full'>
        Education
      </h2>
      <div>
        <div  className={`w-[100%] h-full relative `}>
          <ul className='w-full flex flex-col items-center justify-between'>
            <Details
              position='Machine learning' company="Coursera"
              companyLink="https://www.coursera.org/"
              time="2020-Present" address="Belgium"
              work="Je suis honoré de détenir la certification du cours 'Supervised Machine Learning: Regression and Classification'
              de l'Université Stanford sur Coursera, dirigé par le renommé professeur Andrew Ng. Cette formation a renforcé ma
              compréhension des concepts fondamentaux du machine learning, en me permettant d'acquérir des compétences avancées en matière
              de régression et de classification."
            />
            <Details
              position='Machine learning' company="Coursera"
              companyLink="www.google.com"
              time="2020-Present" address="Belgium"
              work="Je suis honoré de détenir la certification du cours  'Advanced Learning Algorithms' de l'Université Stanford sur Coursera,
              dirigé par le renommé professeur Andrew Ng. Cette formation m'a permis d'approfondir ma compréhension
              des algorithmes d'apprentissage avancés, en me dotant de compétences essentielles pour la résolution de problèmes complexes
              en intelligence artificielle et en data science."
            />
            <Details
              position='Machine learning' company="Coursera"
              companyLink="www.google.com"
              time="2020-Present" address="Belgium"
              work="Je suis honoré de détenir la certification du cours 'Unsupervised Learning, Recommenders, Reinforcement Learning'
              de l'Université Stanford sur Coursera, dirigé par le renommé professeur Andrew Ng.
              Cette formation m'a permis d'approfondir ma compréhension des domaines essentiels tels que l'apprentissage non supervisé,
              les systèmes de recommandation et l'apprentissage par renforcement."
            />
            <Details
              position='Etudiant' company="ISIPS"
              time="2020-Present" address="Belgium"
              work="Je suis actuellement en 3ème année de bachelier en informatique et systèmes,
              avec pour seul obstacle restant la réalisation de mon travail de fin d'études (TFE).
              Mon parcours académique m'a permis d'acquérir des compétences solides en informatique
              et de me préparer pour une carrière prometteuse dans ce domaine."
            />
            {/* Ajoutez d'autres Details avec des données différentes si nécessaire */}
          </ul>
        </div>
      </div>
    </div>
    ) : null

  );
}

export default Experience;
