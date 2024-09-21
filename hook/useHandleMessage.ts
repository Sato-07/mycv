import { MessageObject } from '@/types/type';
import { Dispatch, SetStateAction } from 'react';

const useHandleMessage = (
  setActiveSection: Dispatch<SetStateAction<string>>,
  setThemeSettings?: Dispatch<SetStateAction<{ backgroundColor: string }>>,
  setTextSettings?: Dispatch<SetStateAction<{ textColor: string }>>,
  setShowServerImage?: Dispatch<SetStateAction<boolean>>,
  setShowExampleQuestions?:Dispatch<SetStateAction<boolean>>,
  setMode?: (mode: string) => void
) => {
  return (message: Partial<MessageObject>) => {
    const subjectMessage = message.subjects ?? [];
    const color = message.code || '';
    console.log('handlecode',color)
    const textcolor = message.textcode || '';
    console.log('ceci est le subject',subjectMessage )

    try {
      subjectMessage.forEach((subject: string) => {
        switch (subject) {
          case 'SKILLS':
            setActiveSection('SKILLS');
            setShowExampleQuestions?.(false);

            break;
          case 'EDUCATION':
            setActiveSection('EDUCATION');
            console.log("active section bith")
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
            break;
          case 'COLOR':
            setThemeSettings?.({ backgroundColor: color });
            console.log('Background color set to:', color); 
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
      console.error('Erreur lors de la gestion du message :', error);
    }
  };
};

export default useHandleMessage;
