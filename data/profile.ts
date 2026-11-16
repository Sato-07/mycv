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

// Voix de l'avatar (ElevenLabs, ou voix du navigateur en repli). Coupée : l'avatar répond en sous-titres
// et fait ses gestes sans son. Passer à true pour la rallumer, rien d'autre à changer.
export const VOICE_ENABLED = false;

// Questions proposées en un clic sous l'avatar.
export const chatSuggestions = [
  'Que peux-tu automatiser dans ma PME ?',
  "Qu'as-tu déjà livré ?",
  'Combien ça coûte ?',
];

// Clips de l'avatar, dans public/avatar/. Fond noir écrasé sous le noir du site : la page les fusionne
// en mode « lighten », donc seul le personnage (et son bureau) apparaît.
// Scène actuelle : assis à son bureau (public/avatar/desk/).
// - pose : image de repos, assis face caméra mains sur les cuisses (l'image où il cesse de pivoter) ;
//   les vidéos s'y fondent en fin de lecture ;
// - intro : joué à l'arrivée et au clic sur « Écouter Achraf » : il se retourne, fait coucou et parle ;
// - introPoster : première image de l'intro (de dos), affichée pendant son chargement ;
// - introHasSound : l'intro contient sa voix (lèvres synchronisées par Kling) ; muette si le navigateur
//   bloque le son, puis sonore au premier clic ;
// - talking : gestes d'explication joués une fois par réponse, qui finissent sur la pose de repos ;
// - puppet : yeux qui suivent la souris et clignements, découpés pour l'ancienne pose debout
//   (public/avatar/parts/) : à laisser éteint tant que la pose assise n'a pas ses propres pièces ;
// - aspect : proportions des clips (largeur / hauteur).
export const AVATAR_CLIPS: {
  pose: string;
  intro: string | null;
  introPoster: string | null;
  introHasSound: boolean;
  idle: string | null;
  talking: string | null;
  puppet: boolean;
  aspect: string;
} = {
  pose: '/avatar/desk/rest.jpg',
  intro: '/avatar/desk/intro.mp4',
  introPoster: '/avatar/desk/back.jpg',
  introHasSound: true,
  idle: null,
  talking: '/avatar/desk/talking.mp4',
  puppet: false,
  aspect: '9 / 16',
};

export const skills = [
  'TypeScript',
  'Next.js',
  'React Native',
  'Node.js',
  'PostgreSQL',
  'Prisma',
  'Python',
  'LLM & agents IA',
  'Whisper',
  'Peppol',
  'Automatisation',
];

export type ExperienceItem = { role: string; place: string; url?: string; time: string; text: string };

export const experience: ExperienceItem[] = [
  {
    role: 'Développeur freelance',
    place: 'Indépendant',
    time: "Aujourd'hui",
    text: "Automatisations IA, outils de prospection et de veille, logiciels métier et sites web pour les PME. Prix fixé avant de commencer, livraison par étapes.",
  },
  {
    role: 'Cofondateur et développeur',
    place: 'Aionik',
    url: 'https://aionik.app',
    time: "Aujourd'hui",
    text: "Logiciel de gestion pour les paysagistes : devis, facturation électronique Peppol, relevé d'heures, stock, agenda, application iOS et Android, assistant IA. Je le conçois, le développe et le vends.",
  },
  {
    role: 'Bachelier en informatique et systèmes',
    place: 'ISIPS',
    time: '2020',
    text: 'Développement logiciel, réseaux, bases de données et systèmes.',
  },
  {
    role: 'Machine learning, Université Stanford',
    place: 'Coursera',
    url: 'https://www.coursera.org/',
    time: '2020',
    text: "Trois certifications du cursus d'Andrew Ng : apprentissage supervisé, algorithmes avancés et réseaux de neurones, apprentissage non supervisé.",
  },
];
