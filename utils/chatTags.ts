// Le modèle termine chaque réponse par une étiquette (SUBJECT:PROJECT; …) qui pilote la page.
// Ces fonctions la séparent du texte affiché au visiteur.

const SUBJECTS = 'SKILLS|EDUCATION|DESCRIPTION|IMAGE|DARKMODE|LIGHTMODE|PROJECT|OFFERS|COLOR|TEXTCOLOR|NULL';
const subjectRegex = new RegExp(`SUBJECT:(${SUBJECTS});`, 'g');
const colorRegex = /SUBJECT:(TEXTCOLOR|COLOR);\s*#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;

export type ChatTags = {
  cleanedText: string;
  subjects: string[];
  colors: { textcolor?: string; color?: string };
};

export const extractChatTags = (text: string): ChatTags => {
  const subjects: string[] = [];
  const colors: ChatTags['colors'] = {};

  for (const match of Array.from(text.matchAll(colorRegex))) {
    const [, type, colorCode] = match;
    if (type === 'TEXTCOLOR') colors.textcolor = `#${colorCode}`;
    else colors.color = `#${colorCode}`;
  }

  // Le code couleur est retiré avec son étiquette, sinon le visiteur voit « #87CEEB » dans la bulle.
  const cleanedText = text
    .replace(colorRegex, '')
    .replace(subjectRegex, (_match, subject: string) => {
      subjects.push(subject);
      return '';
    });

  if (colors.color) subjects.push('COLOR');
  if (colors.textcolor) subjects.push('TEXTCOLOR');

  return { cleanedText: cleanedText.trim(), subjects, colors };
};

// Pendant le streaming, l'étiquette arrive morceau par morceau (« SUB », « SUBJECT:PRO »…) :
// on coupe le texte dès qu'elle commence pour qu'elle ne clignote jamais à l'écran.
export const visibleText = (raw: string): string => {
  const tagStart = raw.indexOf('SUBJECT:');
  const text = tagStart >= 0 ? raw.slice(0, tagStart) : raw;
  return text.replace(/S(?:U(?:B(?:J(?:E(?:C(?:T)?)?)?)?)?)?$/, '').trimEnd();
};
