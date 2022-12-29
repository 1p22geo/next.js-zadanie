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
    let query = {}
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
    let newQuery = query
    if(document.getElementById('adresses')){
      if(!((typeof document.getElementById('adresses').value == 'undefined')||(document.getElementById('adresses').value === null))){
        let start, end = [0]
        if(document.getElementById('start')){
          let Input = document.getElementById('start')
          let start_string = Input.value
          start = start_string.split(':').map((x)=>Number(x))
          
        }
        if(start.length === 1) start=[0,0]
        start = start[0]*60 + start[1]
        if(document.getElementById('end')){
          let Input = document.getElementById('end')
          let start_string = Input.value
          end = start_string.split(':').map((x)=>Number(x))
          
        }
        if(end.length === 1) end=[23, 59]
          
        end = end[0]*60 + end[1]

        newQuery = {$and:[{screening:{$elemMatch:{$and:[{cinema:document.getElementById('adresses').value},{time:{$gte:start, $lte:end}}]}}}, query]}
      }
    }
    const response = await fetch("/api/db_read", {
      method: "POST",
      body:JSON.stringify({query:newQuery, session:Router.query.session})
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
        image:document.image,
        genres:document.genre,
        starring:document.starring,
        screening:document.screening
      });
    }
    //console.log(arr)
    setTimeout(()=>{this.setState({
      records:arr,
      working:false
    });}, 300)
    
    }
}