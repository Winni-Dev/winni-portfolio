// import React, { useState } from 'react';

// const Mexo = () => {
//     const [ecr, setEcr] = useState('');
//     const [tecr, setTecr] = useState([]);
//     const [eta, setEta] = useState(false);
//     const [sto, setSto] = useState(null);
//     const [cont, setCont] = useState(0);

//     const [col, setCol] = useState(false);


//     const [cp,setCp] = useState(0);

//     const [nom, setNom] = useState('');
//     const [mail, setMail] = useState('');
//     const [err, setErr] = useState('');

//     const Evoi = (e)=>{
//         e.preventDefault();
//         if(!nom.trim() || !mail.trim()){
//             setErr('tout les champs sont requid svp ');
//             return;
//         } 
//         setErr('');
//         alert(`Nom : ${nom} , Email: ${mail}`);
//     }

//     const Etcol = ()=> {
//         setCol(prevCol => !prevCol);
//     } 
    

//     const Ajou = () => {
//         if (ecr.trim()) {
//             setTecr([...tecr, ecr]);
//             setEcr('');
//             setCont(cont +1);
//         }
//     }

//     const Secri = (index) => {
//         const ntecri = tecr.filter((_, i) => i !== index);
//         setTecr(ntecri);
//         setCont(cont -1);
//     }

//     const Etats = (index) => {
//           setEta(true);
//           setSto(index);
//           setEcr(tecr[index]);
//     }
//     const Stoc = () => {
//         if (ecr.trim()){
//             const Nsto = tecr.map((f, i)=> i === sto ? ecr : f);
//             setTecr (Nsto);
//         }else {
//             Secri(sto);
//         }

//         setEcr('');
//         setSto(null);
//         setEta(false);
//     }

//     const compter = ()=>{
//         if (cont === 0){
//             return 'Aucune Tâche'
//         } else if (cont === 1 ){
//             return '1 tâche'
//         } else {
//            return `${cont} Tâches`
//         }
//     }

   

//     return (
//         <div>
//             <h1>nombre de tâche ({compter ()}) </h1>
//             <input type="text" value={ecr} onChange={(e) => setEcr(e.target.value)} name="" id="" className='bg-slate-500' />
//             <br />
//             <button onClick={eta ? Stoc : Ajou}>{eta ? 'Mettre a jour ': 'Ajout'} </button>
//             <br />
//             <ul>
//                 {
//                     tecr.map((f, index) => (
//                         <li key={index}>{f} <button onClick={()=>Etats(index)}>mod</button> <button onClick={() => Secri(index)}>sup</button></li>
//                     ))
//                 }
//             </ul> 
//             <br />
//             <p>ma couleur preferé est {col ? 'red' : 'gree'} </p>
//             <button onClick= {Etcol}>{col ? 'green': 'red'} </button>
//             <br />
//             <br />
//             <p>{cp} </p>
//             <br />
//             <button onClick={()=> setCp(cp +1)}>+1</button>
//             <br />
//             <button onClick={()=> setCp(cp +5)}>+5</button>
//             <br />
//             <button onClick={()=> setCp(cp +10)}>+10</button>
//             <br />
//             <button onClick={()=> setCp(cp -1)}>-1</button>
//             <br />
//             <button onClick={()=> setCp(cp -5)}>-5</button>
//             <br />
//             <button onClick={()=> setCp(cp -10)}>-10</button>

//             <br />
            
//           <form action="" onSubmit={Evoi}>
//     i        <input type="text" value={nom} onChange={(e)=>setNom(e.target.value) }  className='bg-blue-400'/>
//             <hr />
//             <br />
//             <input type="email" value={mail} onChange={(e)=>setMail(e.target.value)} className='bg-blue-400' />
//             <br />
//             {err && <p className='bg-red-600'>{err} </p> }
//             <input type="submit" />
//           </form>
//         </div>
//     );
// };

// export default Mexo;
import React,{useState} from 'react'

