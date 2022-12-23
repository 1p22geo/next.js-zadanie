import { useState } from 'react';
import MD5 from 'crypto-js/md5'
 
const login = (props) => {
const [user, setUser] = useState(null);
 
    return (
        <div id='login' className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 hidden'>
        <h1>{user===null?'You are not logged in':'Logged in as '+user}</h1>
        <h1 className="text-2xl font-bold mb-3">
          Log in:
        </h1>
        <p className='p-2'>Username: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'login_Username'} name={'Username'}/><br/></p>
        <p className='p-2'>Password: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'login_Password'} name={'Password'}/><br/></p>
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

            let results = await fetch("/api/check_user", {
                method: "POST",
                body:JSON.stringify({name:name})
            })
            let r_json = await results.json()
            let r = r_json.result
            if(r.length != 1){
                throw ''
            }
            let record = r[0]
            console.log(record)
            let salt = record.salt
            let md5 = MD5(password+salt).toString()

            if(md5 === record.md5){
                console.log('Logged in')
                setUser(name)
            }
            else{
                console.log('Wrong password or wrong code.')
                setUser(null)
            }
            //let salt = randomBytes(32).toString('hex')
            //let md5 = MD5(password+salt).toString()
            }
        }>Log in</button>
        <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300 ml-5' onClick={()=>{
            document.getElementById('login').style.display = "none"
          }}>Cancel</button>
        </div>
    );
}
 
export default login;