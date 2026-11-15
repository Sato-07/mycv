import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MdArrowUpward } from 'react-icons/md';
import { GREETING } from '@/components/stage/StageConversation';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';
import { chatSuggestions } from '@/data/profile';
import { MAX_MESSAGE_LENGTH } from '@/utils/constant';

// Liens vers les sections de la page d'accueil, d'après le sujet de la dernière réponse.
const SUBJECT_LINKS: Record<string, { href: string; label: string }> = {
  PROJECT: { href: '/#realisations', label: 'Voir mes réalisations' },
  OFFERS: { href: '/#offres', label: 'Voir les offres et les prix' },
  SKILLS: { href: '/#parcours', label: 'Voir mon parcours' },
};

type FullChatProps = {
  messages: Message[];
  status: ChatStatus;
  subject: string | null;
  onSend: (text: string) => void;
};

// Le chat de la page pleine : la réponse s'affiche en grand, comme des sous-titres, au-dessus de la saisie.
export const FullChat: React.FC<FullChatProps> = ({ messages, status, subject, onSend }) => {
  const [draft, setDraft] = useState('');
  const subtitles = useRef<HTMLDivElement>(null);

  const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
  const lastBot = [...messages].reverse().find((m) => m.sender === 'server');
  const busy = status !== 'idle';
  const statusLabel = status === 'thinking' ? 'réfléchit' : status === 'streaming' ? 'répond' : "à l'écoute";
  const link = !busy && subject ? SUBJECT_LINKS[subject] : undefined;
  const text = status === 'thinking' && !lastBot?.streaming ? null : lastBot?.text ?? GREETING;

  // Les sous-titres suivent la fin du texte pendant qu'il s'écrit.
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
    <div className="w-full max-w-[560px] lg:mx-auto">
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-light/55" aria-live="polite">
        <span className={`h-1.5 w-1.5 rounded-full bg-light ${busy ? 'animate-pulse' : 'opacity-60'}`} aria-hidden />
        Achraf · {statusLabel}
      </p>
      {lastUser && <p className="mt-4 line-clamp-1 font-mono text-xs text-light/40">Vous — {lastUser.text}</p>}
      <div ref={subtitles} className="mt-4 max-h-[20vh] overflow-y-auto pr-2 lg:max-h-[20vh]">
        <motion.p
          key={lastBot?.id ?? 'greeting'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[1.35rem] font-light leading-snug xl:text-xl ${lastBot?.error ? 'text-red-300' : 'text-light/90'}`}
        >
          {text ?? <span className="text-light/40">…</span>}
          {lastBot?.streaming && <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-light animate-blink" aria-hidden />}
        </motion.p>
      </div>
      <div className="mt-3 min-h-[24px] text-sm">
        {link && (
          <a href={link.href} className="group inline-flex items-center gap-2 border-b border-light/30 pb-0.5 text-light/80 transition hover:border-light hover:text-light">
            {link.label} <span className="transition group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>

      <form onSubmit={submit} className="mt-4">
        <div className="flex items-center gap-2 rounded-full border border-light/15 bg-light/[0.04] p-1.5 pl-6 backdrop-blur transition focus-within:border-light/50">
          <input
            id="avatar-input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder="Parlez-moi de votre activité…"
            aria-label="Votre question pour Achraf"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-base placeholder:text-light/35 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label="Envoyer"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-light text-dark transition hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
          >
            <MdArrowUpward size={20} />
          </button>
        </div>
      </form>
      {/* Les suggestions servent à lancer la conversation : ensuite, elles prendraient la place de la réponse. */}
      {!lastUser && (
      <div className="mt-4 flex flex-wrap gap-2">
        {chatSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={busy}
            onClick={() => onSend(suggestion)}
            className="rounded-full border border-light/15 px-4 py-2 text-[13px] text-light/60 transition hover:border-light/50 hover:text-light disabled:opacity-40"
          >
            {suggestion}
          </button>
        ))}
      </div>
      )}
    </div>
  );
};
