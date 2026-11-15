import { ProjectProps } from '@/types/type';
import React from 'react';

export const Project: React.FC<ProjectProps> = ({ index, title, subtitle, show, setModal, url }) => {
  return (
    show ? (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="flex w-full justify-between items-center p-4 border-t border-gray-200 cursor-pointer transition-transform hover:opacity-50"
    >
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl font-normal transition-transform hover:-translate-x-2"
        >
          {title}
        </a>
      ) : (
        <span className="text-4xl font-normal transition-transform hover:-translate-x-2">{title}</span>
      )}
      <p className="font-light text-right transition-transform hover:translate-x-2">
        {subtitle}
      </p>
    </div>
    ) : null
  );
};
