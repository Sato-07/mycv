// Limite en mémoire, par adresse IP : protège la facture de l'API contre un visiteur (ou un script) qui spamme le chat.
// Suffisant pour un seul conteneur ; elle se remet à zéro au redémarrage.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

const hits = new Map<string, number[]>();

export const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Évite que la table grossisse sans fin si beaucoup d'IP différentes passent.
  if (hits.size > 5000) hits.clear();
  return false;
};
