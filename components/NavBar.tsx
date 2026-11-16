import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './ui/Logo';
import { GithubIcon, LinkedInIcon } from './ui/Icon';
import { GITHUB_URL, LINKEDIN_URL } from '@/data/profile';

const LINKS = [
  { href: '#realisations', label: 'Réalisations' },
  { href: '#offres', label: 'Offres' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact', label: 'Contact' },
];

const NavLink: React.FC<{ href: string; label: string; onClick?: () => void }> = ({ href, label, onClick }) => (
  <a href={href} onClick={onClick} className="group relative">
    {label}
    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-[width] duration-300 group-hover:w-full" />
  </a>
);

export const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socials = (
    <div className="flex items-center gap-4">
      <motion.a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-5 grayscale" whileHover={{ y: -2 }}>
        <LinkedInIcon />
      </motion.a>
      <motion.a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-5" whileHover={{ y: -2 }}>
        <GithubIcon />
      </motion.a>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-dark via-dark/80 to-transparent px-12 py-5 text-sm xl:px-8 lg:px-6">
      <nav className="flex items-center gap-7 lg:hidden">
        {LINKS.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </nav>
      <button
        type="button"
        className="hidden flex-col lg:flex"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Menu"
      >
        <span className="block h-0.5 w-6 -translate-y-0.5 rounded-sm bg-light" />
        <span className="my-0.5 block h-0.5 w-6 rounded-sm bg-light" />
        <span className="block h-0.5 w-6 translate-y-0.5 rounded-sm bg-light" />
      </button>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo />
      </div>

      <div className="lg:hidden">{socials}</div>
      <span className="hidden w-6 lg:block" />

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 bg-dark text-2xl"
        >
          <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Fermer" className="absolute left-6 top-5 text-2xl">
            ✕
          </button>
          {LINKS.map((link) => (
            <NavLink key={link.href} {...link} onClick={() => setIsMenuOpen(false)} />
          ))}
          <div className="mt-6">{socials}</div>
        </motion.div>
      )}
    </header>
  );
};
