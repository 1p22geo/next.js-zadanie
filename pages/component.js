import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default function component(props){

  console.log(props.records)
    let elements = [<h1 key={1} className="text-2xl font-bold mb-3 p-5 border-[#FCA311] border-b-8 w-full">
    Results:
  </h1>];

    for (let n = 0; n < props.records.length; n++) {
      const record = props.records[n];
      elements.push(
        <div key={n+2} className=" hover:bg-[#FCA311] p-3 px-14 box-border w-[25%]">
            <h4 className='font-bold text-l'>{record.title}</h4>
            <p>{record.text}</p>
            <img src={record.image} className={'py-5'}/>
        </div>
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