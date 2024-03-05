import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';


const  modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

function CreatePost() {
  const [title , setTitle] = useState('');
  const [summary , setSummary] = useState('');
  const [ content , setContent] = useState('');
  const [files , setfiles] = useState('');
  const [redirect , setRedirect] = useState(false);
  
  async function createNewPost(e){
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file',files[0]);
    e.preventDefault();
    console.log(files);
    try {
      const response = await axios.post('http://localhost:4000/post', data,{
        withCredentials: true ,
      });
      if(response.status=== 200){
        alert('created');
        setRedirect(true);
      }
      else{
        alert('failed');
      }
  
      
    } catch (error) {
      console.error(error);
    }

    
  }
  if(redirect){
    return <Navigate to={'/'} />

  }


    return (
        
            <form className="post-form" onSubmit={createNewPost}>
         
                <input type="title" placeholder={'title'} value={title}  onChange={(e)=>setTitle(e.target.value)}></input>
                <input type="summary" placeholder={'summary'} value={summary}  onChange={(e)=>setSummary(e.target.value)}></input>
                <input type="file"  onChange={(e)=>setfiles(e.target.files)}></input>
                <ReactQuill
                  value={content}
                  modules={modules}
                  formats={formats}
                  onChange={newvalue=>{
                  setContent(newvalue);
                  }}
                 />
                  <button  style={{
                    marginTop:'25px'
                  }}>create</button>
            </form>


    )
}

export default CreatePost