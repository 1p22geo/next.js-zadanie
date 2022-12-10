import React from 'react';
import component from '../components/component'

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("use test;", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
    con.query("show tables;", function (err, result) {
        if (err) throw err;
        console.log(result);
      
    for (let n = 0; n < result.length; n++) {
        const table = result[n];
        let name = table.Tables_in_test;
        con.query("DESCRIBE "+name, function (err, result) {
            if (err) throw err;
            console.log(result);
          });
    }
});
});
export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {colorcode:1}
  }
  render(){
    return React.createElement(component, {records:[{title:"a", text:"b"}]});
  }
  click(){
    this.setState({colorcode:this.colorcode+1})
  }
}