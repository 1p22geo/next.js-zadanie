import { randomBytes } from 'crypto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Login from './login.js'
import Layout2 from './layout.js'
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
          <Link href="/" className='text-sky-200 p-2 self-center translate-x-24'>Log out</Link>
          <img src='vercel.svg' className='pr-12'/>
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        
      
        

        <form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        <h1 className="text-2xl font-bold mb-3">
          Search users with age between:
        </h1>
          <p className='p-2'>Min: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'min'} name={'min'}/><br/></p>
          <p className='p-2'>Max: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'max'} name={'max'}/><br/></p>
        </form>
        <Layout2/>

        <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        <h1 className="text-2xl font-bold mb-3">
          Add another user:
        </h1>
        <form>
          <p className='p-2'>Name: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Name'} name={'Name'}/><br/></p>
          <p className='p-2'>Age: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Age'} name={'Age'}/><br/></p>
        </form>
          <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={()=>{
            let nameInput = document.getElementById('Name') as HTMLInputElement;
            let name;
            if(nameInput){
              name = nameInput.value
            }
            let ageInput = document.getElementById('Age') as HTMLInputElement;
            let age;
            if(ageInput){
              age = +ageInput.value
            }
            
            fetch("/api/db_write", {
              method: "POST",
              body:JSON.stringify({name:name, age:age})
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