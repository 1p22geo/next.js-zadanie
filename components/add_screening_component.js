import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const add_screening_component = () => {
    const router = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter()
    let [working, setWorking] = useState(false)
    let [authorised, setAuth] = useState(false)

    if(!working){
        setWorking(true)
        fetch("http://localhost:3000/api/checkadmin", {
            method: "POST",
            body:JSON.stringify({
                session:router.query.session
            })})
        .then((res)=>{
            if(res.status==200){setAuth(true)}
            else{setAuth(false)}
        })
    }
    if(authorised){
        return ( 
            <Link href={router.asPath.replace(/movie/, "add_screening")} className=' flex-shrink-0 w-1/5 border-[10px] m-3 p-5 box-border border-[#FCA311] text-center'>
                <p className="text-5xl rounded-full p-1 border border-black pb-4">+</p>
            </Link>
        );
    }
    else{
        return <></>
    }
}
 
export default add_screening_component;