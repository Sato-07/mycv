import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CinemaScene } from './CinemaScene';
import { CinemaOpening } from './CinemaOpening';
import { FullChat } from '@/components/full/FullChat';
import { HeroTitle } from '@/components/full/HeroTitle';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';

type CinemaHeroProps = {
  messages: Message[];
  status: ChatStatus;
  subject: string | null;
  onSend: (text: string) => void;
  onReset: () => void;
  // Prévenu quand le titre est parti et que la conversation prend la colonne.
  onRoomyChange?: (roomy: boolean) => void;
};

// Mode cinéma : un plan 16:9 en plein écran (il se retourne, fait coucou, parle), la scène à droite ;
// le titre et le chat occupent la moitié gauche, vide et noire.
// Mobile : le plan recadré sur lui en haut, puis le titre et le chat.
// Dès la première question, le titre s'envole, la conversation prend la colonne et la caméra s'avance vers lui.
// Partagé par l'accueil et /avatar : une seule mise en scène à entretenir.
export const CinemaHero: React.FC<CinemaHeroProps> = ({ messages, status, subject, onSend, onReset, onRoomyChange }) => {
  const started = messages.length > 0;
  // La grille ne change qu'une fois le titre sorti : pendant son envol, il garde sa place.
  const [titleGone, setTitleGone] = useState(false);
  const [listenSignal, setListenSignal] = useState(0);
  const roomy = started && titleGone;

  useEffect(() => onRoomyChange?.(roomy), [roomy, onRoomyChange]);

  const restart = () => {
    setTitleGone(false);
    onReset();
  };

  return (
    <>
      <CinemaOpening />
      <section className="grain relative min-h-[max(100svh,640px)] overflow-hidden bg-dark lg:min-h-[100svh]">
        <CinemaScene
          speaking={status === 'streaming'}
          listenSignal={listenSignal}
          closeUp={roomy}
          className="absolute inset-0 lg:relative lg:inset-auto lg:h-[56svh] lg:min-h-[300px]"
        />

        <div className="relative z-[2] mx-auto flex h-[max(100svh,640px)] max-w-[1600px] px-12 xl:px-8 lg:-mt-24 lg:h-auto lg:px-6 lg:pb-8">
          <div className="flex w-[min(44vw,640px)] flex-col lg:w-full">
            <AnimatePresence onExitComplete={() => setTitleGone(true)}>
              {!started && (
                <div key="title" className="pt-[max(7rem,17vh)] lg:pt-0 lg:text-center">
                  <HeroTitle />
                </div>
              )}
            </AnimatePresence>

            <div className={`mt-auto pb-[6vh] lg:pb-0 ${roomy ? 'flex min-h-0 flex-1 flex-col pt-28 lg:h-[62svh] lg:flex-none lg:pt-10' : 'pt-8'}`}>
              <FullChat messages={messages} status={status} subject={subject} onSend={onSend} onReset={restart} onListen={() => setListenSignal((n) => n + 1)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
