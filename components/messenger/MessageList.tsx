import React from 'react';
import Image from 'next/image';
import FotoProfil from '@/public/hb7_sport.png';
import { Message } from '@/types/type';
import {TypingAnimation} from './TypingAnimation';
import { useScrollToBottom } from '@/hook/useScrollToBotom';

type MessageListProps = {
  allMessages: Message[];
  isLoading: boolean;
};

export const MessageList: React.FC<MessageListProps> = ({ allMessages, isLoading }) => {
  const { messageContainerRef } = useScrollToBottom(allMessages);

  return (
    <div ref={messageContainerRef} className="flex-grow overflow-auto">
      <div className="flex items-center mb-2 p-3">
        <Image
          src={FotoProfil}
          alt="Achraf"

          className="rounded-full w-14 -mt-8 mr-2"
        />
        <span className="inline-block p-2 rounded-lg bg-dark dark:bg-light text-light dark:text-dark">
          Bonjour ! Je suis l'assistant IA d'Achraf. Dites-moi ce qui vous fait perdre du temps dans votre entreprise,
          ou demandez-moi ce qu'il a déjà livré, ses offres ou ses compétences.
          Je peux aussi changer les couleurs du site si vous voulez.
        </span>
      </div>

      {allMessages.map((message, index) => (
        <div key={index} className={`mb-2 p-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
          {message.sender === 'user' ? (
            <div className="flex items-center mb-2 justify-end">
              <span className="inline-block p-2 rounded-lg bg-gray-200 text-dark dark:bg-neutral-700 dark:text-light">
                {message.text}
              </span>
            </div>
          ) : (
            <div className="flex items-center mb-2">
              <Image
                src={FotoProfil}
                alt="Assistant IA"
                className="rounded-full w-14 -mt-8 mr-2"
              />
              <span className="inline-block p-2 rounded-lg bg-dark dark:bg-light text-light dark:text-dark">
                {message.text}
              </span>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <span className="inline-block p-2 rounded-lg bg-dark">
          <TypingAnimation />
        </span>
      )}
    </div>
  );
};

