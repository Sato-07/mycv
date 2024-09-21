import React from 'react';

type ExampleSentencesProps = {
  onExampleSelect: (sentence: string) => void;
  show : Boolean;
};

const ExampleQuestions: React.FC<ExampleSentencesProps> = ({ onExampleSelect,show }) => {
  const exampleSentences = [
    "Share a summary of your primary skills",
    "Can you share a brief overview of a recent project ?",
    "Can you change the background color to sky blue ?",
  ];

  const handleSelectExample = (sentence: string) => {
    onExampleSelect(sentence);
  };

  return (
    show ?(
    <div className="mt-8">
      <h3>Exemples de phrases :</h3>
      <ul className='mt-10 px-10'>
        {exampleSentences.map((sentence, index) => (
          <li key={index} className="cursor-pointer mb-7    flex flex-col items-center justify-center rounded-full font-medium
          bg-black text-light p-2 shadow-dark " onClick={() => handleSelectExample(sentence)}>
            {sentence}
          </li>
        ))}
      </ul>
    </div>
    ) : null
  );
};

export default ExampleQuestions;