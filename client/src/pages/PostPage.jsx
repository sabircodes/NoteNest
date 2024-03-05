import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { UserContext } from '../UserContext';

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);

    axios.get(`http://localhost:4000/post/${id}`)
      .then(response => {
        const postinfo = response.data;
        console.log(postinfo.cover);
        console.log(postinfo.title);
        // console.log(postinfo.author.Username);
        setPostInfo(postinfo);
      });

  }, []);


  if (!postInfo) return '';




  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
      <div className='author'>
        by @{postInfo.author.Username}
      </div>

      {/* checking if id matches */}
      {userInfo.id === postInfo.author._id && (<div className='edit-row'>
        <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          Edit this post</Link>
      </div>)}

      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />


    </div>
  )
}

export default PostPage