import React from 'react';

type ExampleSentencesProps = {
  onExampleSelect: (sentence: string) => void;
  show : Boolean;
};

export const ExampleQuestions: React.FC<ExampleSentencesProps> = ({ onExampleSelect,show }) => {
  const exampleSentences = [
    "Que pourrais-tu automatiser dans une PME ?",
    "Montre-moi ce que tu as déjà livré",
    "Quelles sont tes offres et tes prix ?",
    "Passe le fond du site en bleu ciel",
  ];

  const handleSelectExample = (sentence: string) => {
    onExampleSelect(sentence);
  };

  return (
    show ?(
    <div className="mt-8">
      <h3>Quelques exemples :</h3>
      <ul className='mt-10 px-20'>
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