export default function Mexo() {
    const [li , setLi] = useState('');
    const [tbl , setTbl] = useState([]);
    const [eta, setEta] = useState(false);
    const [modif, setModif] = useState(null);
    const [cont , setCont] = useState(0);

    const Ajou = () => {
        if (li.trim()){
            setTbl([...tbl, li]);
            setLi('');
            setCont(cont +1);
        };
    }

    const Sup = (index) =>{
        const S = tbl.filter((_,i) => i !== index);
        setTbl (S);
        setCont(cont - 1);
    }

    const Eta = (index) => {
        setEta(true);
        setModif(index);
        setLi(tbl[index]);
    }

    const Modif = ()=> {
        if (li.trim()){
            const v = tbl.map((f,i) => i === modif ? li : f);
            setTbl(v);
        }
        else{
            Sup(modif);
        }
        setEta(false);
        setLi('');
        setModif(null);
    }
    const Conteur = ()=>{
        if (cont === 0) {
            return 'Aucune tâche'
        }
         else if (cont === 1){
            return 'une tâche'
        }
        else {
            return ` ${cont} tâches`
        }
    }

//couleur
const [col, setCol] = useState (false);
const Couleur = ()=>{
    setCol(prevCol => !prevCol);
}
//-------------------------------
//calco
const [aff, setAff] = useState('');
const Click = (value)=>{
    if (aff === 'Eurreur') if(value === '='){
        setAff('');
    return;
    }
    else if ( value === 'C'){
        setAff('');
        return;
    }
    else{
        setAff(value);
        return;
    }
    
    if (value === '='){
        try{
            setAff(eval(aff));
        }
        catch{
            setAff('Eurreur')
        }
    }
    else if (value === 'C'){
        setAff ('');
    }
    else {
        setAff(aff + value);
    }
}
//-------------------------
//impo
const [age , setAge] = useState(0);
const [h, setH] = useState([]);
const [etam, setEtam] = useState(false);
const [moda , setModa] = useState (null);


const Verifi = ()=>{
    if(age.trim()){
        setH([...h,age ]);
     setAge('');
    } 
    
     
}
const PP = (index)=> {
    if ( h[index] > 18){
        return `votre age est  ${h[index]}ans et vous devez payez vos impots`
    } 
    else {
        return `votre age est ${ h[index]}ans et vous nevez pas payez d'impot `
    }
}
const Etam = (index)=>{
    setEtam(true);
    setModa(index);
    setAge(h[index]);
}
const Modaa = ()=>{
    if (age.trim()){
    const Vmoda = h.map((f,i) => i === moda ? age : f );
    setH(Vmoda);
}

    setModa(null);
    setAge('');
    setEtam(false);

}
const Supa = (index)=> {
    const Mt = h.filter((_,i) => i!== index);
    setH(Mt);
}

//---------------------------------------
//forme 
const [nom, setNom] = useState('');
const [prenom, setPrenom] = useState('');
const [cla, setCla] = useState('');
const [date, setDate] = useState('');
const [err, setErr] = useState('');

const Evoi = (e)=>{
    e.preventDefault();
    if(!nom.trim() || !prenom.trim() || !cla.trim() || !date.trim()){
        setErr('tout les champs sont requi svp');
        return;
    }
        setErr(`Nom: ${nom}  prenom: ${prenom}  classe: ${cla} Date de naissance : ${date}`);
    
}


    
  return (
    <div className=' h-screen'>
        <h1> Vous avez ({Conteur()}) </h1>
        <br />
        <input type="text" value={li} onChange={(e) =>setLi(e.target.value)}  className=' bg-slate-300 rounded-lg'/>
        <br />
        <button onClick={eta ? Modif : Ajou}>{eta ? 'Mettre a jour' : 'Ajouter'} </button>
        <br />
        <ul>
            {
                tbl.map((f, index)=>(
                    <li key={index}>{f} <button onClick={()=>Sup(index)}>Sup</button> <button onClick={()=>Eta(index)}>Mod</button> </li>
                ))
            }
        </ul>
        <br />
        <br />
        <p>ma couleur preférer est le {col ? 'rose' : 'rouge'} </p>
        <br />
        <button className={ col ? 'bg-red-600' : 'bg-pink-500'} onClick={Couleur}>{col ? 'rouge':'rose'} </button>
        <br />
        <br />
        <br />
        <input type="text" readOnly value={aff} className=' bg-slate-300 outline-none' name="" id="" />
        <br />
        <button onClick={()=>Click('1')}>1</button>
        <button onClick={()=>Click('2')}>2</button>
        <button onClick={()=>Click('5')}>5</button>
        <button onClick={()=>Click('=')}>=</button>
        <button onClick={()=>Click('+')}>+</button>
        <button onClick={()=>Click('C')}>c</button>
        <br />
        <br />
        <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className=' bg-slate-300' />
        <br />
        <br />
        <button onClick={etam ? Modaa : Verifi} className=' p-2 bg-green-500'>{etam ? 'Eddition':'Vérifier'} </button>
        <h1>{
            h.map((f,index) => (
                <p key={index}>{f} <p>{PP(index)} </p> <button className=' bg-red-600' onClick={()=>Supa(index)}>Sup</button>  <button onClick={()=>Etam(index)} className=' bg-blue-700'>Mod</button></p>
            ))
            }</h1>
            <br />
            <br />
            <div className=' h-screen bg-slate-950 w-full flex flex-col items-center justify-center'>
                <form action="" onSubmit={Evoi} className=' flex  justify-center flex-col p-4 bg-slate-900 min-w-96 h-[90%] rounded-md '>
                 <div className=' w-full flex items-center justify-center'> <h1 className=' text-white font-bold text-2xl mb-4'>formulaire</h1></div>
                <label htmlFor="name" className=' text-xl font-semibold text-white'>Nom:</label>
                    <input className=' bg-slate-800 w-full h-10 rounded-lg outline-none p-2 text-white font-semibold focus:bg-slate-950 text-xl' type="text" value={nom} onChange={(e)=>setNom(e.target.value)} />
                   <br />
                   <label htmlFor="name" className=' text-xl font-semibold text-white'>Prénom:</label>
                    <input className=' bg-slate-800 w-full h-10 rounded-lg outline-none p-2 text-white font-semibold focus:bg-slate-950 text-xl' type="text" value={prenom}  onChange={(e)=>setPrenom(e.target.value)} />
                    <br />
                    <label htmlFor="name" className=' text-xl font-semibold text-white'>classe:</label>
                    <input className=' bg-slate-800  w-full h-10 rounded-lg outline-none p-2 text-white font-semibold focus:bg-slate-950 text-xl' type="text" value={cla} onChange={(e)=>setCla(e.target.value)} />
                    <br />
                    <label htmlFor="name" className=' text-xl font-semibold text-white'>Date naissance:</label>
                    <input className=' bg-slate-800  w-full h-10 rounded-lg outline-none p-2 text-white font-semibold focus:bg-slate-950 text-xl' type="date" name="" id="" value={date} onChange={(e)=>setDate(e.target.value)} />
                    
                    <br />
                    <input className=' w-full p-2 bg-blue-800 rounded-lg text-xl font-semibold text-white' type="submit" value="Envoi" />
                </form>
                <br />
                    {err && <p className=' w-96 text-white text-xl'>{err}</p> }
                
            </div>
            
    </div>
  )
}
