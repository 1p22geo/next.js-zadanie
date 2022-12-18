import * as React from 'react'
import * as ReactDOM from 'react-dom'
import component from './component.js'

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[]}
  }
  render(){
    return <div className='p-10' onClick={this.a}>{React.createElement(component, this.state)}</div>//React.createElement(component, this.state);
  }
  async a(){
    const response = await fetch("/api/get", {
      method: "GET"});
    let json_response = await response.json();
    let arr = [];
    for (let n = 0; n < json_response.result.length; n++) {
      const document = json_response.result[n];
      arr.push({
        title:document.name,
        text:document.age
      });
    }
    this.setState({
      records:arr
    });
    //fetch('/api/get').then(response => response.json()).then(data => console.log(data));
    }
}