import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdArrowUpward } from 'react-icons/md';
import { GREETING } from '@/components/stage/StageConversation';
import { ChatThread } from './ChatThread';
import { AnimatedWords } from './AnimatedWords';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';
import { AVATAR_CLIPS, chatSuggestions } from '@/data/profile';
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
  onReset: () => void;
  onListen: () => void;
};

// Avant la première question : le message d'accueil et des suggestions.
// Ensuite : le fil complet de la conversation, qui prend la place libérée par le titre.
export const FullChat: React.FC<FullChatProps> = ({ messages, status, subject, onSend, onReset, onListen }) => {
  const [draft, setDraft] = useState('');
  const started = messages.length > 0;
  const busy = status !== 'idle';
  const statusLabel = status === 'thinking' ? 'réfléchit' : status === 'streaming' ? 'répond' : "à l'écoute";
  const link = !busy && subject ? SUBJECT_LINKS[subject] : undefined;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || busy) return;
    onSend(draft);
    setDraft('');
  };

  return (
    <div className="flex h-full w-full max-w-[600px] flex-col justify-end lg:mx-auto">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-light/55">
        <p className="flex items-center gap-3" aria-live="polite">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            {busy && <span className="absolute inset-0 animate-ping rounded-full bg-light opacity-60" />}
            <span className={`relative h-1.5 w-1.5 rounded-full bg-light ${busy ? '' : 'opacity-60'}`} />
          </span>
          Achraf · {statusLabel}
        </p>
        <AnimatePresence>
          {started && !busy && (
            <motion.button
              type="button"
              onClick={onReset}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="transition hover:text-light"
            >
              ↺ Recommencer
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {started ? (
        <ChatThread messages={messages} status={status} />
      ) : (
        <>
          <p className="mt-5 text-[1.35rem] font-light leading-snug text-light/90 xl:text-xl">
            <AnimatedWords text={GREETING} />
          </p>
          {AVATAR_CLIPS.introVoice && (
            <button type="button" onClick={onListen} className="group mt-4 inline-flex items-center gap-2 self-start text-sm text-light/70 transition hover:text-light">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-light/40 text-[9px] transition group-hover:border-light">▶</span>
              Écouter Achraf
            </button>
          )}
        </>
      )}

      <div className="mt-3 min-h-[24px] text-sm">
        <AnimatePresence>
          {link && (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="group inline-flex items-center gap-2 border-b border-light/30 pb-0.5 text-light/80 transition hover:border-light hover:text-light"
            >
              {link.label} <span className="transition group-hover:translate-x-1">→</span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={submit} className="mt-4">
        <div className="flex items-center gap-2 rounded-full border border-light/15 bg-light/[0.04] p-1.5 pl-6 backdrop-blur transition focus-within:border-light/50 focus-within:shadow-[0_0_0_6px_rgba(245,245,245,0.04)]">
          <input
            id="avatar-input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder={started ? 'Une autre question ?' : 'Parlez-moi de votre activité…'}
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

      {/* Les suggestions lancent la conversation ; ensuite elles prendraient la place de la réponse. */}
      {/* Pas d'animation de hauteur ici : elle coupait les suggestions à moitié. */}
      <AnimatePresence>
        {!started && (
          <motion.div exit={{ opacity: 0, transition: { duration: 0.25 } }}>
            <div className="flex flex-wrap gap-2 pt-4">
              {chatSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  type="button"
                  disabled={busy}
                  onClick={() => onSend(suggestion)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.08 }}
                  className="rounded-full border border-light/15 px-4 py-2 text-[13px] text-light/60 transition-colors hover:border-light/50 hover:text-light disabled:opacity-40"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
