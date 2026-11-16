import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedWords } from './AnimatedWords';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';

type ChatThreadProps = { messages: Message[]; status: ChatStatus };

// Le fil de la conversation, ancré en bas : la dernière réponse est en grand, les précédentes
// rapetissent et s'estompent pour rester lisibles sans voler la place.
export const ChatThread: React.FC<ChatThreadProps> = ({ messages, status }) => {
  const scroller = useRef<HTMLDivElement>(null);
  const last = messages[messages.length - 1];
  const lastBotId = [...messages].reverse().find((m) => m.sender === 'server')?.id;

  // Suit la fin du texte pendant le streaming et à chaque nouvelle question.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages.length, last?.text, status]);

  return (
    <div
      ref={scroller}
      className="mt-3 min-h-0 flex-1 overflow-y-auto pr-3 [mask-image:linear-gradient(to_bottom,transparent,black_22%)] [scrollbar-width:none]"
    >
      <div className="flex min-h-full flex-col justify-end gap-6 pb-2 pt-16">
        {messages.map((message) =>
          message.sender === 'user' ? (
            <motion.p
              key={message.id}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="max-w-[85%] origin-bottom-right self-end rounded-2xl rounded-br-md border border-light/10 bg-light/[0.06] px-4 py-2.5 text-[15px] leading-snug text-light/80"
            >
              {message.text}
            </motion.p>
          ) : (
            <p
              key={message.id}
              className={`font-light leading-snug transition-all duration-700 ${
                message.error
                  ? 'text-lg text-red-300'
                  : message.id === lastBotId
                    ? 'text-[1.6rem] text-light xl:text-[1.35rem]'
                    : 'text-base text-light/35'
              }`}
            >
              {message.error ? message.text : <AnimatedWords text={message.text} />}
              {message.streaming && <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-light animate-blink" aria-hidden />}
            </p>
          )
        )}
        {status === 'thinking' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="animate-shimmer bg-[linear-gradient(90deg,rgba(245,245,245,0.25)_0%,rgba(245,245,245,0.95)_50%,rgba(245,245,245,0.25)_100%)] bg-[length:200%_100%] bg-clip-text font-mono text-xs uppercase tracking-[0.22em] text-transparent"
          >
            Achraf réfléchit…
          </motion.p>
        )}
      </div>
    </div>
  );
};
