import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
 
const admin_back = () => {
    const router = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter()
    const [authenticated, setValue] = useState(false);
    
    const [working, setWorking] = useState(false);
    if(!working){
        setWorking(true)
        fetch("http://localhost:3000/api/checkadmin", {
            method: "POST",
            body:JSON.stringify({
                session:router.query.session
            })
        }).then((res)=>{
            if(res.status===200){
                setValue(true)
                //setTimeout(()=>{setWorking(false)}, 1000)
            }
            else{
                setValue(false)
                //setTimeout(()=>{setWorking(false)}, 10000)
            }
            })
    }
    if(authenticated){
        return(<Link className='text-sky-200 p-2 self-center' href={'/admin?session='+router.query.session}>Go back to admin</Link>)
    }
    else{
        return <></>
    }
    
}

 
export default admin_back;