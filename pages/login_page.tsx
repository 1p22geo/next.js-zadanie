import { randomBytes } from 'crypto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Login from './login.js'
//import Layout2 from './layout.js'
var MD5 = require("crypto-js/md5")
/*
<form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl'>
  Gt<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><br/>
  Lt<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><br/>
  All<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><br/>
</form>
*/
const Home: NextPage = () => {
  return (
    <div className='bg-black'>
    <div className="text-6xl flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] pb-12 justify-between border-[#FCA311] border-b-8">
          <h1>Database connection</h1>
          <img src='vercel.svg' className='pr-12'/>
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        
      <Login/>
        
      <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        <h1 className="text-2xl font-bold mb-3">
          Sign in:
        </h1>
        <form>
          <p className='p-2'>Username: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Username'} name={'Username'}/><br/></p>
          <p className='p-2'>Password: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Password'} name={'Password'}/><br/></p>
        </form>
          <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={()=>{
            let nameInput = document.getElementById('Username') as HTMLInputElement;
            let name;
            if(nameInput){
              name = nameInput.value
            }
            let ageInput = document.getElementById('Password') as HTMLInputElement;
            let password;
            if(ageInput){
              password = ageInput.value
            }
            let salt = randomBytes(32).toString('hex')
            let md5 = MD5(password+salt).toString()
            
            fetch("/api/add_user", {
              method: "POST",
              body:JSON.stringify({name:name, md5:md5, salt:salt})
          })
          }}>Submit data</button>
          </div>
        
      </main>
    </div>
    <div className='h-[20rem]'/>
    </div>
  )
}

export default Home
