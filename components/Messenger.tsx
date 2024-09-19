import React, { useState, useRef, useEffect } from 'react';
import TypingAnimation from './TypingAnimation';
import { MdSend } from 'react-icons/md';
import Image from 'next/image';
import FotoProfil from '@/public/hb7_sport.png';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

import z from 'zod';
import { textChangeRangeIsUnchanged } from 'typescript';

type Message = {
  text: string;
  sender: string;
};

type MessageObject = {
  subjects?: string[];
  code?: string;
  textcode?: string;
  description?: string;
};

type MessengerProps = {
  onSendMessage: (message: Partial<MessageObject>) => void;
  selectedExample: string;
};

const Messenger: React.FC<MessengerProps> = ({ onSendMessage, selectedExample }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [profileColor, setProfileColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000'); 
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const MAX_CONVERSATION_HISTORY_SIZE = 10;

  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  });

const extractSubjects = (text: string): { subjects: string[], colors: { textcolor?: string, color?: string } } => {
  const subjectRegex = /SUBJECT:(SKILLS|EDUCATION|DESCRIPTION|IMAGE|DARKMODE|LIGHTMODE|PROJECT|COLOR|TEXTCOLOR|NULL);/g;

  const colorRegex = /SUBJECT:(TEXTCOLOR|COLOR);\s*#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\s*/g;

  const subjects: string[] = [];
  const colors: { textcolor?: string, color?: string } = {};

  const subjectMatches = text.match(subjectRegex);
  if (subjectMatches) {
    subjects.push(...subjectMatches.map(match => match.split(':')[1].split(';')[0]));
  }

  let match;
  while ((match = colorRegex.exec(text)) !== null) {
    const [_, type, colorCode] = match;
    if (type === 'TEXTCOLOR') {
      colors.textcolor = `#${colorCode}`;
    } else if (type === 'COLOR') {
      colors.color = `#${colorCode}`;
    }
  }

  return { subjects, colors };
};




  const handleSendMessage = async () => {
    const messageText = newMessage.trim();
  
    if (messageText === '') return;
  
    setIsLoading(true);
  
    const updatedHistory = [...conversationHistory, `User: ${messageText}`];
    if (updatedHistory.length > MAX_CONVERSATION_HISTORY_SIZE) {
      updatedHistory.splice(0, updatedHistory.length - MAX_CONVERSATION_HISTORY_SIZE);
    }
  
    setConversationHistory(updatedHistory);
    setMessages((prevMessages) => [...prevMessages, { text: messageText, sender: 'user' }]);
    setNewMessage('');
  
    try {
      const conversation = updatedHistory.join('\n');
      const prompt = `Rôle du modèle :
      Tu es Achraf, un jeune homme de 26 ans bien élevé et modeste, qui se présente aux recruteurs pour trouver un emploi dans le domaine de l'informatique.
      
      Contexte personnel :
      Nom : Achraf
      Âge : 26 ans
      Personnalité : Poli, modeste, ne se vante pas.
      Éducation : Licence en "Informatique et Système". A suivi des cours en ligne de deep learning et machine learning sur Coursera.
      Compétences : Python, bibliothèques comme Transformers, Pandas, Scikit-Learn, TensorFlow, et PyTorch. Développement web avec Next.js, Tailwind CSS, TypeScript. Expérience en bases de données avec Prisma, SQL et MongoDB.
      Instructions du modèle :
      Réponds de manière professionnelle et respectueuse, en fonction du sujet abordé par l'utilisateur. Chaque réponse doit inclure la balise correspondante à la fin pour permettre d'identifier le sujet traité dans la conversation.
      
      Sujets et comportements :
      SKILLS (Compétences techniques) :
      Réponse attendue : Décris tes compétences principales en développement, machine learning, et deep learning ainsi que les outils que tu maîtrises (Python, TensorFlow, Next.js, Prisma, etc.).
      Balise à afficher : SUBJECT:SKILLS;
      Exemple de réponse :
      "Je me spécialise en développement Python avec des bibliothèques comme Transformers, TensorFlow et Pandas. J'ai aussi de l'expérience en développement web avec Next.js et Tailwind CSS. Côté bases de données, je travaille avec Prisma, SQL et MongoDB.
      SUBJECT:SKILLS;"
      
      EDUCATION (Éducation) :
      Réponse attendue : Fournis des informations sur ta Licence en "Informatique et Système" ainsi que sur tes cours additionnels en ligne (machine learning, deep learning).
      Balise à afficher : SUBJECT:EDUCATION;
      
      DESCRIPTION (Description générale) :
      Réponse attendue : Offre une description globale de ton profil professionnel et personnel.
      Balise à afficher : SUBJECT:DESCRIPTION;
      
      IMAGE (Image) :
      Réponse attendue : Fournis une réponse relative à l'affichage ou l'utilisation d'images.
      Balise à afficher : SUBJECT:IMAGE;
      
      DARKMODE (Mode sombre) :
      Réponse attendue : Indique que l'interface est passée en mode sombre.
      Balise à afficher : SUBJECT:DARKMODE;
      
      LIGHTMODE (Mode clair) :
      Réponse attendue : Indique que l'interface est passée en mode clair.
      Balise à afficher : SUBJECT:LIGHTMODE;
      
      PROJECT (Projets) :
      Réponse attendue : Décris tes projets récents et ceux que tu aimerais partager.
      Balise à afficher : SUBJECT:PROJECT;
      
      COLOR (Changement de couleur) :
      Réponse attendue : Indique le changement de couleur en fonction de la demande de l'utilisateur.
      **Couleur de fond** : Utilisez le code couleur suivant pour modifier la couleur de fond de l'interface.
      Balise à afficher : SUBJECT:COLOR; #codecouleur
      Exemple de réponse :
      "La couleur de l'interface a été modifiée en noir selon votre demande.
      SUBJECT:COLOR; #0000" 

      TEXTCOLOR (Changement de couleur) :
      Réponse attendue : Indique le changement de couleur en fonction de la demande de l'utilisateur.
      **Couleur du texte** : Utilisez le code couleur suivant pour modifier la couleur du texte de l'interface.

      Balise à afficher : SUBJECT:TEXTCOLOR; #codecouleur
      Exemple de réponse :
      "La couleur de l'interface a été modifiée en noir selon votre demande.
      SUBJECT:COLOR; #0000" 

      Autres sujets non catégorisés :
      Réponse attendue : Si la discussion ne correspond à aucune des catégories ci-dessus, fournissez une réponse générique avec une balise de sujet NULL.
      Balise à afficher : SUBJECT:NULL;
      
      ${conversation}\n
      User: "${messageText}"\n`;
      
  
      const object  = await generateText({
        model: groq('llama3-70b-8192'),
        prompt: prompt,
      });
  
      const serverResponseText = object.text || '';
      console.log('Server Response:', serverResponseText);
  
      const { subjects, colors } = extractSubjects(serverResponseText);
      console.log('Extracted Subjects:', subjects);
      console.log('Extracted Colors:', colors);
  
      const cleanedResponseText = serverResponseText.replace(/SUBJECT:\w+;/g, '').trim();
  
      const serverMessage: Message = { text: cleanedResponseText, sender: 'server' };
  
      setMessages((prevMessages) => [...prevMessages, serverMessage]);
      setConversationHistory((prevHistory) => [...prevHistory, `Server: ${cleanedResponseText}`]);
  
      onSendMessage({
        subjects,
        code: colors.color || '',
        textcode: colors.textcolor || '',
        description: subjects.includes('EDUCATION') ? cleanedResponseText : '',
      });
  
      if (colors.color) {
        console.log('Profile Color:', colors.color);
        setProfileColor(colors.color);
      }
      if (colors.textcolor) {
        console.log('Text Color:', colors.textcolor);
        setTextColor(colors.textcolor);
      }
  
    } catch (error) {
      console.error('Error communicating with the server:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setNewMessage(selectedExample);
  }, [selectedExample]);

  return (
    <div ref={messageContainerRef} className="flex font-mont w-full h-screen overflow-auto dark:text-dark flex-col">
      <div className="flex-grow" style={{ flex: 1 }}>
          <div className="flex items-center mb-2 p-3 text-left pt-24 xxs:hidden">
            <Image
              src={FotoProfil}
              alt="Profile image"
              className="rounded-full w-14 -mt-8 mr-2"
            />
            <span className='inline-block p-2 rounded-lg bg-dark dark-bg-light text-light dark-text-dark'>
              Hi! Welcome to my portfolio. I'm Achraf AI, your friendly AI here to help you explore my world.
              Feel free to ask me questions about my skills, projects, or academic journey.
              We can even customize the site to your liking. Interested?
            </span>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              {message.sender === 'user' && (
                <div className="flex items-center mb-2 justify-end">
                  <span className="inline-block p-2 rounded-lg bg-gray-200 text-dark dark:bg-dark dark-text-light">
                    {message.text}
                  </span>
                </div>
              )}
              {message.sender === 'server' && (
                <div className="flex items-center mb-2">
                  <Image
                    src={FotoProfil} 
                    alt="server profile"
                    className="rounded-full w-14 -mt-8 mr-2"
                  />
                  <span className="inline-block p-2 rounded-lg bg-dark dark-bg-light text-light dark-text-dark">
                    {message.text}
                  </span>
                </div>
              )}
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
      <div className="flex p-2 border-t-2 border-gray-300">
        <input
          type="text"
          className="flex-grow bg-dark dark-bg-light lg:w-full placeholder-light dark-placeholder-dark text-white dark-text-dark rounded-lg border px-4 py-2 focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 px-4 py-2 bg-dark hover:bg-light text-light hover:text-dark dark-bg-light  dark-text-light rounded-lg border border-solid  hover:border-dark"
          onClick={handleSendMessage}
        >
          <MdSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default Messenger;
