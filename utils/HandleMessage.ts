import { OpenAIResponse } from '@/types/type';
import { Dispatch, SetStateAction } from 'react';

const handleMessage = (
setActiveSection: Dispatch<SetStateAction<string>>,
setThemeSettings?: Dispatch<SetStateAction<{ backgroundColor: string; }>>,
setTextSettings?: Dispatch<SetStateAction<{ textColor: string; }>>,
setShowServerImage?: Dispatch<SetStateAction<boolean>>,
setShowExampleQuestions?: Dispatch<SetStateAction<boolean>>,
setMode?: (mode: string) => void,
) => {
  return (message: Partial<OpenAIResponse>) => {
    const subjectMessage = message.subjects ?? [];
    const color = message.code || '';
    const textcolor = message.textcode || '';

    try {
      subjectMessage.forEach((subject: string) => {
        switch (subject) {
          case 'SKILLS':
            setActiveSection('SKILLS');
            setShowExampleQuestions?.(false);
            break;
          case 'EDUCATION':
            setActiveSection('EDUCATION');
            setShowExampleQuestions?.(false);
            break;
          case 'IMAGE':
            
            setShowServerImage?.(true);
            break;
          case 'DARKMODE':
            setMode?.("dark");
            break;
          case 'LIGHTMODE':
            setMode?.("light");
            break;
          case 'PROJECT':
            setActiveSection('PROJECT');
            setShowExampleQuestions?.(false);
            break;
          case 'COLOR':
            setThemeSettings?.({ backgroundColor: color });
            break;
          case 'TEXTCOLOR':
            setTextSettings?.({ textColor: textcolor });
            break;
          default:
            setActiveSection('DESCRIPTION'); 
            break;
        }
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  };
};

export default handleMessage;
