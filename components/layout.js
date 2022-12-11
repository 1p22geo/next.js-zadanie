import * as React from 'react'
import * as ReactDOM from 'react-dom'
import component from './component.js'

import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: 'localhost',
    port: '3306',
    database: 'test',
    user: 'root',
    password: ''
  }
});

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[]}
  }
  render(){
    this.a();
    return React.createElement(component, this.state);
  }
  async a(){
    console.log('a');
    let newTable = [];
    var result = await excuteQuery({
      query:"SHOW TABLES"
    })
    console.log(result);
      
    for (let n = 0; n < result.length; n++) {
      const table = result[n];
      newTable.push({title:table.Tables_in_test, text:"text"});
    }
    this.setState({records:newTable});
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

