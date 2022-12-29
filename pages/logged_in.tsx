import { randomBytes } from 'crypto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Login from './login.js'
import Layout2 from './layout.js'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Checkuser from './checkuser.js'
import Admin_back from "./admin_back"
import Cinema_choice from "./cinema_choice"
import Day_select from './day_select'
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
          <h1 className="text-6xl self-center" id='header'>Logged in</h1>
          <Admin_back/>
          <Link href="/" className='text-sky-200 p-2 self-center '>Log out</Link>
          <img src='vercel.svg' className='pr-12'/>
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
    
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel='stylesheet' href='style.css'/>
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
      <Checkuser/>
      
        

        <form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        <h1 className="text-2xl font-bold mb-3">
          Search for movies
        </h1>
          <p className='p-2'><input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'searchbar'} name={'searchbar'}/><br/></p>

          <h1 className="text-2xl font-bold mb-3">
            Where can you go
          </h1>
          
          <p className='p-2'>City: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'city'} name={'city'}/><br/></p>
          <p className='p-2'>Adress: <Cinema_choice/><br/></p>
          <h1 className="text-2xl font-bold mb-3">
            When do you have time
          </h1>
          <div className='flex'>
          <div>
          <h1 className="text-xl font-bold mb-3 dropdown">
            Which hours
            <span className='dropdown-content'>
              You can see movies from different days, but only the ones within those hours.
            </span>
          </h1>
          <p className='p-2'>Start: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'time'} id={'start'} name={'start'}/><br/></p>
          <p className='p-2'>End: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'time'} id={'end'} name={'end'}/><br/></p>
          </div>
          <div>
          <h1 className="text-xl font-bold mb-3 dropdown">
            Which days
            <span className='dropdown-content'>
              You can see movies from the selected hours, within all the given days
            </span>
          </h1><br/>
          Only select one day <input type={'checkbox'} id='multiple'/>
          <Day_select/>
          </div>
          </div>
        </form>
        <Layout2/>
      </main>
    </div>
    <div className='h-[20rem]'/>
    </div>
  )
}

export default Page