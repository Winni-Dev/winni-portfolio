import React, { useState } from 'react';
import Nav from '../Nav/Nav';

export default function Impot() {
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState('');
    const [tbl, setTbl] = useState([]);
    const [etam, setEtam] = useState(false);
    const [mod, setMod] = useState(null);
    const [cont, setCont] = useState(0);

    const Verifier = () => {
        if (age > 0 && sex.trim()) {
            setTbl([...tbl, { age, sex }]);
            setAge(0);
            setSex('');
        }
        if (age >= 18 && sex.trim()) {
            setCont(cont + 1);
        }
    }

    const Paragraphe = (index) => {
        const person = tbl[index];
        if (person.age >= 18 && person.sex === "homme") {
            return `Vous avez ${person.age} ans, donc vous devez payer vos impôts.`;
        } else {
            return `Vous avez ${person.age} ans, vous n'avez pas d'impôt à payer !`;
        }
    }

    const Sup = (index) => {
        const personToRemove = tbl[index];
        const Ntbl = tbl.filter((_, i) => i !== index);
        setTbl(Ntbl);
        if (personToRemove.age >= 18) {
            setCont(cont - 1);
        }
    }

    const Etat = (index) => {
        setEtam(true);
        setMod(index);
        setAge(tbl[index].age);
        setSex(tbl[index].sex);
    }

    const Modif = () => {
        if (age > 0 && sex.trim()) {
            const Nmodif = tbl.map((person, i) => i === mod ? { age, sex } : person);
            setTbl(Nmodif);
        }
        setEtam(false);
        setMod(null);
        setAge(0);
        setSex('');
    }

    return (
        <div className='min-h-screen h-auto p-4 flex-col bg-slate-950 flex items-center justify-center w-full'>
            <h1 className='text-white text-2xl font-bold mb-4'>Nombre de personnes qui doivent payer l'impôt ({cont})</h1>
            <select className='cursor-pointer w-80 p-2 rounded-lg bg-slate-800 text-white text-xl font-semibold outline-none' name="" id="" value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="" hidden>Sexe</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
            </select>
            <br />
            <input className='w-80 p-2 rounded-lg bg-slate-800 text-white text-xl font-semibold outline-none' type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value, 10))} />
            <br />
            <button className='p-2 text-white font-semibold text-xl w-80 rounded-lg bg-blue-700 hover:bg-blue-800' onClick={etam ? Modif : Verifier}>{etam ? 'Modifier' : 'Vérifier'}</button>
            <div className='mt-8 w-80 p-4 rounded-sm font-bold flex flex-col-reverse gap-5 text-white h-auto bg-slate-950'>
                {
                    tbl.map((person, index) => (
                        <div className='bg-white/5 rounded-md p-2' key={index}>
                            <p className={person.age >= 18 ? 'bg-red-500 p-2 rounded-lg' : 'bg-green-500 p-2 rounded-lg'}>
                                {Paragraphe(index)}
                            </p>
                            <br />
                            <div className='flex justify-around'>
                                <button className='bg-red-700 px-4 rounded-sm hover:bg-red-600' onClick={() => Sup(index)}>SUP</button>
                                <button className='bg-green-700 px-2 rounded-sm hover:bg-green-600' onClick={() => Etat(index)}>MOD</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
