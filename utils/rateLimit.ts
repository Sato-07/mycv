// Limite en mémoire, par clé (IP + route) : protège la facture des API contre un visiteur ou un script qui spamme.
// Suffisant pour un seul conteneur ; elle se remet à zéro au redémarrage.

const WINDOW_MS = 10 * 60 * 1000;

const hits = new Map<string, number[]>();

export const isRateLimited = (key: string, maxRequests = 20): boolean => {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= maxRequests) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Évite que la table grossisse sans fin si beaucoup d'IP différentes passent.
  if (hits.size > 5000) hits.clear();
  return false;
};

export const clientKey = (headers: Record<string, string | string[] | undefined>, remote?: string): string => {
  const forwarded = headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  return first?.trim() || remote || 'inconnu';
};
