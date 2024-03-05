// import { useEffect } from "react";

import axios from "axios";

import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
  const [Username, setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [redirect , setRedirect] = useState(false);
  const {setUserInfo } = useContext(UserContext);

  async function login(e) {

  e.preventDefault();
  try{
    const response = await axios.post('http://localhost:4000/login', {
      Username, 
      password, 
    }, {
      withCredentials: true ,
      headers: {
        'Content-Type': 'application/json'
      },
      
    });
    if (response.status===200) {
      const userInfo = response.data;
      setUserInfo(userInfo);

      setRedirect(true);
      alert('Login successful');
     
    } else {
      alert('Login failed');
    }

  }catch(err){
    console.log(err);
    alert('error occured when logging in ...!!');
  }
  
   

}

if(redirect){
  return <Navigate to={"/"}/>
}

// styling part
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
      <h1>Login</h1>
        <div className="animcon" id="animcon">
          <img id="hands"src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png"/>
        </div>
        <div className="formcon">
          <form onSubmit={login}>
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
            <input type="submit" name="" className="sbutton" value="L O G I N" />
          </form>
        </div>
    
      
    
      
    </div>
    
  );
}

export default LoginPage;
