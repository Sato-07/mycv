import { ProjectProps } from '@/types/type';
import Link from 'next/link';
import React from 'react';

const Project: React.FC<ProjectProps> = ({ index, title, src, show, setModal, url }) => {
  return (
    show ? (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="flex w-full justify-between items-center p-4 border-t border-gray-200 cursor-pointer transition-transform hover:opacity-50"
    >
      <a
        href={url}  // Lien externe
        target="_blank"  // Ouvre dans un nouvel onglet
        rel="noopener noreferrer"  // Sécurité pour les liens externes
        className="text-4xl font-normal transition-transform hover:-translate-x-2"
      >
        {title}
      </a>
      <p className="font-light transition-transform hover:translate-x-2">
        Design & Development
      </p>
    </div>
    ) : null
  );
};

export default Project;
