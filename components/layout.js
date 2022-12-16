import * as React from 'react'
import * as ReactDOM from 'react-dom'
import component from './component.js'

import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: ''
});

export default class Layout2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {records:[]}
  }
  render(){
    return React.createElement(component, this.state);
  }
  async componentDidUpdate(){
    await this.a();
  }
  async a(){
    console.log('a');
    let newTable = [];
    var result = excuteQuery('show tables')
    console.log(result);
      
    for (let n = 0; n < result.length; n++) {
      const table = result[n];
      //console.log(table.Tables_in_test)
      newTable.push('a');
    }
    //console.log(newTable);
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

