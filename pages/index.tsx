import { randomBytes } from 'crypto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link.js'
import Movies from './movies.js'
import Checkuser from './checkuser.js'
import { GetServerSideProps } from 'next'
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
    <div className="flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] pb-12 justify-between border-[#FCA311] border-b-8">
          <h1 className="text-6xl"  id='header'>Database connection</h1>
          <Link href="/login_page" className='text-sky-200 p-2 self-center '>Log in</Link>
          <img src='vercel.svg' className='pr-12'/>
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        
      <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
        <h1 className="text-2xl font-bold mb-3">
          We are the top database company in our company
        </h1>
        <p>Yes, absolutely</p>
        <img className='h-24' src='ok-hand-svgrepo-com.svg'></img>
          
      </div>

      <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        <h1 className="text-2xl font-bold mb-3">
          We have good movies
        </h1>
        <p>Yes very good</p>
        <Movies/>
        <Checkuser/>
          
      <div>
      </div>
      </div>
      
      </main>
    </div>
    <div className='h-[20rem]'/>
    </div>
  )
}

export default Home
