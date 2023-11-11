import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedText from '@/components/AnimatedText'
import HireMe from '@/components/HireMe'
import lightbuble from '@/public/miscellaneous_icons_1.svg'
import { Montserrat } from 'next/font/google'
import Experience from '@/components/Experience'
import Messenger from '@/components/Messenger'
import FotoProfil from '@/public/hb7_sport.png' 
import Description from '@/components/Description'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Skills from '@/components/Skills'
import useThemeSwitcher from '@/components/hook/useThemeSwitcher'
import Competences from '@/components/Competences'
import Modal from '@/components/Modal'
import Project from '@/components/Project'
import ExampleSentences from '@/components/ExampleSentences'
import NavBar from '@/components/NavBar'
import {MdOutlineQuestionMark} from 'react-icons/md'
import Questions from '@/components/Questions'
const montserra = Montserrat({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
    const [showProject, setshowProject] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showDescription, setshowDescription] = useState(true);
    const [mode,setMode] = useThemeSwitcher() as [string, (mode: string) => void];
    const [modal, setModal] = useState({ active: false, index: 0 });
    const [selectedExample, setSelectedExample] = useState<string>('');
    const [exampleSentencesVisible, setExampleSentencesVisible] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#f5f5f5'); // État initial vide
    const [textColor, setTextColor] = useState('#000'); // État initial vide
    const [serverDescription, setServerDescription] = useState<string[]>([]);
    const [showServerDescription, setShowServerDescription] = useState(false);



    

    const skills = [
      { name: 'CSS', x: '-5vw', y: '-8vw' },
      { name: 'Python', x: '5vw', y: '8vw' },
      { name: 'tailwindcss', x: '-14vw', y: '10vw' },
      { name: 'HTML', x: '12vw', y: '-10vw' },
      { name: 'NextJS', x: '17vw', y: '6vw' },
      { name: 'Javascript', x: '-16vw', y: '-6vw' },
      // Ajoutez d'autres compétences au besoin
    ];
    const projects = [
      {
        title: "Projet : C2 Montreal",
        src: "c2montreal.png",
        color: "#000000"
      },
      {
        title: "Projet : Office Studio",
        src: "officestudio.png",
        color: "#8C8C8C"
      },
      {
        title: "Locomotive",
        src: "locomotive.png",
        color: "#EFE8D3"
      },
      {
        title: "Silencio",
        src: "silencio.png",
        color: "#706D63"
      }
    ]


  
    
  const handleExampleSelect = (sentence: string) => {
    setSelectedExample(sentence);
  };
  
  type MessageObject = {
    subjects?: string[];
    code?: string;
    description?: string;
    textcode?: string;
    // Add other properties as needed
  };
  
  const handleSendFMessage = (message: Partial<MessageObject>) => {
    const subjectMessage = message.subjects ?? [] // Use an empty array as a default if subject is undefined
    

    console.log('Messages reçus avec grace :', message.subjects);
    console.log("code couleur : ", message.code);
    console.log(" coucou c'est le subjectMessage ", subjectMessage)
    try {
      subjectMessage.forEach((subjects) => {
        console.log("frerot c'est moie le subject",subjects)
        switch (subjects) {
          case 'SKILLS':
            setShowSkills(true);
            setShowExperience(false);
            setshowDescription(false);
            setshowProject(false);
            break;
          case 'EDUCATION':
            setShowExperience(true);
            setshowDescription(false);
            setShowSkills(false);
            setshowProject(false);
            break;
          case 'DESCRIPTION':
            setShowServerDescription(true);
            setShowExperience(false);
            setshowDescription(true);
            setShowSkills(false);
            setshowProject(false);
            setServerDescription([message.description||""]);
            localStorage.setItem('serverDescription', JSON.stringify([message.description ||'']));
            break;
          case 'DARKMODE':
            setBackgroundColor("");
            setMode("dark");
            document.documentElement.style.setProperty('--custom-gradient-color', "#f5f5f5");
            break;
          case 'LIGHTMODE':
            setBackgroundColor("");
            setMode("light");
            document.documentElement.style.setProperty('--custom-gradient-color', "#1B1B1B");
            break;
          case 'PROJECT':
            setshowProject(true);
            setShowExperience(false);
            setShowSkills(false);
            setshowDescription(false);
            break;
          case 'COLORATION':
            setBackgroundColor(message.code || "");
            document.documentElement.style.setProperty('--custom-gradient-color', message.code||"");
            break;
          case 'TEXTCOLOR':
            setTextColor(message.textcode||"");
            console.log("ceci est textcode ouioui",message.textcode);
            break;
          default:
            setshowDescription(true);
            setShowServerDescription(false);
            setShowExperience(false);
            setshowProject(false);
            setShowSkills(false);
            break;
        }
      });
    } catch (error) {
      console.error('Erreur lors de la gestion du message :', error);
    }
  };
  

console.log(serverDescription)

  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <NavBar  />

      <main style={{ backgroundColor, color:textColor} } className={` flex ${mode} items-center text-dark dark:text-light w-full`}>
        <Layout  className={` lg:pt-32 sm:pt-28`}>
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className='w-1/2 flex items-center justify-center sm:pl-0 md: lg:pl-0 '>
              <Image src={FotoProfil} alt="developper" width={480} height={600} className=' relative right-5 -top-40 md:inline-block ' priority
              />
              <HireMe /> {/* Afficher HireMe en fonction de showHireMe */}
            </div>
            
            <div className='w-1/2 flex flex-col items-center pb-32 self-center lg:w-full lg:text-center '>
              <AnimatedText  className='!text-[3.2rem] font-mont font-normal leading-none capitalize !text-left pb-10 lg:!text-center xl:!text-5xl lg:!text-4xl md:!text-2xl sm:!text-2xl sm:w-full' text="Transformez votre vision en réalité grâce au code."/>
              <p>
              {showServerDescription ? (
                serverDescription.map((description, index) => (
                    <div className='font-mont font-light' key={index}>{description}</div>
                      ))
                      ) : ( 
                        <>
                          Je suis Achraf, un développeur passionné. Fort de mes connaissances en deep learning, en sciences des données et en développement web,
                          j'associe la puissance des modèles de Hugging Face à mon approche créative du développement front-end.
                          Mes compétences en Python, ma maîtrise de Next.js, et ma solide compréhension des bases de données offrent une combinaison équilibrée entre créativité et technicité.
                          Je vous invite à explorer mon univers professionnel pour découvrir mon travail et ma passion pour l'innovation
                        </>
                      )}
                </p>
            </div>
          </div>
          <section  className=' pt-52 sm:pt-1 lg:pt-32 md:h-[90%] md:pt-0 h-screen w-full sm:h-screen flex'>
            
            <div id="about"  className={`w-2/3 flex overflow-auto flex-col sm:hidden`}>
            
                <motion.div
                className='  w-4/5 h-full ml-10'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                opacity: showDescription || showExperience || showProject || showSkills ? 1 : 0,
                scale: showDescription || showExperience || showProject || showSkills ? 1 : 0.8,
                }}
                exit={{
                opacity: 0,
                scale: 0.8,
                }}
                transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: 0,
                
                }}
                >
                  <Description show={showDescription} />
                  <Skills show={showDescription}   onAnimationComplete={() => setExampleSentencesVisible(true)} // Appelé lorsque l'animation est terminée
                  paragraph="Bienvenue sur mon portfolio, où l'exploration de contenu prend une toute nouvelle dimension.
                  Mon site offre une expérience interactive exceptionnelle, vous permettant de dialoguer avec une IA conviviale pour découvrir mon contenu de manière personnalisée.
                  Commencez dès maintenant en lui posant vos questions sur mes compétences, mes projets et mon parcours académique,
                  et n'hésitez pas à personnaliser le site, y compris les couleurs, la photo de profil et le texte de description, selon vos préférences."
                  />
                  <Competences skills={skills} show={showSkills}/>
                  
                  <div>
                    <Experience show={showExperience}/>

                  </div>
                  <div className='w-[120%] -ml-10 grid gap-16'>
                    <AnimatedText show={showProject} className='text-8xl font-medium leading-none flex items-center justify-center capitalize !text-left pb-2' text="Project"/>
                  {projects.map((project, index) => (
                    <Project show={showProject} key={index} index={index} title={project.title} src={project.src} setModal={setModal} />
                  ))}
                  </div>

                  <motion.div
                  className=''
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showDescription ? 1 : 0, y: showDescription ? 0 : 20 }}
                  transition={{ duration: 0.5 }} // Personnalisez la durée d'animation ici
                  >
                    <ExampleSentences show={exampleSentencesVisible} onExampleSelect={handleExampleSelect} />
                  </motion.div>
                </motion.div>


                <Modal modal={modal} projects={projects} />
            </div>
            <div className='w-1/3 overflow-hidden sm:w-full lg:w-1/3  flex flex-col'>
                <Messenger onSendMessage={handleSendFMessage} selectedExample={selectedExample}/>
            </div>

          </section>
          <Questions/>
        </Layout>
        <div className=' absolute right-8 bottom-8 inline-block w-24 sm:hidden md:hidden lg:hidden'>
          <Image src={lightbuble} alt='' className='w-auto h-auto '/>
        </div>
      </main>
    </>
  )
}


