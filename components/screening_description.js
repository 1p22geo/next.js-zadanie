import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRef } from 'react';
import Chairs from '../components/chairs'
import Preloader from './preload'

import Add_screening from './add_screening_component'
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
                <p>It seems that there are multiple screenings at the same time, in the same place. This should not happen.</p>
            </div> 
        )
    }
    if(result.length===1){
        return(
            <>
            <Preloader/>
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col  w-1/2'>
                <h1 className=' font-extrabold text-5xl mb-3'>
                {router.query.movie.replace(/_/g, " ")}
                </h1>
                <h1 className=' font-semibold text-3xl pt-1'>
                {stringifyDate(parseInt(router.query.timestamp))}
                </h1>
                
                
                <img src={router.query.image} className='w-96 mx-auto m-8'/>
                
                
            </div> 
            <Chairs chairs={result[0].chairs} hall={router.query.movie_hall}/>
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