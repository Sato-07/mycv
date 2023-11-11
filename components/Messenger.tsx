import React, { useState, useRef, useEffect } from 'react';
import TypingAnimation from './TypingAnimation';
import { MdSend } from 'react-icons/md'; // Import the send icon

type Message = {
  text: string;
  sender: string;
};

type MessageObject = {
  sentence: string;
  subjects: string[]; // Add multiple subjects as needed
  code: string;
  description:string;
  textcode : string;
};

type MessengerProps = {
  onSendMessage: (message: Partial<MessageObject>) => void;
  selectedExample: string;

};

const Messenger: React.FC<MessengerProps> = ({ onSendMessage, selectedExample }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isServerTyping, setIsServerTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);


  const messageContainerRef = useRef<HTMLDivElement>(null);


  const MAX_CONVERSATION_HISTORY_SIZE = 10; // Limite de phrases

  const handleSendMessage = async () => {
    const messageText = newMessage.trim();
    if (messageText === '') return;

    setIsLoading(true);
    setIsServerTyping(false); // Ensure isServerTyping is set to false

    // Ajoutez le nouveau message à l'historique complet de la conversation
    conversationHistory.push(`User: ${newMessage}`);

    const updatedConversationHistory = [...conversationHistory];
    if (conversationHistory.length >= MAX_CONVERSATION_HISTORY_SIZE) {
      // Si nous atteignons la limite, supprimez les 2 premières phrases
      updatedConversationHistory.splice(0, 2);
    }
    setConversationHistory(updatedConversationHistory);

  
    try {
      // Envoyez l'intégralité de l'historique de la conversation au serveur
      const requestBody = {
        conversationHistory: updatedConversationHistory,
      };
      console.log(requestBody)
      const userMessage = { text: newMessage, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');

      const response = await fetch('http://91.176.116.10:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Unexpected server response: ${response.status}`);
      }

      const serverResponse = await response.json();
      onSendMessage(serverResponse);
      const serverMessage = { text: serverResponse.sentence, sender: 'server' };
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
      conversationHistory.push(`Server: ${serverResponse.sentence}`);


      setConversationHistory((prevHistory) => {
        const parts = [
          serverResponse.sentence.replace(/\n/g, ''),
          serverResponse.description ? `DESCRIPTION:${serverResponse.description}` : '',
        ];
      
        if (Array.isArray(serverResponse.subjects)) {
          parts.push(`SUBJECT:${serverResponse.subjects.join(' SUBJECT:')}`);
        }
      
        parts.push(serverResponse.code || '');
        parts.push(serverResponse.textcode || '');
      
        return [...prevHistory, parts.join(' ')];
      });
      console.log(conversationHistory)
      console.log("ceci est le message que je veux voir du server", serverResponse)
      console.log("ceci est le message que je veux voir de la description", serverResponse.subjects)
      


    } catch (error) {
      console.error('Error sending the request to the server:', error);
      // Handle the error gracefully in the UI if needed
    } finally {
      setIsLoading(false);
    }
  };
  // Set selectedExample as the initial value of newMessage
  useEffect(() => {
    setNewMessage(selectedExample);
  }, [selectedExample]);

  const savePreviousMessages = () => {
    conversationHistory.push(...messages
      .filter((message) => message.sender === 'user')
      .map((message) => message.text));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
      savePreviousMessages();


    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messageContainerRef} className="flex w-full h-screen overflow-auto dark:text-dark flex-col">
      <div
        className="flex-grow "
        style={{ flex: 1 }}
      >
          <div className="mb-2 p-3 text-left pt-24 xxs:hidden">
            <span className="inline-block p-2 rounded-lg bg-dark dark:bg-light text-light dark:text-black ">
              Achraf: Welcome to my mobile message!
            </span>
          </div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'server'
                  ? 'bg-dark dark-bg-light text-light dark-text-dark'
                  : 'bg-gray-200'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="mb-2 p-3 text-left">
            <span className="inline-block p-2 rounded-lg bg-dark">
              <TypingAnimation />
            </span>
          </div>
        )}
      </div>
      <div className=" p-4 lg:p-0 flex">
        <input
          type="text"
          className="flex-grow bg-dark dark-bg-light lg:w-full placeholder-light dark-placeholder-dark
            text-white dark-text-dark rounded-lg border px-4 py-2 focus-outline-none"
          placeholder="Type your message... "
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 px-4 py-2  bg-dark dark-bg-dark text-light dark-text-light rounded-lg border border-solid hover-bg-light hover-dark-bg-dark hover-text-dark hover-dark-text-light hover-border-dark hover-dark-border-light"
          onClick={handleSendMessage}
        >
          <MdSend/>
        </button>
      </div>
    </div>
  );
};

export default Messenger;




