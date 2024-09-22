// hooks/useFetchOpenAI.ts
import { useState } from 'react';
import { OpenAIResponse } from '@/types/type';

export const useFetchOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOpenAI = async (conversation: string, userMessage: string): Promise<OpenAIResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation, userMessage }),
      });

      if (!response.ok) {
        throw new Error('Erreur de réseau');
      }

      const data: OpenAIResponse = await response.json();
      return data;
    } catch (err) {
      
      console.error(err);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchOpenAI, loading, error };
};
