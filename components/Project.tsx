import React from 'react';

interface ProjectProps {
  index: number;
  title: string;
  src: string;
  show:Boolean;
  setModal: (modal: { active: boolean; index: number }) => void;
}

const Project: React.FC<ProjectProps> = ({ index, title, src,show, setModal }) => {
  return (
    show ? (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="flex w-full justify-between items-center p-4 border-t border-gray-200 cursor-pointer transition-transform hover:opacity-50"
    >
      <h2 className="text-4xl font-normal transition-transform hover:-translate-x-2">
        {title}
      </h2>
      <p className="font-light transition-transform hover:translate-x-2">
        Design & Development
      </p>
    </div>
    ) : null
  );
};

export default Project;
