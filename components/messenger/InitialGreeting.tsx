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
        Bonjour ! Je suis l'assistant IA d'Achraf. Dites-moi ce qui vous fait perdre du temps dans votre entreprise,
        ou demandez-moi ce qu'il a déjà livré, ses offres ou ses compétences.
      </span>
    </div>
  );
};

