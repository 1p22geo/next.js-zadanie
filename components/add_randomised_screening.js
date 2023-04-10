import { useRouter } from 'next/router';
const add_randomised_screening = () => {
    const router = useRouter()
    return ( <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={async () => {

        const year = 2023
        let months = [2,3]
        let month = months[Math.floor(Math.random() * months.length)];
        let cinemas = ["ZAB01", "ZAB02", "GLI01", "GLI02", "BYT01"]
        let cinema = cinemas[Math.floor(Math.random() * cinemas.length)];
        let halls = ["A_01", "A_02", "A_03", "A_04", "B_01", "B_02", "B_03", "C_01", "C_02", "C_03"]
        let hall = halls[Math.floor(Math.random() * halls.length)];
        let movies = [{
            "title": "There is no movie"
          },{
            "title": "The pink sqare"
          },{
            "title": "The three musketeers"
          },{
            "title": "Rhubarb"
          },{
            "title": "Sport is healthy"
          },{
            "title": "Stand-up Poland 2"
          },{
            "title": "Teenage rebels"
          },{
            "title": "Polish rap artists of the year"
          },{
            "title": "Nazis in Poland"
          },{
            "title": "Lies everywhere..."
          },{
            "title": "To make mistakes..."
          }]
        let movie = movies[Math.floor(Math.random() * movies.length)].title;
        let days = []
        for(let n=1;n<28;n++){days.push(n)}
        let day = days[Math.floor(Math.random() * days.length)];
        let hours = []
        for(let n=9;n<22;n++){hours.push(n)}
        let hour = hours[Math.floor(Math.random() * hours.length)];

          let timestamp = (new Date(year, month, day, hour)).getTime()

          let num = hour*60



          fetch("http://localhost:3000/api/add_screening", {
            method: "POST",
            body: JSON.stringify({
              session: router.query.session,
              title: movie,
              screening: {
                cinema: cinema,
                movie_hall: hall,
                timestamp: timestamp,
                time: num
              }
            })
            //body:JSON.stringify({doc:{title:cinema, description:date, image:filename, genre:genres, starring:hall, reviews:[], screening:[]}, session:router.query.session})
          })
          //alert("Add a randomized screening")
          //const result = await api.post("/foo", fileData, name: "Salih", massage: "Hello World"});
        


      }}>Add a randomized screening</button> );
}
 
export default add_randomised_screening;