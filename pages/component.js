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
  string += a(date.getHours())
  string += "."
  string += a(date.getMinutes())
  string += "."
  string += a(date.getSeconds())
  return string;
}

export default function component(props){
  const router = useRouter()

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
            <div className='list-disc'>
              {record.screening.map((screening)=>{return <div className='p-1'><div key={JSON.stringify(screening)}>{stringifyDate(new Date(screening.timestamp))}</div><div>{screening.cinema.city+" "+screening.cinema.Adress}</div></div>})}
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