import * as React from 'react'
import component from './component.js'
import Router from 'next/router';
export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[], working:false}
  }

  render(){
    
    if(!(this.state.working)){
      this.a()
    }
    return React.createElement(component,{records: this.state.records})//React.createElement(component, this.state);
  }
  async a(){
    this.state.working = true;
    /*
    //If I decide to use radio buttons again
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
    }*/
    /*
    /searching by price
    let query = {$gte:0}
    try{
    let minInput = document.getElementById('min');
    
    let min;
    if(minInput){
      if(minInput.value != ''){
        min = +minInput.value
      }
      else{
        min = 0
      }
    }
    let maxInput = document.getElementById('max');
    let max;
    if(maxInput){
      if(maxInput.value != ''){
        max = +maxInput.value
      }
      else{
        max = false;
      }
    }
    if(max === false){
      query = {
        $gte:min
      }
    }
    else{
      query = {
        $gte:min,
        $lte:max
      }
    }}
    catch(e){}
    */
    let searchinput = document.getElementById('searchbar');
    let searchstring;
    let query;
    if(searchinput){
      if(searchinput.value != ''){
        searchstring = searchinput.value
        query = {$or:[{ title: { $regex: '(?i)'+searchstring} },{ description: { $regex: '(?i)'+searchstring} }]}
      }
      else{
        searchstring = false;
        query = {}
      }
    }
    const response = await fetch("/api/db_read", {
      method: "POST",
      body:JSON.stringify({query:query, session:Router.query.session})
  });
  
  if(response.status == 401){
    this.setState({
      records:[],
      working:false
    });
    Router.push('/');
    return;
  }
    let json_response = await response.json();
    //console.log(json_response)
    let arr = [];
    for (let n = 0; n < json_response.result.length; n++) {
      const document = json_response.result[n];
      arr.push({
        title:document.title,
        text:document.description,
        image:document.image
      });
    }
    //console.log(arr)
    setTimeout(()=>{this.setState({
      records:arr,
      working:false
    });}, 200)
    
    }
}