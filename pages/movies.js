import * as React from 'react'

const movies = () => {
    let elements = []
    for (let n = 0; n < 24; n++) {
        elements.push(
            <div className='flex flex-col rounded-md hover:bg-[#FCA311] p-2' key={n}>
                <h1>Movie</h1>
                <img src='movie-play-svgrepo-com.svg'></img>
            </div>
        )
        
    }
    return ( React.createElement('div',  {className:"columns-4 w-[60rem]"}, elements) );
}
 
export default movies;