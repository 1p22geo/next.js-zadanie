import { useState } from 'react';
const day_select = () => {
    const [counter, setCounter] = useState(false)
    setInterval(() => { setCounter(!counter), 100 })
    if ((typeof document != 'undefined') && (document.getElementById('multiple')) && (document.getElementById('multiple').checked)) {
        return (
            <>
                <p className='p-2'>Date: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'date'} id={'date'} name={'date'} /><br /></p>
            </>
        );
    }
    else {
        return (
            <>
                <p className='p-2'>Start: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'date'} id={'start-d'} name={'start-d'} /><br /></p>
                <p className='p-2'>End: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'date'} id={'end-d'} name={'end-d'} /><br /></p>
            </>
        );
    }
}

export default day_select;