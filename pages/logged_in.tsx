import type { NextPage } from 'next';
import Head from 'next/head';
import Layout2 from '../components/layout.js';
import Link from 'next/link';
import Checkuser from '../components/checkuser.js';
import Admin_back from "../components/admin_back";
var MD5 = require("crypto-js/md5");
/*
<form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl'>
  Gt<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><br/>
  Lt<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><br/>
  All<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><br/>
</form>
*/
const Page: NextPage = () => {
  
  return (
    <div className='bg-black'>
      
      <div className="flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] justify-end border-[#FCA311] border-b-8">
          
          <Admin_back />
          <Link href="/" className='text-sky-200 p-2 mx-6 self-center'>Log out</Link>
          <div className='flex flex-col'><img className=' h-14 w-14 self-center' id='image' src='none'></img><h1 className="text-2xl self-center" id='header'>Logged in</h1></div>
          
      </div>

      <div className="flex min-h-screen items-center justify-center bg-[#000000]">

        <Head>
          <title>Database connection</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
          <Checkuser />



          
          <Layout2 />
        </main>
      </div>
      <div className='h-[20rem]' />
    </div>
  )
}

export default Page