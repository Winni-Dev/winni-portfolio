import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ListF() {
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem('habits');
        return saved ? JSON.parse(saved) : [];
    });
    const [newHabit, setNewHabit] = useState('');
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    // Vérification quotidienne des habitudes
    useEffect(() => {
        const checkDailyStreak = () => {
            const today = new Date().toISOString().split('T')[0];
            
            setHabits(currentHabits => 
                currentHabits.map(habit => {
                    // Vérifie si l'habitude a été cochée hier
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];

                    if (!habit.completedDays.includes(yesterdayStr)) {
                        // Si pas cochée hier, réinitialise la série
                        return {
                            ...habit,
                            streak: 0
                        };
                    }
                    // Si cochée hier, garde la série
                    return habit;
                })
            );
        };

        // Configure la vérification à minuit
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilMidnight = tomorrow - now;

        const timer = setInterval(checkDailyStreak, 24 * 60 * 60 * 1000);
        const midnightTimer = setTimeout(() => {
            checkDailyStreak();
            setInterval(checkDailyStreak, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);

        return () => {
            clearInterval(timer);
            clearTimeout(midnightTimer);
        };
    }, []);

    const addHabit = () => {
        if (!newHabit.trim()) return;
        
        const habit = {
            id: Date.now(),
            name: newHabit.trim(),
            createdAt: new Date().toISOString(),
            streak: 0,
            lastChecked: null,
            completedDays: [],
            notifications: true
        };

        setHabits([...habits, habit]);
        setNewHabit('');
    };

    const toggleHabitCompletion = (habitId) => {
        const today = new Date().toISOString().split('T')[0];
        
        setHabits(habits.map(habit => {
            if (habit.id === habitId) {
                const isAlreadyCompleted = habit.completedDays.includes(today);
                const completedDays = isAlreadyCompleted
                    ? habit.completedDays.filter(day => day !== today)
                    : [...habit.completedDays, today];

                const streak = isAlreadyCompleted
                    ? habit.streak - 1
                    : habit.streak + 1;

                return {
                    ...habit,
                    completedDays,
                    streak,
                    lastChecked: today
                };
            }
            return habit;
        }));
    };

    const deleteHabit = (habitId) => {
        setHabits(habits.filter(habit => habit.id !== habitId));
    };

    // Ajoutez ces fonctions après les déclarations de useState
    const scheduleNotification = (habit) => {
        if (!("Notification" in window)) {
            alert("Ce navigateur ne supporte pas les notifications desktop");
            return;
        }

        // Programmer la notification pour 9h du matin
        const now = new Date();
        const scheduledTime = new Date(now);
        scheduledTime.setHours(9, 0, 0, 0);

        if (now > scheduledTime) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        const timeUntilNotification = scheduledTime - now;

        return setTimeout(() => {
            new Notification(`Rappel : ${habit.name}`, {
                body: `N'oubliez pas de "${habit.name}" aujourd'hui !`,
                icon: '/favicon.ico', // Assurez-vous d'avoir une icône
                badge: '/favicon.ico',
                tag: `habit-${habit.id}`,
                requireInteraction: true
            });
        }, timeUntilNotification);
    };

    // Remplacez la fonction toggleNotifications existante par celle-ci
    const toggleNotifications = async (habitId) => {
        if (!("Notification" in window)) {
            alert("Ce navigateur ne supporte pas les notifications desktop");
            return;
        }

        try {
            let permission = Notification.permission;
            
            if (permission === "default") {
                permission = await Notification.requestPermission();
            }

            if (permission === "granted") {
                setHabits(habits.map(habit => {
                    if (habit.id === habitId) {
                        const newNotificationState = !habit.notifications;
                        
                        if (newNotificationState) {
                            // Notification immédiate pour tester
                            new Notification("Notifications activées", {
                                body: `Les rappels pour "${habit.name}" ont été activés`,
                                icon: '/favicon.ico'
                            });

                            // Programmer les notifications quotidiennes
                            scheduleNotification(habit);
                        }

                        return { ...habit, notifications: newNotificationState };
                    }
                    return habit;
                }));
            } else {
                alert("Veuillez autoriser les notifications dans les paramètres de votre navigateur");
            }
        } catch (error) {
            console.error('Erreur lors de la gestion des notifications:', error);
            alert("Une erreur est survenue lors de l'activation des notifications");
        }
    };

    // Ajoutez cet useEffect pour gérer les notifications quotidiennes
    useEffect(() => {
        const notificationTimers = habits
            .filter(habit => habit.notifications)
            .map(habit => scheduleNotification(habit));

        return () => {
            notificationTimers.forEach(timer => clearTimeout(timer));
        };
    }, [habits]);

    // Fonction pour calculer les statistiques
    const calculateStats = (habit) => {
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();

        const completionRate = (habit.completedDays.length / 7 * 100).toFixed(1);
        const weeklyProgress = last7Days.map(date => ({
            date,
            completed: habit.completedDays.includes(date)
        }));

        return {
            completionRate,
            weeklyProgress
        };
    };

    // Composant pour le graphique de progression hebdomadaire modernisé
    const WeeklyProgress = ({ progress }) => (
        <div className="bg-slate-800/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-end gap-3 h-36 mb-2">
                {progress.map((day, index) => (
                    <div
                        key={day.date}
                        className="flex-1 flex flex-col items-center gap-2 relative group"
                    >
                        {/* Tooltip amélioré */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 
                            bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg
                            opacity-0 group-hover:opacity-100 transition-all duration-300
                            pointer-events-none shadow-lg border border-white/10 z-10"
                        >
                            <p className="text-xs font-medium whitespace-nowrap">
                                {new Date(day.date).toLocaleDateString('fr-FR', { 
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long'
                                })}
                            </p>
                            <p className="text-xs text-center mt-1">
                                {day.completed ? '✅ Complété' : '❌ Non complété'}
                            </p>
                            <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-black/90"></div>
                        </div>

                        {/* Barre de progression */}
                        <div 
                            className={`w-full rounded-xl transition-all duration-500 relative overflow-hidden
                                ${day.completed 
                                    ? 'bg-gradient-to-t from-green-500/80 to-green-400/50' 
                                    : 'bg-gradient-to-t from-slate-700/50 to-slate-600/30'
                                } group-hover:shadow-lg ${
                                    day.completed ? 'group-hover:shadow-green-500/20' : 'group-hover:shadow-blue-500/20'
                                }`}
                            style={{ 
                                height: day.completed ? '100%' : '30%',
                                transform: `translateY(${day.completed ? '0' : '70%'})`,
                            }}
                        >
                            {/* Effet de brillance */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                        </div>

                        {/* Jour de la semaine */}
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-2">
                            {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-2xl md:text-4xl ml-16 md:ml-0 lg:ml-0 font-bold mb-4">Suivi des Habitudes</h1>
                    <p className="text-gray-400 mb-6 ml-16 md:ml-0 lg:ml-0 md:w-1/2 mx-auto">Développez de meilleures habitudes, jour après jour</p>
                    
                    {/* Guide d'utilisation */}
                    <div className="bg-slate-900/50 p-4 rounded-lg ml-16 md:ml-0 lg:ml-0  mx-auto">
                        <h2 className="text-lg font-semibold mb-2">Comment ça marche ?</h2>
                        <ul className="text-sm text-gray-400 space-y-2 text-left">
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Ajoutez une nouvelle habitude que vous souhaitez développer
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Cochez chaque jour où vous réalisez votre habitude
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                                Activez les notifications pour ne pas oublier
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                Suivez votre progression avec les séries et totaux
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Formulaire d'ajout */}
                <div className="bg-slate-900 rounded-xl p-6 mb-8 ml-16 md:ml-0 lg:ml-0 mx-auto shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle habitude</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                            placeholder="Ex: Méditer 10 minutes, Lire, Faire du sport..."
                            className="flex-1 bg-slate-800 rounded-lg px-4 py-3 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                hover:bg-slate-800/80 transition-all duration-300
                                placeholder-gray-500 hover:placeholder-gray-400"
                        />
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={addHabit}
                            className="px-6 py-3 bg-blue-600 rounded-lg font-medium 
                                hover:bg-blue-500 transition-all duration-300 
                                flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Ajouter
                        </motion.button>
                    </div>
                </div>

                {/* Liste des habitudes avec statistiques */}
                <div className="grid ml-16 md:ml-0 lg:ml-0 gap-4 grid-cols-1 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                        {habits.map(habit => {
                            const stats = calculateStats(habit);
                            
                            return (
                                <motion.div
                                    key={habit.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`bg-slate-900/80 backdrop-blur-lg rounded-xl p-6 
                                        group relative overflow-hidden
                                        transition-all duration-500 ease-out
                                        hover:-translate-y-2 hover:shadow-2xl
                                        ${habit.completedDays.includes(new Date().toISOString().split('T')[0])
                                            ? 'hover:shadow-green-500/20 border border-green-500/20 hover:border-green-500/40'
                                            : 'hover:shadow-blue-500/20 border border-white/5 hover:border-blue-500/40'
                                        }
                                        before:absolute before:inset-0 
                                        before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                                        before:translate-x-[-200%] before:transition-transform before:duration-700
                                        hover:before:translate-x-[200%]`}
                                >
                                    {/* Effet de brillance dans le coin */}
                                    <div className="absolute -top-10 -right-10 w-20 h-20 
                                        bg-gradient-to-br from-blue-500/30 to-transparent 
                                        rounded-full blur-xl opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-500" />

                                    <div className="flex justify-between items-start mb-4 relative">
                                        <h3 className="text-xl font-semibold 
                                            bg-gradient-to-r from-white to-white 
                                            group-hover:from-blue-400 group-hover:to-blue-600
                                            bg-clip-text transition-all duration-300"
                                        >
                                            {habit.name}
                                        </h3>
                                        <div className="flex  gap-2">
                                            {/* Bouton de validation quotidienne */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleHabitCompletion(habit.id)}
                                                className={`p-3 rounded-xl transition-all duration-300
                                                    hover:shadow-lg transform
                                                    ${habit.completedDays.includes(new Date().toISOString().split('T')[0])
                                                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:shadow-green-500/20'
                                                        : 'bg-slate-800 text-gray-400 hover:bg-slate-700/80 hover:text-white'
                                                    }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </motion.button>

                                            {/* Bouton de notification */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleNotifications(habit.id)}
                                                className={`p-3 rounded-xl transition-all duration-300
                                                    hover:shadow-lg transform
                                                    ${habit.notifications
                                                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:shadow-blue-500/20'
                                                        : 'bg-slate-800 text-gray-400 hover:bg-slate-700/80 hover:text-white'
                                                    }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                                </svg>
                                            </motion.button>

                                            {/* Bouton de suppression */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => deleteHabit(habit.id)}
                                                className="p-3 rounded-xl bg-red-500/10 text-red-400 
                                                    hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/20
                                                    transition-all duration-300 transform"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Statistiques */}
                                    <div className="mt-8 space-y-6 relative ">
                                        <div className="flex gap-4 md:gap-0 items-center justify-between">
                                            <h4 className="text-lg font-semibold 
                                                bg-gradient-to-r from-blue-400 to-blue-600 
                                                bg-clip-text text-transparent group-hover:scale-105 
                                                transition-transform duration-300"
                                            >
                                                Statistiques
                                            </h4>
                                            <span className="px-4 py-2 rounded-full 
                                                bg-gradient-to-r from-blue-500/10 to-blue-600/10
                                                text-blue-400 border border-blue-500/20
                                                group-hover:border-blue-500/40 group-hover:from-blue-500/20 group-hover:to-blue-600/20
                                                transition-all duration-300"
                                            >
                                                {stats.completionRate}% de réussite
                                            </span>
                                        </div>

                                        {/* Cartes de statistiques avec effets de survol améliorés */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 
                                                border border-white/5 
                                                hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10
                                                hover:-translate-y-1 hover:bg-slate-800/50
                                                transition-all duration-300 group/card"
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 rounded-lg bg-blue-500/10">
                                                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm text-gray-400">Plus longue série</p>
                                                </div>
                                                <p className="text-2xl font-bold text-white ml-2">
                                                    {Math.max(habit.streak, ...habit.completedDays.map((_, i) => i + 1))}
                                                    <span className="text-sm font-normal text-gray-400 ml-1">jours</span>
                                                </p>
                                            </div>

                                            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 
                                                border border-white/5 
                                                hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10
                                                hover:-translate-y-1 hover:bg-slate-800/50
                                                transition-all duration-300 group/card"
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 rounded-lg bg-green-500/10">
                                                        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm text-gray-400">Taux de réussite</p>
                                                </div>
                                                <p className="text-2xl font-bold text-white ml-2">
                                                    {stats.completionRate}
                                                    <span className="text-sm font-normal text-gray-400 ml-1">%</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}





