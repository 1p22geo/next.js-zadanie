import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRef } from 'react';
const movie_description = () => {
    let [response, setResult] = useState({result:[]});
    let working = useRef(false);
    const router = useRouter();
    const session = router.query.session;
    const movie = router.query.movie.replace(/_/g, " ");
    if(!working.current){
        working.current = true
        fetch("/api/db_read", {
            method: "POST",
            body:JSON.stringify({query:{title:movie}, session:session})}).then(
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
    console.log(result)
    if(result.length===0){
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>The requested movie was not found</p>
            </div> 
        )
    }
    if(result.length>1){
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>It seems that there are multiple movies with the same title. This should not happen.</p>
            </div> 
        )
    }
    if(result.length===1){
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col  w-1/3'>
                <h1 className="text-2xl font-bold mb-3">
                {result[0].title}
                </h1>
                <p>{result[0].description}</p>
                <img src={result[0].image} className='h-40 m-8'/>
                <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300 w-1/3 mx-auto'>Buy tickets</button>
            </div> 
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