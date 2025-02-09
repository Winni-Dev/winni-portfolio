import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Exop2() {
  const [formulaires, setFormulaires] = useState(() => {
    const savedForms = localStorage.getItem('formulaires');
    return savedForms ? JSON.parse(savedForms) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedForms = localStorage.getItem('formulaires');
      if (savedForms) {
        setFormulaires(JSON.parse(savedForms));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleNewStudent = (event) => {
      if (event.key === 'newStudent') {
        const newStudent = JSON.parse(event.newValue);
        if (newStudent) {
          const studentWithDate = {
            ...newStudent,
            createdAt: new Date().toISOString()
          };
          setFormulaires(prev => [...prev, studentWithDate]);
          localStorage.setItem('formulaires', JSON.stringify([...formulaires, studentWithDate]));
        }
      }
    };

    window.addEventListener('storage', handleNewStudent);
    return () => window.removeEventListener('storage', handleNewStudent);
  }, [formulaires]);

  const supprimerEtudiant = (index) => {
    const nouveauxFormulaires = formulaires.filter((_, i) => i !== index);
    setFormulaires(nouveauxFormulaires);
    localStorage.setItem('formulaires', JSON.stringify(nouveauxFormulaires));
  };

  const studentVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    animate: {
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
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className='min-h-screen pl-24 bg-slate-950 w-full py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-8'
        >
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>
            Liste des Étudiants
            <div className='h-1 w-20 bg-blue-500 mx-auto mt-3'></div>
          </h1>
          <p className='mt-4 text-gray-400 text-sm'>
            {formulaires.length} {formulaires.length > 1 ? 'étudiants inscrits' : 'étudiant inscrit'}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <AnimatePresence mode="popLayout">
            {formulaires.map((etudiant, index) => (
              <motion.div
                key={index}
                variants={studentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
                className='bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/5'
              >
                <div className='space-y-4'>
                  <div className='flex items-center justify-between border-b border-white/5 pb-3'>
                    <motion.h3 
                      layout
                      className='text-lg font-medium text-white capitalize'
                    >
                      {etudiant.nom} {etudiant.prenom}
                    </motion.h3>
                    <motion.span 
                      layout
                      className='px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm'
                    >
                      {etudiant.cla}
                    </motion.span>
                  </div>

                  <motion.div 
                    layout
                    className='space-y-2'
                  >
                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-gray-400'>Date de naissance</span>
                      <span className='text-white'>
                        {new Date(etudiant.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div layout className='text-xs text-gray-500'>
                    Ajouté le {new Date(etudiant.createdAt || Date.now()).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </motion.div>

                  <div className='pt-4 flex gap-2 justify-end border-t border-white/5'>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => supprimerEtudiant(index)}
                      className='group relative px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-200 flex items-center gap-2'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className='text-sm font-medium'>Supprimer</span>
                      <span className='absolute inset-0 rounded-lg ring-2 ring-red-400/20 group-hover:ring-red-400/40 transition-all duration-300'></span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {formulaires.length === 0 && (
          <div className='text-center py-12 bg-slate-900/50 rounded-xl border border-white/5'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className='text-gray-400 text-lg'>Aucun étudiant enregistré</p>
            <p className='text-gray-500 text-sm mt-2'>Utilisez le formulaire pour ajouter des étudiants</p>
          </div>
        )}
      </div>
    </div>
  );
}
