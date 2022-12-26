import * as React from 'react'
import component from './component.js'
import Router from 'next/router';
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max-min));
}
export default class Admincheck extends React.Component{
  constructor(props){
    super(props);
    this.state = {authorised:true, working:false}
  }

  render(){
    
    if(!(this.state.working)){
      this.a()
    }
    return <div/>//React.createElement(component, this.state);
  }
  async a(){
    this.state.working = true;
    
    const response = await fetch("/api/checkadmin", {
      method: "POST",
      body:JSON.stringify({session:Router.query.session})
  });
  
  if(response.status == 401){
    this.setState({
      authorised:false,
      working:false
    });
    Router.push('/');
    return;
  }
    
    setTimeout(()=>{this.setState({
      authorised:true,
      working:false
    });}, 200)
    
    }
}