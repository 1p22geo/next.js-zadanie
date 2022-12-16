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

let global_state = {records:[]};
async function a(){
  console.log(await excuteQuery({query:'SHOW TABLES'}));
}
a();
export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[]}
  }
  render(){
    return React.createElement(component, this.state);
  }
}
async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

