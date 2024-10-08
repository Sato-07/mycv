import {Skills} from "@/components/Skills";
import {ExampleQuestions} from "@/components/ui/ExampleQuestions";
import {Experience} from "@/components/Experience";
import {HireMe} from "@/components/ui/HireMe";
import {Layout} from "@/components/Layout";
import {NavBar} from "@/components/NavBar";
import {Project} from "@/components/Project";
import {Questions} from "@/components/Help";
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

const skills = [
  { name: 'CSS', x: '-5vw', y: '-8vw' },
  { name: 'Python', x: '5vw', y: '8vw' },
  { name: 'tailwindcss', x: '-14vw', y: '10vw' },
  { name: 'HTML', x: '12vw', y: '-10vw' },
  { name: 'NextJS', x: '17vw', y: '6vw' },
  { name: 'Javascript', x: '-16vw', y: '-6vw' },
];

const projects = [
  { title: "Project: Chaire Familles en Entreprises", src: "chaireFamille.png", color: "#000000", url: "https://chairefamilles.ichec.be/" },
  { title: "Projet: Whisper audio transcription", src: "whisperAudio.png", color: "#8C8C8C", url: "https://github.com/Sato-07/streamlitWhisper/tree/main" },
  { title: "Projet: Twitter Clone", src: "twitter.png", color: "#EFE8D3", url: "https://github.com/Sato-07/Twitter-clone/tree/main/my-app" },
];

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
        <title>Portfolio</title>
        <meta name="description" content="Generated by create next app" />
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
                alt="developer"
                width={450}
                className='relative h-auto right-5 -top-40 md:inline-block sm:h-full sm:w-full sm:-top-20 sm:right-0'
                priority
              />
              <HireMe />
            </div>
            <div className='w-1/2 flex flex-col items-center pb-32 self-center lg:w-full lg:text-center sm:p-5 '>
              <AnimatedTitle className='!text-[3.2rem] font-mont font-normal leading-none capitalize !text-left pb-5 lg:!text-center xl:!text-5xl lg:!text-4xl md:!text-2xl sm:!text-2xl sm:w-full' text="Transform your vision into reality through code." />

              <p>
              I'm Achraf, a passionate developer. With my knowledge in deep learning, data science, and web development,
              I combine the power of Hugging Face models with my creative approach to front-end development.
              My skills in Python, proficiency in Next.js, and strong understanding of databases provide a balanced combination of creativity and technical expertise.
              I invite you to explore my professional world to discover my work and passion for innovation.
              </p>
            </div>
          </div>
          <section className='pt-52 sm:pt-1 lg:pt-32  md:h-[90%] md:pt-0 h-screen w-full sm:h-screen flex'>

            <div id="about" className={`w-2/3  px-10 flex overflow-auto flex-col sm:hidden`}>
              <AnimatedDescription 
              show={activeSection === 'DESCRIPTION'} 
              title="Discover my portfolio in a unique way." 
              paragraph="Welcome to my portfolio, where exploring content takes on a whole new dimension. My site offers an exceptional interactive experience, allowing you to engage with a friendly AI to discover my content in a personalized way. Start now by asking questions about my skills, projects, and academic background. Feel free to customize the site's appearance, including text and background colors, according to your preferences." 
              onAnimationComplete={handleAnimationComplete}

               />              
              <Skills skills={skills} show={activeSection === 'SKILLS'} />
              <Experience show={activeSection === 'EDUCATION'}  key={activeSection}  />

              <div id="projects" className='w-full grid gap-16'>

                <AnimatedTitle show={activeSection === 'PROJECT'} className='text-8xl font-medium leading-none flex items-center justify-center capitalize !text-left pb-2' text="Project" />
                {projects.map((project, index) => (
                  <Project url={project.url} key={index} index={index} title={project.title} src={project.src} setModal={setModal} show={activeSection === 'PROJECT'} />
                ))}
              </div>
              <ExampleQuestions show={showExampleQuestions} onExampleSelect={setSelectedExample} />
              <Modal modal={modal} projects={projects} />
            </div>
            <div className='w-1/3 overflow-hidden sm:w-full lg:w-1/3 flex flex-col'>

              <Messenger onSendMessage={processMessage} Navmessages={messages} selectedExample={selectedExample} />
            </div>
          </section>
          <Questions />
        </Layout>
        <div className='absolute right-8 bottom-8 inline-block w-24 sm:hidden md:hidden lg:hidden'>
          <Image src={lightbuble} alt=''  className='w-auto h-auto ' />
        </div>
      </main>
    </>
  );
}