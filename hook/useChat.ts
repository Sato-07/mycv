import { useRef, useState } from 'react';
import { ChatAction, Message } from '@/types/type';
import { MAX_CONVERSATION_HISTORY_SIZE } from '@/utils/constant';
import { extractChatTags, visibleText } from '@/utils/chatTags';

export type ChatStatus = 'idle' | 'thinking' | 'streaming';

// Une seule conversation pour toute la page : la barre de navigation, les cartes projet,
// le bouton flottant et le champ du chat écrivent tous dans ce même fil.
export const useChat = (onAction: (action: ChatAction) => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const nextId = useRef(0);

  const updateMessage = (id: number, patch: Partial<Message>) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const readError = async (response: Response): Promise<string> => {
    try {
      const body: unknown = await response.json();
      if (body && typeof body === 'object' && 'error' in body && typeof body.error === 'string') return body.error;
    } catch {
      // Corps vide ou non JSON : message générique ci-dessous.
    }
    return "L'assistant est indisponible pour le moment. Écrivez-moi directement.";
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || status !== 'idle') return;

    const history = messages
      .filter((m) => !m.error)
      .slice(-MAX_CONVERSATION_HISTORY_SIZE)
      .map((m) => `${m.sender === 'user' ? 'Visiteur' : 'Assistant'} : ${m.text}`)
      .join('\n');

    const userId = nextId.current++;
    const botId = nextId.current++;
    setMessages((prev) => [...prev, { id: userId, sender: 'user', text }]);
    setStatus('thinking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: history, userMessage: text }),
      });
      if (!response.ok || !response.body) throw new Error(await readError(response));

      setMessages((prev) => [...prev, { id: botId, sender: 'server', text: '', streaming: true }]);
      setStatus('streaming');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        updateMessage(botId, { text: visibleText(reply) });
      }

      const { cleanedText, subjects, colors } = extractChatTags(reply);
      updateMessage(botId, {
        text: cleanedText || "Je n'ai pas de réponse à ça. Reformulez, ou écrivez-moi directement.",
        streaming: false,
      });
      onAction({ subjects, code: colors.color ?? '', textcode: colors.textcolor ?? '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== botId),
        { id: botId, sender: 'server', text: message, error: true },
      ]);
    } finally {
      setStatus('idle');
    }
  };

  return { messages, status, send };
};
