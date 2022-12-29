import { useState } from 'react';
 
const cinema_choice = () => {
    
    const [response, setResponse] = useState(null);
    const [working, setWorking] = useState(false);
    const [counter, setCounter] = useState(1)
    setInterval(() => {
        setCounter(counter+1)
    }, 200);
    

    if((typeof window != 'undefined')&&(!working)&&(document.getElementById('city'))){
        setWorking(true)
        fetch("/api/cinema_choice", {
            method: "POST",
            body:JSON.stringify({
                city:{$regex:document.getElementById('city').value, $options:'i'}
            })
        }).then((res)=>{
            
            if(res.ok){
                res.json().then((r_json)=>{
                    
                    setResponse(r_json)
                    setTimeout(()=>{setWorking(false)}, 200)
                })
            }
            else{
                setResponse(null)
                setTimeout(()=>{setWorking(false)}, 2000)
            }
        });
    }
    if((response !== null)&&(!(response.result.length===0))){
        return (
        <select id='adresses' name='adress'>
            {response.result.map((record)=>{return <option key={record.code} value={record.code}>{record.city+" "+record.adress}</option>})}
        </select>
        )
    }
    else{
        return(
    <select id='adresses' name='adress'>
        <optgroup label='No cinemas there'/>
    </select>
    )
    }
}
 
export default cinema_choice;