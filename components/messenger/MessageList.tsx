import React from 'react';
import Image from 'next/image';
import FotoProfil from '@/public/hb7_sport.png';
import { Message } from '@/types/type';
import { useScrollToBottom } from '@/hook/useScrollToBotom';
import TypingAnimation from './TypingAnimation';

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
};

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
    const { messageContainerRef } = useScrollToBottom(messages);

    return (
    <div ref={messageContainerRef}  className="flex-grow overflow-auto">
            <div className="flex items-center mb-2 p-3">
        <Image
          src={FotoProfil}
          alt="Profile image"
          className="rounded-full w-14 -mt-8 mr-2"
        />
        <span className="inline-block p-2 rounded-lg bg-dark dark:bg-light text-light dark:text-dark">
          Hi! Welcome to my portfolio. I'm Achraf AI, your friendly AI here to help you explore my world.
          Feel free to ask me questions about my skills, projects, or academic journey.
          We can even customize the site to your liking. Interested?
        </span>
      </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
        >
          {message.sender === 'user' && (
            <div className="flex items-center mb-2 justify-end">
              <span className="inline-block p-2 rounded-lg bg-gray-200 text-dark dark:bg-neutral-700 dark:text-light">
                {message.text}
              </span>
            </div>
          )}
          {message.sender === 'server' && (
            <div className="flex items-center mb-2">
              <Image
                src={FotoProfil}
                alt="server profile"
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

export default MessageList;
