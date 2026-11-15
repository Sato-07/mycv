import { useRef, useState } from 'react';
import { VOICE_ENABLED } from '@/data/profile';

// Petit WAV silencieux : le jouer pendant un clic « déverrouille » l'audio sur Safari et Chrome mobile,
// sinon les phrases suivantes, lancées après un fetch, seraient bloquées par l'autoplay.
const SILENCE =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=';

type Engine = 'unknown' | 'eleven' | 'browser';

// Fait parler l'avatar phrase par phrase : chaque phrase est demandée dès qu'elle est complète
// (pendant que Claude écrit la suite), puis jouée dans l'ordre.
export const useVoice = () => {
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMutedState] = useState(false);
  const mutedRef = useRef(false);
  const engine = useRef<Engine>('unknown');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  // Lu par les visuels (barres, avatar) dans leur propre boucle d'animation, sans rendu React.
  const analyserRef = useRef<AnalyserNode | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const generation = useRef(0);
  const pending = useRef(0);

  const ensureAudio = () => {
    if (typeof window === 'undefined') return null;
    if (!audioRef.current) {
      const audio = new Audio();
      audioRef.current = audio;
      try {
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        const analyser = context.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyser.connect(context.destination);
        contextRef.current = context;
        analyserRef.current = analyser;
      } catch {
        // Pas de Web Audio : la voix marche quand même, seules les barres seront simulées.
      }
    }
    void contextRef.current?.resume();
    return audioRef.current;
  };

  // À appeler dans un geste du visiteur (clic, envoi) avant toute parole.
  const unlock = () => {
    const audio = ensureAudio();
    if (!audio || !audio.paused) return;
    audio.src = SILENCE;
    audio.play().catch(() => undefined);
  };

  const fetchClip = async (text: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (response.status === 501) {
        engine.current = 'browser';
        return null;
      }
      if (!response.ok) return null;
      engine.current = 'eleven';
      return URL.createObjectURL(await response.blob());
    } catch {
      return null;
    }
  };

  const playClip = (url: string) =>
    new Promise<void>((resolve) => {
      const audio = ensureAudio();
      if (!audio) return resolve();
      const done = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      audio.onended = done;
      audio.onerror = done;
      audio.src = url;
      audio.play().catch(done);
    });

  const speakWithBrowser = (text: string) =>
    new Promise<void>((resolve) => {
      if (!('speechSynthesis' in window)) return resolve();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      const french = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith('fr'));
      if (french) utterance.voice = french;
      // Certains navigateurs (sans voix installée, onglet en arrière-plan) ne déclenchent jamais onend :
      // sans ce délai de secours, l'avatar continuerait de « parler » indéfiniment.
      const fallback = window.setTimeout(() => resolve(), 1500 + text.length * 75);
      const done = () => {
        window.clearTimeout(fallback);
        resolve();
      };
      utterance.onend = done;
      utterance.onerror = done;
      window.speechSynthesis.speak(utterance);
    });

  const say = (sentence: string) => {
    const text = sentence.trim();
    if (!VOICE_ENABLED || !text || mutedRef.current) return;
    const gen = generation.current;
    // Le fetch part tout de suite : la phrase suivante est prête quand la précédente se termine.
    const clip = engine.current === 'browser' ? Promise.resolve(null) : fetchClip(text);
    pending.current += 1;
    queue.current = queue.current
      .then(async () => {
        const url = await clip;
        if (gen !== generation.current) {
          if (url) URL.revokeObjectURL(url);
          return;
        }
        // « Parle » seulement pendant le son, pas pendant le téléchargement de la première phrase.
        if (url) {
          setSpeaking(true);
          await playClip(url);
        } else {
          // Voix du navigateur si ElevenLabs n'est pas configuré, ou refuse cette phrase (quota, abonnement) :
          // sans ce repli, l'avatar restait muet.
          setSpeaking(true);
          await speakWithBrowser(text);
        }
      })
      .finally(() => {
        pending.current -= 1;
        if (pending.current <= 0) {
          pending.current = 0;
          setSpeaking(false);
        }
      });
  };

  const stop = () => {
    generation.current += 1;
    audioRef.current?.pause();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const setMuted = (value: boolean) => {
    mutedRef.current = value;
    setMutedState(value);
    if (value) stop();
  };

  return { speaking, muted, setMuted, say, stop, unlock, analyserRef };
};
