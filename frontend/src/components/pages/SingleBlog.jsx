import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import {Navigate} from 'react-router-dom';

const SingleBlog = () => {
  const {isAuthenticated, user}=useSelector((state)=> state.auth);
  const {mode}=useSelector((state)=> state.global);
  const {id}=useParams(); 
  const[blog,setBlog]=useState({});
  const [error, setError] = useState(null); // Declare error state

  useEffect(()=>{
       const getSingleBlog=async()=>{
        try{
           const { data }=await axios.get(`${import.meta.env.VITE_REACT_APP}/api/blog/singleblog/${id}`,
           {
            withCredentials:true,
           });
           setBlog(data.blog);
        }
        catch(error){
          setError('Error loading the blog. Please try again later.');
          setBlog(null);
        }
       };
       getSingleBlog();
  },[id])

  if(!isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
    <article className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}>

       {blog && blog.title && (
          <section className='container'>
             <div className="category">
              {blog.category}
             </div>
             <h1>{blog.title}</h1>
             <div className="writer_section">
              <div className="author">
                <img src={blog.authorAvatar} alt="Author Avatar" />
                <p>{blog.authorName}</p>
              </div>
             </div>
             {
              blog && blog.mainImage &&(
                <img src={blog.mainImage.url} alt='mainImg' className='mainImg'/>
              )
             }
{blog.intro && (
            <p className="intro-text">
              {blog.intro.split("\n\n").map((text, index) => (
                <span key={index}>
                  {text}
                  <br /><br />
                </span>
              ))}
            </p>
          )}


             <div className="sub-para">
              <h3>{blog.paraOneTitle}</h3>
              {
                blog && blog.paraOneImage && (<img src={blog.paraOneImage.url} alt='paraOne'/>)
              }
<p>{blog.paraOneDesc.split("\n\n").map((text, index) => (
    <span key={index}>
      {text}
      <br /><br />
    </span>
  ))}</p>             </div>
             <div className="sub-para">
              <h3>{blog.paraTwoTitle}</h3>
              {
                blog && blog.paraTwoImage && (<img src={blog.paraTwoImage.url} alt='paraTwo'/>)
              }
<p>{blog.paraTwoDesc.split("\n\n").map((text, index) => (
    <span key={index}>
      {text}
      <br /><br />
    </span>
  ))}</p>             </div>
          </section>
        )
      }
    </article>
  )
}

export default SingleBlog
