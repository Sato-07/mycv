import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { Logo } from './ui/Logo';
import { GithubIcon, LinkedInIcon } from './ui/Icon';
import { GITHUB_URL, LINKEDIN_URL } from '@/data/profile';

const LINKS = [
  { href: '#realisations', label: 'Réalisations' },
  { href: '#offres', label: 'Offres' },
  { href: '#contact', label: 'Contact' },
];

type NavBarProps = {
  mode: string;
  setMode: (mode: string) => void;
  onTalk: () => void;
};

const NavLink: React.FC<{ href: string; label: string; onClick?: () => void; className?: string }> = ({
  href,
  label,
  onClick,
  className = '',
}) => (
  <a href={href} onClick={onClick} className={`group relative ${className}`}>
    {label}
    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-[width] duration-300 group-hover:w-full" />
  </a>
);

export const NavBar: React.FC<NavBarProps> = ({ mode, setMode, onTalk }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleTheme = () => setMode(mode === 'dark' ? 'light' : 'dark');

  const icons = (
    <div className="flex items-center gap-4">
      <motion.a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-6" whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
        <LinkedInIcon />
      </motion.a>
      <motion.a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-6" whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
        <GithubIcon />
      </motion.a>
      <motion.button type="button" onClick={toggleTheme} aria-label="Changer de thème" className="w-6" whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
        {mode === 'dark' ? <BsSunFill className="h-6 w-6 fill-light" /> : <BsFillMoonStarsFill className="h-5 w-5" />}
      </motion.button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-transparent bg-light/70 px-32 py-5 backdrop-blur-xl dark:bg-dark/70 xl:px-16 lg:px-6">
      <nav className="flex items-center gap-6 lg:hidden">
        {LINKS.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
        <button
          type="button"
          onClick={onTalk}
          className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 px-3 py-1 text-sm transition hover:bg-violet-500/10"
        >
          <span className="text-ai font-mono">✦</span> Assistant IA
        </button>
      </nav>

      <button
        type="button"
        className="hidden flex-col lg:flex"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Menu"
      >
        <span className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 dark:bg-light ${isMenuOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'}`} />
        <span className={`my-0.5 block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 dark:bg-light ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 dark:bg-light ${isMenuOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'}`} />
      </button>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo />
      </div>

      <div className="lg:hidden">{icons}</div>
      <div className="hidden lg:block">
        <motion.button type="button" onClick={toggleTheme} aria-label="Changer de thème" className="w-6" whileTap={{ scale: 0.9 }}>
          {mode === 'dark' ? <BsSunFill className="h-6 w-6 fill-light" /> : <BsFillMoonStarsFill className="h-5 w-5" />}
        </motion.button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-dark/95 text-xl text-light backdrop-blur-md dark:bg-light/95 dark:text-dark"
        >
          <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Fermer" className="absolute left-5 top-5 text-2xl">
            ✕
          </button>
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} onClick={() => setIsMenuOpen(false)} />
          ))}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onTalk();
            }}
            className="rounded-full bg-ai-gradient px-5 py-2 text-white"
          >
            ✦ Parler à mon IA
          </button>
          <div className="mt-4">{icons}</div>
        </motion.div>
      )}
    </header>
  );
};
