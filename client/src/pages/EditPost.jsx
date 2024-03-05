import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { Navigate, useParams } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


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

function EditPost() {
    const {id} = useParams();
    const [title , setTitle] = useState('');
    const [summary , setSummary] = useState('');
    const [ content , setContent] = useState('');
    const [files , setfiles] = useState('');
    const [redirect , setRedirect] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:4000/post/${id}`)
        .then(response => {
            const postinfo = response.data;
            setTitle(postinfo.title);
            setSummary(postinfo.summary);
            setContent(postinfo.content);



        }       
        )

    },[])

   async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file',files?.[0]);      
        }

        try {
           const response=  await axios.put('http://localhost:4000/post',data,{
            withCredentials:true,
           });
           if(response.status===200){
            alert('successfully updated');
            setRedirect(true);
           }
        } catch (error) {
            console.log(error);
            
        }
       

    }
    
    if(redirect){
        return <Navigate to={'/post/'+id} />
    
      }

    

   
    
    
        return (
            
                <form className="post-form" onSubmit={updatePost}>
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
                      }}>Update</button>
                </form>
    
    
        )
}

export default EditPost