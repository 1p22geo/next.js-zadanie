import type { NextPage } from 'next'
import Head from 'next/head'
import Admincheck from './admincheck.js'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Checkuser from './checkuser.js'
import Cinema_choice from './cinema_choice'
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
  const router = useRouter()
  return (
    <div className='bg-black'>
      <div className="flex font-bold bg-[#14213D] p-5 w-full text-[#E5E5E5] pb-12 justify-between border-[#FCA311] border-b-8">
        <h1 className="text-6xl self-center" id='header'>Logged in</h1>
        <Link href={router.asPath.replace(/add_screening/, "movie")} className='text-sky-200 p-2 self-center'>Back</Link>
        <Link href="/" className='text-sky-200 p-2 self-center'>Log out</Link>
        <img src='vercel.svg' className='pr-12' />
      </div>

      <div className="flex min-h-screen items-center justify-center bg-[#000000]">
        <Head>
          <title>Database connection</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center">


          <Admincheck />
          <Checkuser />


          <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
            <h1 className="text-2xl font-bold mb-3">
              Add another screening time:
            </h1>
            <form>
              <p className='p-2'>City: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'city'} name={'city'} /><br /></p>
              <p className='p-2'>Cinema: <Cinema_choice /></p>

              <p className='p-2'>When: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'date'} id={'date'} name={'date'} /><input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'time'} id={'time'} name={'time'} /><br /></p>
              <p className='p-2'>Which movie hall: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311] w-12' type={'text'} id={'hall'} name={'hall'} /><br /></p>

            </form>
            <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={async () => {
              let cinemaInput = document.getElementById('adresses') as HTMLInputElement;
              let cinema;
              if (cinemaInput) {
                cinema = cinemaInput.value
              }
              let dateInput = document.getElementById('date') as HTMLInputElement;
              let date;
              if (dateInput) {
                date = dateInput.value
              }
              let timeI = document.getElementById('time') as HTMLInputElement;
              let time;
              if (timeI) {
                time = timeI.value
              }
              let hallInput = document.getElementById('hall') as HTMLInputElement;
              let hall;
              if (hallInput) {
                hall = hallInput.value
              }

              if ((cinema) && (date) && (time) && (hall)) {
                cinemaInput.value = ""
                dateInput.value = ""
                timeI.value = ""
                hallInput.value = ""

                let timestamp = Date.parse(date + 'T' + time + ':00')
                console.log(date, time, timestamp)
                let dateO = new Date(timestamp)

                let num = (dateO.getHours() * 60) + dateO.getMinutes()
                let title = router.query.movie as String

                title = title.replace(/_/g, " ")


                fetch("/api/add_screening", {
                  method: "POST",
                  body: JSON.stringify({
                    session: router.query.session,
                    title: title,
                    screening: {
                      cinema: cinema,
                      movie_hall: hall,
                      timestamp: timestamp,
                      time: num
                    }
                  })
                  //body:JSON.stringify({doc:{title:cinema, description:date, image:filename, genre:genres, starring:hall, reviews:[], screening:[]}, session:router.query.session})
                })
                alert("Added screening")
                //const result = await api.post("/foo", fileData, name: "Salih", massage: "Hello World"});
              }


            }}>Submit data</button>


          </div>


        </main>
      </div>
      <div className='h-[20rem]' />
    </div>
  )
}

export default Page