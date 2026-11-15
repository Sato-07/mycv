import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { TalkingAvatar } from '@/components/stage/TalkingAvatar';
import { FullChat } from '@/components/full/FullChat';
import { HeroTitle } from '@/components/full/HeroTitle';
import { useChat } from '@/hook/useChat';
import { bookingHref } from '@/data/profile';
import { ChatAction } from '@/types/type';

const TITLE = 'Parler à Achraf · Développeur freelance, automatisation IA pour PME';
const DESCRIPTION = "Posez votre question à mon avatar IA : il vous dit ce que je peux automatiser dans votre PME.";

// Page pleine : le titre, l'avatar et le chat, rien d'autre, sur un seul écran.
// Grand écran : titre en haut à gauche, chat en bas à gauche, avatar sur toute la hauteur à droite.
// Mobile : titre, avatar, puis chat, les uns sous les autres.
// Dès la première question, le titre s'envole et la conversation prend toute la colonne.
export default function AvatarPage() {
  const [subject, setSubject] = useState<string | null>(null);
  const onAction = ({ subjects }: ChatAction) => setSubject(subjects.find((s) => s !== 'NULL') ?? null);
  const { messages, status, send, reset } = useChat(onAction);
  const started = messages.length > 0;
  // La grille ne change qu'une fois le titre sorti : pendant son envol, il garde sa place.
  const [titleGone, setTitleGone] = useState(false);
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

      <section className="grain relative overflow-hidden">
        {/* Pas de z-index ni de transform sur la colonne de l'avatar : sa fusion « lighten » doit voir le fond de la page. */}
        <div
          className={`relative mx-auto grid h-[100svh] min-h-[680px] max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] grid-rows-[1fr_auto] gap-x-12 px-12 xl:px-8 lg:h-auto lg:min-h-[100svh] lg:grid-cols-1 lg:grid-rows-none lg:gap-y-6 lg:px-6 lg:pb-10 ${
            roomy
              ? "[grid-template-areas:'chat_avatar'_'chat_avatar'] lg:[grid-template-areas:'avatar'_'chat']"
              : "[grid-template-areas:'title_avatar'_'chat_avatar'] lg:[grid-template-areas:'title'_'avatar'_'chat']"
          }`}
        >
          <AnimatePresence onExitComplete={() => setTitleGone(true)}>
            {!started && (
              <div key="title" className="relative z-[1] self-start pt-[max(6.5rem,15vh)] [grid-area:title] lg:pt-28 lg:text-center">
                <HeroTitle />
              </div>
            )}
          </AnimatePresence>

          <div className={`relative z-[1] min-h-0 pb-[5vh] [grid-area:chat] lg:pb-0 ${roomy ? 'pt-24 lg:h-[60svh] lg:pt-0' : 'pt-6'}`}>
            <FullChat messages={messages} status={status} subject={subject} onSend={ask} onReset={restart} />
          </div>

          <div className={`relative h-[calc(100svh-5.5rem)] max-h-[1000px] self-end [grid-area:avatar] lg:h-[48svh] lg:min-h-[320px] ${roomy ? 'lg:mt-24' : ''}`}>
            {/* Nom géant en filigrane derrière l'avatar. */}
            <div
              aria-hidden
              className={`text-outline pointer-events-none absolute left-1/2 top-[8%] w-screen -translate-x-1/2 select-none text-center text-[19vw] font-semibold leading-none transition-[letter-spacing,opacity] duration-[1600ms] ease-out ${
                roomy ? 'tracking-[0.04em] opacity-50' : 'tracking-tight'
              }`}
            >
              ACHRAF
            </div>
            <TalkingAvatar speaking={status === 'streaming'} waveSignal={0} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
