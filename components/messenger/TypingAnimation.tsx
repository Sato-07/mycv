import React from 'react';

// Trois points qui rebondissent : l'IA « réfléchit » avant le premier mot.
export const TypingAnimation: React.FC = () => {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="L'assistant réfléchit">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 rounded-full bg-current opacity-70 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
};
