import Head from "next/head";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { AiStudio } from "@/components/AiStudio";
import { CaseStudies } from "@/components/CaseStudies";
import { Offers } from "@/components/Offers";
import { ContactSection } from "@/components/ContactSection";
import { FloatingAsk } from "@/components/FloatingAsk";
import { Footer } from "@/components/Footer";
import { Modal } from "@/components/Modal";
import { useThemeSwitcher } from "@/hook/useThemeSwitcher";
import { useChat } from "@/hook/useChat";
import handleMessage from "@/utils/HandleMessage";
import { caseStudies } from "@/data/profile";

const TITLE = "Achraf Baitar · Développeur freelance, automatisation IA pour PME";
const DESCRIPTION = "J'automatise la prospection et la gestion des PME avec l'IA : outils sur mesure, automatisations, sites web. Belgique.";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('DESCRIPTION');
  const [themeSettings, setThemeSettings] = useState<{ backgroundColor?: string }>({});
  const [textSettings, setTextSettings] = useState<{ textColor?: string }>({});
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [showServerImage, setShowServerImage] = useState(false);
  const [mode, setMode] = useThemeSwitcher();
  const inputRef = useRef<HTMLInputElement>(null);
  const studioRef = useRef<HTMLElement | null>(null);

  const processMessage = handleMessage(
    setActiveSection,
    setThemeSettings,
    setTextSettings,
    setShowServerImage,
    undefined,
    setMode
  );
  const { messages, status, send } = useChat(processMessage);

  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [studioViewRef, studioInView] = useInView({ threshold: 0.2 });

  // Amène le visiteur au chat (et y pose la question s'il en a une) depuis n'importe où dans la page.
  const talk = (question?: string) => {
    studioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (question) {
      void send(question);
    } else {
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 500);
    }
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ backgroundColor: themeSettings.backgroundColor, color: textSettings.textColor }}
        className="bg-dots relative min-h-screen overflow-x-clip transition-colors duration-700"
      >
        <NavBar mode={mode} setMode={setMode} onTalk={() => talk()} />

        <div className="mx-auto max-w-7xl px-12 lg:px-6 sm:px-4">
          <div ref={heroRef}>
            <Hero showServerImage={showServerImage} onTalk={() => talk()} />
          </div>

          <section
            id="assistant"
            ref={(node) => {
              studioRef.current = node;
              studioViewRef(node);
            }}
            className="scroll-mt-24 pt-24 lg:pt-16"
          >
            <div className="mb-10 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50 dark:text-light/50">Assistant IA</p>
              <h2 className="mx-auto mt-3 max-w-3xl text-5xl font-medium leading-tight lg:text-4xl sm:text-3xl">
                Demandez-lui ce que je peux <span className="text-ai">automatiser chez vous</span>.
              </h2>
            </div>
            <AiStudio
              ref={inputRef}
              activeSection={activeSection}
              messages={messages}
              status={status}
              onSend={(text) => void send(text)}
              setModal={setModal}
            />
          </section>

          <CaseStudies onAsk={talk} />
          <section id="offres" className="w-full scroll-mt-24 px-10 pt-32 lg:pt-20 sm:px-0">
            <Offers />
          </section>
          <ContactSection />
        </div>
        <Footer />
      </div>

      <FloatingAsk visible={!heroInView && !studioInView} onClick={() => talk()} />
      {/* Hors de tout conteneur positionné : l'aperçu suit la souris en coordonnées de page. */}
      <Modal modal={modal} projects={caseStudies} />
    </>
  );
}
