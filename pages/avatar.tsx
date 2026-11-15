import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { TalkingAvatar } from '@/components/stage/TalkingAvatar';
import { FullChat } from '@/components/full/FullChat';
import { useChat } from '@/hook/useChat';
import { bookingHref } from '@/data/profile';
import { ChatAction } from '@/types/type';

const TITLE = 'Parler à Achraf · Développeur freelance, automatisation IA pour PME';
const DESCRIPTION = "Posez votre question à mon avatar IA : il vous dit ce que je peux automatiser dans votre PME.";

// Page pleine : le titre, l'avatar et le chat, rien d'autre, sur un seul écran.
// Grand écran : titre en haut à gauche, chat en bas à gauche, avatar sur toute la hauteur à droite.
// Mobile : titre, avatar, puis chat, les uns sous les autres.
export default function AvatarPage() {
  const [subject, setSubject] = useState<string | null>(null);
  const onAction = ({ subjects }: ChatAction) => setSubject(subjects.find((s) => s !== 'NULL') ?? null);
  const { messages, status, send } = useChat(onAction);

  const ask = (text: string) => {
    setSubject(null);
    void send(text);
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-12 py-5 text-sm xl:px-8 lg:px-6">
        <Logo />
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
        <div className="relative mx-auto grid h-[100svh] min-h-[680px] max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] grid-rows-[1fr_auto] gap-x-12 px-12 [grid-template-areas:'title_avatar'_'chat_avatar'] xl:px-8 lg:h-auto lg:min-h-[100svh] lg:grid-cols-1 lg:grid-rows-none lg:gap-y-6 lg:px-6 lg:pb-10 lg:[grid-template-areas:'title'_'avatar'_'chat']">
          <div className="relative z-[1] self-start pt-[max(6.5rem,15vh)] [grid-area:title] lg:pt-28 lg:text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-light/50">Développeur freelance · Belgique</p>
            <h1 className="mt-6 text-[clamp(2.5rem,min(5vw,9vh),6.25rem)] font-normal leading-[0.98] tracking-tight [text-wrap:balance]">
              J'automatise votre PME <span className="font-light italic text-light/45">avec l'IA.</span>
            </h1>
            <p className="mt-[3vh] max-w-md text-lg [@media(max-height:780px)]:hidden lg:[@media(max-height:780px)]:block font-light leading-relaxed text-light/60 lg:mx-auto lg:text-base">
              Prospection, devis, relances, veille : des outils sur mesure, à prix fixé d'avance. Posez votre question à mon double.
            </p>
          </div>

          <div className="relative z-[1] pb-[5vh] pt-6 [grid-area:chat] lg:pb-0">
            <FullChat messages={messages} status={status} subject={subject} onSend={ask} />
          </div>

          <div className="relative h-[calc(100svh-5.5rem)] max-h-[1000px] self-end [grid-area:avatar] lg:h-[48svh] lg:min-h-[320px]">
            {/* Nom géant en filigrane derrière l'avatar. */}
            <div
              aria-hidden
              className="text-outline pointer-events-none absolute left-1/2 top-[8%] w-screen -translate-x-1/2 select-none text-center text-[19vw] font-semibold leading-none tracking-tight"
            >
              ACHRAF
            </div>
            <TalkingAvatar speaking={status === 'streaming'} waveSignal={0} />
          </div>
        </div>
      </section>
    </>
  );
}
