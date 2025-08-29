import { useState, useEffect, useRef } from 'react';
import { motion, transform , useScroll ,useMotionValueEvent } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp,FaHtml5,FaCss3, FaCode, FaReact, FaMobile,FaExternalLinkAlt, FaEnvelope,FaMapMarkerAlt,FaSass,FaGitSquare } from 'react-icons/fa';
import { RiTailwindCssFill } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { TbBrandJavascript } from "react-icons/tb";
import BackTopButton from './components/BackTopButton';
import Lenis from '@studio-freight/lenis';

import Winni from './assets/winni.jpeg';
import hotel from './assets/club.jpeg';
import Montre from './assets/meteo.jpeg'
import Livraison from './assets/Livraison.jpeg'
import todo from './assets/screenshot-1747149079409.png';
import portf from './assets/portefolio.jpeg';
import reseau from './assets/reseaux.png'



const Portfolio = () => {

 const scrollContainer = useRef();
 const scrollProgress = useRef(0);

 useEffect(()=>{
  const lenis = new Lenis ({
    duration:2.0,
    easing:(t)=> Math.min(1, 1.001-Math.pow(2, -10 * t)),
        smooth:true,
      smoothTouch:true,
      touchMultiplier: 2,
      touchInertiaMultiplier:2.5,
      gestureOrientation:'vertical',
      infinite:false,
  });

  const handleScroll = ({scroll, limit , velocity, direction , progress }) => {
    scrollProgress.current = progress ;
    console.log('Scroll progess :', progress);
  };
  lenis.on('scrooll', handleScroll);

  let rafId;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return ()=>{
    lenis.off("scroll",handleScroll);
    cancelAnimationFrame(rafId);
    lenis.destroy();
  };

 },[]);

  //apparition de nav pour tel
  const [nav, setNav] = useState(false);

  const Aff = () => {
    setNav(!nav);
  }
  
//----------------scroll arrière plan
  const [offsetY , setOffsetY] = useState(0);

  useEffect(()=>{
    const handleScroll = () => setOffsetY(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);
  //------------------------------------------------------
//titre qui vien 1 1
  const container = {
    hidden: {},
    visible:{
      transition: {
        staggerChildren:1,
      },
    },
  };
  const item = {
    hidden : {opacity:0, y:100},
    visible:{opacity:1, y:0},
    transition:{ duration: 0.8 },
  };

  // États pour les animations
  const [activeSection, setActiveSection] = useState('home');
  const [nameText, setNameText] = useState('');
  const [profession, setProfession] = useState('');
  const sectionRefs = useRef([]);

  // Données du portfolio
  const sections = [
    { id: 'home', name: 'Accueil' },
    { id: 'about', name: 'À propos' },
    { id: 'projects', name: 'Projets' },
    { id: 'skills', name: 'Compétences' },
    { id: 'contact', name: 'Contact' }
  ];

  const projects = [

    {
      id: 1,
      image: <img src={Livraison} alt="" className=' w-full  rounded-lg shadow-black/25 shadow-xl' />,
      title: "Livraison ",
      description: " site vitrine template pour entreprise de livraison",
      technologies: ["React", "Tailwind","+lenis "],
      source :  <a href="https://github.com/Winni-Dev/livrason" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaGithub className="mr-2" /> Code source</a>,
      
      lien :<a href="https://livrason-u34v.vercel.app/" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaExternalLinkAlt className="mr-2" /> Voir le projet
    </a>
    },
   
    {
      id: 2,
      image: <img src={Montre} alt="" className=' w-full rounded-lg shadow-black/25 shadow-xl' />,
      title: "APP Méteo",
      description: "Appli de méteo personnalisé avec design pro ",
      technologies: ["React","Api Méteo", "TailwindCSS"],
      source :  <a href="https://github.com/Winni-Dev/Meteo_App" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaGithub className="mr-2" /> Code source</a>,
      
      lien :<a href="https://meteo-app-indol-zeta.vercel.app/" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaExternalLinkAlt className="mr-2" /> Voir le projet
    </a>
    },
    {
      id: 3,
      image: <img src={todo} alt="" className=' w-full rounded-lg shadow-black/25 shadow-xl' />,
      title: "toudouList et des extras...",
      description: "Plateforme complète avec un peut de tout",
      technologies: ["React", "Tailwind", "local storage"],
      source :  <a href="https://github.com/Winni-Dev/Cotidien" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaGithub className="mr-2" /> Code source</a>,
      
      lien :<a href="https://cotidien.vercel.app/" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaExternalLinkAlt className="mr-2" /> Voir le projet
    </a>
    },
    
    {
      id: 4,
      image: <img src={portf} alt="" className=' w-full rounded-lg shadow-black/25 shadow-xl' />,
      title: "Mini portfolio",
      description: "Plateforme qui resume le cv d'un Devellopeur ",
      technologies: ["Html", "css", "js"],
      source :  <a href="https://github.com/Winni-Dev/winni.porfolio" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaGithub className="mr-2" /> Code source</a>,

      lien :<a href="https://winni-porfolio.vercel.app/" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaExternalLinkAlt className="mr-2" /> Voir le projet
    </a>
    },
    {
      id: 5,
      image: <img src={reseau} alt="" className=' w-full rounded-lg shadow-black/25 shadow-xl' />,
      title: "App cotidien",
      description: "App de suivis d'habitude cotidienne",
      technologies: ["React", "Firebase", "TailwindCSS"],
      source :  <a href="https://github.com/Winni-Dev/Cotidien/blob/main/src/page/ListF.jsx" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaGithub className="mr-2" /> Code source</a>,
      
      lien :<a href="https://cotidien.vercel.app/listf" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaExternalLinkAlt className="mr-2" /> Voir le projet
    </a>
    },
    {
      id: 6,
      image: <img src={hotel} alt="" className=' w-full rounded-lg shadow-black/25 shadow-xl' />,
      title: "site web",
      description: "site template pour club de sport",
      technologies: ["React", "Tailwind css"],
      source :  <a href="https://github.com/Winni-Dev/Club-de-sport" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaGithub className="mr-2" /> Code source</a>,
      
      lien :<a href="https://club-de-sport-p9sf.vercel.app/" className="text-teal-400 hover:text-teal-300 flex items-center">
      <FaExternalLinkAlt className="mr-2" /> Voir le projet
    </a>
    },
  ];

  const skills = [
    { name: "HTML5", level: 95,icone:<FaHtml5 className=' bg-red-600 text-2xl w-11 h-11' /> },
    { name: "CSS3/Sass/Tailwind", level: 90 ,icone:<div className='flex space-x-3'><FaCss3 className=' bg-blue-600 text-2xl w-6 h-6' /> <FaSass className=' text-2xl text-pink-500'/> <RiTailwindCssFill className=' text-blue-400 text-2xl w-6 h-6' /></div> },
    { name: "JavaScript", level: 85 , icone :<TbBrandJavascript className=' text-4xl w-10 h-10 text-yellow-400' /> },
    { name: "React", level: 85 , icone:<FaReact className=' text-3xl text-blue-400'/> },
    { name: "Git/Github", level: 90 ,icone:<div className='flex space-x-3'><FaGitSquare className=' text-red-500 text-2xl w-6 h-6' /> <FaGithub className=' text-2xl '/> </div> },
  ];

  // Animation du nom

  useEffect(() => {
    const name = "WinniDev...";
    let i = 0;
    let isDeleting = false;
  
    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        if (i <= name.length) {
          setNameText(name.substring(0, i));
          i++;
        } else {
          isDeleting = true;
          i--;
        }
      } else {
        if (i >= 0) {
          setNameText(name.substring(0, i));
          i--;
        } else {
          isDeleting = false;
          i = 0;
          // clearInterval(typingInterval);
        startProfessionAnimation();
        }
      }
    }, 200);
  
  
  

    const startProfessionAnimation = () => {
      const professions = ["Développeur Frontend", "UX Designer", "React Expert"];
      let j = 0;
      
      setProfession(professions[0]);
      
      const professionInterval = setInterval(() => {
        j = (j + 1) % professions.length;
        setProfession(professions[j]);
      }, 2000);
      
      return () => clearInterval(professionInterval);
    };

    return () => clearInterval(typingInterval);
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition ;
      const duration = 700;
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance , duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
      function easeInOutQuad (t, b, c, d){
        t /= d /2;
        if (t < 1) return (c / 2) * t * t + b ;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) +b;
      }
      requestAnimationFrame(animation);
    }
  };

  return (
    <motion.div
    ref={scrollContainer}
     className="portfolio-container overflow-x-hidden bg-black text-white min-h-screen font-sans ">
      {/* Barre de navigation */}
      <motion.nav
      initial={{ opacity: 0, y:-50 }}
      animate={{ opacity: 1,y:0 }}
      transition={{ duration: 1.1, delay: 4 }}
       className="fixed top-3 ml-[4.8%] rounded-full shadow-xl flex md:block w-[90%] bg-white/[0.03] border border-white/[0.09] bg-opacity-5 backdrop-blur-md z-40 py-1 md:py-4 px-6">
      <div className=' bg-teal-400 h-5 w-36  right-36 opacity-45 rounded-full blur-xl absolute'></div>
      <div className=' bg-teal-400 h-5 w-24  left-10 opacity-65 rounded-full blur-xl absolute'></div>
      <div className=' bg-teal-400 h-5 w-24 top-12  right-[40%] opacity-35 rounded-full blur-xl absolute'></div>
        <div className=" w-full  md:max-w-6xl  mx-auto flex z-50  justify-between items-center">
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-serif gap-1 font-bold text-teal-400 flex items-center"
          >
            <img src="/favicon.ico" alt="Logo" className="w-10 h-10 rounded-full" />
            <span>WINNI </span>
          </motion.div>
          <ul className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`relative pb-1 bg-transparent ${activeSection === section.id ? 'text-teal-400' : 'text-white hover:text-teal-300'}`}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-400"
                      transition={{ type: 'spring', bounce: 0.1, duration: 0.9 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <label  className="flex -z-10 md:hidden flex-col gap-2 w-8 text-white cursor-pointer" >
      <input onChange={Aff} className="peer hidden bg-red-700" type="checkbox"/>
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
      <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45" />
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
    </label> 
        </div>
      </motion.nav>
      {/* nav de tel  */}
      <ul className={`md:hidden flex-col w-2/3 border border-white/10 rounded-lg p-4 items-center bg-black/[0.3] backdrop-blur-lg z-40 fixed top-16  h-full  left-0 space-y-8 transform transition-transform duration-500 ease-in-out ${nav ? ' translate-x-0' : ' -translate-x-full'} `}>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`relative pb-1 text-xl  px-5 rounded-full ${activeSection === section.id ? 'text-teal-400' : 'text-white hover:text-teal-300'}`}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.span
                       layoutId="nav-underlin" //e a la fin si y'a problème
                      className=" md:hidden absolute left-0 bottom-0 w-full h-0.5 bg-teal-400"
                      transition={{ type: 'spring', bounce: 0.01, duration: 0.03 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
     
       

      {/* Section Accueil */}
      <section id="home" className="min-h-screen w-full  flex items-center justify-center pt-20 px-4 ">
      <div className=" z-0 fixed  -left-10 -top-10 md:-bottom-56  rounded-full w-80 h-56 md:h-80 bg-teal-400  opacity-35 blur-2xl" 
      style= {{
                transform:`translateY(${offsetY * 0.35}px)`, 
                transition: 'transform 0.50s linear'
                }}></div>

                <div className=" z-0 fixed left-[45%] top-80  rounded-[50%] w-52 h-56 md:h-80 bg-teal-400  opacity-25 blur-3xl" 
      style= {{
                transform:`translateY(${offsetY * 0.08}px)`, 
                transition: 'transform 0.50s linear'
                }}></div>

      <div className=" z-0 fixed right-20 hidden md:block top-2 md:-bottom-56  rounded-es-full w-80 h-80 md:h-[80%] bg-teal-400  opacity-30 blur-3xl"
      style= {{
                transform:`translateY(${offsetY * 0.25}px)`, 
                transition: 'transform 0.50s linear'
                }} >
     </div>
        <div className="max-w-6xl mx-auto grid text-center md:text-start md:grid-cols-2 gap-12 items-center  w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{margin:"0px 0px -100px 0px"}}

            className="z-30 space-y-6"
          >
            <motion.h1 className=' text-4xl md:text-5xl font-bold'
            variants={container}
            viewport={{margin:"0px 0px -100px 0px"}}
            initial="hidden"
            transition={{ duration: 5 }}
            animate="visible">
             {[" Bonjour,", "je ","suis "].map((word, i) =>(
              <motion.span key={i} variants={item} className=' inline-block mr-2'>{word} </motion.span>
             ))}
               <br />
              <motion.span variants={item}
               initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{margin:"0px 0px -100px 0px"}}
              transition={{ duration: 2 }} 
              className="z-30  mt-2 text-teal-400 typing-text">{nameText}</motion.span>
            </motion.h1>
            <motion.h2
              key={profession}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewport={{margin:"0px 0px -100px 0px"}}
              transition={{ duration: 1.8 }}
              className=" z-30 text-xl md:text-2xl text-teal-400 min-h-8"
            >
              {profession}
            </motion.h2>
            
            <p className=" z-30 text-lg text-gray-300 md:w-[80%]  ">
              Spécialiste en développement d'interfaces utilisateur modernes et performantes.
            </p>
            <a href="/CV_Emmanuel.pdf" target="_blank" rel="noreferrer" className="z-30 inline-flex items-center text-teal-400 hover:underline hover:text-teal-300 transition duration-200">
                <AiOutlineDownload className=' mr-2' /> Téléchargé mon CV
              </a>
            
            <div className="z-30 flex space-x-4  justify-center md:justify-start">
           
              <a href="https://github.com/Winni-Dev" target="_blank" rel="noreferrer" className="z-30 text-2xl hover:text-teal-400 transition">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="z-30 text-2xl hover:text-teal-400 transition">
                <FaLinkedin />
              </a>
              <a href="https://wa.me/0749800313" target="_blank" rel="noreferrer" className="z-30 text-2xl hover:text-teal-400 transition">
                <FaWhatsapp />
              </a>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{margin:"0px 0px -100px 0px"}}
              onClick={() => scrollToSection('contact')}
              className=" z-30 bg-teal-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-teal-500 transition"
            >
              Contactez-moi
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            viewport={{margin:"0px 0px -100px 0px"}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative ">
              {/* <div className=" absolute -inset-5  md:-inset-5 rounded-es-full w-full h-[600px] md:h-[620px] bg-teal-400  opacity-20 blur-lg"></div> */}
              <img 
                src={Winni} 
                alt="Profil" 
                className="relative rounded-full w-[330px] md:w-[580px] md:mr-5 object-cover h-[430px] md:h-[470px] max-w-md border-4 border-teal-400 shadow-2xl"
                
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className=" py-12 md:py-20 px-4 relative">
      
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true  ,margin:"0px 0px -100px 0px"}}
            className="text-3xl md:text-4xl font-bold text-center text-teal-400 mb-12"
          >
            À propos de moi
          </motion.h2>
          
          <div className="grid md:grid-cols-1 gap-12 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              viewport={{ once: true, margin:"0px 0px -100px 0px" }}
              className=" gap-x-16 gap-y-8  px-5 grid md:grid-cols-2 text-lg font-thin"
            >
              <p className=' relative ml-3 md:ml-0'>
              <span className=' bg-teal-400 absolute w-3 h-3 -left-5 rounded-ss-full mt-2'></span>
                Passionné par le développement web depuis plus de 2 ans, je me spécialise dans la création d'expériences utilisateur exceptionnelles.
              </p>
              <p className=' relative ml-3 md:ml-0'>
              <span className=' bg-teal-400 absolute w-3 h-3 -left-5 rounded-ss-full mt-2'></span>
                Mon expertise couvre l'ensemble du processus de développement frontend, de la conception à la mise en production.
              </p>
              <p className=' relative ml-3 md:ml-0'>
              <span className=' bg-teal-400 absolute w-3 h-3 -left-5 rounded-ss-full mt-2'></span>
                Constamment à l'affût des nouvelles technologies, j'aime relever des défis techniques et créer des solutions innovantes.
              </p>
              <p className=' relative ml-3 md:ml-0'>
              <span className=' bg-teal-400 absolute w-3 h-3 -left-5 rounded-ss-full mt-2'></span>
              Je suis rigoureux dans mon travail, accordant une grande importance à la qualité du code et à l'optimisation des performance.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.9, delay: 0.8 }}
              viewport={{ once: true,margin:"0px 0px -100px 0px" }}
              className="grid grid-cols-1  md:grid-cols-3 gap-6"
            >
              <div className="bg-gray-900 p-6 md:p-8 rounded-xl hover:bg-gray-950 hover:border hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-400/15 duration-500  transition">
                <FaCode className="text-teal-400 text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Développement Web</h3>
                <p className="text-gray-300">Création de sites et applications web performants et accessibles.</p>
              </div>
              
              <div className="hover:bg-gray-900 p-6 md:p-8 md:scale-[1.18] rounded-xl bg-gray-950 border md:relative md:top-10 border-teal-400 shadow-2xl shadow-teal-400/15 duration-500  transition">
                <FaReact className="text-teal-400 text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2">React Expert</h3>
                <p className="text-gray-300">Applications React optimisées avec les meilleures pratiques.</p>
              </div>
              
              <div className="bg-gray-900 p-6 md:p-8 rounded-xl  hover:bg-gray-950 hover:border hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-400/15 duration-500  transition ">
                <FaMobile className="text-teal-400 text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Responsive Design</h3>
                <p className="text-gray-300">Interfaces adaptées à tous les appareils.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Projets */}
      <section id="projects" className="md:py-20 px-4 z-20  bg-gradient-to-b from-black via-gray-900 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true,margin:"0px 0px -100px 0px" }}
            className="text-3xl md:text-4xl font-bold text-center text-teal-400 mb-12"
          >
            Mes Projets
          </motion.h2>
          
          <div className="grid z-30 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.4 }}
                viewport={{ once: true,margin:"0px 0px -100px 0px"}}
                className="bg-gray-800 rounded-xl p-2 z-30 overflow-hidden hover:shadow-lg hover:shadow-teal-400/20 transition"
              > {project.image}
                <div className="p-1">
                  <h3 className="text-2xl font-bold text-teal-400 mb-1">{project.title}</h3>
                  <p className="text-gray-300 mb-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-teal-400/10 text-teal-400 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                   
                      <p>{project.source} </p>
                      <p>{project.lien} </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Compétences */}
      <section id="skills" className="py-16 z-30-20 px-4 bg-gradient-to-b from-gray-900 via-black to-black ">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true,margin:"0px 0px -100px 0px" }}
            className=" z-30 text-3xl md:text-4xl font-bold text-center text-teal-400 mb-12"
          >
            Mes Compétences
          </motion.h2>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: index * 0.4 }}
                viewport={{ once: true,margin:"0px 0px -100px 0px"}}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.icone} {skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                     viewport={{ margin:"0px 0px -100px 0px"}}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-2.5 rounded-full bg-teal-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="z-30 md:h-screen flex items-center justify-center w-full pt-7 ">
      <div className="z-30 md:py-4 md:m-9 md:mx-16 m-6  w-full  px-4   flex items-center rounded-2xl bg-white/5 backdrop-blur-md shadow-2xl border border-white/10 text-white ">
      <div className=" z-0 absolute -left-[8%] top-0  rounded-[50%] w-52 h-56 md:h-80 bg-teal-400  opacity-20 blur-3xl" ></div>
      <div className=" z-0 absolute left-[80%] top-20  rounded-ss-full w-64 h-96 md:h-80 bg-teal-400  opacity-35 blur-3xl" ></div>
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true,margin:"0px 0px -100px 0px" }}
            className="text-3xl z-30 md:text-4xl font-bold  text-center text-teal-400 mb-12"
          >
            Contactez-moi
          </motion.h2>
          
          <div className="grid mt-28 md:mt-0  md:grid-cols-2 gap-12 z-30">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true,margin:"0px 0px -100px 0px" }}
              className="z-30 space-y-8"
            >
              <div className="flex z-30 items-start space-x-4">
                <FaWhatsapp className="text-teal-400 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl font-bold z-30">WhatsApp</h3>
                  <a href="https://wa.me/0749800313" className="z-30 text-gray-300  hover:text-teal-400">
                   +225 07 49 80 03 13
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-teal-400 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl font-bold">Email</h3>
                  <a href="mailto:kouadioemmanuel109@gmail.com" className="text-gray-300 hover:text-teal-400">
                    Kouadioemmanuel109@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-teal-400 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl font-bold">Localisation</h3>
                  <p className="text-gray-300">Cocody,Abidjan, Côte D'ivoire</p>
                </div>
              </div>
              <a href="/CV_Emmanuel.pdf" target="_blank" rel="noreferrer" className="z-30 inline-flex items-center text-teal-400 hover:underline hover:text-teal-300 transition duration-200">
                <AiOutlineDownload className=' mr-2' /> Téléchargé mon CV
              </a>
            </motion.div>
            
            <motion.form method='POST'
            action='https://formspree.io/f/xkgrepwb'
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true,margin:"0px 0px -100px 0px" }}
              className="z-30 space-y-6  rounded-lg "
            >
              <div>
                
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Nom'
                  className="w-full bg-gray-900/50 placeholder-white/70 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 "
                  required
                />
              </div>
              
              <div>
              
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Email'
                  className="w-full bg-gray-900/50 placeholder-white/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              
              <div>
              
                <textarea
                  id="message"
                  name="message"
                  placeholder='Message...'
                  rows="5"
                  className="w-full resize-none bg-gray-900/50 placeholder-white/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{margin:"0px 0px -100px 0px"}}
                type="submit"
                className="bg-teal-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-teal-500 transition w-full"
              >
                Envoyer le message
              </motion.button>
            </motion.form>
          </div>
        </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className=" relative w-full z-50 bg-black py-8 text-center text-gray-400 opacity-100">
        <p>© {new Date().getFullYear()} Mon Portfolio. Tous droits réservés.</p>
      </footer>
      <BackTopButton/>
    </motion.div>
  );
};

export default Portfolio;



