import Head from "next/head";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { MotionConfig } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CaseStudies } from "@/components/CaseStudies";
import { Offers } from "@/components/Offers";
import { Parcours } from "@/components/Parcours";
import { ContactSection } from "@/components/ContactSection";
import { FloatingAsk } from "@/components/FloatingAsk";
import { Footer } from "@/components/Footer";
import { useChat } from "@/hook/useChat";
import { ChatAction } from "@/types/type";

const TITLE = "Achraf Baitar · Développeur freelance, automatisation IA pour PME";
const DESCRIPTION = "Parlez à mon avatar IA : j'automatise la prospection et la gestion des PME avec l'IA. Outils sur mesure, automatisations, sites web. Belgique.";

export default function Home() {
  const [subject, setSubject] = useState<string | null>(null);
  // Le projet qu'il présente sur son écran, depuis « Achraf vous l'explique ».
  const [showcase, setShowcase] = useState<string | null>(null);
  const onAction = ({ subjects }: ChatAction) => setSubject(subjects.find((s) => s !== 'NULL') ?? null);
  // Pas de synthèse vocale ici : la voix est dans la vidéo, les réponses s'écrivent pendant qu'il parle.
  const { messages, status, send, reset } = useChat(onAction);

  const ask = (text: string) => {
    setSubject(null);
    void send(text);
  };

  const [stageViewRef, stageInView] = useInView({ threshold: 0.25 });

  const backToAvatar = (question?: string, media?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Un projet filmé : il se pousse et le montre ; une autre question le ramène au bureau.
    if (question) {
      setShowcase(media ?? null);
      ask(question);
    } else {
      window.setTimeout(() => document.getElementById('avatar-input')?.focus({ preventScroll: true }), 600);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div ref={stageViewRef}>
        <CinemaHero
          messages={messages}
          status={status}
          subject={subject}
          onSend={ask}
          onReset={() => {
            reset();
            setSubject(null);
            setShowcase(null);
          }}
          showcase={showcase}
        />
      </div>
      <div className="mx-auto max-w-7xl">
        <CaseStudies onAsk={backToAvatar} />
        <Offers />
        <Parcours />
        <ContactSection onTalk={() => backToAvatar()} />
      </div>
      <Footer />
      <FloatingAsk visible={!stageInView} onClick={() => backToAvatar()} />
    </MotionConfig>
  );
}
