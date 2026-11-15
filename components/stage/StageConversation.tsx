import React, { forwardRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';
import { MdArrowUpward } from 'react-icons/md';
import { VoiceBars } from './VoiceBars';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';
import { chatSuggestions } from '@/data/profile';
import { MAX_MESSAGE_LENGTH } from '@/utils/constant';

export const GREETING =
  "Salut, moi c'est Achraf. Enfin, mon double IA. Dites-moi ce qui vous fait perdre du temps dans votre entreprise, et je vous dis ce que je peux automatiser.";

const SUBJECT_LINKS: Record<string, { href: string; label: string }> = {
  PROJECT: { href: '#realisations', label: 'Voir mes réalisations' },
  OFFERS: { href: '#offres', label: 'Voir les offres et les prix' },
  SKILLS: { href: '#parcours', label: 'Voir mon parcours' },
};

type StageConversationProps = {
  messages: Message[];
  status: ChatStatus;
  speaking: boolean;
  muted: boolean;
  subject: string | null;
  analyserRef: MutableRefObject<AnalyserNode | null>;
  onSend: (text: string) => void;
  onListenGreeting: () => void;
  onToggleMute: () => void;
};

// Colonne droite : ce que dit l'avatar (sous-titres) en haut, la saisie du visiteur en bas.
export const StageConversation = forwardRef<HTMLInputElement, StageConversationProps>(
  ({ messages, status, speaking, muted, subject, analyserRef, onSend, onListenGreeting, onToggleMute }, inputRef) => {
    const [draft, setDraft] = useState('');
    const subtitles = useRef<HTMLDivElement>(null);

    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    const lastBot = [...messages].reverse().find((m) => m.sender === 'server');
    const busy = status !== 'idle';
    const statusLabel = status === 'thinking' ? 'réfléchit' : speaking || status === 'streaming' ? 'parle' : "à l'écoute";
    const link = !busy && subject ? SUBJECT_LINKS[subject] : undefined;
    const text = status === 'thinking' && !lastBot?.streaming ? null : lastBot?.text ?? GREETING;

    // Les sous-titres suivent la fin du texte pendant le streaming.
    useEffect(() => {
      if (subtitles.current) subtitles.current.scrollTop = subtitles.current.scrollHeight;
    }, [lastBot?.text]);

    const submit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!draft.trim() || busy) return;
      onSend(draft);
      setDraft('');
    };

    return (
      <div className="flex h-full min-h-0 flex-col lg:mx-auto lg:w-full lg:max-w-xl">
        <div className="flex items-center justify-between border-b border-light/10 pb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-light/55">
          <span className="flex items-center gap-3" aria-live="polite">
            <VoiceBars active={speaking} analyserRef={analyserRef} />
            Achraf · {statusLabel}
          </span>
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Activer le son' : 'Couper le son'}
            className="inline-flex items-center gap-2 transition hover:text-light"
          >
            {muted ? <BsVolumeMuteFill size={13} /> : <BsVolumeUpFill size={13} />}
            {muted ? 'Muet' : 'Son'}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-6">
          {lastUser && <p className="mb-4 line-clamp-2 font-mono text-xs leading-relaxed text-light/40">Vous — {lastUser.text}</p>}
          <div ref={subtitles} className="max-h-[34vh] overflow-y-auto pr-2 lg:max-h-[24vh]">
            <motion.p
              key={lastBot?.id ?? 'greeting'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[1.4rem] font-light leading-snug xl:text-xl ${lastBot?.error ? 'text-red-300' : ''}`}
            >
              {text ?? <span className="text-light/40">…</span>}
              {lastBot?.streaming && <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-light animate-blink" aria-hidden />}
            </motion.p>
          </div>
          <div className="mt-5 flex min-h-[24px] items-center gap-5 text-sm">
            {!lastBot && (
              <button type="button" onClick={onListenGreeting} className="group inline-flex items-center gap-2 text-light/70 transition hover:text-light">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-light/40 text-[9px] transition group-hover:border-light">▶</span>
                Écouter Achraf
              </button>
            )}
            {link && (
              <a href={link.href} className="group inline-flex items-center gap-2 border-b border-light/30 pb-0.5 text-light/80 transition hover:border-light hover:text-light">
                {link.label} <span className="transition group-hover:translate-y-0.5">↓</span>
              </a>
            )}
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="flex items-center gap-2 rounded-full border border-light/15 bg-light/[0.04] p-1.5 pl-5 backdrop-blur transition focus-within:border-light/50">
            <input
              ref={inputRef}
              id="avatar-input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Parlez-moi de votre activité…"
              aria-label="Votre question pour Achraf"
              className="min-w-0 flex-1 bg-transparent py-2 text-[15px] placeholder:text-light/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label="Envoyer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light text-dark transition hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
            >
              <MdArrowUpward size={20} />
            </button>
          </div>
        </form>
        <ul className="mt-4 space-y-1">
          {chatSuggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                disabled={busy}
                onClick={() => onSend(suggestion)}
                className="group flex w-full items-center justify-between py-1.5 text-left text-sm text-light/50 transition hover:text-light disabled:opacity-40"
              >
                {suggestion}
                <span className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

StageConversation.displayName = 'StageConversation';
