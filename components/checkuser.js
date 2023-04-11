import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
 
const checkuser = () => {
    let [working, setWorking] = useState(false);
    let [header, setHeader] = useState("");
    let [img, setImg] = useState(null);
    let time = useRef(-1)
    const router = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter()
    //console.log('rendering')
    useEffect(()=>{
        document.getElementById('header').innerHTML = header
        document.getElementById('image').src = img
    })
    if(!working){
        //console.log('fetching API')
        setWorking(true);
        fetch("http://localhost:3000/api/check_session", {
            method: "POST",
            body:JSON.stringify({
                session:router.query.session
            })
        }).then((response)=>{
            response.json().then((res_json)=>{
                if((response.status===401)||(!res_json.active)){
                    //setTimeout(()=>{setWorking(false);}, 2000)
                    router.push('/');
                    return (<></>);
                }
                time.current = res_json.time
                setHeader(res_json.user)
                setImg(res_json.image)
                if(time.current<=540000){
                    setTimeout(()=>{setWorking(false);}, 10000)
                }
                else{
                    setTimeout(()=>{setWorking(false);}, 300)
                }

            })
        })
    }
    if(time.current!==-1){
        if(time.current>=540000){
            return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col' id='checkuser'>
            <h1 className="text-2xl font-bold mb-3">
              Session will expire in {Math.round((600000-time.current)/1000)} seconds!
            </h1>
            <p>You will be kicked out of the website, right back to the main page.</p>
            <img className='my-5' src='vercel.svg'></img>
            <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300 w-1/3 self-center' onClick={()=>{
                fetch("http://localhost:3000/api/revive_session", {
                    method: "POST",
                    body:JSON.stringify({
                        session:router.query.session
                    })
                }).then(()=>{if(document.getElementById('checkuser')){document.getElementById('checkuser').style.display = 'none'}});
            }}>No, I'm still here</button>
              
          </div>)
        }
    }
    return (<></>);
}
 
export default checkuser;