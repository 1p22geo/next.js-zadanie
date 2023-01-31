<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css"/>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">

        let UserComponent = function(){return <></>}

        function executeCode(){
            let textInput = document.getElementById('code')
            let inputValue = textInput.value
            try{
                let App = false;
                eval(inputValue)
                console.log(App)

                if(typeof App == 'function'){
                    UserComponent = App
                }
                
            }
            catch(e){
                
                alert(e)
            }
        }

        function Header(props){
            return <h1 className='text-sky-500 text-2xl my-3'>{props.text}</h1>
        }

function Toggle(props){
  if(props.toggled){
    return <div className='rounded-full bg-black text-right w-24'>
        <div className='rounded-full bg-white p-5 inline h-auto'></div>
      </div>
  }
  else{
    return <div></div>
  }
}
        
function Chairs(props) {
  
  let table2 = props.chairs
  
  return (<div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 '>
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
              
              if (chair.user === null) {
                switch (chair.type) {
                  case "normal":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                    <div  className=' w-0 p-5 bg-sky-400 rounded-full hover:animate-pulse block'/>
                    <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Normal seat<br /><p className=' text-sm text-gray-800 font-thin'>Cost: {chair.price} zł</p><p className=' text-sm text-gray-400 font-thin'>empty</p></div>
                  </div>
                  case "premium":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                      <div  className=' w-0 p-5 bg-amber-400 rounded-full hover:animate-pulse block'/>
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
                    <div  className=' w-0 p-5 bg-red-400 rounded-full cursor-not-allowed '/>
                    <div className='dropdown-content translate-x-[1.25rem] -translate-y-[1.25rem]'>Normal seat<br /><p className=' text-sm text-gray-800 font-thin'>Cost: {chair.price} zł</p><p className=' text-sm text-gray-400 font-thin'>taken by {chair.user}</p></div>
                  </div>
                  case "premium":
                    return <div className="dropdown m-1" key={index+' seat '+col}>
                    <div  className=' w-0 p-5 bg-red-400 rounded-full cursor-not-allowed '/>
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

const table = [
[{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:'abc', price:30},{type:'normal', user:null, price:30},],
[{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},],
[{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:'abc', price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},],
[{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:'abc', price:30},{type:'normal', user:null, price:30},],
[{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:'abc', price:70},{type:'premium', user:null, price:70},],
[{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:'def', price:30},{type:'normal', user:'def', price:30},{type:'normal', user:'def', price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},],
[{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:'abc', price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},{type:'premium', user:null, price:70},],
[{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},{type:'normal', user:null, price:30},],
]
    
      function MyApp() {
        let [state, setState] = React.useState(true)
        let [tab, setTab] = React.useState('code')
        let [loading, setLoading] = React.useState(true)
        const tabs = ['code', 'chairs', 'loading']
        return (
            <div className='text-center mx-auto m-2'>
                <Header text='App header'/>
                <div className='inline-flex overflow-hidden mx-auto rounded-full'>
                    {tabs.map((tab)=>{return <div className='bg-sky-400 hover:bg-sky-300 py-3 px-5 cursor-pointer my-2' onClick={()=>{setTab(tab)}}>{tab}</div>})}
                </div>
                <div className={`mx-auto w-3/4 ${tab=='code'?'flex':'hidden'}`}>
                    <div className=' w-1/2 bg-sky-500 p-2'>
                        <div className='bg-white p-2'>
                            <Header text='Write code here'/>
                            <textarea id='code' rows='20' cols='50' className=' p-2 caret-sky-500 border-sky-500 rounded-xl border-2'>
                                
                            </textarea>
                            <Header text='Execute code'/>
                            <button onClick={executeCode} className='bg-sky-500 p-2 rounded-xl'>
                                Execute
                            </button>
                        </div>
                    </div>
                    <div className=' w-1/2 bg-sky-500 p-2'>
                        <div id='app_preview' className='bg-white h-full w-full text-left'>
                            <UserComponent/>
                            </div>
                    </div>
                </div>
                <div className={`mx-auto w-3/4  ${tab=='chairs'?'flex':'hidden'}`}>
                    <div className=' w-full bg-sky-500 p-2'>
                        <div className='bg-white p-2'>
                            <Header text='Cinema chairs'/>
                            <Chairs chairs={table}/>
                        </div>
                    </div>
                </div>
                <div className={`mx-auto w-3/4  ${tab=='loading'?'flex':'hidden'}`}>
                    <div className=' w-full bg-sky-500 p-2'>
                        <div className='bg-white p-2'>
                            <Header text='Loading screen'/>
                            <Toggle toggled={true}/>
                            <div className={`w-1/3 mx-auto mt-10 p-5 bg-[#E5E5E5] rounded-xl ${loading?'block':'hidden'} border-[#FCA311] border-b-8`} id='loading'>
                            <h1 className="text-2xl font-bold mb-3">
                                Loading...
                              </h1>
                                <div className='w-48 h-48 bg-emerald-400 mx-auto rounded-full pt-8 animate-spin'>
                                
                                  <div className=' w-32 h-32 bg-[#E5E5E5] mx-auto rounded-full'>
                                    
                                  </div>
                                  <div className='h-8 w-4 bg-emerald-100 translate-x-24'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
      let x = 0;
      let code = 'x = 1;'
      const F = new Function(code)
      F();

      //alert(x)

      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      root.render(<MyApp />);

    </script>
  </body>
</html>
