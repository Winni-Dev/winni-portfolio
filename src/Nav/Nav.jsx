import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        {
            path: '/',
            name: 'Accueil',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            path: '/form',
            name: 'Formulaire',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            path: '/listes',
            name: 'Étudiants',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            path: '/impo',
            name: 'Impôts',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            path: '/listf',
            name: 'Musique',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            )
        }
    ];

    return (
        <nav className={`fixed top-0 left-0 h-full z-50 transition-all duration-500 ease-in-out
            ${isOpen ? 'w-72' : 'w-20'} 
            bg-gradient-to-b from-slate-900 to-slate-950
            border-r border-white/5`}
        >
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className='absolute -right-3 top-6 p-1.5 rounded-full
                    bg-gradient-to-r from-blue-600 to-blue-700
                    hover:from-blue-500 hover:to-blue-600
                    text-white shadow-lg 
                    transition-all duration-300
                    hover:scale-110
                    active:scale-95'
            >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className='p-4 mt-16'>
                <ul className='flex flex-col gap-2'>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-3 p-3 rounded-xl
                                    transition-all duration-300
                                    group relative
                                    ${isActive 
                                        ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <div className={`
                                    transition-transform duration-300
                                    ${!isOpen ? 'transform hover:scale-110' : ''}
                                `}>
                                    {item.icon}
                                </div>
                                <span className={`
                                    whitespace-nowrap
                                    ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                                    transition-all duration-300
                                `}>
                                    {item.name}
                                </span>
                                {!isOpen && (
                                    <div className={`
                                        absolute left-full ml-3 px-2 py-1
                                        bg-gray-900 text-white text-sm rounded-md
                                        opacity-0 -translate-x-3 invisible
                                        group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible
                                        transition-all duration-300
                                        whitespace-nowrap
                                    `}>
                                        {item.name}
                                    </div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

