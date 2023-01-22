import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRef } from 'react';
import Chairs from './chairs'
import Preloader from './preload'
function a(x){
    return ((x).toString().length===1)?"0"+(x).toString():(x).toString()
  }
  function stringifyDate(date){
    date = new Date(date)
    let string = ""
    string += a(date.getDate())
    string += "."
    string += a(date.getMonth()+1)
    string += "."
    string += date.getFullYear()
    string += " "
    string += a(date.getHours())
    string += ":"
    string += a(date.getMinutes())
    return string;
  }
  
const movie_description = () => {
    let [response, setResult] = useState({result:[]});
    let working = useRef(false);
    const router = useRouter();
    const session = router.query.session;
    const movie = router.query.movie.replace(/_/g, " ");
    if(!working.current){
        working.current = true
        fetch("http://localhost:3000/api/screening_info", {
            method: "POST",
            body:JSON.stringify({query:{movie:movie, cinema:router.query.cinema, timestamp:parseInt(router.query.timestamp), movie_hall:router.query.movie_hall}, session:session})}).then(
                res=>{
                    res.json().then((res_json)=>{
                        setResult(res_json);
                        setTimeout(
                        ()=>{
                            working.current = false;
                        }, 200)
                    })
                    
                    }
        )
    }
    let result = response.result
    //console.log(result)
    if(result.length===0){
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>The requested screening was not found</p>
            </div> 
        )
    }
    if(result.length>1){
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>It seems that there are multiple screening at the same time, in the same place. This should not happen.</p>
            </div> 
        )
    }
    if(result.length===1){
        return(
            
            <>
            <Preloader/>
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col  w-1/2'>
            <h1 className=' font-extrabold text-5xl pt-1'>
                {result[0].chairs[router.query.row][router.query.col].price} zł
                </h1>
                <h1 className=' font-semibold text-3xl pt-1 m-4'>
                "{router.query.movie.replace(/_/g, " ")}"
                </h1>
                <h1 className=' font-semibold text-3xl pt-1'>
                {stringifyDate(parseInt(router.query.timestamp))}
                </h1>
            </div> 
            <Chairs chairs={result[0].chairs} hall={router.query.movie_hall} row={router.query.row} col={router.query.col}/>
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col  w-1/2'>
            <h1 className=' font-extrabold text-5xl pt-1'>
                Do you still want to buy this seat?
                </h1>
                <div className='h-32 flex justify-center'>
                    <div href={router.asPath.replace(/reservation/, "credits")} className='w-1/3 border-[10px] m-3 p-5 box-border border-emerald-500 text-center justify-center font-bold text-4xl cursor-pointer' onClick={
                        async ()=>{
                            document.getElementById('loading').style.display = "block"
                            let res = await fetch("http://localhost:3000/api/reserve_seat", {
                                method: "POST",
                                body:JSON.stringify({
                                    timestamp:router.query.timestamp,
                                    session:router.query.session,
                                    cinema:router.query.cinema,
                                    hall:router.query.movie_hall,
                                    row:router.query.row,
                                    col:router.query.col,
                                })
                            });
                            document.getElementById('loading').style.display = "none"
                        if(res.status == 201){
                            let res_json = await res.json()
                            router.push(router.asPath.replace(/reservation/, "credits")+'&mail='+res_json.link)
                        }
                    
                    }
                    }>Yes</div>
                    <Link href={router.asPath.replace(/reservation/, "screening").split('&row=')[0]} className='w-1/3 border-[10px] m-3 p-5 box-border border-red-500 text-center justify-center font-bold text-4xl'>No</Link>
                </div>
            </div> 
        </>
        )
    }
    else{
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>We don't even know what</p>
            </div> 
        )
    }
    
}
 
export default movie_description;