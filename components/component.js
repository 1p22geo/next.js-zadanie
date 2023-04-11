import * as React from 'react'
import Link from 'next/link.js'
import * as ReactDOM from 'react-dom'
import { useRouter } from 'next/router'
function a(x){
  return ((x).toString().length===1)?"0"+(x).toString():(x).toString()
}
function stringifyDate(date){
  let string = ""
  string += a(date.getDate())
  string += "."
  string += a(date.getMonth()+1)
  string += "."
  string += date.getFullYear()
  string += " "
  string += a(date.getHours())
  string += ":"
  string += a(date.getMinutes())
  return string;
}

export default function component(props){
  const router = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter()
  let elements = [<h1 key={1} className="text-2xl font-bold mb-3 p-5 border-[#FCA311] border-b-8 w-full">
    Results:
  </h1>];
  if(typeof document != 'undefined'){
  let start, end;
  if(document&&document.getElementById('start')){
    let Input = document.getElementById('start')
    let start_string = Input.value
    start = start_string.split(':').map((x)=>Number(x))
    if(start.length === 1) start=[0,0]
    start = start[0]*60 + start[1]
    
  }
  if(document&&document.getElementById('end')){
    let Input = document.getElementById('end')
    let start_string = Input.value
    end = start_string.split(':').map((x)=>Number(x))
    if(end.length === 1) end=[23, 59]
    
    end = end[0]*60 + end[1]
  }

  let startQuery = -1
  if(document.getElementById('start-d')&&(document.getElementById('start-d').value != '')){
      let inputDate = document.getElementById('start-d').value//.split('-')
      let date = new Date(inputDate)
      startQuery = date.getTime()
      //console.log(inputDate)
  }
  let endQuery = Infinity
  if(document.getElementById('end-d')&&(document.getElementById('end-d').value != '')){
    let inputDate = document.getElementById('end-d').value//.split('-')
    let date = new Date(inputDate)
    endQuery = date.getTime()
  }
  
  //let dateQuery = -1
  if((document.getElementById('date')&&(document.getElementById('date').value != ''))){
    let inputDate = document.getElementById('date').value//.split('-')
    let date = new Date(inputDate)
    startQuery = date.getTime()
    endQuery = date.getTime()+86400000//86400000 miliseconds is one day
  }
  //console.log(start, end)
  //console.log(props.records)
    

    for (let n = 0; n < props.records.length; n++) {
      const record = props.records[n];
      elements.push(
        <Link href={'/movie?session='+router.query.session+'&movie='+record.title.replace(/ /g, '_')+"&cinema="+document.getElementById('adresses').value} key={n+3} className=" hover:bg-[#FCA311] p-3 overscroll-none px-6 box-border w-[25%] group border-black border-b">
            <h4 className='font-bold text-l'>{record.title}</h4>
            <p className='h-24'>{record.text.slice(0, 100)+(((record.text.length)>100)?'...':'')}</p>
            <img src={record.image} className={'py-5'}/>
            <div className=''>
            <div className='overflow-auto h-32'>
            <h4 className='font-bold text-l'>Genres:</h4>
            <ul className='list-disc list-inside'>
              {record.genres.map((genre)=>{return <li key={genre}>{genre}</li>})}
            </ul>
            <h4 className='font-bold text-l'>Starring:</h4>
            <ul className='list-disc list-inside'>
              {record.starring.map((genre)=>{return <li key={genre}>{genre}</li>})}
            </ul>
            <h4 className='font-bold text-l'>Screening:</h4>
            <div>
              {record.screening
              .sort((a,b)=>{if(a.timestamp>b.timestamp) return 1;else if(a.timestamp<b.timestamp) return -1;else if(a.timestamp===b.timestamp) return 0;})
              .map((screening)=>{
                let date = new Date(screening.timestamp)
                let minute = date.getMinutes()
                let hour = date.getHours()

                let time = hour*60 +minute

                let inDateBounds = (start<=time)&&(time<=end)
                //console.log(startQuery, endQuery, screening.timestamp)

                let inTimebounds = (startQuery<=screening.timestamp)&&(endQuery>=screening.timestamp)



                return (screening.cinema==document.getElementById('adresses').value)&&inDateBounds&&inTimebounds?<div className='p-1' key={JSON.stringify(screening)}>{stringifyDate(new Date(screening.timestamp))}</div>:<></>})}
            </div>
            </div>
            </div>
        </Link>
    );
      
    }
    }

    if((props.records.length === 0)||(typeof document == 'undefined')){
      elements.push(
        <div key={2} className='flex flex-col  w-full'>
        <h1 key={1} className="text-2xl font-bold mb-3 p-5">No matching results found</h1>
        
        </div>
    );
    }
    let a = React.createElement("div", {className:"rounded-xl bg-[#E5E5E5] mt-10 border-[#FCA311] border-b-8 w-[70rem] flex flex-wrap  border-collapse"}, elements);
    if(!(typeof window == 'undefined')&&( document.getElementById('loading'))){
    document.getElementById('loading').style.display = 'none'
    }
    return a;
}