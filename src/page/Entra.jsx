import React ,{useState} from 'react'

export default function Entra() {
   const [af , setAf] = useState('');
   const [mod , setMod] =useState(false);

   const Mod = ()=> {
    setMod(prevmod => !prevmod)
   }

   const clic = (value)=>{
    if (value === '='){
        try{
            setAf(eval(af));
        }
        catch{
            setAf("C'pas possible")
        }
    }
    else{
        setAf(af + value);
    }
    
    
    if (af === "C'pas possible") if (value === '=') {
        setAf('');
        return;
    }
    else (
        setAf(value)
    )
    if (value === 'C'){
        setAf('');
        return;
    }
     
   }


  return (
    <div className={mod ? ' text-white flex w-full min-h-screen items-center justify-center p-2 bg-white' : ' bg-black text-white flex w-full min-h-screen items-center justify-center p-2'}>
        <button className={mod ? 'text-black border w-16 rounded-md bg-[#e28868]' : ' border w-16 rounded-md bg-[#e28868] '} onClick={Mod}>{mod ? 'sombre' : 'claire'} </button>
        <div className="boit w-[35%] min-h-[70%]  border-2 border-[#e28868] rounded-md flex flex-col gap-4 p-2 ">
            <input value={af} type="text" readOnly className=' h-20 px-4 text-2xl font-bold text-[#e28868] rounded-md bg-[#212121] outline-none ' />
            <div className="butt flex flex-wrap gap-4 ml-5">
                <button onClick={()=>clic('1')} className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>1</button>
                <button onClick={()=>clic('2')} className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>2</button>
                <button onClick={()=>clic('3')} className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>3</button>
                <button onClick={()=>clic('4')} className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>4</button>
                <button onClick={()=>clic('5')} className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>5</button>
                <button onClick={()=>clic('6')} className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>6</button>
                <button onClick={()=>clic('7')}  className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>7</button>
                <button onClick={()=>clic('8')}  className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>8</button>
                <button onClick={()=>clic('9')}  className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>9</button>
                <button onClick={()=>clic('0')}  className=' w-20 py-2 rounded-lg border-[#e28868] text-[#e28868]  border hover:bg-[#212121] transition duration-500 '>0</button>
                <button onClick={()=>clic('.')}  className=' w-20 py-2 rounded-lg hover:border-[#e28868] text-[#fff] font-bold text-xl hover:border bg-[#212121] hover:bg-black transition duration-500 '>.</button>
                <button onClick={()=>clic('+')}  className=' w-20 py-2 rounded-lg hover:border-[#e28868] text-[#fff] font-bold text-xl hover:border bg-[#212121] hover:bg-black transition duration-500 '>+</button>
                <button onClick={()=>clic('-')}  className=' w-20 py-2 rounded-lg hover:border-[#e28868] text-[#fff] font-bold text-xl hover:border bg-[#212121] hover:bg-black transition duration-500 '>-</button>
                <button onClick={()=>clic('/')}  className=' w-20 py-2 rounded-lg hover:border-[#e28868] text-[#fff] font-bold text-xl hover:border bg-[#212121] hover:bg-black transition duration-500 '>/</button>
                <button onClick={()=>clic('*')}  className=' w-20 py-2 rounded-lg hover:border-[#e28868] text-[#fff] font-bold text-xl hover:border bg-[#212121] hover:bg-black transition duration-500 '>*</button>
                <button onClick={()=>clic('C')}  className=' w-20 py-2 bg-[#e28868] rounded-lg hover:border-[#e28868] text-[#fff] font-bold text-xl hover:border  hover:bg-black transition duration-500 '>C</button>
            </div>
            <div className="egal h-36 flex items-center justify-center text-3xl">
            <button onClick={()=>clic('=')}  className=' w-40 py-2 rounded-lg hover:border-[#e28868] text-[#fff] font-bold text-xl hover:border bg-[#212121] hover:bg-black transition duration-500 '>=</button>
            </div>
        </div>
    </div>
  )
}
