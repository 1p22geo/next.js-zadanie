import type { NextPage } from 'next'
import Head from 'next/head'
import Layout2 from './layout.js'
/*
<form className='p-5 mt-10 bg-slate-500 rounded-xl'>
  Gt<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><br/>
  Lt<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><br/>
  All<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><br/>
</form>
*/
const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-sky-200">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Database connection
        </h1>

        

        <form className='p-5 mt-10 bg-slate-500 rounded-xl'>
        <h1 className="text-2xl font-bold mb-3">
          Search users with age between:
        </h1>
          <p className='p-2'>Min: <input className='p-1 bg-slate-400 text-white ml-1' type={'text'} id={'min'} name={'min'}/><br/></p>
          <p className='p-2'>Max: <input className='p-1 bg-slate-400 text-white ml-1' type={'text'} id={'max'} name={'max'}/><br/></p>
        </form>

        <Layout2/>
        <div className='p-5 mt-10 bg-slate-500 rounded-xl'>
        <h1 className="text-2xl font-bold mb-3">
          Add another user:
        </h1>
        <form>
          <p className='p-2'>Name: <input className='p-1 bg-slate-400 text-white ml-1' type={'text'} id={'Name'} name={'Name'}/><br/></p>
          <p className='p-2'>Age: <input className='p-1 bg-slate-400 text-white ml-1' type={'text'} id={'Age'} name={'Age'}/><br/></p>
        </form>
          <button className='bg-slate-50 rounded-md p-1 active:bg-slate-300' onClick={()=>{
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
            console.log(name, age)
            fetch("/api/db_write", {
              method: "POST",
              body:JSON.stringify({name:name, age:age})
          })
          }}>Submit data</button>
          </div>
        
      </main>
    </div>
  )
}

export default Home
