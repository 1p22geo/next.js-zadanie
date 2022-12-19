import * as React from 'react'
import * as ReactDOM from 'react-dom'
import component from './component.js'

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[]}
  }

  render(){
    return React.createElement(component, this.state)//React.createElement(component, this.state);
  }
  componentDidMount(){
    this.a()
  }
  async a(){
    const response = await fetch("/api/get", {
      method: "POST",
      body:JSON.stringify({age:{$gte:30}})
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
    this.setState({
      records:arr
    });
    //fetch('/api/get').then(response => response.json()).then(data => console.log(data));
    }
}