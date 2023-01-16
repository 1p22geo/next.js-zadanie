import type { NextPage } from 'next';
import Head from 'next/head';
import Login from '../components/login.js';
import Layout2 from '../components/layout.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Checkuser from '../components/checkuser.js';
import Admin_back from "../components/admin_back";
import Cinema_choice from "../components/cinema_choice";
import Day_select from '../components/day_select';
var MD5 = require("crypto-js/md5");
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
        <Admin_back />
        <Link href="/" className='text-sky-200 p-2 self-center '>Log out</Link>
        
      </div>

      <div className="flex min-h-screen items-center justify-center bg-[#000000]">

        <Head>
          <title>Database connection</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
          <Checkuser />



          <form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8' >
            <h1 className="text-2xl font-bold mb-3">
              Search for movies
            </h1>
            <datalist id='datalist'>
              <option value='documentary'/>
              <option value='comedy'/>
              <option value='sport'/>
              <option value='music'/>
              <option value='impression'/>
              <option value='science fiction'/>
              <option value='disaster movie'/>
              <option value='stand-up'/>
              <option value='satire'/>
            </datalist>
            <p className='p-2'>Title<input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'searchbar'} name={'searchbar'} /><br /></p>
            <p className='p-2'>Genre<input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' list={'datalist'} type={'text'} id={'genres'} name={'genre'} />
            <br /></p>
            
            <h1 className="text-2xl font-bold mb-3">
              Where can you go
            </h1>

            <p className='p-2'>City: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'city'} name={'city'} /><br /></p>
            <p className='p-2'>Adress: <Cinema_choice /><br /></p>
            <p className='p-2'>Or show all movies: <input type={'checkbox'} id='all' /><br /></p>
            <h1 className="text-2xl font-bold mb-3">
              When do you have time
            </h1>
            <div className='flex justify-evenly text-center'>
              <div>
                <h1 className="text-md font-bold mb-3 dropdown">
                  Select hours
                  <span className='dropdown-content'>
                    You can see movies from different days, but only the ones within those hours.
                  </span>
                </h1>
                <p className='p-2'>Start: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'time'} id={'start'} name={'start'} /><br /></p>
                <p className='p-2'>End: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'time'} id={'end'} name={'end'} /><br /></p>
              </div>
              <div>
                <h1 className="text-md font-bold mb-3 dropdown">
                  Select days
                  <span className='dropdown-content'>
                    You can see movies from the selected hours, within all the given days
                  </span>
                </h1><br />
                
                <Day_select />
                Only select one day <input type={'checkbox'} id='multiple' />
              </div>
            </div>
            
          </form>
          <div className='w-1/3 mt-10 p-5 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8' id='loading'>
          <h1 className="text-2xl font-bold mb-3">
              Loading...
            </h1>
              <div className='w-48 h-48 bg-emerald-400 mx-auto rounded-full pt-8 animate-spin'>
              
                <div className=' w-32 h-32 bg-[#E5E5E5] mx-auto rounded-full'>
                  
                </div>
                <div className='h-8 w-4 bg-emerald-100 translate-x-24'></div>
              </div>
          </div>
          <Layout2 />
        </main>
      </div>
      <div className='h-[20rem]' />
    </div>
  )
}

export default Page