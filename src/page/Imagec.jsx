
import React,{useState,useEffect} from 'react';
// import montreImage from '../IMAGES/montrePtr3.webp';

export default function Imagec({image,prix}) {
    const [cont, setCont] = useState(1);

    const [total, setTotal] = useState(prix);

    const CompteurM = ()=>{
        if(cont>1){
            setCont(cont -1);
        }
    }

    useEffect(()=>{
        setTotal(cont * prix)
    }, [cont, prix]);

  return (
    <div className='img w-auto bg-slate-900 flex flex-col items-center justify-center h-auto '>
        <div className="i w-80 h-96 flex items-center justify-center rounded-xl">
            <img src={image} alt="" className=' object-cover h-full w-full rounded-xl' />
        </div>
        <p className=' text-white underline decoration-red-500 text-xl'>{prix.toLocaleString()} </p>
        <div className='flex w-80 justify-around mt-7'>
        <button onClick={CompteurM} className=' w-10 bg-slate-200 text-2xl font-bold rounded-lg hover:bg-white'>-</button>
        <p className=' text-3xl text-white font-bold w-32 bg-slate-700 flex items-center justify-center rounded-md'> {cont} </p>
        <button onClick={()=>setCont(cont +1)} className=' w-10 bg-slate-200 text-2xl font-bold rounded-lg hover:bg-white'>+</button>
        </div>
        <div className='flex w-80 mt-4'>
        <p className=' text-white font-medium text-2xl ml-12'>{`TOTAL: ${total.toLocaleString()} Frc`} </p>
        </div>

    </div>
  )
}
