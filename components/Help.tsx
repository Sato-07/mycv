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
                            Are there any other mysteries you'd like to clarify?
                        </h1>
                        <p className='text-lg sm:text-base font-bold sm:pt-2 sm:pb-0 pt-16 pb-5'>
                            Here are more sample questions:
                        </p>
                        <ul className='font-light mb-4 sm:mb-0'>
                            <li className='text-lg sm:text-sm mb-2'>I'd like to change the text color to blue and the background to green, please.</li>
                            <li className='text-lg sm:hidden mb-2'>Let's update the description to highlight your strengths and skills.</li>
                            <li className='text-lg sm:text-sm mb-2'>How do you see your academic background contributing to your success in the field of deep learning and AI?</li>
                        </ul>

                        <p className='text-xl flex justify-center sm:text-base font-bold text-red-600 pb-7 pt-9 sm:pt-2 sm:pb-2'>
                            ⚠️ If you encounter an issue, follow these steps:
                        </p>
                        <ul className='font-light flex justify-center sm:text-sm mb-0'>
                            <li>
                                If the AI's responses seem incorrect or if elements are not displaying properly, I encourage you to repeat your question. However, if the issue persists,
                                I recommend refreshing the page. The conversation history can sometimes affect how information is displayed, and by refreshing the page,
                                you may be able to resolve the issue.
                            </li>
                        </ul>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

