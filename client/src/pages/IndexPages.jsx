import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

function IndexPages() {
  const [post , setPost] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4000/post')
    .then(response =>{
      const postinfo = response.data;
      console.log(postinfo);
      setPost(postinfo);
    })
  },[])
  return (
    <>
       {post.length > 0  && post.map(post=>(
        <Post {...post}/>
       ))}

    </>
  )
}

export default IndexPages