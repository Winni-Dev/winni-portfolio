// import React,{useState} from 'react'

// export default function Exo() {
//     const [nom, setNom] = useState ('');
//     const [email, setEmail] = useState('');
//   return (
//     <div className='df pl-4'>
//         <h1 className='h-f text-2xl'>Forme</h1>
//         <form action="">
//             <label htmlFor="nam">
//                 votre nom 
//                 <br />
//                 <input type="text" required value={nom}  className=' bg-black' onChange={ (e) => setNom(e.target.value)} />
//             </label>
//             <br />
//             <label htmlFor="email">
//                 votre email
//                 <br />
//                 <input type='email' className=' bg-black' required value={email} onChange={ (e)=> setEmail(e.target.value)  }/>
//             </label>
//         </form>
//         <p> votre nom est:{nom} </p>
//         <p>votre email est: {email} </p>
//     </div>
//   )
// }
// import React, { useState } from 'react'

// export default function Exo() {
//     const [eurro, setEurro] = useState('');
//     const [fran, setFran] = useState('');

//     const conv = 650;

//     const calcul = (e) =>{
//         const eurroValue = e.target.value;
//         setEurro(eurroValue);
//         setFran(eurroValue * conv);
//     };

//     return (
//         <div className='p pl-8'>
//             <h1 className='t text-3xl'>Convertire</h1>
//             <input type="number" value={eurro} onChange={calcul} className='n bg-slate-300' />
//             <p>
//                 {fran}: Frans
//             </p>
//         </div>
//     )
// }
// import React, { useState, useEffect } from 'react';

// function TimeTracker() {
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);

//     // Nettoyer l'effet
//     return () => clearInterval(timer);
//   }, []); // Le tableau de dépendances vide indique que useEffect ne se déclenche qu'une seule fois, après le premier rendu

//   return (
//     <div>
//       <h1>Heure actuelle : {currentTime}</h1>
//     </div>
//   );
// }



import React, {useState,useEffect} from 'react'
import Impot from './Impot';
import { motion, AnimatePresence } from 'framer-motion';

export default function Exo() {
    const [li, setLi] = useState('');
    const [tli, setTli] = useState(() => {
        // Initialisation avec les données du localStorage
        try {
            const savedTasks = localStorage.getItem('tasksList');
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch (error) {
            console.error('Erreur lors du chargement initial:', error);
            return [];
        }
    });
    const [cont, setCont] = useState(() => {
        // Initialiser le compteur avec la longueur des tâches sauvegardées
        const savedTasks = localStorage.getItem('tasksList');
        return savedTasks ? JSON.parse(savedTasks).length : 0;
    });
    const [modif, setModif] = useState(false);
    const [vmodif, setVmodif] = useState(null);
    // Nouvel état pour les tâches terminées
    const [completedTasks, setCompletedTasks] = useState(() => {
        try {
            const savedCompleted = localStorage.getItem('completedTasks');
            return savedCompleted ? JSON.parse(savedCompleted) : [];
        } catch (error) {
            return [];
        }
    });

    // Sauvegarder dans localStorage à chaque modification de tli
    useEffect(() => {
        try {
            localStorage.setItem('tasksList', JSON.stringify(tli));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    }, [tli]);

    // Sauvegarder l'état des tâches terminées
    useEffect(() => {
        try {
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des tâches terminées:', error);
        }
    }, [completedTasks]);

    const Gli = () => {
        if (li.trim()) {
            const newTask = {
                text: li.trim(),
                createdAt: new Date().toISOString() // Ajout de l'horodatage
            };
            const newTli = [...tli, newTask];
            setTli(newTli);
            setLi('');
            setCont(prev => prev + 1);
        }
    };

    const Sli = (index) => {
        const newTli = tli.filter((_, i) => i !== index);
        setTli(newTli);
        setCont(prev => prev - 1);
    }

    const modification = (index) => {
        setModif(true);
        setVmodif(index);
        setLi(tli[index].text); // Modification pour accéder au texte
    }

    const Vmodification = () => {
        if (li.trim()) {
            const newTli = tli.map((task, i) =>
                i === vmodif ? { ...task, text: li.trim() } : task);
            setTli(newTli);
        } else {
            Sli(vmodif);
        }
        setLi('');
        setVmodif(null);
        setModif(false);
    };

    // Fonction pour marquer une tâche comme terminée
    const toggleTaskCompletion = (index) => {
        setCompletedTasks(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const compteur = () => {
        if (cont === 0) return 'Aucun Article';
        if (cont === 1) return '1 Article';
        return `${cont} Articles`;
    }

    const compterArticlesAchetes = () => {
        if (completedTasks.length === 0) return "Aucun article acheté";
        if (completedTasks.length === 1) return "1 article acheté";
        return `${completedTasks.length} articles achetés`;
    };

    // Animation pour les tâches
    const taskVariants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.8 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0,
            x: -100,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    return (
        <div className='min-h-screen bg-slate-950 w-full py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-white'>
                        Liste des Courses
                        <div className='h-1 w-20 bg-blue-500 mx-auto mt-3'></div>
                    </h1>
                    <div className='mt-4 space-y-1'>
                        <p className='text-gray-400 text-sm'>
                            {compteur()}
                        </p>
                        <p className='text-green-400 text-sm'>
                            {compterArticlesAchetes()}
                        </p>
                    </div>
                </div>

                <div className='bg-slate-900 rounded-xl p-6 shadow-lg mb-6'>
                    <div className='flex gap-3'>
                        <input
                            type="text"
                            value={li}
                            onChange={(e) => setLi(e.target.value)}
                            placeholder="Ajouter un article..."
                            className='flex-1 px-4 py-3 bg-slate-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200'
                        />
                        <button
                            onClick={modif ? Vmodification : Gli}
                            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform active:scale-[0.98] transition-all duration-200 font-medium min-w-[120px]'
                        >
                            {modif ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </div>

                <div className='space-y-3'>
                    <AnimatePresence mode="popLayout">
                        {tli.map((tache, index) => (
                            <motion.div
                                key={index}
                                variants={taskVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                className={`bg-slate-900 rounded-lg p-4 flex items-center justify-between group hover:bg-slate-900/80 transition-all duration-200 ${
                                    completedTasks.includes(index) ? 'border border-green-500/30' : ''
                                }`}
                            >
                                <div className='flex-1'>
                                    <motion.p 
                                        layout
                                        className={`text-white break-all ${
                                            completedTasks.includes(index) ? 'line-through text-green-400' : ''
                                        }`}
                                    >
                                        {tache.text}
                                    </motion.p>
                                    <motion.p 
                                        layout
                                        className='text-xs text-gray-500 mt-1'
                                    >
                                        Ajouté le {new Date(tache.createdAt).toLocaleDateString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            day: 'numeric',
                                            month: 'long'
                                        })}
                                    </motion.p>
                                </div>
                                <div className='flex gap-2 ml-4'>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleTaskCompletion(index)}
                                        className={`p-2 rounded-lg transition-colors ${
                                            completedTasks.includes(index)
                                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => modification(index)}
                                        className='p-2 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => Sli(index)}
                                        className='p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {tli.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-center py-8'
                        >
                            <p className='text-gray-500'>Aucune tâche pour le moment</p>
                            <p className='text-gray-400 text-sm mt-2'>Ajoutez votre première tâche</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}


