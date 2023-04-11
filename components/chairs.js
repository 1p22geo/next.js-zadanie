import Link from "next/link";
import { useRouter } from 'next/router';

function chairs(props) {
  const router = (typeof window == 'undefined')?{query:{movie:""}, asPath:"", push:()=>{}}:useRouter()
  const href = router.asPath.replace(/screening/, "reservation").split('&row=')[0]
  let table2 = props.chairs
  
  return (<div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 '>
    {typeof props.hall != 'undefined' ?<h1 className="text-2xl text-bold mb-4">Movie hall {props.hall}</h1>:<></>}
    {typeof props.col != 'undefined' ?<h1 className="text-2xl text-bold mb-4">Row {props.row}, seat {props.col}</h1>:<></>}
    {table2.map((row, index) => {
      return (
        <div className='flex mx-auto justify-center' key={'row '+index}>
          {row.map(
            (chair, col) => {
              if((props.row)&&(props.col)){
                if((props.row==index)&&(props.col==col)){
            return <div className="dropdown m-1" key={index+' seat '+col}>
              <div className=' w-0 p-6 -mt-1 bg-emerald-400 rounded-full animate-pulse block shadow-xl'/>
              <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Is this the seat you want to buy?<br /></div>
            </div>}}
              let linkhref = href+'&row='+index+'&col='+col
              if (chair.user === null) {
                switch (chair.type) {
                  case "normal":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                    <Link href={linkhref} className=' w-0 p-5 bg-sky-400 rounded-full hover:animate-pulse block'/>
                    <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Normal seat<br /><p className=' text-sm text-gray-800 font-thin'>Cost: {chair.price} zł</p><p className=' text-sm text-gray-400 font-thin'>empty</p></div>
                  </div>
                  case "premium":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                      <Link href={linkhref} className=' w-0 p-5 bg-amber-400 rounded-full hover:animate-pulse block'/>
                      <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Premium seat<br /><p className=' text-sm text-gray-800 font-thin'>Cost: {chair.price} zł</p><p className=' text-sm text-gray-400 font-thin'>empty</p></div>
                    </div>
                  default:
                    return <></>
                }
              }
              else {
                switch (chair.type) {
                  case "normal":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                    <div href={linkhref} className=' w-0 p-5 bg-red-400 rounded-full cursor-not-allowed '/>
                    <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Normal seat<br /><p className=' text-sm text-gray-800 font-thin'>Cost: {chair.price} zł</p><p className=' text-sm text-gray-400 font-thin'>taken by {chair.user}</p></div>
                  </div>
                  case "premium":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                    <div href={linkhref} className=' w-0 p-5 bg-red-400 rounded-full cursor-not-allowed '/>
                    <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Premium seat<br /><p className=' text-sm text-gray-800 font-thin'>Cost: {chair.price} zł</p><p className=' text-sm text-gray-400 font-thin'>taken by {chair.user}</p></div>
                  </div>
                  default:
                    return <></>
                }
              }

            }
          )}
        </div>
      )
    })
    }
  </div>);
}

export default chairs;