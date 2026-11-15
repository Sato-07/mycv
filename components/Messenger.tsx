import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageInput } from './messenger/MessageInput';
import { MessageList } from './messenger/MessageList';
import { Message } from '@/types/type';
import { ChatStatus } from '@/hook/useChat';
import { chatSuggestions } from '@/data/profile';

type MessengerProps = {
  messages: Message[];
  status: ChatStatus;
  onSend: (text: string) => void;
};

export const Messenger = forwardRef<HTMLInputElement, MessengerProps>(({ messages, status, onSend }, inputRef) => {
  const [draft, setDraft] = useState('');

  const submit = () => {
    if (!draft.trim() || status !== 'idle') return;
    onSend(draft);
    setDraft('');
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <MessageList messages={messages} status={status} />

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 px-5 pb-2">
          {chatSuggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              onClick={() => onSend(suggestion)}
              className="rounded-full border border-dark/15 px-3 py-1.5 text-left text-xs transition hover:border-violet-500/60 hover:bg-violet-500/5 dark:border-light/15"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      )}

      <MessageInput ref={inputRef} value={draft} disabled={status !== 'idle'} onChange={setDraft} onSubmit={submit} />
    </div>
  );
});

Messenger.displayName = 'Messenger';
