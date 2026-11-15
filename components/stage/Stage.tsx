import React, { forwardRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';
import { MdArrowUpward } from 'react-icons/md';
import { TalkingAvatar } from './TalkingAvatar';
import { VoiceBars } from './VoiceBars';
import { HireMe } from '@/components/ui/HireMe';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';
import { bookingHref, chatSuggestions } from '@/data/profile';
import { MAX_MESSAGE_LENGTH } from '@/utils/constant';

export const GREETING =
  "Salut, moi c'est Achraf. Enfin, mon double IA. Dites-moi ce qui vous fait perdre du temps dans votre entreprise, et je vous dis ce que je peux automatiser.";

const SUBJECT_LINKS: Record<string, { href: string; label: string }> = {
  PROJECT: { href: '#realisations', label: 'Voir mes réalisations' },
  OFFERS: { href: '#offres', label: 'Voir les offres et les prix' },
  SKILLS: { href: '#parcours', label: 'Voir mon parcours' },
};

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

export const Stage = forwardRef<HTMLInputElement, StageProps>(
  ({ messages, status, speaking, muted, subject, analyserRef, onSend, onListenGreeting, onToggleMute, waveSignal }, inputRef) => {
    const [draft, setDraft] = useState('');
    const subtitles = useRef<HTMLDivElement>(null);

    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    const lastBot = [...messages].reverse().find((m) => m.sender === 'server');
    const busy = status !== 'idle';
    const statusLabel = status === 'thinking' ? 'réfléchit' : speaking || status === 'streaming' ? 'parle' : "à l'écoute";
    const link = !busy && subject ? SUBJECT_LINKS[subject] : undefined;

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
      <section id="top" className="grain relative flex min-h-[100svh] flex-col overflow-hidden pt-24 lg:pt-20">
        {/* Nom géant en filigrane derrière l'avatar. */}
        <div
          aria-hidden
          className="text-outline pointer-events-none absolute inset-x-0 top-[14%] select-none text-center text-[21vw] font-semibold leading-none tracking-tight"
        >
          ACHRAF
        </div>

        <div className="absolute left-12 top-32 z-10 max-w-xs xl:left-8 lg:static lg:mx-auto lg:max-w-md lg:px-6 lg:text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">Développeur freelance · Belgique</p>
          <h1 className="mt-4 text-3xl font-normal leading-tight lg:text-2xl">
            J'automatise la prospection et la gestion des PME <span className="font-light italic text-light/50">avec l'IA.</span>
          </h1>
          <a
            href={bookingHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 border-b border-light/30 pb-1 text-sm transition hover:border-light lg:hidden"
          >
            Réserver un appel <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="absolute right-12 top-32 z-10 flex flex-col items-end gap-3 text-right font-mono text-[11px] uppercase tracking-[0.2em] text-light/50 xl:right-8 lg:hidden">
          <span>Avatar IA · voix de synthèse</span>
          <span>Réponses par Claude</span>
          <button
            type="button"
            onClick={onToggleMute}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-light/20 px-3 py-1.5 text-light/80 transition hover:border-light/60"
          >
            {muted ? <BsVolumeMuteFill size={14} /> : <BsVolumeUpFill size={14} />}
            {muted ? 'Son coupé' : 'Son activé'}
          </button>
        </div>

        {/* Pas de z-index ici : il isolerait l'avatar, et sa fusion « lighten » ne verrait plus le fond de la page. */}
        <div className="relative flex flex-1 flex-col items-center justify-end pb-10">
          <div className="h-[46vh] w-full lg:h-[40vh]">
            <TalkingAvatar speaking={speaking} thinking={status === 'thinking'} analyserRef={analyserRef} waveSignal={waveSignal} />
          </div>

          <div className="mt-1 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-light/60" aria-live="polite">
            <VoiceBars active={speaking} analyserRef={analyserRef} />
            <span>Achraf · {statusLabel}</span>
            <button type="button" onClick={onToggleMute} aria-label={muted ? 'Activer le son' : 'Couper le son'} className="hidden text-light/70 lg:inline">
              {muted ? <BsVolumeMuteFill size={14} /> : <BsVolumeUpFill size={14} />}
            </button>
          </div>

          <div className="mt-5 w-full max-w-3xl px-6 text-center">
            {lastUser && <p className="mb-3 truncate font-mono text-xs text-light/40">Vous — {lastUser.text}</p>}
            <div ref={subtitles} className="max-h-[16vh] overflow-y-auto">
              <motion.p
                key={lastBot?.id ?? 'greeting'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-light leading-snug ${lastBot && lastBot.text.length > 220 ? 'text-xl md:text-lg' : 'text-2xl md:text-xl'} ${lastBot?.error ? 'text-red-300' : ''}`}
              >
                {status === 'thinking' && !lastBot?.streaming ? (
                  <span className="text-light/40">…</span>
                ) : (
                  lastBot?.text ?? GREETING
                )}
                {lastBot?.streaming && <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-light animate-blink" aria-hidden />}
              </motion.p>
            </div>
            <div className="mt-3 flex min-h-[24px] items-center justify-center gap-5 text-sm">
              {!lastBot && (
                <button type="button" onClick={onListenGreeting} className="group inline-flex items-center gap-2 text-light/70 transition hover:text-light">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-light/40 text-[10px] transition group-hover:border-light">▶</span>
                  Écouter Achraf
                </button>
              )}
              {link && (
                <a href={link.href} className="group inline-flex items-center gap-2 border-b border-light/30 pb-0.5 text-light/80 transition hover:border-light hover:text-light">
                  {link.label} <span className="transition group-hover:translate-x-1">↓</span>
                </a>
              )}
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 w-full max-w-xl px-6">
            <div className="flex items-center gap-2 rounded-full border border-light/15 bg-light/[0.04] p-1.5 pl-5 backdrop-blur transition focus-within:border-light/50">
              <input
                ref={inputRef}
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

          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 px-6 text-sm text-light/45">
            {chatSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={busy}
                onClick={() => onSend(suggestion)}
                className="transition hover:text-light disabled:opacity-40"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 right-12 z-10 xl:right-8 lg:hidden">
          <HireMe />
        </div>
      </section>
    );
  }
);

Stage.displayName = 'Stage';
