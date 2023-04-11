import type { NextPage } from 'next'
import Head from 'next/head'
import Admincheck from '../components/admincheck'
import Link from 'next/link'
import Checkuser from '../components/checkuser.js'
import { NextRouter, useRouter } from 'next/router'
var MD5 = require("crypto-js/md5")
/*
<form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl'>
Gt<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><br/>
Lt<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><br/>
All<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><br/>
</form>
*/
const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
const Page: NextPage = () => {
  const router:NextRouter|any = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter()
  return (
    <div className='bg-black'>
    <div className="flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] justify-end border-[#FCA311] border-b-8">
          
          <Link  href={"/logged_in?session="+router.query.session} className='text-sky-200 p-2 mx-6 self-center'>Browse movies</Link>
          <Link href="/" className='text-sky-200 p-2 mx-6 self-center'>Log out</Link>
          <div className='flex flex-col'><img className=' h-14 w-14 self-center' id='image' src='none'></img><h1 className="text-2xl self-center" id='header'>Logged in</h1></div>
          
          
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        
      
        <Admincheck/>
        <Checkuser/>
        

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
        
          <p className='p-2'>Genres (separate with commas): <br/></p>
          <textarea
          className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]'
          id={'genres'}

          rows={3}

          cols={50}

        />
        <p className='p-2'>Starring (separate names with commas): <br/></p>
          <textarea
          className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]'
          id={'starring'}

          rows={5}

          cols={50}

        /><br/>
        
        
      
          <input className='my-4' type={'file'} id='file'/><br/>
        </form>
          <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={async ()=>{
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
            let genInput = document.getElementById('genres') as HTMLInputElement;
            let genres;
            if(genInput){
              genres = genInput.value.split(', ')
            }
            let starringInput = document.getElementById('starring') as HTMLInputElement;
            let starring;
            if(starringInput){
              starring = starringInput.value.split(', ')
            }
            
            let fileInput = (document.getElementById('file') as HTMLInputElement)!;
            let files = fileInput.files!
            let filename;
            if((files!.length===1)&&(nameInput.value)&&(ageInput.value)&&(genInput.value)&&(starringInput.value)){
              nameInput.value = ""
              ageInput.value = ""
              genInput.value = ""
              starringInput.value = ""
              fileInput.value = ""
              let file = files[0]
              const base64: string = await toBase64(file) as string;

              const fileData = { base64, fileName: file.name };
              let res = await fetch("http://localhost:3000/api/save_file", {
                method: "POST",
                body:JSON.stringify({
                  file:fileData,
                  session:router.query.session
                })

              });
              let r_json = await res.json()
              filename = r_json.filename
              fetch("http://localhost:3000/api/db_write", {
                method: "POST",
                body:JSON.stringify({doc:{title:title, description:description, image:filename, genre:genres, starring:starring, reviews:[], screening:[]}, session:router.query.session})
            })
            alert("Added movie")
              
            }
            
            
          }}>Submit data</button>

          
          </div>
          
          
      </main>
    </div>
    <div className='h-[20rem]'/>
    </div>
  )
}

export default Page