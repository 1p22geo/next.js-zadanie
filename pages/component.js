import * as React from 'react'
import Link from 'next/link.js'
import * as ReactDOM from 'react-dom'
import { useRouter } from 'next/router'
function a(x){
  return ((x+1).toString().length===1)?"0"+(x+1).toString():(x+1).toString()
}
function stringifyDate(date){
  let string = ""
  string += a(date.getDate())
  string += "."
  string += a(date.getMonth())
  string += "."
  string += date.getFullYear()
  string += " "
  string += a(date.getHours()-1)
  string += ":"
  string += a(date.getMinutes()-1)
  return string;
}

export default function component(props){
  const router = useRouter()
  let start, end;
  if(document.getElementById('start')){
    let Input = document.getElementById('start')
    let start_string = Input.value
    start = start_string.split(':').map((x)=>Number(x))
    if(start.length === 1) start=[0,0]
    start = start[0]*60 + start[1]
    
  }
  if(document.getElementById('end')){
    let Input = document.getElementById('end')
    let start_string = Input.value
    end = start_string.split(':').map((x)=>Number(x))
    if(end.length === 1) end=[23, 59]
    
    end = end[0]*60 + end[1]
  }
  console.log(start, end)
  //console.log(props.records)
    let elements = [<h1 key={1} className="text-2xl font-bold mb-3 p-5 border-[#FCA311] border-b-8 w-full">
    Results:
  </h1>];

    for (let n = 0; n < props.records.length; n++) {
      const record = props.records[n];
      elements.push(
        <Link href={'/movie?session='+router.query.session+'&movie='+record.title.replace(/ /g, '_')} key={n+2} className=" hover:bg-[#FCA311] p-3 px-6 box-border w-[25%] group">
            <h4 className='font-bold text-l'>{record.title}</h4>
            <p>{record.text}</p>
            <img src={record.image} className={'py-5'}/>
            <div className=''>
            <div className='overflow-scroll h-32'>
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
              {record.screening.map((screening)=>{
                let date = new Date(screening.timestamp)
                let minute = date.getMinutes()
                let hour = date.getHours()

                let time = hour*60 +minute

                let inDateBounds = (start<=time)&&(time<=end)

                return (screening.cinema==document.getElementById('adresses').value)&&inDateBounds?<div className='p-1' key={JSON.stringify(screening)}>{stringifyDate(new Date(screening.timestamp))}</div>:<></>})}
            </div>
            </div>
            </div>
        </Link>
    );
      
    }
    if(props.records.length === 0){
      elements.push(
        <div key={2} className='flex flex-col  w-full'>
        <h1 key={1} className="text-2xl font-bold mb-3 p-5">No matching results found</h1>
        <img src={'vercel.svg'} className={'p-10'}/>
        </div>
    );
    }
    let a = React.createElement("div", {className:"rounded-xl bg-[#E5E5E5] mt-10 border-[#FCA311] border-b-8 w-[70rem] flex flex-wrap"}, elements);
    
    return a;
}