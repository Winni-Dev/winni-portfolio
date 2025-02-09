import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Impot() {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [message, setMessage] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [personnes, setPersonnes] = useState(() => {
        const savedPersonnes = localStorage.getItem('personnes');
        return savedPersonnes ? JSON.parse(savedPersonnes) : [];
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!age.trim() || !sex) {
            setMessage('Veuillez remplir tous les champs');
            return;
        }

        let nouvelleListe;
        if (editIndex !== null) {
            nouvelleListe = personnes.map((p, i) => 
                i === editIndex ? { 
                    age: parseInt(age), 
                    sex,
                    createdAt: p.createdAt
                } : p
            );
            setEditIndex(null);
        } else {
            const newPerson = {
                age: parseInt(age),
                sex,
                createdAt: new Date().toISOString()
            };
            nouvelleListe = [...personnes, newPerson];
        }

        setPersonnes(nouvelleListe);
        localStorage.setItem('personnes', JSON.stringify(nouvelleListe));
        
        setAge('');
        setSex('');
        setMessage('');
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setAge(personnes[index].age.toString());
        setSex(personnes[index].sex);
    };

    const handleDelete = (index) => {
        const nouvelleListe = personnes.filter((_, i) => i !== index);
        setPersonnes(nouvelleListe);
        localStorage.setItem('personnes', JSON.stringify(nouvelleListe));
        if (editIndex === index) {
            setEditIndex(null);
            setAge('');
            setSex('');
        }
    };

    const getMessage = (personne) => {
        // Femme de plus de 35 ans
        if (personne.sex === "femme" && personne.age > 35) {
            return `Vous êtes une femme de ${personne.age} ans, vous êtes exemptée d'impôts`;
        }
        // Homme de moins de 21 ans
        if (personne.sex === "homme" && personne.age < 21) {
            return `Vous êtes un homme de ${personne.age} ans, vous êtes exempté d'impôts`;
        }
        // Cas général
        if (personne.age >= 18) {
            return `Vous êtes un${personne.sex === "femme" ? 'e' : ''} ${personne.sex}, vous avez ${personne.age} ans donc vous devez payer vos Impôts`;
        } else {
            return `Vous êtes un${personne.sex === "femme" ? 'e' : ''} ${personne.sex}, vous avez ${personne.age} ans, vous n'avez pas d'impôt à payer!`;
        }
    };

    const calculerNombreImposable = (liste) => {
        return liste.filter(p => p.age >= 18).length;
    };

    const isExempted = (personne) => {
        return (personne.sex === "femme" && personne.age > 35) || 
               (personne.sex === "homme" && personne.age < 21) || 
               personne.age < 18;
    };

    const personVariants = {
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
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className='min-h-screen bg-slate-950 w-full pl-24 md:pl-0 p-4 sm:p-6 lg:p-8'>
            <div className='max-w-3xl mx-auto'>
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-2xl sm:text-3xl font-bold text-white mb-8 text-center'
                >
                    Gestion des Impôts
                    <span className='block text-sm font-normal text-blue-400 mt-2'>
                        {calculerNombreImposable(personnes)} personne(s) imposable(s)
                    </span>
                </motion.h1>

                <div className='bg-slate-900 rounded-xl p-6 mb-8 shadow-lg'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-4'>
                            <div className='flex gap-2'>
                                <button
                                    type="button"
                                    onClick={() => setSex('homme')}
                                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                                        sex === 'homme' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300'
                                    }`}
                                >
                                    Homme
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSex('femme')}
                                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                                        sex === 'femme' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300'
                                    }`}
                                >
                                    Femme
                                </button>
                            </div>

                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className='w-full px-4 py-2 bg-slate-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                                placeholder="Âge"
                            />
                        </div>

                        {message && (
                            <p className='text-red-400 text-sm text-center'>{message}</p>
                        )}

                        <button
                            type="submit"
                            className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                        >
                            {editIndex !== null ? 'Modifier' : 'Ajouter'}
                        </button>
                    </form>
                </div>

                <div className='space-y-3'>
                    <AnimatePresence mode="popLayout">
                        {personnes.map((personne, index) => (
                            <motion.div
                                key={index}
                                variants={personVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                layout
                                className={`p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900`}
                            >
                                <div className='space-y-2'>
                                    <motion.p 
                                        layout
                                        className={`text-sm ${
                                            isExempted(personne) ? 'text-green-400' : 'text-red-400'
                                        }`}
                                    >
                                        {getMessage(personne)}
                                    </motion.p>
                                    <motion.p
                                        layout
                                        className='text-xs text-gray-500'
                                    >
                                        Ajouté le {new Date(personne.createdAt || Date.now()).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </motion.p>
                                </div>
                                <div className='flex gap-2 mt-3 sm:mt-0'>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleEdit(index)}
                                        className={`p-2 rounded-lg transition-colors ${
                                            editIndex === index 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDelete(index)}
                                        className='p-2 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
