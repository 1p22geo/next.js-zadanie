var mysql = require('mysql');
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import component from './component.js'

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});
export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {colorcode:1}
  }
  render(){
    console.log(con.query('SHOW TABLES'));
    return React.createElement(component, {records:[{title:"a", text:"b"}]});
  }
  click(){
    this.setState({colorcode:this.colorcode+1})
  }
}