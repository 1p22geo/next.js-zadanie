import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default function component(props){
    let elements = [<h1 key={1} className="text-2xl font-bold mb-3 pt-5">
    Results:
  </h1>];

    for (let n = 0; n < props.records.length; n++) {
      const record = props.records[n];
      elements.push(
        <div key={n+2} className=" hover:bg-[#FCA311] rounded-xl p-3 px-14">
            <h4>{record.title}</h4>
            <p>{record.text}</p>
        </div>
    );
      
    }
    let a = React.createElement("div", {className:"rounded-xl bg-[#E5E5E5] mt-10"}, elements);
    
    return a;
}