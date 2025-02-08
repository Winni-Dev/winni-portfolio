import React, { useState } from 'react';

export default function Formulair() {
    //forme 
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [cla, setCla] = useState('');
    const [date, setDate] = useState('');
    const [err, setErr] = useState('');

    const Evoi = (e) => {
        e.preventDefault();

        if (!nom.trim() || !prenom.trim() || !cla.trim() || !date.trim()) {
            setErr('Tous les champs sont requis !');
            return;
        }

        // Créer l'objet étudiant
        const newStudent = {
            nom: nom.trim(),
            prenom: prenom.trim(),
            cla: cla.trim(),
            date: date,
            createdAt: new Date().toISOString()
        };

        // Récupérer les données existantes
        const formulairesExistants = JSON.parse(localStorage.getItem('formulaires') || '[]');
        
        // Ajouter le nouvel étudiant
        const nouveauxFormulaires = [...formulairesExistants, newStudent];
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('formulaires', JSON.stringify(nouveauxFormulaires));

        // Déclencher l'événement storage pour la mise à jour en temps réel
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'newStudent',
            newValue: JSON.stringify(newStudent)
        }));

        // Réinitialiser le formulaire et le message
        setNom('');
        setPrenom('');
        setCla('');
        setDate('');
        setErr('');
    }

    return (
        <div className='min-h-screen w-full bg-slate-950 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-white'>
                        Inscription Étudiant
                        <div className='h-1 w-20 bg-blue-500 mx-auto mt-3'></div>
                    </h1>
                </div>

                <form onSubmit={Evoi} 
                    className='bg-slate-900 rounded-xl shadow-lg p-6 space-y-6'
                >
                    <div className='space-y-5'>
                        <div>
                            <label className='text-sm text-gray-400 block mb-2'>
                                Nom
                            </label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className='w-full px-4 py-3 bg-slate-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200'
                                placeholder="Entrez votre nom"
                            />
                        </div>

                        <div>
                            <label className='text-sm text-gray-400 block mb-2'>
                                Prénom
                            </label>
                            <input
                                type="text"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                className='w-full px-4 py-3 bg-slate-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200'
                                placeholder="Entrez votre prénom"
                            />
                        </div>

                        <div>
                            <label className='text-sm text-gray-400 block mb-2'>
                                Classe
                            </label>
                            <input
                                type="text"
                                value={cla}
                                onChange={(e) => setCla(e.target.value)}
                                className='w-full px-4 py-3 bg-slate-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200'
                                placeholder="Entrez votre classe"
                            />
                        </div>

                        <div>
                            <label className='text-sm text-gray-400 block mb-2'>
                                Date de naissance
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className='w-full px-4 py-3 bg-slate-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200'
                            />
                        </div>
                    </div>

                    {err && (
                        <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3'>
                            <p className='text-red-400 text-sm text-center'>{err}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform active:scale-[0.98] transition-all duration-200 font-medium'
                    >
                        Enregistrer
                    </button>
                </form>
            </div>
        </div>
    );
}
