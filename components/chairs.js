import Link from "next/link";

function chairs(props) {
  let table2 = props.chairs
  return (<div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 '>
    {table2.map((row, index) => {
      return (
        <div className='flex mx-auto justify-center' key={'row '+index}>
          {row.map(
            (chair, col) => {
              if (chair.user === null) {
                switch (chair.type) {
                  case "normal":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                    <Link href={'/login_page'} className=' w-0 p-5 bg-sky-400 rounded-full hover:animate-pulse block'/>
                    <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Normal seat<br /><p className=' text-sm text-gray-400 font-thin'>empty</p></div>
                  </div>
                  case "premium":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                      <Link href={'/login_page'} className=' w-0 p-5 bg-amber-400 rounded-full hover:animate-pulse block'/>
                      <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Premium seat<br /><p className=' text-sm text-gray-400 font-thin'>empty</p></div>
                    </div>
                  default:
                    return <></>
                }
              }
              else {
                switch (chair.type) {
                  case "normal":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                    <Link href={'/login_page'} className=' w-0 p-5 bg-red-400 rounded-full hover:animate-pulse block'/>
                    <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Normal seat<br /><p className=' text-sm text-gray-400 font-thin'>taken by {chair.user}</p></div>
                  </div>
                  case "premium":
                    return <div className=" dropdown m-1 w-10 h-10" key={index+' seat '+col}>
                      <Link href={'/login_page'} className='w-10 h-10 flex-col  hover:animate-pulse relative'>

                        <div className='h-5 bg-red-400 rounded-t-full' />
                        <div className='h-5 bg-amber-400 rounded-b-full' />

                      </Link>
                      <div className='animate-none dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Premium seat<br /><p className=' text-sm text-gray-400 font-thin'>Taken by {chair.user}</p></div>
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