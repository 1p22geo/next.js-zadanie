import Router from 'next/router'
import MD5 from 'crypto-js/md5'
 
const login = (props) => {
 
    return (
        <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8'>
        
        <h1 className="text-2xl font-bold mb-3">
          Log in:
        </h1>
        <p className='p-2'>Username: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'login_Username'} name={'Username'}/><br/></p>
        <p className='p-2'>Password: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'password'} id={'login_Password'} name={'Password'}/><br/></p>
        <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300'  onClick={
            async ()=>{
            let nameInput = document.getElementById('login_Username');
            let name;
            if(nameInput){
              name = nameInput.value
            }
            let ageInput = document.getElementById('login_Password');
            let password;
            if(ageInput){
              password = ageInput.value
            }

            let results = await fetch("http://localhost:3000/api/fetch_salt", {
                method: "POST",
                body:JSON.stringify({user:name})
            })
            let r_json = await results.json()
            if(r_json.result === null){return null}
            let salt = r_json.result
            /*if(r.length != 1){
                throw ''
            }*/
            //let record = r[0]
            //console.log(record)
            //let salt = record.salt
            let md5 = MD5(password+salt).toString()

            let res = await fetch("http://localhost:3000/api/create_session", {
                method: "POST",
                body:JSON.stringify({
                    user:name,
                    md5:md5
                })
            })
            let o = await res.json()
            if((res.status == 201)&&(name!="admin")){
                Router.push('/logged_in?session='+o.session)
            }
            else if((res.status == 201)&&(name=="admin")){
                Router.push('/admin?session='+o.session)
            }
            else{
                Router.push('/login_page')
            }
            //let salt = randomBytes(32).toString('hex')
            //let md5 = MD5(password+salt).toString()
            }
        }>Log in</button>
        </div>
    );
}
 
export default login;