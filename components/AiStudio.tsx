import React, { forwardRef } from 'react';
import { AiPanel } from '@/components/AiPanel';
import { Messenger } from '@/components/Messenger';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';

type AiStudioProps = {
  activeSection: string;
  messages: Message[];
  status: ChatStatus;
  onSend: (text: string) => void;
  setModal: (modal: { active: boolean; index: number }) => void;
};

const STATUS_LABEL: Record<ChatStatus, string> = {
  idle: 'en ligne',
  thinking: 'réfléchit…',
  streaming: 'écrit…',
};

export const AiStudio = forwardRef<HTMLInputElement, AiStudioProps>(
  ({ activeSection, messages, status, onSend, setModal }, inputRef) => {
    return (
      // Bordure en dégradé animé : la carte « respire » comme une interface d'IA.
      <div className="rounded-[28px] bg-gradient-to-r from-violet-500/60 via-cyan-400/40 to-fuchsia-500/60 bg-[length:200%_200%] p-px shadow-2xl shadow-violet-500/10 animate-gradient-x">
        <div className="overflow-hidden rounded-[27px] bg-light/90 backdrop-blur-xl dark:bg-dark/90">
          <div className="flex items-center justify-between border-b border-dark/10 px-5 py-3 dark:border-light/10">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-dark/50 dark:text-light/50 sm:hidden">achraf.ai — assistant</span>
            </div>
            <span className="flex items-center gap-2 font-mono text-xs text-dark/60 dark:text-light/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Claude · {STATUS_LABEL[status]}
            </span>
          </div>

          <div className="grid h-[640px] grid-cols-5 lg:h-[600px] lg:grid-cols-1 sm:h-[560px]">
            <div className="relative col-span-3 overflow-y-auto p-10 lg:hidden">
              <AiPanel activeSection={activeSection} onAsk={onSend} setModal={setModal} />
            </div>
            <div className="col-span-2 min-h-0 border-l border-dark/10 lg:col-span-1 lg:border-l-0 dark:border-light/10">
              <Messenger ref={inputRef} messages={messages} status={status} onSend={onSend} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AiStudio.displayName = 'AiStudio';
