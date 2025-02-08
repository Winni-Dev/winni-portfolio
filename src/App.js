import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Nav from "./Nav/Nav";
import Exo from "./page/Exo";
import Mexo from "./Mexo";
import Exop2 from "./page/Exop2";
import Calco from './page/Calco';
import Imagec from './page/Imagec';
import montreImage from './IMAGES/montrePtr3.webp';
import montreImage2 from './IMAGES/montrePtr5.webp';
import montreImage3 from './IMAGES/montrePtr.webp';
import montreImage4 from './IMAGES/montrePtr7.webp';
import Impot from './page/Impot';
import Formulair from './page/Formulair';
import ListF from './page/ListF';
import Entra from './page/Entra';
import Imp2 from './page/Impot';

function App() {
    const location = useLocation();

    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.98,
            y: 20,
            filter: 'blur(10px)'
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)'
        },
        exit: {
            opacity: 0,
            scale: 1.02,
            y: -20,
            filter: 'blur(10px)'
        }
    };

    const pageTransition = {
        type: "tween",
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96]
    };

    const Nitem = [
        { image: montreImage, prix: 200000 },
        { image: montreImage2, prix: 300000 },
        { image: montreImage3, prix: 350000 },
        { image: montreImage4, prix: 200000 },
        { image: montreImage2, prix: 300000 },
        { image: montreImage3, prix: 350000 },
    ];

    return (
        <div className="flex min-h-screen bg-slate-950">
            {/* Overlay subtil */}
            <div className="fixed inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950"></div>
            
            <div className="relative w-full flex">
                <Nav />
                <div className="w-full relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={pageTransition}
                            className="w-full"
                        >
                            <Routes location={location}>
                                <Route path="/" element={<Exo />} />
                                <Route path="/impo" element={<Impot />} />
                                <Route path="/listes" element={<Exop2 />} />
                                <Route path='/form' element={<Formulair />} />
                                <Route path='/listf' element={<ListF />} />
                            </Routes>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default App;
