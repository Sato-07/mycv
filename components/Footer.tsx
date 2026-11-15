import React from 'react';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/data/profile';

export const Footer: React.FC = () => (
  <footer className="flex items-center justify-between gap-4 border-t border-light/10 px-10 py-8 font-mono text-xs text-light/40 md:flex-col md:text-center sm:px-5">
    <span>© {new Date().getFullYear()} Achraf Baitar · site et avatar construits par moi · réponses par Claude</span>
    <span className="flex gap-4">
      <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-light">Mail</a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-light">LinkedIn</a>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-light">GitHub</a>
    </span>
  </footer>
);
