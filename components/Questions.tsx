import React, { useState } from 'react';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';

const Questions = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button className='relative -left-5 -bottom-5 sm:-left-0 sm:-bottom-0'>
            {isOpen ? (
                <RxCross2 className='w-10 cursor-pointer h-10' onClick={handleClick} />
            ) : (
                <MdOutlineQuestionMark className='w-10 cursor-pointer h-10' onClick={handleClick} />
            )}
            {isOpen ? (
                <motion.div
                    initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='flex flex-col h-[80%] w-[80%] sm:h-[90%] z-50  justify-between items-center text-light font-montserrat fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 dark:bg-light/75 dark:text-dark rounded-lg backdrop-blur-md py-40'
                >
                    <div className='relative  flex flex-col font-mont h-full w-4/5  sm:w-5/6 -top-28  sm:-top-36 bottom-auto'>

                        <h1 className='text-4xl sm:text-lg font-bold dark:text-dark'>
                            Y a-t-il d'autres mystères que vous souhaitez éclaircir ?
                        </h1>
                        <p className='text-lg sm:text-base font-bold sm:pt-2 sm:pb-0 pt-16 pb-5'>
                            Voici d'autres exemples de question  :
                        </p>
                        <ul className='font-light mb-4 sm:mb-0'>
                            <li className='text-lg sm:text-sm sm:mb-0 mb-2'>I'd like to change the text color to blue and the background to green, please.</li>
                            <li className='text-lg sm:hidden mb-2'>Let's update the description to highlight your strengths and skills.</li>
                            <li className='text-lg sm:text-sm sm:mb-0 mb-2'>How do you see your academic background contributing to your success in the field of deep learning and AI?</li>
                        </ul>
                            <p className='text-xl flex justify-center sm:text-base font-bold text-red-600 pb-7 pt-9 sm:pt-2 sm:pb-2'>
                                ⚠️ Si vous rencontrez un problème, suivez ces étapes :
                            </p>
                            <ul className='font-light  flex justify-center  sm:text-sm sm:mb-0 mb-0'>
                                <li >
                                    Si les réponses de l'IA semblent incorrectes ou si les éléments ne s'affichent pas correctement, je vous encourage à répéter votre question.
                                    Cependant, si le problème persiste, je vous recommande de rafraîchir la page. L'historique de conversation peut parfois affecter la manière 
                                    dont les informations sont affichées, et en rafraîchissant la page, vous pourrez résoudre ce problème.
                                </li>
                            </ul>
                    </div>
                </motion.div>
            ) : null}
        </button>
    );
};

export default Questions;
