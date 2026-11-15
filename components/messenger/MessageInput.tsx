import React, { forwardRef } from 'react';
import { MdArrowUpward } from 'react-icons/md';
import { MAX_MESSAGE_LENGTH } from '@/utils/constant';

type MessageInputProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
  ({ value, disabled, onChange, onSubmit }, ref) => {
    return (
      <form
        className="p-4 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-dark/15 bg-white/70 p-1.5 pl-4 transition focus-within:border-violet-500/60 focus-within:ring-4 focus-within:ring-violet-500/15 dark:border-light/15 dark:bg-white/5">
          <input
            ref={ref}
            type="text"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm placeholder:text-dark/40 focus:outline-none dark:placeholder:text-light/40"
            placeholder="Décrivez votre activité ou posez une question…"
            aria-label="Votre question"
            maxLength={MAX_MESSAGE_LENGTH}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            aria-label="Envoyer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ai-gradient text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            <MdArrowUpward size={20} />
          </button>
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-dark/40 dark:text-light/40">
          Réponses générées par IA · propulsé par Claude
        </p>
      </form>
    );
  }
);

MessageInput.displayName = 'MessageInput';
