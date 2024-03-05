import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);

  // const [Username , setUsername] =useState('');

  useEffect(() => {


    axios.get('http://localhost:4000/profile', {
      withCredentials: true,
    })
      .then(response => {
        // handle successful response
        const userInfo = response.data;
        // setUsername(userInfo.Username);
        setUserInfo(userInfo);
        // console.log("info");
        // console.log(userInfo.id);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });

  }, []);

  function logout(){
    axios.post('http://localhost:3000/logout',{

    },{
      withCredentials: true,

    });
    setUserInfo(null);

  }

const Username = userInfo?.Username;

  return (
    <header className="navbar">
      <Link to="/" className="logo">NoteNest</Link>
      <nav>
        {Username && (
          <>
            <Link to={`/user/${userInfo.id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
</Link>
            <Link to="/create">Create new Post</Link>
            <Link onClick={logout}>Logout</Link>

          </>
        )}
        {!Username && (
          <>
          <Link to="/login" >Login</Link>
          <Link to="/register" >Register</Link>
          </>
        )}
        
      </nav>
    </header>
  )
}

export default Header