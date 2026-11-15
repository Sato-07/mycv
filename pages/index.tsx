import {Skills} from "@/components/Skills";
import {ExampleQuestions} from "@/components/ui/ExampleQuestions";
import {Experience} from "@/components/Experience";
import {HireMe} from "@/components/ui/HireMe";
import {Layout} from "@/components/Layout";
import {NavBar} from "@/components/NavBar";
import {Project} from "@/components/Project";
import {Questions} from "@/components/Help";
import {CaseStudies} from "@/components/CaseStudies";
import {Offers} from "@/components/Offers";
import {ContactSection} from "@/components/ContactSection";
import FotoProfil from '@/public/hb7_sport.png';
import FotoProfilSever from '@/public/AB7.png';
import lightbuble from '@/public/miscellaneous_icons_1.svg';
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {Modal} from "@/components/Modal";
import {AnimatedTitle} from "@/components/ui/AnimatedTitle";
import {useThemeSwitcher} from "@/hook/useThemeSwitcher";
import {AnimatedDescription} from "@/components/ui/AnimatedDescription";
import {Messenger} from "@/components/Messenger";
import { useMessages } from "@/hook/useMessage";
import handleMessage from "@/utils/HandleMessage";
import { bookingHref, caseStudies, skills } from "@/data/profile";

const TITLE = "Achraf Baitar · Développeur freelance, automatisation IA pour PME";
const DESCRIPTION = "J'automatise la prospection et la gestion des PME avec l'IA : outils sur mesure, automatisations, sites web. Belgique.";

export default function Home() {

  const [activeSection, setActiveSection] = useState<string>('DESCRIPTION');
  const [themeSettings, setThemeSettings] = useState({ backgroundColor: '#' });
  const [textSettings, setTextSettings] = useState({ textColor: '#' });
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [showServerImage, setShowServerImage] = useState(false);
  const [showExampleQuestions, setShowExampleQuestions] = useState(false);
  const [mode, setMode] = useThemeSwitcher();
  const processMessage = handleMessage(
    setActiveSection,
    setThemeSettings,
    setTextSettings,
    setShowServerImage,
    setShowExampleQuestions,
    setMode
  );

const { messages, handleNavBarMessage } = useMessages((message) => {
  processMessage(message);
});
  const handleAnimationComplete = () => {

    if (activeSection === 'DESCRIPTION') {
      setShowExampleQuestions(true);
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
      <NavBar onSendMessage={handleNavBarMessage} />
      <main style={{ backgroundColor: themeSettings.backgroundColor, color: textSettings.textColor }} className={`flex ${mode} items-center text-dark dark:text-light bg-light dark:bg-dark w-full`}>
        <Layout className={`lg:pt-32 sm:pt-28`}>
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className='w-1/2 flex items-center  justify-center sm:pl-0 md: lg:pl-0 '>
              <Image
                src={showServerImage ? FotoProfilSever : FotoProfil}
                alt="Achraf Baitar"
                width={450}
                className='relative h-auto right-5 -top-40 md:inline-block sm:h-full sm:w-full sm:-top-20 sm:right-0'
                priority
              />
              <HireMe />
            </div>
            <div className='w-1/2 flex flex-col items-center pb-32 self-center lg:w-full lg:text-center sm:p-5 '>
              <AnimatedTitle className='!text-[3.2rem] font-mont font-normal leading-none !text-left pb-5 lg:!text-center xl:!text-5xl lg:!text-4xl md:!text-2xl sm:!text-2xl sm:w-full' text="J'automatise la prospection et la gestion des PME avec l'IA." />

              <p>
              Je suis Achraf, développeur freelance en Belgique. Je construis des outils qui font gagner du temps
              et des clients aux entreprises : un logiciel de gestion en production pour les paysagistes, un radar
              de prospection qui dit qui appeler chaque matin, une veille des marchés publics qui lit les cahiers
              des charges. Vous m'expliquez ce qui vous coûte des heures, je vous livre l'outil qui s'en charge,
              à prix fixé d'avance.
              </p>
              <div className='flex items-center gap-4 mt-8 self-start lg:self-center sm:flex-col'>
                <a
                  href={bookingHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='rounded-full bg-dark dark:bg-light text-light dark:text-dark border border-solid border-dark dark:border-light px-6 py-2.5 font-medium hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light transition-colors'
                >
                  Réserver un appel
                </a>
                <a href="#realisations" className='font-light underline underline-offset-4 hover:opacity-50'>
                  Voir mes réalisations
                </a>
              </div>
            </div>
          </div>
          <section className='pt-52 sm:pt-1 lg:pt-32  md:h-[90%] md:pt-0 h-screen w-full sm:h-screen flex'>

            <div id="about" className={`w-2/3  px-10 flex overflow-auto flex-col sm:hidden`}>
              <AnimatedDescription
              show={activeSection === 'DESCRIPTION'}
              title="Posez vos questions à mon IA."
              paragraph="Ce panneau est piloté par un assistant IA : demandez-lui ce que je pourrais automatiser chez vous, ce que j'ai déjà livré, mes offres ou mes compétences, et la page s'adapte à votre question. C'est un petit aperçu de ce que je construis pour mes clients. Vous pouvez même lui demander de changer les couleurs du site."
              onAnimationComplete={handleAnimationComplete}

               />
              <Skills skills={skills} show={activeSection === 'SKILLS'} />
              <Experience show={activeSection === 'EDUCATION'}  key={activeSection}  />
              {activeSection === 'OFFERS' && <Offers compact />}

              <div id="projects" className='w-full grid gap-16'>

                <AnimatedTitle show={activeSection === 'PROJECT'} className='text-8xl font-medium leading-none flex items-center justify-center !text-left pb-2' text="Réalisations" />
                {caseStudies.map((study, index) => (
                  <Project url={study.url} key={study.title} index={index} title={study.title} subtitle={study.tag} setModal={setModal} show={activeSection === 'PROJECT'} />
                ))}
              </div>
              <ExampleQuestions show={showExampleQuestions} onExampleSelect={setSelectedExample} />
              <Modal modal={modal} projects={caseStudies} />
            </div>
            <div className='w-1/3 overflow-hidden sm:w-full lg:w-1/3 flex flex-col'>

              <Messenger onSendMessage={processMessage} Navmessages={messages} selectedExample={selectedExample} />
            </div>
          </section>
          <Questions />
          <CaseStudies />
          <section id="offres" className='w-full pt-32 lg:pt-20 px-10 sm:px-5'>
            <Offers />
          </section>
          <ContactSection />
        </Layout>
        <div className='absolute right-8 bottom-8 inline-block w-24 sm:hidden md:hidden lg:hidden'>
          <Image src={lightbuble} alt=''  className='w-auto h-auto ' />
        </div>
      </main>
    </>
  );
}
