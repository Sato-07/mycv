import { useEffect, useRef } from 'react';

export const useScrollToBottom = (messages: any[]) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {

      setTimeout(() => {
        messageContainerRef.current!.scrollTop = messageContainerRef.current!.scrollHeight;
      }, 0);
    }
  }, [messages]);

  return { messageContainerRef };
};
