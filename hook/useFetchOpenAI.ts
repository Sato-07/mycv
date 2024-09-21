import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { OpenAIResponse } from '@/types/type';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export const useFetchOpenAI = () => {
  const fetchOpenAI = async (conversation: string, userMessage: string): Promise<OpenAIResponse> => {
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
    User: "${userMessage}"\n`;
    
    try {
      const object = await generateText({
        model: groq('llama3-70b-8192'), 
        prompt: prompt,
      });

      const serverResponseText = object.text || '';

      const { cleanedText, subjects, colors } = extractSubjectsAndCleanText(serverResponseText);
      console.log('Server Response:', cleanedText);

      return {
        subjects,
        code: colors.color || '',
        textcode: colors.textcolor || '',
        text: cleanedText, 
      } as OpenAIResponse;
      
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      throw error;
    }
  };

  const extractSubjectsAndCleanText = (text: string): { cleanedText: string, subjects: string[], colors: { textcolor?: string, color?: string } } => {

    const subjectRegex = /SUBJECT:(SKILLS|EDUCATION|DESCRIPTION|IMAGE|DARKMODE|LIGHTMODE|PROJECT|COLOR|TEXTCOLOR|NULL);/g;
    const colorRegex = /SUBJECT:(TEXTCOLOR|COLOR);\s*#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
  
    const subjects: string[] = [];
    const colors: { textcolor?: string, color?: string } = {};
    console.log('ceci est la couleur:', colors)
    let cleanedText = text.replace(subjectRegex, (match, subject) => {
      subjects.push(subject);
      return ''; 
    });
  
    let match;
    while ((match = colorRegex.exec(text)) !== null) {
      const [_, type, colorCode] = match;
      if (type === 'TEXTCOLOR') {
        colors.textcolor = `#${colorCode}`;
      } else if (type === 'COLOR') {
        colors.color = `#${colorCode}`;
      }
    }

    return { cleanedText: cleanedText.trim(), subjects, colors };
  };
  
  return { fetchOpenAI };
};
