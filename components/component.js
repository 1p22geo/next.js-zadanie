import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default function component(props){
    let elements = [];
    for(let n = 0; n<props.amount; n++){
        elements.push(
            <div key={n+2} className=" text-slate-50">
                <h4>Element</h4>
                <input className="bg-gray-400 text-black m-4"/>
            </div>
        );
    }
    let a = React.createElement("div", {className:"rounded-xl bg-slate-500 mt-10"}, elements);
    return a;
}