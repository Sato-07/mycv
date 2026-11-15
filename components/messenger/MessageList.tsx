import React from 'react';
import Image from 'next/image';
import FotoProfil from '@/public/hb7_sport.png';
import { Message } from '@/types/type';
import { TypingAnimation } from './TypingAnimation';
import { useScrollToBottom } from '@/hook/useScrollToBotom';
import { ChatStatus } from '@/hook/useChat';

const GREETING =
  "Bonjour ! Je suis l'assistant IA d'Achraf. Dites-moi ce qui vous fait perdre du temps dans votre entreprise, ou demandez-moi ce qu'il a déjà livré, ses offres ou ses compétences.";

const BotAvatar = () => (
  <div className="shrink-0 rounded-full p-[2px] bg-ai-gradient">
    <Image src={FotoProfil} alt="" className="h-8 w-8 rounded-full bg-light object-cover object-top" />
  </div>
);

const BotBubble: React.FC<{ children: React.ReactNode; error?: boolean }> = ({ children, error }) => (
  <div className="flex items-start gap-3">
    <BotAvatar />
    <div
      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed ${
        error
          ? 'border border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300'
          : 'bg-dark text-light dark:bg-light dark:text-dark'
      }`}
    >
      {children}
    </div>
  </div>
);

type MessageListProps = {
  messages: Message[];
  status: ChatStatus;
};

export const MessageList: React.FC<MessageListProps> = ({ messages, status }) => {
  const { messageContainerRef } = useScrollToBottom(messages);

  return (
    <div ref={messageContainerRef} className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
      <BotBubble>{GREETING}</BotBubble>

      {messages.map((message) =>
        message.sender === 'user' ? (
          <div key={message.id} className="flex justify-end">
            <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-600 to-cyan-500 px-4 py-3 text-sm leading-relaxed text-white shadow-lg shadow-violet-500/20">
              {message.text}
            </div>
          </div>
        ) : (
          <BotBubble key={message.id} error={message.error}>
            {message.text}
            {message.streaming && (
              <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-current animate-blink" aria-hidden />
            )}
          </BotBubble>
        )
      )}

      {status === 'thinking' && (
        <BotBubble>
          <TypingAnimation />
        </BotBubble>
      )}
    </div>
  );
};
