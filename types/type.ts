export interface Message {
  text: string;
  sender: 'user' | 'server';
  id?: number; 
}


export interface OpenAIResponse {
  text: string;
  subjects: string[];
  code: string;
  textcode: string;
}


  export interface ProjectProps {
    index: number;
    title: string;
    src: string;
    show:Boolean;
    url: string;
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
}