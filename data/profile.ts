// Tout le contenu du site est ici : le modifier ne demande pas de toucher aux composants.
// Le prompt du chatbot (pages/api/openai.ts) lit aussi ce fichier, pour qu'il ne contredise jamais la page.

export const CONTACT_EMAIL = 'achrafbaitar@gmail.com';

// À remplacer par ton lien Calendly / cal.com. Tant qu'il est vide, les boutons ouvrent un mail.
export const BOOKING_URL = '';

export const LINKEDIN_URL = 'https://www.linkedin.com/';
export const GITHUB_URL = 'https://github.com/Sato-07';

export const bookingHref = () =>
  BOOKING_URL ||
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Prise de contact depuis votre site')}`;

export type CaseStudy = {
  title: string;
  tag: string;
  problem: string;
  built: string;
  result: string;
  url?: string;
  src?: string;
  color: string;
};

export const caseStudies: CaseStudy[] = [
  {
    title: 'Aionik',
    tag: 'Logiciel métier · web + mobile',
    problem:
      "Les paysagistes perdent leurs soirées sur l'administratif : devis, factures, heures des ouvriers, planning.",
    built:
      "Un logiciel de gestion complet : devis, facturation électronique Peppol, relevé d'heures, stock, agenda, application iOS et Android, et un assistant IA qui prépare les devis.",
    result: 'En production chez des entreprises de jardinage belges.',
    url: 'https://aionik.app',
    color: '#062F2B',
  },
  {
    title: 'Radar de prospection IA',
    tag: 'Automatisation commerciale',
    problem: 'Trouver qui appeler, quand relancer et à qui montrer quoi prend des heures chaque semaine.',
    built:
      "Un outil qui repère les entreprises qui ressemblent à vos clients, leur donne un score, prépare la liste d'appels du jour, suit l'ouverture des maquettes envoyées et programme les relances.",
    result: "Mon propre outil de vente : c'est lui qui me sort chaque matin la liste des appels.",
    color: '#1b1b1b',
  },
  {
    title: 'Radar marchés publics',
    tag: 'Démo · veille et analyse IA',
    problem: "Un bureau d'études qui rate un appel d'offres peut perdre un marché à plusieurs millions.",
    built:
      "Une veille quotidienne des marchés publics belges et européens : score selon votre cœur de métier, échéances, lecture du cahier des charges par l'IA avec renvoi aux pages sources, aide au go / no-go.",
    result: "Démonstration réglée pour un grand bureau d'ingénierie.",
    color: '#8C8C8C',
  },
  {
    title: 'Chaire Familles en Entreprises',
    tag: 'Site web',
    problem: 'Une chaire universitaire avait besoin de présenter ses recherches sur les entreprises familiales.',
    built: 'Le site de la chaire, de la structure au contenu.',
    result: 'En ligne.',
    url: 'https://chairefamilles.ichec.be/',
    src: 'chaireFamille.png',
    color: '#000000',
  },
];

export type Offer = {
  title: string;
  price: string;
  description: string;
  items: string[];
};

export const offers: Offer[] = [
  {
    title: 'Site vitrine',
    price: 'à partir de 600 €',
    description: 'Un site rapide et clair qui donne envie de vous appeler.',
    items: ['Maquette avant de payer', 'Mise en ligne en une semaine', 'Hébergement et suivi : 150 €/an'],
  },
  {
    title: 'Automatisation IA',
    price: 'à partir de 1 500 €',
    description: 'Une tâche répétitive qui disparaît : mails, devis, relances, saisie.',
    items: ['Atelier pour choisir quoi automatiser', 'Branché sur vos outils actuels', 'Prix fixé avant de commencer'],
  },
  {
    title: 'Outil sur mesure',
    price: 'sur devis',
    description: 'Un logiciel taillé pour votre métier, web et mobile, comme Aionik.',
    items: ['Prospection, veille, gestion interne', 'Livré par étapes, utilisable vite', 'Maintenance au mois'],
  },
];

// Positions des bulles autour du centre « IA » (section Compétences).
export const skills = [
  { name: 'TypeScript', x: '-5vw', y: '-8vw' },
  { name: 'Next.js', x: '5vw', y: '8vw' },
  { name: 'React Native', x: '-14vw', y: '10vw' },
  { name: 'LLM & agents', x: '12vw', y: '-10vw' },
  { name: 'PostgreSQL', x: '17vw', y: '6vw' },
  { name: 'Python', x: '-16vw', y: '-6vw' },
  { name: 'Peppol', x: '0vw', y: '-14vw' },
  { name: 'Automatisation', x: '0vw', y: '14vw' },
];
