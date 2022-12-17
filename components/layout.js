import * as React from 'react'
import * as ReactDOM from 'react-dom'
import component from './component.js'

import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    database: 'test',
    user: 'root',
    password: ''
});
let a = executeQuery('SHOW TABLES;');
a.then(
function(xxx) {
  //console.log(xxx)
},
function(err) {console.log(err)}
)

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[]}
  }
  render(){
    return React.createElement(component, this.state);
  }
}
async function executeQuery(query) {
  try {
    //let r = 2;
    const results = db.query(query, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    //await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

