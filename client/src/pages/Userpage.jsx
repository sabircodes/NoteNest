import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Userpage() {
    const {id} = useParams();
    const [usercard , setUsercard] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:4000/user/${id}`,{withCredentials:true})
        .then(response => {
          const postinfo = response.data;
        //   console.log(postinfo.cover);
        //   console.log(postinfo.title);
          // console.log(postinfo.author.Username);
          setUsercard(postinfo);
        });


  

}, []);
    
    
  return (
    <div className="card">{usercard.Username}</div>
  )
}

export default Userpage