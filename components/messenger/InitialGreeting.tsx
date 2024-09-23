import Image from 'next/image';
import FotoProfil from '@/public/hb7_sport.png';

export const InitialGreeting: React.FC = () => {
  return (
    <div className="flex items-center mb-2 p-3 text-left pt-24 ">
      <Image
        src={FotoProfil}
        alt="Profile image"
        className="rounded-full w-14 -mt-8 mr-2"
      />
      <span className=" p-2 rounded-lg bg-dark dark-bg-light text-light dark-text-dark">
        Hi! Welcome to my portfolio. I'm Achraf AI, your friendly AI here to help you explore my world.
        Feel free to ask me questions about my skills, projects, or academic journey.
        We can even customize the site to your liking. Interested?
      </span>
    </div>
  );
};

