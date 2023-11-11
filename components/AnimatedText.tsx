import React from 'react';
import { motion } from "framer-motion";
import { type } from 'os';

const quote = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren:0.08,
        }
    }
};

const singleWord = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        }
    }
};

type AnimatedTextProps = {
    text: string,
    className?: string,
    show?: Boolean, 
}

const AnimatedText:React.FC<AnimatedTextProps> = ({ show=true, text, className = '' }) => {
    return (
        show ? (
        <div className='w-full m-auto py-2 flex items-center justify-center text-center overflow-hidden sm:py-0'>
            <motion.h1 className={`inline-block w-full font-bold   ${className}`} variants={quote} initial="initial" animate="animate">
                {
                    text.split(" ").map((word: string, index: number) =>
                        <motion.span variants={singleWord} initial="initial" animate="animate" key={word+'-'+index} className='inline-block'>
                            {word}&nbsp;
                        </motion.span>
                    )}
            </motion.h1>
        </div>
        ) : null
    );
};

export default AnimatedText;
