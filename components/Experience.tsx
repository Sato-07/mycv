import React from 'react';
import { motion } from 'framer-motion';
import { DetailsProps } from '@/types/type';


const Details: React.FC<DetailsProps> = ({ position, company, companyLink, time, address, work }) => {

  return (
    <li  className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between'>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className='font-medium text-2xl'>
          {position}&nbsp;<a target="_blank" rel="noopener noreferrer" className='text-primary' href={companyLink}>@{company}</a>
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

type ExperienceProps = {
    show: boolean;
  };

 export const Experience: React.FC<ExperienceProps> = ({ show }) => {

  return (
    show ? (

    <div className=' flex flex-col justify-center items-center'>
      <h2 className='font-medium text-8xl justify-center flex items-center flex-col mb-20 text-center w-full'>
        Parcours
      </h2>
      <div>
        <div  className={`w-[100%] h-full relative `}>
          <ul className='w-full flex flex-col items-center justify-between'>
            <Details
              position='Développeur freelance' company="Indépendant"
              time="Aujourd'hui" address="Belgique"
              work="J'accompagne les PME qui veulent gagner du temps ou des clients : automatisations IA, outils de prospection
              et de veille, logiciels métier, sites web. Prix fixé avant de commencer, livraison par étapes."
            />
            <Details
              position='Cofondateur et développeur' company="Aionik"
              companyLink="https://aionik.app"
              time="Aujourd'hui" address="Belgique"
              work="Aionik est un logiciel de gestion pour les paysagistes : devis, facturation électronique Peppol, relevé d'heures,
              stock, agenda, application iOS et Android et assistant IA. Je le conçois, le développe et le vends."
            />
            <Details
              position='Bachelier en informatique et systèmes' company="ISIPS"
              time="2020" address="Belgique"
              work="Développement logiciel, réseaux, bases de données et systèmes."
            />
            <Details
              position='Machine learning, Université Stanford' company="Coursera"
              companyLink="https://www.coursera.org/"
              time="2020" address="En ligne"
              work="Trois certifications du cursus d'Andrew Ng : apprentissage supervisé (régression et classification),
              algorithmes avancés et réseaux de neurones, apprentissage non supervisé et systèmes de recommandation."
            />

          </ul>
        </div>
      </div>
    </div>
    ) : null

  );
}
