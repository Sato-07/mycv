export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'server';
  streaming?: boolean;
  error?: boolean;
}

// Ce que la réponse de l'IA demande à la page : sections à afficher, couleurs à appliquer.
export interface ChatAction {
  subjects: string[];
  code: string;
  textcode: string;
}


  export interface ProjectProps {
    index: number;
    title: string;
    subtitle: string;
    show:Boolean;
    url?: string;
    setModal: (modal: { active: boolean; index: number }) => void;
  }

  // /component/NavBar

  export interface CustomLinkProps {
    href: string;
    title: string;
    className?: string;
    onClick?: () => void
}


// /components/Experience

export interface DetailsProps {
  position?: string;
  company: string;
  companyLink?: string;
  time: string;
  address: string;
  work: string;
}

export type AnimatedDescriptionProps = {
  show?: boolean;
  title: string;
  subtitle?: string;
  paragraph?: string;
  onAnimationComplete?: () => void;
};


export type AnimatedTextProps = {
  text: string,
  className?: string,
  show?: Boolean,
  // Index du premier mot écrit en dégradé « IA » (jusqu'à la fin du titre).
  highlightFrom?: number,
}