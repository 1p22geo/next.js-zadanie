import * as React from 'react'
import * as ReactDOM from 'react-dom'
import component from './component.js'

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[]}
  }
  render(){
    return React.createElement(component, this.state);
  }
}

