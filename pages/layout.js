import * as React from 'react'
import component from './component.js'

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[], working:false}
  }

  render(){
    if(!(this.state.working)){
      //this.a()
    }
    return React.createElement(component, this.state)//React.createElement(component, this.state);
  }
  async a(){
    this.state.working = true;
    let radios = document.getElementsByName('buttons');
    let checked = 2
    for (let i = 0; i < radios.length; i++) {
      const radiobutton = radios[i];
      if(radiobutton.checked){
        checked = i
      }
    }
    let query = {$gte:0}
    if(checked === 0){
      query = {$gte:30}
    }
    if(checked === 1){
      query = {$lte:30}
    }
    const response = await fetch("/api/db_read", {
      method: "POST",
      body:JSON.stringify({age:query})
  });
    let json_response = await response.json();
    let arr = [];
    for (let n = 0; n < json_response.result.length; n++) {
      const document = json_response.result[n];
      arr.push({
        title:document.name,
        text:document.age
      });
    }
    setTimeout(()=>{this.setState({
      records:arr,
      working:false
    });}, 100)
    //fetch('/api/get').then(response => response.json()).then(data => console.log(data));
    }
}