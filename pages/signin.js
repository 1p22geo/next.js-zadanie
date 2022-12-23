import { useState } from 'react';
import MD5 from 'crypto-js/md5'
 
const login = (props) => {
const [user, setUser] = useState(null);
 
    return (
      <div className='p-5 mt-10 bg-[#E5E5E5] rounded-xl border-[#FCA311] border-b-8 hidden' id={'signin'}>
      <h1 className="text-2xl font-bold mb-3">
        Sign in:
      </h1>
      <form>
        <p className='p-2'>Username: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Username'} name={'Username'}/><br/></p>
        <p className='p-2'>Password: <input className='p-1 bg-slate-400 text-white ml-1 focus:bg-[#FCA311]' type={'text'} id={'Password'} name={'Password'}/><br/></p>
      </form>
        <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300' onClick={()=>{
          let nameInput = document.getElementById('Username');
          let name;
          if(nameInput){
            name = nameInput.value
          }
          let ageInput = document.getElementById('Password');
          let password;
          if(ageInput){
            password = ageInput.value
          }
          let salt = randomBytes(32).toString('hex')
          let md5 = MD5(password+salt).toString()
          
          fetch("/api/add_user", {
            method: "POST",
            body:JSON.stringify({name:name, md5:md5, salt:salt})
        })
        }}>Sign in</button>
        <button className='bg-[#FCA311] rounded-md p-1 active:bg-slate-300 ml-5' onClick={()=>{
          document.getElementById('signin').style.display = "none"
        }}>Cancel</button>
        </div>
    );
}
 
export default login;