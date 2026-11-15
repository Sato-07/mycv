import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { MAX_MESSAGE_LENGTH } from '@/utils/constant';
import { CONTACT_EMAIL } from '@/data/profile';
import { SYSTEM_PROMPT } from '@/utils/systemPrompt';
import { isRateLimited } from '@/utils/rateLimit';

// Lit ANTHROPIC_API_KEY dans l'environnement (.env, jamais commité).
const client = new Anthropic();

const MODEL = 'claude-sonnet-5-5';

// L'historique vient du navigateur : sans plafond, un visiteur peut faire payer un prompt énorme.
const BodySchema = z.object({
  conversation: z.string().max(6000).default(''),
  userMessage: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
});

const clientIp = (req: NextApiRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  return first?.trim() || req.socket.remoteAddress || 'inconnu';
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Message invalide ou trop long.' });
  }
  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({
      error: `Vous avez posé beaucoup de questions d'un coup. Réessayez dans quelques minutes, ou écrivez à ${CONTACT_EMAIL}.`,
    });
  }
  const { conversation, userMessage } = parsed.data;

  const stream = client.beta.messages.stream({
    model: MODEL,
    // Plafond de coût par réponse ; il inclut la réflexion, d'où la marge au-delà des 3-6 phrases demandées.
    max_tokens: 2000,
    // Effort bas : une conversation de site n'a pas besoin de réflexion longue, et la première phrase arrive plus vite.
    output_config: { effort: 'low' },
    // Si Sonnet refuse une demande, l'API la rejoue sur un modèle de repli dans le même appel.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    // Le prompt système est identique à chaque requête : le mettre en cache réduit le coût d'entrée.
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages: [
      {
        role: 'user',
        content: conversation
          ? `Conversation précédente :\n${conversation}\n\nNouveau message du visiteur : ${userMessage}`
          : userMessage,
      },
    ],
  });

  // Le visiteur a fermé la page : inutile de payer la suite de la réponse.
  res.on('close', () => {
    if (!res.writableEnded) stream.abort();
  });

  const startStreaming = () => {
    if (res.headersSent) return;
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      // Sans cet en-tête, nginx garde la réponse en tampon et le texte arrive d'un bloc.
      'X-Accel-Buffering': 'no',
    });
  };

  stream.on('text', (delta) => {
    startStreaming();
    res.write(delta);
  });

  try {
    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal' && !res.headersSent) {
      startStreaming();
      res.write(`Je ne peux pas répondre à ça. Pour toute question, écrivez à ${CONTACT_EMAIL}. SUBJECT:NULL;`);
    }
    startStreaming();
    res.end();
  } catch (error) {
    if (res.writableEnded || error instanceof Anthropic.APIUserAbortError) return;
    if (error instanceof Anthropic.APIError) {
      console.error(`Erreur API Anthropic ${error.status} :`, error.message);
    } else {
      console.error('Erreur assistant :', error);
    }
    if (res.headersSent) return res.end();
    const status = error instanceof Anthropic.RateLimitError ? 429 : 500;
    return res.status(status).json({ error: "L'assistant est indisponible pour le moment. Écrivez-moi directement." });
  }
}
