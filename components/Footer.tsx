import React from 'react';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/data/profile';

export const Footer: React.FC = () => (
  <footer className="mt-10 flex items-center justify-between gap-4 border-t border-dark/10 px-10 py-8 font-mono text-xs text-dark/50 dark:border-light/10 dark:text-light/50 md:flex-col md:text-center sm:px-5">
    <span>© {new Date().getFullYear()} Achraf Baitar · site et assistant construits par moi, propulsés par Claude</span>
    <span className="flex gap-4">
      <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-violet-500">Mail</a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-violet-500">LinkedIn</a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-violet-500">GitHub</a>
    </span>
  </footer>
);
