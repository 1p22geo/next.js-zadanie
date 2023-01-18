
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Login from '../components/login.js'
//import Layout2 from './layout.js'

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
          <h1 className="text-6xl">Database connection</h1>
          <Link href="/login_page" className='text-sky-200 p-2 self-center '>Go back</Link>
          
    </div>
    
    <div className="flex min-h-screen items-center justify-center bg-[#000000]">
      <Head>
        <title>Database connection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        
        
      <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        <h1 className="text-2xl font-bold mb-3">
          Register an account:
        </h1>
        <p id='label'/>
        <form>
          <p className='p-2'>Username: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Username'} name={'Username'}/><br/></p>
          <p className='p-2'>Password: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Password'} name={'Password'}/><br/></p>
        </form>
          <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={async ()=>{
            let nameInput = document.getElementById('Username') as HTMLInputElement;
            let name;
            if(nameInput){
              name = nameInput.value
            }
            let passwordInput = document.getElementById('Password') as HTMLInputElement;
            let password;
            if(passwordInput){
              password = passwordInput.value
            }
            
            let res = await fetch("http://localhost:3000/api/add_user", {
              method: "POST",
              body:JSON.stringify({name:name, password:password})
          })
          if(res.status === 409){
            //409 conflict - user already exists
            document.getElementById('label')!.innerHTML = "User already exists"
          }
          else if(res.status === 400){
            let reason = (await res.json()).reason
            switch(reason){
              case 1:
                document.getElementById('label')!.innerHTML = "The password needs to be at least 8 characters long."
                break;
              case 2:
                document.getElementById('label')!.innerHTML = "You need at least one digit in your password."
                break;
              case 3:
                document.getElementById('label')!.innerHTML = "You need at least one uppercase letter in your password."
                break;
              case 4:
                document.getElementById('label')!.innerHTML = "You need at least one special character in your password."
                break;
              default:
                document.getElementById('label')!.innerHTML = "I don't know what happened."
                break;
            }
          }
          else if(res.status === 201){
            (document.getElementById('Username') as HTMLInputElement)!.value = '';
            (document.getElementById('Password') as HTMLInputElement)!.value = '';
            document.getElementById('label')!.innerHTML = "User created! You can now log in"
          }
          }}>Submit data</button>
          </div>

          
        
      </main>
    </div>
    <div className='h-[20rem]'/>
    </div>
  )
}

export default Home
