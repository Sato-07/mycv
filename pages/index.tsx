import Head from "next/head";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { NavBar } from "@/components/NavBar";
import { GREETING, Stage } from "@/components/stage/Stage";
import { CaseStudies } from "@/components/CaseStudies";
import { Offers } from "@/components/Offers";
import { Parcours } from "@/components/Parcours";
import { ContactSection } from "@/components/ContactSection";
import { FloatingAsk } from "@/components/FloatingAsk";
import { Footer } from "@/components/Footer";
import { useChat } from "@/hook/useChat";
import { useVoice } from "@/hook/useVoice";
import { ChatAction } from "@/types/type";

const TITLE = "Achraf Baitar · Développeur freelance, automatisation IA pour PME";
const DESCRIPTION = "Parlez à mon avatar IA : j'automatise la prospection et la gestion des PME avec l'IA. Outils sur mesure, automatisations, sites web. Belgique.";

// Une phrase est complète quand sa ponctuation finale est suivie d'un espace : elle peut partir à la voix.
const SENTENCE = /[\s\S]*?[.!?…](?=\s)/g;

export default function Home() {
  const [subject, setSubject] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spokenUpTo = useRef(0);
  const voice = useVoice();

  // Découpe le texte qui arrive en phrases et les envoie une à une à la voix.
  const feedVoice = (text: string, done: boolean) => {
    const rest = text.slice(spokenUpTo.current);
    let consumed = 0;
    for (const match of Array.from(rest.matchAll(SENTENCE))) {
      voice.say(match[0]);
      consumed = (match.index ?? 0) + match[0].length;
    }
    spokenUpTo.current += consumed;
    if (done) {
      voice.say(text.slice(spokenUpTo.current));
      spokenUpTo.current = 0;
    }
  };

  const onAction = ({ subjects }: ChatAction) => setSubject(subjects.find((s) => s !== 'NULL') ?? null);
  const { messages, status, send } = useChat(onAction, feedVoice);

  const ask = (text: string) => {
    // Le clic d'envoi est le geste qui autorise le navigateur à jouer le son.
    voice.unlock();
    voice.stop();
    spokenUpTo.current = 0;
    setSubject(null);
    void send(text);
  };

  const [stageViewRef, stageInView] = useInView({ threshold: 0.25 });

  const backToAvatar = (question?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (question) ask(question);
    else window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 600);
  };

  return (
    <>
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
        <Stage
          ref={inputRef}
          messages={messages}
          status={status}
          speaking={voice.speaking}
          muted={voice.muted}
          subject={subject}
          analyserRef={voice.analyserRef}
          onSend={ask}
          onListenGreeting={() => {
            voice.unlock();
            voice.stop();
            voice.say(GREETING);
          }}
          onToggleMute={() => voice.setMuted(!voice.muted)}
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
    </>
  );
}
