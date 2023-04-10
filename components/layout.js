import * as React from 'react'
import component from '../components/component'
import Router from 'next/router';

import Link from 'next/link';
import Checkuser from '../components/checkuser.js';
import Admin_back from "../components/admin_back";
import Cinema_choice from "../components/cinema_choice";
import Day_select from '../components/day_select';
export default class Layout2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [], working: false }
    
  }
  componentDidMount(){
    setTimeout(this.update_data.bind(this), 300)
  }
  render() {
    let button = <button className=' p-2 bg-[#FCA311] rounded-xl mt-4' onClick={this.update_data.bind(this)}>Search</button>
    //if ((!this.state.working) && (typeof window != 'undefined')) this.a()

    return (
      <>
      <form className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8' onSubmit={(e)=>{e.preventDefault()}}>
            <h1 className="text-2xl font-bold mb-3">
              Search for movies
            </h1>
            <datalist id='datalist'>
              <option value='documentary'/>
              <option value='comedy'/>
              <option value='sport'/>
              <option value='music'/>
              <option value='impression'/>
              <option value='science fiction'/>
              <option value='disaster movie'/>
              <option value='stand-up'/>
              <option value='satire'/>
            </datalist>
            <p className='p-2'>Title<input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'searchbar'} name={'searchbar'} /><br /></p>
            <p className='p-2'>Genre<input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' list={'datalist'} type={'text'} id={'genres'} name={'genre'} />
            <br /></p>
            
            <h1 className="text-2xl font-bold mb-3">
              Where can you go
            </h1>

            <p className='p-2'>City: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'city'} name={'city'} /><br /></p>
            <p className='p-2'>Adress: <Cinema_choice /><br /></p>
            <p className='p-2'>Or show all movies: <input type={'checkbox'} id='all' /><br /></p>
            <h1 className="text-2xl font-bold mb-3">
              When do you have time
            </h1>
            <div className='flex justify-evenly text-center'>
              <div>
                <h1 className="text-md font-bold mb-3 dropdown">
                  Select hours
                  <span className='dropdown-content'>
                    You can see movies from different days, but only the ones within those hours.
                  </span>
                </h1>
                <p className='p-2'>Start: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'time'} id={'start'} name={'start'} /><br /></p>
                <p className='p-2'>End: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'time'} id={'end'} name={'end'} /><br /></p>
              </div>
              <div>
                <h1 className="text-md font-bold mb-3 dropdown">
                  Select days
                  <span className='dropdown-content'>
                    You can see movies from the selected hours, within all the given days
                  </span>
                </h1><br />
                
                <Day_select />
                Only select one day <input type={'checkbox'} id='multiple' />
              </div>
            </div>
            <button className=' p-2 bg-[#FCA311] rounded-xl mt-4' onClick={this.update_data.bind(this)}>Search</button>
          </form>
          <div className='w-1/3 mt-10 p-5 bg-[#E5E5E5] rounded-xl hidden border-[#FCA311] border-b-8' id='loading'>
          <h1 className="text-2xl font-bold mb-3">
              Loading...
            </h1>
              <div className='w-48 h-48 bg-emerald-400 mx-auto rounded-full pt-8 animate-spin'>
              
                <div className=' w-32 h-32 bg-[#E5E5E5] mx-auto rounded-full'>
                  
                </div>
                <div className='h-8 w-4 bg-emerald-100 translate-x-24'></div>
              </div>
          </div>
          
        {React.createElement(component, { records: this.state.records })}
      </>
    )
  }
  async update_data() {
    if(!document.getElementById('loading')){return;}
    console.log('a')
    this.state.working = true;
    document.getElementById('loading').style.display = 'block'
    /*
    //If I decide to use radio buttons again
    let radios = document.getElementsByName('buttons');
    let checked = 2
    for (let i = 0; i < radios.length; i++) {
      const radiobutton = radios[i];
      if(radiobutton.checked){
        checked = i
      }
    }
    let query = {$gte:0}
    if(checked === 0){
      query = {$gte:30}
    }
    if(checked === 1){
      query = {$lte:30}
    }*/
    /*
    /searching by price
    let query = {$gte:0}
    try{
    let minInput = document.getElementById('min');
    
    let min;
    if(minInput){
      if(minInput.value != ''){
        min = +minInput.value
      }
      else{
        min = 0
      }
    }
    let maxInput = document.getElementById('max');
    let max;
    if(maxInput){
      if(maxInput.value != ''){
        max = +maxInput.value
      }
      else{
        max = false;
      }
    }
    if(max === false){
      query = {
        $gte:min
      }
    }
    else{
      query = {
        $gte:min,
        $lte:max
      }
    }}
    catch(e){}
    */
    let searchinput = document.getElementById('searchbar');
    let searchstring;
    let query = {}
    if (searchinput) {
      if (searchinput.value != '') {
        searchstring = searchinput.value
        query = { title: { $regex: '(?i)' + searchstring } }
      }
      else {
        searchstring = false;
        query = {}
      }
    }
    let newQuery = query
    console.log('b')
    if (document.getElementById('adresses')) {
      if (!((typeof document.getElementById('adresses').value == 'undefined') || (document.getElementById('adresses').value == ''))) {

        let start, end = [0]
        if (document.getElementById('start')) {
          let Input = document.getElementById('start')
          let start_string = Input.value
          start = start_string.split(':').map((x) => Number(x))

        }
        if (start.length === 1) start = [0, 0]
        start = start[0] * 60 + start[1]
        if (document.getElementById('end')) {
          let Input = document.getElementById('end')
          let start_string = Input.value
          end = start_string.split(':').map((x) => Number(x))

        }
        if (end.length === 1) end = [23, 59]

        end = end[0] * 60 + end[1]

        let startQuery = {}
        if (document.getElementById('start-d') && (document.getElementById('start-d').value != '')) {
          let inputDate = document.getElementById('start-d').value//.split('-')
          let date = new Date(inputDate)
          startQuery = { timestamp: { $gte: date.getTime() } }
          console.log(startQuery)
        }
        let endQuery = {}
        if (document.getElementById('end-d') && (document.getElementById('end-d').value != '')) {
          let inputDate = document.getElementById('end-d').value//.split('-')
          let date = new Date(inputDate)
          endQuery = { timestamp: { $lte: date.getTime() } }
        }
        let dateQuery;
        if ((document.getElementById('date') && (document.getElementById('date').value != ''))) {
          let inputDate = document.getElementById('date').value//.split('-')
          let date = new Date(inputDate)
          dateQuery = { timestamp: { $gte: date.getTime(), $lte: date.getTime() + 86400000 } }//86400000 miliseconds is one day
          //console.log(dateQuery)
        }
        else {
          dateQuery = { $and: [startQuery, endQuery] }
        }
        //console.log(dateQuery)
        let cinemaquery = {}; if (document.getElementById('adresses').value) cinemaquery = { cinema: document.getElementById('adresses').value }
        let genre_query = {}; if (document.getElementById('genres').value) genre_query = { genre: document.getElementById('genres').value }

        newQuery = { $and: [{ screening: { $elemMatch: { $and: [cinemaquery, { time: { $gte: start, $lte: end } }, dateQuery] } } }, query, genre_query] }
      }
    }
    console.log('c')
    if ((document.getElementById('all')) && (document.getElementById('all').checked)) { newQuery = {} }
    //console.log('sending!')
    console.log('d')
    const response = await fetch("api/db_read", {
      method: "POST",
      body: JSON.stringify({ query: newQuery, session: (new URLSearchParams(window.location.search)).get('session') })
    });
    console.log('e')
    if (response.status == 401) {
      this.setState({
        records: [],
        working: false
      });
      Router.push('/');
      return;
    }
    console.log('f')
    let json_response = await response.json();
    let arr = [];
    for (let n = 0; n < json_response.result.length; n++) {
      const record = json_response.result[n];
      arr.push({
        title: record.title,
        text: record.description,
        image: record.image,
        genres: record.genre,
        starring: record.starring,
        screening: record.screening
      });
    }
    
    //console.log(arr)
    
      this.setState({
        records: arr,
        working: false
      });
      document.getElementById('loading').style.display = 'none'

  }
}