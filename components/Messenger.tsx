import React, { useEffect } from 'react';
import { MessageObject } from '@/types/type';
import { useMessages } from '@/hook/useMessage';
import MessageInput from './messenger/MessageInput';
import  MessageList  from './messenger/MessageList';

const Messenger: React.FC<{ onSendMessage: (message: Partial<MessageObject>) => void; selectedExample: string }> = ({ onSendMessage, selectedExample }) => {
  const { messages, newMessage, setNewMessage, isLoading, handleSendMessage } = useMessages(onSendMessage);

  useEffect(() => {
    setNewMessage(selectedExample);
  }, [selectedExample, setNewMessage]);

  return (
    <div className="flex font-mont w-full h-screen overflow-auto dark:text-dark flex-col">
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput
        newMessage={newMessage}
        onChange={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
    </div>
  );
};

export default Messenger;
