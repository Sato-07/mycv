import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { CinemaScene } from '@/components/cinema/CinemaScene';
import { CinemaOpening } from '@/components/cinema/CinemaOpening';
import { FullChat } from '@/components/full/FullChat';
import { HeroTitle } from '@/components/full/HeroTitle';
import { useChat } from '@/hook/useChat';
import { bookingHref } from '@/data/profile';
import { ChatAction } from '@/types/type';

const TITLE = 'Parler à Achraf · Développeur freelance, automatisation IA pour PME';
const DESCRIPTION = "Posez votre question à mon avatar IA : il vous dit ce que je peux automatiser dans votre PME.";

// Mode cinéma : un plan 16:9 en plein écran (il se retourne, fait coucou, parle), la scène à droite ;
// le titre et le chat occupent la moitié gauche, vide et noire.
// Mobile : le plan recadré sur lui en haut, puis le titre et le chat.
// Dès la première question, le titre s'envole, la conversation prend la colonne et la caméra s'avance vers lui.
export default function AvatarPage() {
  const [subject, setSubject] = useState<string | null>(null);
  const onAction = ({ subjects }: ChatAction) => setSubject(subjects.find((s) => s !== 'NULL') ?? null);
  const { messages, status, send, reset } = useChat(onAction);
  const started = messages.length > 0;
  // La grille ne change qu'une fois le titre sorti : pendant son envol, il garde sa place.
  const [titleGone, setTitleGone] = useState(false);
  const [listenSignal, setListenSignal] = useState(0);
  const roomy = started && titleGone;

  const restart = () => {
    reset();
    setSubject(null);
    setTitleGone(false);
  };

  const ask = (text: string) => {
    setSubject(null);
    void send(text);
  };

  return (
    <MotionConfig reducedMotion="user">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-12 py-5 text-sm xl:px-8 lg:px-6">
        <div className="flex items-center gap-4">
          <Logo />
          {/* Le titre parti, le nom reste lisible à côté du logo. */}
          <AnimatePresence>
            {roomy && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-light/55 sm:hidden"
              >
                Achraf Baitar · développeur freelance
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-7">
          <Link href="/" className="text-light/70 transition hover:text-light sm:hidden">
            Voir le site complet
          </Link>
          <a
            href={bookingHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-light px-5 py-2.5 font-medium text-dark transition hover:scale-[1.03]"
          >
            Réserver un appel
          </a>
        </div>
      </header>

      <CinemaOpening />
      <section className="grain relative min-h-[max(100svh,640px)] overflow-hidden bg-dark lg:min-h-[100svh]">
        <CinemaScene
          speaking={status === 'streaming'}
          listenSignal={listenSignal}
          closeUp={roomy}
          className="absolute inset-0 lg:relative lg:inset-auto lg:h-[56svh] lg:min-h-[300px]"
        />

        <div className="relative z-[2] mx-auto flex h-[max(100svh,640px)] max-w-[1600px] px-12 xl:px-8 lg:-mt-24 lg:h-auto lg:px-6 lg:pb-8">
          <div className="flex w-[min(44vw,640px)] flex-col lg:w-full">
            <AnimatePresence onExitComplete={() => setTitleGone(true)}>
              {!started && (
                <div key="title" className="pt-[max(7rem,17vh)] lg:pt-0 lg:text-center">
                  <HeroTitle />
                </div>
              )}
            </AnimatePresence>

            <div className={`mt-auto pb-[6vh] lg:pb-0 ${roomy ? 'flex min-h-0 flex-1 flex-col pt-28 lg:h-[62svh] lg:flex-none lg:pt-10' : 'pt-8'}`}>
              <FullChat messages={messages} status={status} subject={subject} onSend={ask} onReset={restart} onListen={() => setListenSignal((n) => n + 1)} />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
