import { useEffect, useState } from 'react';
import { Message } from '@/types/type';

export const useCombinedMessages = (inputMessages: Message[], Navmessages: Message[]) => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newMessages = [...Navmessages, ...inputMessages];

    if (newMessages.length > 0) {
      setAllMessages(prevMessages => {
        const existingTexts = new Set(prevMessages.map(msg => msg.text));
        return [
          ...prevMessages,
          ...newMessages.filter(msg => !existingTexts.has(msg.text)),
        ];
      });
    }
  }, [inputMessages, Navmessages]);

  return allMessages;
};

