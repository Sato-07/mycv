export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'server';
  streaming?: boolean;
  error?: boolean;
}

// Ce que la réponse de l'IA demande à la page : la section vers laquelle proposer un lien.
export interface ChatAction {
  subjects: string[];
  code: string;
  textcode: string;
}
