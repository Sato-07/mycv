import { useState, useCallback } from 'react';
import { Message, OpenAIResponse } from '@/types/type';
import { useFetchOpenAI } from './useFetchOpenAI';
import { MAX_CONVERSATION_HISTORY_SIZE } from '@/utils/constant';

export const useMessages = (onSendMessage: (message: Partial<OpenAIResponse>) => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  
  const generateId = () => Date.now() + Math.random();

  const { fetchOpenAI } = useFetchOpenAI();

  const sendMessage = async (messageText: string) => {
    setIsLoading(true);

    const updatedHistory = [...conversationHistory, `User: ${messageText}`];

    if (updatedHistory.length > MAX_CONVERSATION_HISTORY_SIZE) {
      updatedHistory.splice(0, updatedHistory.length - MAX_CONVERSATION_HISTORY_SIZE);
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { text: messageText, sender: 'user', id: generateId() },
    ]);

    try {
      const response = await fetchOpenAI(updatedHistory.join('\n'), messageText);
      const serverResponseText = response?.text || 'No response received';

      await new Promise(resolve => setTimeout(resolve, 500));

      setMessages(prevMessages => [
        ...prevMessages,
        { text: serverResponseText, sender: 'server', id: generateId() },
      ]);

      setConversationHistory(prevHistory => [
        ...prevHistory,
        `User: ${messageText}`,
        `Server: ${serverResponseText}`,
      ]);

      onSendMessage({
        subjects: response?.subjects,
        code: response?.code || '',
        textcode: response?.textcode || '',
      });
    } catch (error) {
      console.error('Error communicating with the server:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavBarMessage = async (message: Partial<OpenAIResponse>) => {
    const messageText = message.text || 'No text provided';
    await sendMessage(messageText);
  };

  const handleSendMessage = useCallback(async () => {
    const messageText = newMessage.trim();
    if (messageText === '') return;
    await sendMessage(messageText);
  }, [newMessage]);

  return {
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    handleSendMessage,
    handleNavBarMessage,
  };
};
