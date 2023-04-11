import type { NextPage } from 'next'
import Head from 'next/head'
import Movie from "../components/reservation"
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Checkuser from '../components/checkuser.js'
import Admin_back from "../components/admin_back"
var MD5 = require("crypto-js/md5")
/*
<form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl'>
  Gt<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><br/>
  Lt<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><br/>
  All<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><br/>
</form>
*/
const Page: NextPage = () => {
  const router:NextRouter|any = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter()
  return (
    <div className='bg-black'>
    <div className="flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] justify-end border-[#FCA311] border-b-8">
          
          <Admin_back />
          <Link href="/" className='text-sky-200 p-2 mx-6 self-center'>Log out</Link>
          <Link href={"/logged_in?session="+router.query.session} className='text-sky-200 p-2 self-center'>Back to movies</Link>
          <Link href={router.asPath.replace(/reservation/, "movie").split('&timestamp=')[0]} className='text-sky-200 p-2 self-center'>Select another day</Link>

          <div className='flex flex-col'><img className=' h-14 w-14 self-center' id='image' src='none'></img><h1 className="text-2xl self-center" id='header'>Logged in</h1></div>
          
      </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]" id='bg'>
    
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
      <Checkuser/>
      
      <Movie/>
      
      <div className='w-1/3 mt-10 p-5 bg-[#E5E5E5] rounded-xl hidden border-[#FCA311] border-b-8' id='loading'>
          <h1 className="text-2xl font-bold mb-3">
              Please wait...
            </h1>
              <div className='w-48 h-48 bg-emerald-400 mx-auto rounded-full pt-8 animate-spin'>
              
                <div className=' w-32 h-32 bg-[#E5E5E5] mx-auto rounded-full'>
                  
                </div>
                <div className='h-8 w-4 bg-emerald-100 translate-x-24'></div>
              </div>
          </div>  
      </main>
    </div>
    <div className='h-[20rem]'/>
    </div>
  )
}

export default Page