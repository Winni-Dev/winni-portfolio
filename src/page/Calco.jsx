import React,{useState} from 'react'

export default function Calco() {
    const [aff, setAff] = useState('');
   

const lesclick = (value)=>{
        if(aff === 'Erreur')  if(value === '='){
            setAff('');
            return;
        }
        else if (value === 'C'){
            setAff('');
            return;
        } else {
                setAff(value);
            return;
        }
        if(value === '='){
            try{
                setAff(eval(aff));
            }
            catch{
                setAff('Erreur');
            }
        } else if ( value === "C"){
            setAff('');
        }
        else {
            setAff(aff + value);
        }
    }

  return (
    <div className='w-full  min-h-screen max-h-max flex  justify-center  bg-slate-900'>
        <div className=' w-80'>
        <h1 className=' text-white text-3xl font-serif mb-4 font-bold underline decoration-yellow-500'>Calculatrice</h1>
        <input type="text" value={aff} readOnly className='w-full p-2 outline-none rounded-lg text-white bg-slate-950 text-2xl font-semibold' />
        <div className='containerB rounded-t-xl mt-2 p-2 bg-slate-800 justify-between flex'>
            <button onClick={()=>lesclick('1')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>1</button>
            <button onClick={()=>lesclick('2')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>2</button>
            <button onClick={()=>lesclick('3')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>3</button>
            <button onClick={()=>lesclick('+')} className='w-14 bg-orange-600 text-white font-serif text-2xl p-4 rounded-xl hover:bg-orange-500 font-bold shadow-2xl'>+</button>
        </div>
       <div className='containerB  p-2 bg-slate-800 justify-between flex'>
            <button onClick={()=>lesclick('4')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>4</button>
            <button onClick={()=>lesclick('5')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>5</button>
            <button onClick={()=>lesclick('6')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>6</button>
            <button onClick={()=>lesclick('*')} className='w-14 bg-orange-600 text-white font-serif text-2xl p-4 rounded-xl hover:bg-orange-500 font-bold shadow-2xl'>*</button>
        </div>
        <div className='containerB  p-2 bg-slate-800 justify-between flex'>
            <button onClick={()=>lesclick('7')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>7</button>
            <button onClick={()=>lesclick('8')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>8</button>
            <button onClick={()=>lesclick('9')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>9</button>
            <button onClick={()=>lesclick('/')} className='w-14 bg-orange-600 text-white font-serif text-2xl p-4 rounded-xl hover:bg-orange-500 font-bold shadow-2xl'>/</button>
        </div>
        <div className='containerB rounded-b-xl p-2 bg-slate-800 justify-between flex'>
            <button onClick={()=>lesclick('0')} className='w-14 bg-black text-white font-serif text-2xl p-4 rounded-xl hover:bg-slate-700 font-bold shadow-2xl'>0</button>
            <button onClick={()=>lesclick('-')} className='w-14 bg-orange-600 text-white font-serif text-2xl p-4 rounded-xl hover:bg-orange-500 font-bold shadow-2xl'>-</button>
            <button onClick={()=>lesclick('C')} className='w-14 bg-orange-600 text-white font-serif text-2xl p-4 rounded-xl hover:bg-orange-500 font-bold shadow-2xl'>C</button>
            <button onClick={()=>lesclick('=')} className='w-28 bg-orange-600 text-white font-serif text-2xl p-4 rounded-xl hover:bg-orange-500 font-bold shadow-2xl'>=</button>
        </div>
        </div> 

        
    </div>
  )
}




// import React, { useState } from 'react';

// function App() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const containers = [
//     { name: 'Plat', content: (
//       <div className="container-content">
//         <h2>Plat</h2>
//         <img src="https://via.placeholder.com/150" alt="Plat" />
//         <p>Description du plat...</p>
//       </div>
//     ) },
//     { name: 'Dessert', content: (
//       <div className="container-content">
//         <h2>Dessert</h2>
//         <img src="https://via.placeholder.com/150" alt="Dessert" />
//         <p>Description du dessert...</p>
//       </div>
//     ) },
//     { name: 'Entrée', content: (
//       <div className="container-content">
//         <h2>Entrée</h2>
//         <img src="https://via.placeholder.com/150" alt="Entrée" />
//         <p>Description de l'entrée...</p>
//       </div>
//     ) },
//   ];

//   return (
//     <div className="App">
//       <div className="buttons flex justify-center space-x-4">
//         {containers.map((container, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveIndex(index)}
//             className={`py-2 px-4 rounded ${index === activeIndex ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
//           >
//             {container.name}
//           </button>
//         ))}
//       </div>
//       <div className="content-wrapper relative mt-6">
//         {containers.map((container, index) => (
//           <div
//             key={index}
//             className={`transition-opacity  duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0 absolute'}`}
//           >
//             {container.content}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
