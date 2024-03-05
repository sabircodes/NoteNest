import { useState } from "react"
import axios from "axios";


function RegisterPage() {
  const [Username , setUsername ] = useState('');
  const [password , setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/register', {
        Username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.status=== 200){
        alert('registration succesful');
      }
      else{
        alert('registration failed');
      }
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    
  }


  // styling code
  const x=document.getElementById("hands");
const y=document.getElementById("animcon");

const closeye = ()=>
{
	y.style.backgroundImage="url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey_pwd.gif)";
	x.style.marginTop="0%";
} 

const openeye =()=>
{
	y.style.backgroundImage="url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey.gif)";
	x.style.marginTop="110%";
}

  

  return (
    
    <div className="monkeylogin">
    <h1>Register</h1>
    <div className="animcon" id="animcon">
      <img id="hands"src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png"/>
    </div>
    <div className="formcon">
      <form  onSubmit={register}>
        <input
          type="text"
          id="mail"
          name=""
          onClick={openeye}
          className="tb"
          placeholder="Username"
          autocomplete="off"
          value={Username}
          onChange={(e)=>{
            setUsername(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="password"
          id="pwdbar"
          onClick={closeye}
          name="pwd"
          className="tb"
          placeholder="Password"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <input type="submit" name="" className="sbutton" value="R E G I S T E R" />
      </form>
    </div>

  

  
</div>
  )
}

export default RegisterPage