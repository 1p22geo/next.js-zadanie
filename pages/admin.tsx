import type { NextPage } from 'next'
import Head from 'next/head'
import Admincheck from './admincheck.js'
import { useRouter } from 'next/router'
import Link from 'next/link'
var MD5 = require("crypto-js/md5")
/*
<form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl'>
  Gt<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><br/>
  Lt<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><br/>
  All<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><br/>
</form>
*/
const Page: NextPage = () => {
  const router = useRouter()
  return (
    <div className='bg-black'>
    <div className="flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] pb-12 justify-between border-[#FCA311] border-b-8">
          <h1 className="text-6xl self-center">Logged in</h1>
          <Link href="/" className='text-sky-200 p-2 self-center'>Log out</Link>
          <img src='vercel.svg' className='pr-12'/>
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        
      
        <Admincheck/>

        

        <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        <h1 className="text-2xl font-bold mb-3">
          Add another movie:
        </h1>
        <form>
          <p className='p-2'>Title: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'title'} name={'title'}/><br/></p>
          
          <p className='p-2'>Description: <br/></p>
          <textarea
          className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]'
          id={'description'}

          rows={5}

          cols={50}

        />
          <p className='p-2'>Image: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'filename'} name={'filename'}/><br/></p>
        </form>
          <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={()=>{
            let nameInput = document.getElementById('title') as HTMLInputElement;
            let title;
            if(nameInput){
              title = nameInput.value
            }
            let ageInput = document.getElementById('description') as HTMLInputElement;
            let description;
            if(ageInput){
              description = ageInput.value
            }
            let imageInput = document.getElementById('filename') as HTMLInputElement;
            let filename;
            if(imageInput){
              filename = imageInput.value
            }
            
            fetch("/api/db_write", {
              method: "POST",
              body:JSON.stringify({doc:{title:title, description:description, image:filename}, session:router.query.session})
          })
          }}>Submit data</button>
          </div>
          
          
      </main>
    </div>
    <div className='h-[20rem]'/>
    </div>
  )
}

export default Page