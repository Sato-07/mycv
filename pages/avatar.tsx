import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { CinemaHero } from '@/components/cinema/CinemaHero';
import { useChat } from '@/hook/useChat';
import { bookingHref } from '@/data/profile';
import { ChatAction } from '@/types/type';

const TITLE = 'Parler à Achraf · Développeur freelance, automatisation IA pour PME';
const DESCRIPTION = "Posez votre question à mon avatar IA : il vous dit ce que je peux automatiser dans votre PME.";

// Le mode cinéma seul, sans le reste du site : lien direct à envoyer à un prospect.
export default function AvatarPage() {
  const [subject, setSubject] = useState<string | null>(null);
  const onAction = ({ subjects }: ChatAction) => setSubject(subjects.find((s) => s !== 'NULL') ?? null);
  const { messages, status, send, reset } = useChat(onAction);
  // Le titre parti, le nom passe à côté du logo.
  const [roomy, setRoomy] = useState(false);

  const restart = () => {
    reset();
    setSubject(null);
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

      <CinemaHero messages={messages} status={status} subject={subject} onSend={ask} onReset={restart} onRoomyChange={setRoomy} />
    </MotionConfig>
  );
}
