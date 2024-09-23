import React from 'react';
import { MdSend } from 'react-icons/md';

type MessageInputProps = {
  newMessage: string;
  onChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
};

export const MessageInput: React.FC<MessageInputProps> = ({ newMessage, onChange, onSendMessage, onKeyPress }) => {
  return (
    <div className="flex p-2 border-t-2 border-gray-300">
      <input
        type="text"
        className="flex-grow bg-dark dark-bg-light lg:w-full placeholder-light dark-placeholder-dark text-white dark-text-dark rounded-lg border px-4 py-2 focus:outline-none"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
      />
      <button
        className="ml-2 px-4 py-2 bg-dark hover:bg-light text-light hover:text-dark dark-bg-light dark-text-light rounded-lg border border-solid hover:border-dark"
        onClick={onSendMessage}
      >
        <MdSend size={24} />
      </button>
    </div>
  );
};

