import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { clientKey, isRateLimited } from '@/utils/rateLimit';

// Voix de l'avatar : ElevenLabs, phrase par phrase, pour que l'avatar commence à parler
// pendant que Claude écrit encore la suite.
// Voix « Adam » par défaut ; ELEVENLABS_VOICE_ID permet d'en choisir une autre dans la bibliothèque.
const DEFAULT_VOICE_ID = 'pNInz6obpgDQGcFmaJgB';
// Modèle multilingue le plus rapide : la latence compte plus que la finesse pour une phrase de site.
const MODEL_ID = 'eleven_flash_v2_5';

const BodySchema = z.object({ text: z.string().trim().min(1).max(600) });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end();
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  // 501 : le navigateur bascule sur sa voix intégrée au lieu d'échouer.
  if (!apiKey) return res.status(501).json({ error: 'Synthèse vocale non configurée.' });

  const parsed = BodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Texte invalide.' });

  // Une réponse = 2 à 4 phrases = autant d'appels ; plafond large mais borné.
  if (isRateLimited(`tts:${clientKey(req.headers, req.socket.remoteAddress)}`, 120)) {
    return res.status(429).json({ error: 'Trop de demandes.' });
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify({ text: parsed.data.text, model_id: MODEL_ID, language_code: 'fr' }),
      }
    );
    if (!upstream.ok) {
      console.error(`Erreur ElevenLabs ${upstream.status} :`, await upstream.text());
      return res.status(502).json({ error: 'Synthèse vocale indisponible.' });
    }
    const audio = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(audio);
  } catch (error) {
    console.error('Erreur synthèse vocale :', error);
    return res.status(502).json({ error: 'Synthèse vocale indisponible.' });
  }
}
