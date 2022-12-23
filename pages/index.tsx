import { randomBytes } from 'crypto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Login from './login.js'
import Signin from './signin.js'
import Layout2 from './layout.js'
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
    <div className=" flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] pb-12 justify-between border-[#FCA311] border-b-8">
          <h1 className='text-6xl'>Cinema database</h1>
          <div className='self-center'>
          <button className='bg-[#FCA311] rounded-md px-5 active:bg-slate-300 ml-5 h-10 self-center' onClick={()=>{
            document.getElementById('login')!.style.display = "block"
          }}>Log in</button>
          <button className='bg-[#FCA311] rounded-md px-5 active:bg-slate-300 ml-5 h-10 self-center' onClick={()=>{
            document.getElementById('signin')!.style.display = "block"
          }}>Sign in</button>
          </div>
          <img src='star.svg' className='h-24 self-center pr-24'/>
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        
      <Login/>
      <Signin/>
                  
        
      </main>
    </div>
    </div>
  )
}

export default Home
