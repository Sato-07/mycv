import React, { useState } from 'react';
import { Logo } from './ui/Logo';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedInIcon } from './ui/Icon';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { Link as ScrollLink } from 'react-scroll';
import { useThemeSwitcher } from '@/hook/useThemeSwitcher';
import { CustomLinkProps, OpenAIResponse } from '@/types/type';

const CustomLink: React.FC<CustomLinkProps> = ({ href, title, className = '', onClick }) => {
    const router = useRouter();

    return (
        <ScrollLink
            to={href.replace(/^#/, '')}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={`cursor-pointer ${className} --font-mont relative group`}
            onClick={onClick}
        >
            {title}
            <span
                className={`h-[1px] inline-block w-0 bg-dark dark:bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300
                ${router.asPath === href ? 'w-full' : 'w-0'}
                dark:bg-light`}
            >
                &nbsp;
            </span>
        </ScrollLink>
    );
};

const CustomMobileLink: React.FC<CustomLinkProps> = ({ href, title, className = '', onClick }) => {
    return (
        <ScrollLink
            to={href.replace(/^#/, '')}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={`${className} relative group text-light dark:text-dark my-2`}
            onClick={onClick}
        >
            {title}
            <span 
                className={`h-[1px] inline-block w-0 bg-light text-light dark:bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300`}>
                &nbsp;
            </span>
        </ScrollLink>
    );
};

interface NavBarProps {
    onSendMessage: (message: Partial<OpenAIResponse>) => void; 
}

export const NavBar: React.FC<NavBarProps> = ({ onSendMessage }) => {
    const [mode, setMode] = useThemeSwitcher() as [string, (mode: string) => void];
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleAboutClick = () => {
        onSendMessage({ text: 'What are your top skills?', subjects: ['SKILLS'] });
        setIsMenuOpen(false);
    };
  
    const handleProjectsClick = () => {
        onSendMessage({ text: 'Can you tell me about one of your projects?', subjects: ['PROJECT'] });
        setIsMenuOpen(false);
    };

    return (
        <header className='w-full z-50 relative px-32 md:p-12 lg:p-14 py-8 font-large flex items-center justify-between dark:text-light'>
            <button 
                className='lg:flex flex-col py-2 md:right-auto md:flex md:left-0 md:top-0 md:bottom-auto hidden' 
                onClick={toggleMenu} 
                aria-expanded={isMenuOpen}
            >
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>
            <div className='w-full flex justify-between items-center lg:hidden'>
                <nav>
                    <CustomLink href="/" title="Home" className='mr-3' />
                    <CustomLink onClick={handleAboutClick} href="#about" title="About" className='mr-3' />
                    <CustomLink onClick={handleProjectsClick} href="#projects" title="Projects" className='mr-3' /> 
                </nav>
                <nav className='flex items-center justify-center flex-wrap'>
                    <motion.a href="https://www.linkedin.com/" target="_blank" className='w-6 mr-4' whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
                        <LinkedInIcon />
                    </motion.a>
                    <motion.a href="https://github.com/Sato-07" target="_blank" className='w-6 mr-4' whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
                        <GithubIcon />
                    </motion.a>
                    <motion.a onClick={() => setMode(mode === "light" ? "dark" : "light")} className='w-6 mr-4 cursor-pointer' whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
                        {mode === "dark" ? <BsSunFill className={"fill-light w-6 h-6"} /> : <BsFillMoonStarsFill className={"fill-dark"} />}
                    </motion.a>
                </nav>
            </div>

            {isMenuOpen && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='w-full h-full flex flex-col justify-center items-center fixed top-0 left-0 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md'
                >
                    <button onClick={toggleMenu} className="absolute top-4 left-4 text-2xl text-light dark:text-dark">
                        &#10005; 
                    </button>
                    <nav className='flex items-center flex-col mb-2 justify-center'>
                        <CustomMobileLink onClick={handleAboutClick} href="#about" title="About" />
                        <CustomMobileLink onClick={handleProjectsClick} href="#projects" title="Projects" />
                    </nav>
                    <nav className='flex items-center justify-center flex-wrap'>
                        <motion.a href="https://www.linkedin.com/" target="_blank" className='w-6 mr-4' whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
                            <LinkedInIcon />
                        </motion.a>
                        <motion.a href="https://github.com/Sato-07" target="_blank" className='w-6 mr-4' whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
                            <GithubIcon />
                        </motion.a>
                        <motion.a onClick={() => setMode(mode === "light" ? "dark" : "light")} className='w-6 mr-4 cursor-pointer' whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
                            {mode === "dark" ? <BsSunFill className={"fill-light w-6 h-6"} /> : <BsFillMoonStarsFill className={"fill-light"} />}
                        </motion.a>
                    </nav>
                </motion.div>
            )}
            <div className='absolute left-[50%] sm:left-[47%] lg:top-8 md:top-6 top-2 translate-x-[-50%]'>
                <Logo />
            </div>
        </header>
    );
};
