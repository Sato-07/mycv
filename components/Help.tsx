import React, { useState } from 'react';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';

 export const Questions = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative sm:hidden'>
            <button className='z-50' onClick={handleClick}>
                {isOpen ? (
                    <RxCross2 className='w-10 cursor-pointer h-10' />
                ) : (
                    <MdOutlineQuestionMark className='w-10 cursor-pointer h-10' />
                )}
            </button>

            {isOpen && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='flex flex-col h-[80%] w-[80%] sm:h-[90%] z-50 justify-between items-center text-light font-montserrat fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 dark:bg-light/75 dark:text-dark rounded-lg backdrop-blur-md py-40'
                >
                    <div className='relative flex flex-col font-mont h-full w-4/5 sm:w-5/6 -top-28 sm:-top-36 bottom-auto'>
                        <h1 className='text-4xl sm:text-lg font-bold dark:text-dark'>
                            Que demander à l'assistant ?
                        </h1>
                        <p className='text-lg sm:text-base font-bold sm:pt-2 sm:pb-0 pt-16 pb-5'>
                            D'autres exemples de questions :
                        </p>
                        <ul className='font-light mb-4 sm:mb-0'>
                            <li className='text-lg sm:text-sm mb-2'>Je tiens un commerce : qu'est-ce que tu pourrais automatiser chez moi ?</li>
                            <li className='text-lg sm:hidden mb-2'>Comment fonctionne ton radar de prospection ?</li>
                            <li className='text-lg sm:text-sm mb-2'>Passe le texte en bleu et le fond en vert, s'il te plaît.</li>
                        </ul>

                        <p className='text-xl flex justify-center sm:text-base font-bold text-red-600 pb-7 pt-9 sm:pt-2 sm:pb-2'>
                            ⚠️ Si quelque chose ne va pas :
                        </p>
                        <ul className='font-light flex justify-center sm:text-sm mb-0'>
                            <li>
                                Si une réponse semble fausse ou si la page ne s'affiche pas bien, reformulez votre question. Si le souci persiste,
                                rechargez la page : l'historique de la conversation influence parfois l'affichage. Et pour une vraie question,
                                le plus simple reste de m'écrire directement.
                            </li>
                        </ul>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

