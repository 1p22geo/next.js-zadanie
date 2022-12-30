import Link from "next/link";

const chairs = (props) => {
    let table2 = props.chairs
    return ( <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
    {table2.map((row, index)=>{
      return(
      <div className='flex mx-auto justify-center'>
          {row.map(
            (chair, col)=>{
                if(chair.user === null){
                  switch (chair.type) {
                    case "normal":
                      return <Link href={'/login_page'} className='p-5 bg-sky-400 m-1 dropdown'>
                        <div className='dropdown-content'>Normal seat<br/><p className=' text-sm text-gray-400 font-thin'>empty</p></div>
                      </Link>
                    case "premium":
                      return <Link href={'/login_page'} className='p-5 bg-amber-400 m-1 dropdown'>
                      <div className='dropdown-content'>Premium seat<br/><p className=' text-sm text-gray-400 font-thin'>empty</p></div>
                      </Link>
                    default:
                      return <></>
                  }
                }
                else{
                  switch (chair.type) {
                    case "normal":
                      return <Link href={'/login_page'} className='p-5 bg-red-400 m-1 dropdown'>
                      <div className='dropdown-content'>Normal seat<br/><p className=' text-sm text-gray-400 font-thin'>Taken by {chair.user}</p></div>
                      </Link>
                    case "premium":
                      return <Link href={'/login_page'} className='w-10 h-10 flex flex-col  m-1 dropdown'>
                        
                        <div className='h-5 bg-red-400'/>
                        <div className='h-5 bg-amber-400'/>
                        <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Premium seat<br/><p className=' text-sm text-gray-400 font-thin'>Taken by {chair.user}</p></div>
                      </Link>
                  
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
  </div> );
}
 
export default chairs;