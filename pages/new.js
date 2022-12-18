import { useState, useEffect } from 'react'
import axios from 'axios'
import component from "./component.js"

export default async function layout(){
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        axios('/api/get').then((response)=>{
            setData(response.data)
            setError(null);
        }).catch(setError)
    })
    if(error) return <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHH</p>

    return(
        React.createElement(component, data)
    )
}