import React, { forwardRef, MutableRefObject } from 'react';
import { TalkingAvatar } from './TalkingAvatar';
import { StageIntro } from './StageIntro';
import { StageConversation } from './StageConversation';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';

export { GREETING } from './StageConversation';

type StageProps = {
  messages: Message[];
  status: ChatStatus;
  speaking: boolean;
  muted: boolean;
  subject: string | null;
  analyserRef: MutableRefObject<AnalyserNode | null>;
  onSend: (text: string) => void;
  onListenGreeting: () => void;
  waveSignal: number;
  onToggleMute: () => void;
};

// Hauteur de l'avatar : elle fixe aussi la hauteur des deux colonnes, qui s'alignent sur sa tête et ses pieds.
const AVATAR_HEIGHT = 'h-[min(74vh,820px)] xl:h-[min(66vh,720px)] lg:h-[46vh]';
const SIDE_HEIGHT = 'h-[min(74vh,820px)] xl:h-[min(66vh,720px)] lg:h-auto';

export const Stage = forwardRef<HTMLInputElement, StageProps>(({ waveSignal, ...conversation }, inputRef) => {
  const focusInput = () => document.getElementById('avatar-input')?.focus();

  return (
    <section id="top" className="grain relative overflow-hidden">
      {/* Pas de z-index sur la grille ni sur la colonne de l'avatar : il l'isolerait, et sa fusion « lighten » ne verrait plus la page.
          Les colonnes de texte ont un z-index pour passer devant le filigrane. */}
      <div className="relative mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-14 px-12 pb-10 pt-24 2xl:gap-x-10 xl:px-8 lg:grid-cols-1 lg:gap-y-8 lg:px-6 lg:pt-24">
        <div className={`relative z-[1] ${SIDE_HEIGHT} py-[4%] lg:py-0`}>
          <StageIntro onTalk={focusInput} />
        </div>
        <div className={`relative ${AVATAR_HEIGHT}`}>
          {/* Nom géant en filigrane, calé sur l'avatar : il passe toujours au niveau du visage, la tête se détache devant. */}
          <div
            aria-hidden
            className="text-outline pointer-events-none absolute left-1/2 top-[6%] w-screen -translate-x-1/2 select-none text-center text-[19vw] font-semibold leading-none tracking-tight"
          >
            ACHRAF
          </div>
          <TalkingAvatar
            speaking={conversation.speaking}
            thinking={conversation.status === 'thinking'}
            analyserRef={conversation.analyserRef}
            waveSignal={waveSignal}
          />
        </div>
        <div className={`relative z-[1] ${SIDE_HEIGHT} py-[4%] lg:py-0`}>
          <StageConversation ref={inputRef} {...conversation} />
        </div>
      </div>
    </section>
  );
});

Stage.displayName = 'Stage';
