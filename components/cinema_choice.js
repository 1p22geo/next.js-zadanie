import { useState } from 'react';
import { useRef } from 'react';

const cinema_choice = () => {

    const [response, setResponse] = useState(null);
    const [working, setWorking] = useState(false);
    const [counter, setCounter] = useState(1)
    let city = useRef(null)
    setInterval(() => {
        setCounter(counter + 1)
    }, 200);
    if ((typeof window != 'undefined') && (!working) && (document.getElementById('city')) && (document.getElementById('city').value !== city.current)) {
        city.current = document.getElementById('city').value
        setWorking(true)
        fetch("http://localhost:3000/api/cinema_choice", {
            method: "POST",
            body: JSON.stringify({
                city: { $regex: document.getElementById('city').value, $options: 'i' }
            })
        }).then((res) => {

            if (res.status == 200) {
                res.json().then((r_json) => {
                    setResponse(r_json)
                    setTimeout(() => { setWorking(false) }, 200)
                })
            }
            else {
                setResponse(null)
                setTimeout(() => { setWorking(false) }, 2000)
            }
        });
    }
    if ((response !== null) && (!(response.result.length === 0))) {
        return (
            <select id='adresses' name='adress'>
                {response.result.map((record) => { return <option key={record.code} value={record.code}>{record.city + " " + record.adress}</option> })}
            </select>
        )
    }
    else {
        return (
            <select id='adresses' name='adress'>
                <optgroup label='No cinemas there' />
            </select>
        )
    }
}

export default cinema_choice;