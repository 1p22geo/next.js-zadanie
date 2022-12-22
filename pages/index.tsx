import type { NextPage } from 'next'
import Head from 'next/head'
import Layout2 from './layout.js'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-sky-200">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Title
        </h1>

        <form>
          Gt<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><br/>
          Lt<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><br/>
          All<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><br/>
        </form>

        <Layout2/>
        <form className='pt-10'>
          Name: <input type={'text'} id={'Name'} name={'Name'}/><br/>
          Age: <input type={'text'} id={'Age'} name={'Age'}/><br/>
          </form>
          <button onClick={()=>{
            let nameInput = document.getElementById('Name');
            let name;
            if(nameInput){
              name = nameInput.nodeValue
            }
            let ageInput = document.getElementById('Age');
            let age;
            if(ageInput){
              age = ageInput.nodeValue
            }
            console.log(name, age)
            fetch("/api/db_write", {
              method: "POST",
              body:JSON.stringify({name:name, age:age})
          })
          }}>Submit data</button>
        
      </main>
    </div>
  )
}

export default Home
