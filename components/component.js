import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {useEffect, useState} from 'react';

export default function component(props){
    const [count, setCount] = useState(1);

  useEffect(() => {
    console.log('Count is now: ', count);
  }, [count]);

  const handleClick = event => {
    setCount(count + 1);
  };
    let elements = [];

    for (let n = 0; n < props.records.length; n++) {
      const record = props.records[n];
      elements.push(
        <div onClick={handleClick} key={n+2} className=" text-slate-50 hover:bg-slate-400 rounded-xl p-3">
            <h4>{record.title}</h4>
            <p>{record.text}</p>
        </div>
    );
      
    }
    let a = React.createElement("div", {className:"rounded-xl bg-slate-500 mt-10"}, elements);
    
    return a;
}