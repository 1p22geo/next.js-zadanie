import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default function component(props){
    let elements = [<h1 key={1} className="text-2xl font-bold mb-3 pt-5">
    Results:
  </h1>];

    for (let n = 0; n < props.records.length; n++) {
      const record = props.records[n];
      elements.push(
        <div key={n+2} className=" text-slate-50 hover:bg-slate-400 rounded-xl p-3 px-14">
            <h4>{record.title}</h4>
            <p>{record.text}</p>
        </div>
    );
      
    }
    let a = React.createElement("div", {className:"rounded-xl bg-slate-500 mt-10"}, elements);
    
    return a;
}