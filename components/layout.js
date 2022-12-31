import * as React from 'react'
import component from '../components/component'
import Router from 'next/router';
export default class Layout2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [], working: false }
  }

  render() {
    if ((!this.state.working) && (typeof window != 'undefined')) this.a()

    return React.createElement(component, { records: this.state.records })//React.createElement(component, this.state);
  }
  async a() {
    this.state.working = true;
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
        query = { $or: [{ title: { $regex: '(?i)' + searchstring } }, { description: { $regex: '(?i)' + searchstring } }] }
      }
      else {
        searchstring = false;
        query = {}
      }
    }
    let newQuery = query
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
    if ((document.getElementById('all')) && (document.getElementById('all').checked)) { newQuery = {} }
    //console.log('sending!')
    const response = await fetch("http://localhost:3000/api/db_read", {
      method: "POST",
      body: JSON.stringify({ query: newQuery, session: Router.query.session })
    });

    if (response.status == 401) {
      this.setState({
        records: [],
        working: false
      });
      Router.push('/');
      return;
    }
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
    setTimeout(() => {
      this.setState({
        records: arr,
        working: false
      });
    }, 300)

  }
}