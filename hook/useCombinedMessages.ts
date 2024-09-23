import { useEffect, useState } from 'react';
import { Message } from '@/types/type';

export const useCombinedMessages = (inputMessages: Message[], navMessages: Message[]) => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newMessages = [...navMessages, ...inputMessages].map((msg, index) => ({
      ...msg,
      id: msg.id ?? Date.now() + index,
    }));

    setAllMessages(prevMessages => {
      const messageMap = new Map<number, Message>(prevMessages.map(msg => [msg.id!, msg])); 

      newMessages.forEach(newMsg => {
        if (!messageMap.has(newMsg.id!)) {
          messageMap.set(newMsg.id!, newMsg);
        }
      });

      return Array.from(messageMap.values());
    });
  }, [inputMessages, navMessages]);

  return allMessages;
};
