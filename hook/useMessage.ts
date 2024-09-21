import { useState, useCallback } from 'react';
import { Message, MessageObject } from '@/types/type';
import { useFetchOpenAI } from './useFetchOpenAI';

export const useMessages = (onSendMessage: (message: Partial<MessageObject>) => void) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState<string[]>([]);
    const MAX_CONVERSATION_HISTORY_SIZE = 10;

    const { fetchOpenAI } = useFetchOpenAI();

    const sendMessage = async (messageText: string) => {
        setIsLoading(true); 

        const updatedHistory = [...conversationHistory, `User: ${messageText}`];
        
        if (updatedHistory.length > MAX_CONVERSATION_HISTORY_SIZE) {
            updatedHistory.splice(0, updatedHistory.length - MAX_CONVERSATION_HISTORY_SIZE);
        }

        setConversationHistory(updatedHistory);
        setMessages((prevMessages) => [...prevMessages, { text: messageText, sender: 'user' }]);
        setNewMessage('');
        console.log('ceci est le message ',messageText)
        console.log('ceci est  historique',updatedHistory)
        try {
            const response = await fetchOpenAI(updatedHistory.join('\n'), messageText);
            const serverResponseText = response.text || 'No response received';

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: serverResponseText, sender: 'server' },
            ]);

            setConversationHistory((prevHistory) => [
                ...prevHistory,
                `Server: ${serverResponseText}`,
            ]);

            console.log()
            onSendMessage({
                subjects: response.subjects,
                code: response.code || '',
                textcode: response.textcode || '',
                description: response.description || '',
            });
        } catch (error) {
            console.error('Error communicating with the server:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    const handleSendMessage = useCallback(async () => {
        const messageText = newMessage.trim();
        if (messageText === '') return;
        console.log("ceci est le message", messageText)
        setIsLoading(true);
        await sendMessage(messageText);
    }, [newMessage, onSendMessage]);

    return { messages, newMessage, setNewMessage, isLoading, handleSendMessage, sendMessage }; 
};
