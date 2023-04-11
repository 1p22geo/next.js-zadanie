import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import Add_screening from './add_screening_component'
function a(x){
    return ((x).toString().length===1)?"0"+(x).toString():(x).toString()
  }
  function stringifyDate(date){
    date = new Date(date)
    let string = ""
    string += a(date.getDate())
    string += "."
    string += a(date.getMonth()+1)
    string += "."
    string += date.getFullYear()
    string += " "
    string += a(date.getHours())
    string += ":"
    string += a(date.getMinutes())
    return string;
  }
  
const movie_description = () => {
    let [response, setResult] = useState({result:[]});
    let [reviews, setLreviews] = useState(9);
    let working = useRef(false);
    const router = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter();
    const session = router.query.session;
    const movie = router.query.movie.replace(/_/g, " ");
    if(!working.current){
        working.current = true
        fetch("http://localhost:3000/api/db_read", {
            method: "POST",
            body:JSON.stringify({query:{title:movie}, session:session})}).then(
                res=>{
                    res.json().then((res_json)=>{
                        setResult(res_json);
                        setTimeout(
                        ()=>{
                            working.current = false;
                        }, 200)
                    })
                    
                    }
        )
    }
    let result = response.result
    //console.log(result)
    if(result.length===0){
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>The requested movie was not found</p>
            </div> 
        )
    }
    if(result.length>1){
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>It seems that there are multiple movies with the same title. This should not happen.</p>
            </div> 
        )
    }
    if(result.length===1){
        let all_reviews = result[0].reviews
        ///all_reviews.sort((a,b)=>{if(a>b) return 1;else if(a<b) return -1;else if(a===b) return 0;})
        let l_reviews = [...all_reviews].splice(0, reviews)
        return(
            <>
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col  w-1/2'>
                <h1 className=' font-extrabold text-5xl pb-3'>
                {result[0].title}
                </h1>
                <p className='py-0.5 text-2xl'>{result[0].description}</p>
                <img src={result[0].image} className='w-96 mx-auto m-8'/>
                <h4 className='font-bold text-2xl pb-3'>Genres:</h4>
                <ul className='list-disc text-[#FCA311] w-1/2 mx-auto'>
                {result[0].genre.map((genre, index)=>{return <li className='py-0.5 text-xl' key={genre+index}><p className='text-black inline '>{genre}</p></li>})}
                </ul>
                
                <div className='my-5'>
                <h4 className='font-bold text-2xl pb-3'>Starring:</h4>
                <ul className='list-disc text-[#FCA311] w-1/2 mx-auto'>
                {result[0].starring.map((genre, index)=>{return <li className='py-0.5 text-xl' key={genre+index}><p className='text-black inline '>{genre}</p></li>})}
                </ul>
                </div>
                
            </div> 

            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 w-4/5'>
            <h1 className=' font-extrabold text-5xl pb-3'>
                Screening at:
                
            </h1>
            <div className='flex overflow-scroll'>
            <Add_screening/>
            {
                result[0].screening
                    .sort((a,b)=>{if(a.timestamp>b.timestamp) return 1;else if(a.timestamp<b.timestamp) return -1;else if(a.timestamp===b.timestamp) return 0;})
                    .map((screening, index)=>{
                        return ((screening.cinema==router.query.cinema)
                        ?
                        (<Link href={router.asPath.replace(/movie/, "screening")+'&timestamp='+screening.timestamp+'&movie_hall='+screening.movie_hall+'&image='+result[0].image} key={JSON.stringify(screening)+index} className=' flex-shrink-0 w-1/5 border-[10px] m-3 p-5 box-border border-[#FCA311] text-center justify-center'>
                            {stringifyDate(screening.timestamp)}<br/>Movie hall {screening.movie_hall}
                        </Link> )
                        :
                        ( <></>))
                    })
            }
            </div>
            </div>


            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col w-2/3'>
            <h1 className=' font-extrabold text-5xl pb-3'>
            Reviews
            </h1>
            <p className='py-0.5 text-2xl'>{result[0].reviews.length.toString()+" rewievs"}</p>
            <div className='flex mt-2 flex-wrap  justify-evenly'>
            {l_reviews.map((review, index)=>{
                let stars = review.rating
                let starlist = []
                for (let n = 0; n < stars; n++) {
                    starlist.push('*')
                }
                return (
                <div className='p-2 text-xl w-1/3 flex flex-col' key={index}>
                    <h4 className='font-bold text-2xl pb-3'>{review.title}</h4>
                    <div className='flex text-center justify-center'>
                    {
                        starlist.map((star, index)=>{return <p key={index+star} className='inline text-[#FCA311] font-extrabold text-6xl'>*</p>})
                    }
                    </div>
                    <div className='flex justify-center'>
                        <img src={review.image} className='h-24 shadow-2xl bg-slate-300 rounded-full p-2'></img>
                        <p className='self-center ml-3 font-semibold'>{review.author}</p>
                    </div>
                    
                    <p className='text-black mt-4'>{review.text}</p>
                </div>
            )})}

            </div>
            
        <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300 w-1/3 self-center mt-5' onClick={()=>{
                setLreviews(reviews+3)
            }}>Show more</button>
            {reviews>9?<button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300 w-1/3 self-center mt-5' onClick={()=>{setLreviews(reviews-3)}}>Show less</button>:<></>}
            
        </div> 
        <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col  w-1/2'>
        <h1 className=' font-extrabold text-5xl pb-3'>
            Write a review
        </h1>
        <form>
        <p className='p-2'>Title: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'title'}/><br/></p>
        <p className='p-2'>Review goes here: <br/></p>
          <textarea
          className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]'
          id={'text'}

          rows={5}

          cols={50}

        />
        <br className='mt-2'/>
        1<input type={'radio'} id={'button1'} name={'buttons'} value={'1'}/><span className='mx-1'/>
        2<input type={'radio'} id={'button2'} name={'buttons'} value={'2'}/><span className='mx-1'/>
        3<input type={'radio'} id={'button3'} name={'buttons'} value={'3'}/><span className='mx-1'/>
        4<input type={'radio'} id={'button3'} name={'buttons'} value={'4'}/><span className='mx-1'/>
        5<input type={'radio'} id={'button3'} name={'buttons'} value={'5'}/><span className='mx-1'/>
        
        </form>
        <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300 w-1/3 self-center mt-5' onClick={()=>{
            let Input = document.getElementById('title');
            let title;
            if(Input){
              title = Input.value
              Input.value = ""
            }
            Input = document.getElementById('text');
            let text;
            if(Input){
              text = Input.value
              Input.value = ""
            }
            let radios = document.getElementsByName('buttons');
            let checked = -1
            for (let i = 0; i < radios.length; i++) {
                const radiobutton = radios[i];
                if(radiobutton.checked){
                    checked = i
                    radiobutton.checked = false;
                }
            }
            //console.log(checked)
            if(checked!==-1){
                fetch("http://localhost:3000/api/create_review", {
                    method: "POST",
                    body:JSON.stringify({
                        session:router.query.session,
                        title:movie,
                        review:{
                            title:title,
                            text:text,
                            rating:checked+1
                        }
                    })
                });
            }
        }}>Submit</button>
        </div>
        </>
        )
    }
    else{
        return(
            <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 flex flex-col'>
                <h1 className="text-2xl font-bold mb-3">
                Something went wrong
                </h1>
                <p>We don't even know what</p>
            </div> 
        )
    }
    
}
 
export default movie_description;