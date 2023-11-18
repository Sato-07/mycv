import Link from 'next/link'
import React, { useState } from 'react'
import Logo from './Logo'
import { useRouter } from 'next/router'
import {motion} from "framer-motion"
import { GithubIcon, LinkedInIcon, TwitterIcon } from './Icon'
import { Montserrat } from 'next/font/google'
import {BsFillMoonStarsFill, BsSunFill} from 'react-icons/bs'
import useThemeSwitcher from './hook/useThemeSwitcher'
import { Link as ScrollLink } from 'react-scroll';

interface CustomLinkProps {
    href: string;
    title: string;
    className?: string;
  }
  

const montserrat = Montserrat({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
  

const CustomLink: React.FC<CustomLinkProps> = ({ href, title, className = '' }) => {
  const router = useRouter();

  return (
    <ScrollLink
      to={href.replace(/^#/, '')} // Remove the leading '#' character
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      className={`cursor-pointer ${className} ${montserrat.className} relative group`}
    >
      {title}
      <span
        className={`h-[1px] inline-block w-0 bg-dark dark:bg-light absolute left-0 -bottom-0.5  group-hover:w-full transition-[width] ease duration-300
        ${router.asPath === href ? 'w-full' : 'w-0'}
        dark:bg-light`}
      >
        &nbsp;
      </span>
    </ScrollLink>
  );
};

const CustomMobileLink: React.FC<CustomLinkProps> = ({ href, title, className = '' }) => {
  const router = useRouter();
  return(
    <a href={href} className={`${className} ${montserrat.className} relative group text-light dark:text-dark my-2`}>
      {title}
      <span 
      className={`h-[1px] inline-block w-0 bg-light text-light dark:bg-dark absolute left-0 -bottom-0.5  group-hover:w-full transition-[width] ease duration-300
      ${router.asPath === href ? 'w-full' : 'w-0'}`}>
        &nbsp;
      </span>
    </a>
  )
}



const NavBar = () => {
  const [mode,setMode] = useThemeSwitcher() as [string, (mode: string) => void];
  const [isOpen, setIsOpen ] = useState(false);

  const handleClick = () =>{
    setIsOpen(!isOpen)
  }
  
  return (
    <header
      className='w-full z-50 relative px-32 md:p-12 lg:p-14   py-8 font-large flex items-center justify-between dark:text-light'
    >
      <button className='lg:flex flex-col py-2 md:right-auto md:flex  md:left-0 md:top-0 md:bottom-auto hidden' onClick={handleClick}>
        <span className={` bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 ${isOpen ? 'rotate-45 translate-y-1':'-translate-y-0.5'}`} ></span>
        <span className={` bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} ></span>
        <span className={` bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 ${isOpen ? '-rotate-45 -translate-y-1':'translate-y-0.5'}`} ></span>
      </button>
      <div className='w-full flex justify-between items-center lg:hidden'>
        <nav>
          <CustomLink href="/" title="Home" className='mr-3'/>
          <CustomLink href="#about" title="About" className='mr-3'/>
          <CustomLink href="#about" title="Projects" className='mr-3'/>
        </nav>
        <nav className='flex items-center justify-center flex-wrap'>
          <motion.a href="https://www.linkedin.com/" target={"_blank"} className='w-6 mr-4' whileTap={{scale:0.9}} whileHover={{y:-2}}><LinkedInIcon/></motion.a>
          <motion.a href="https://github.com/Sato-07" target={"_blank"} className='w-6 mr-4' whileTap={{scale:0.9}} whileHover={{y:-2}}><GithubIcon/></motion.a>
          <motion.a onClick={() => setMode(mode ==="light" ? "dark" : "light")} target={"_blank"} className='w-6 mr-4 cursor-pointer' whileTap={{scale:0.9}} whileHover={{y:-2}}>
            {
              mode === "dark" ?
              <BsSunFill className={"fill-light w-6 h-6"}/>
              :
              <BsFillMoonStarsFill className={"fill-dark "}/>
            }
          </motion.a>
        
        </nav>
      </div>

      {
        isOpen ?
        <motion.div
        initial={{scale:0, opacity:0, x:"-50%", y:"-50%"}}
        animate={{scale:1, opacity:1}}
        className='min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-40'>
          <nav className='flex items-center flex-col mb-2 justify-center'>
            <CustomMobileLink href="/" title="Home" className='mr-3 '/>
            <CustomMobileLink href="#about" title="About" className='mr-3'/>
            <CustomMobileLink href="#about"title="Projects" className='mr-3'/>
          </nav>
          <nav className='flex items-center justify-center flex-wrap'>
            <motion.a href="https://www.linkedin.com/" target={"_blank"} className='w-6 mr-4' whileTap={{scale:0.9}} whileHover={{y:-2}}><LinkedInIcon/></motion.a>
            <motion.a href="https://github.com/Sato-07" target={"_blank"} className='w-6 mr-4 bg-light' whileTap={{scale:0.9}} whileHover={{y:-2}}><GithubIcon/></motion.a>
            <motion.a onClick={() => setMode(mode ==="light" ? "dark" : "light")} target={"_blank"} className='w-6 mr-4 cursor-pointer ' whileTap={{scale:0.9}} whileHover={{y:-2}}>
              {
                mode === "dark" ?
                <BsSunFill className={"fill-light w-6 h-6"}/>
                :
                <BsFillMoonStarsFill className={"fill-light "}/>
              }
            </motion.a>
          
          </nav>
        </motion.div>
        :null
      }

      <div className=' absolute left-[50%] sm:left-[47%] lg:top-8 md:top-6 top-2 translate-x-[-50%] '>
          <Logo/>
        </div>
    </header>
  )
  
}

export default NavBar