import React, { useEffect } from 'react';
import { useMessages } from '@/hook/useMessage';
import {MessageInput} from './messenger/MessageInput';
import {MessageList} from './messenger/MessageList';
import { Message, OpenAIResponse } from '@/types/type';
import {useCombinedMessages} from "@/hook/useCombinedMessages"


export const Messenger: React.FC<{ 
  onSendMessage: (message: Partial<OpenAIResponse>) => void; 
  selectedExample: string; 
  Navmessages: Message[]; 
}> = ({ onSendMessage, selectedExample, Navmessages }) => {
  const { messages: inputMessages, newMessage, setNewMessage, isLoading, handleSendMessage } = useMessages(onSendMessage);
  
  const allMessages = useCombinedMessages(inputMessages, Navmessages);

  useEffect(() => {
    if (selectedExample) {
      setNewMessage(selectedExample);
    }
  }, [selectedExample, setNewMessage]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      handleSendMessage();
      setNewMessage(''); 
    }
  };

  return (
    <div className="flex font-mont w-full h-screen overflow-auto dark:text-dark flex-col">
      <MessageList allMessages={allMessages} isLoading={isLoading} />
      <MessageInput
        newMessage={newMessage}
        onChange={setNewMessage}
        onSendMessage={sendMessage}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
    </div>
  );
};

