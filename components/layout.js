import React from 'react';
import component from '../components/component'

let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {colorcode:1}
  }
  render(){
    return React.createElement(component, {amount:this.state.colorcode});
  }
  click(){
    this.setState({colorcode:this.colorcode+1})
  }
}
  