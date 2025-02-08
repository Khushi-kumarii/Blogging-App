import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const[category, setCategory]=useState("");
  const[mainImage, setMainImage]=useState("");
  const[mainImagePreview, setMainImagePreview]=useState("");
  const[intro, setIntro]=useState("");
  const[paraOneTitle, setParaOneTitle]=useState("");
  const[paraTwoTitle, setParaTwoTitle]=useState("");
  const[paraOneImage, setParaOneImage]=useState("");
  const[paraTwoImage, setParaTwoImage]=useState("");
  const[paraOneImagePreview, setParaOneImagePreview]=useState("");
  const[paraTwoImagePreview, setParaTwoImagePreview]=useState("");
  const[paraOneDescription, setParaOneDescription]=useState("");
  const[paraTwoDescription, setParaTwoDescription]=useState("");
  const[title, setTitle]=useState("");
  const[published, setPublished]=useState(null);
  
  const mainImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };
  const paraOneImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    };
  };
  const paraTwoImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    };
  };

  const handleBlog=async(e)=>{
     e.preventDefault();

     const formData = new FormData(); // Initialize properly before appending
     formData.append("title",title);
     formData.append("category",category);
     formData.append("mainImage",mainImage);
     formData.append("intro",intro);
    formData.append("published", published === true); // Send Boolean value for published
    
    if(paraOneTitle.length > 0){
      formData.append("paraOneTitle",paraOneTitle)

     }
     if(paraOneImage){
      formData.append("paraOneImage",paraOneImage);
     }
     if(paraOneDescription.length > 0){
       formData.append("paraOneDesc", paraOneDescription);// Correct Field Name
     }
     if(paraTwoTitle.length > 0){
      formData.append("paraTwoTitle",paraTwoTitle)
     }
     if(paraTwoImage){
      formData.append("paraTwoImage",paraTwoImage);
     }
     if(paraTwoDescription.length > 0){
      formData.append("paraTwoDesc", paraTwoDescription); // Fix: Match backend field name
     }

     try{
        const {data}=await axios.post(`${import.meta.env.VITE_REACT_APP}/api/blog/post`, formData,
          {
            withCredentials:true,
            headers:{"Content-Type":"multipart/form-data"}
          });
          toast.success("Blog uploaded successfully!");
          setTitle("");
          setIntro("");
          setCategory("");
          setMainImage("");
          setMainImagePreview("");
          setParaOneImage("");
          setParaOneImagePreview("");
          setParaOneTitle("");
          setParaOneDescription("");
          setParaTwoImage("");
          setParaTwoImagePreview("");
          setParaTwoTitle("");
          setParaTwoDescription("");
          setPublished(null);
     } catch(error){
      console.error("🚨 Error:", error.response ? error.response.data : error);
      toast.error(error.response.data.message);
     }
  };


  return (
    <section className='create-blog'>
      <h3>CREATE BLOG</h3>
      <form onSubmit={handleBlog}>
         <div className="category-box">
          <label>Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select Blog Category</option>
              <option value="LifeStyle">LifeStyle</option>
              <option value="Economy">Economy</option>
              <option value="Finance">Finance</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Sports">Sports</option>
            </select>
         </div>
         <input type="text" placeholder='Blog Main title'value={title}
         onChange={(e)=>setTitle(e.target.value)} />
         <div style={{display:"flex", flexDirection:"column"}}>
          <label>Blog Main Image</label>
          <img src={mainImagePreview ? `${mainImagePreview}`:"imgPL.webp"} 
          alt="main Image"
          className='mainImg' />
           <input type="file"
           onChange={mainImageHandler}
           style={{border:"none"}} />
         </div>
         <textarea rows={25} className="intro"
         placeholder='Blog Intro.....'
         value={intro}
         onChange={(e)=> setIntro(e.target.value)}/>
         <div className="sub-para">
          <input type="text"
          placeholder='Paragraph One Title'
          value={paraOneTitle}
          onChange={(e)=>setParaOneTitle(e.target.value)} />
          <img src={paraOneImagePreview ? `${paraOneImagePreview}`:"/imgPL.webp"
        } alt="paraOneImage"/>
        <input type="file" onChange={paraOneImageHandler} style={{border:"none"}}/>
        <textarea rows="10" placeholder="Blog First Paragraph"
        value={paraOneDescription}
        onChange={(e)=> setParaOneDescription(e.target.value)}/>
         </div>
         <div className="sub-para">
          <input type="text"
          placeholder='Paragraph Two Title'
          value={paraTwoTitle}
          onChange={(e)=>setParaTwoTitle(e.target.value)} />
          <img src={paraTwoImagePreview ? `${paraTwoImagePreview}`:"/imgPL.webp"
        } alt="paraTwoImage"/>
        <input type="file" onChange={paraTwoImageHandler} style={{border:"none"}}/>
        <textarea rows="10" placeholder="Blog Second Paragraph"
        value={paraTwoDescription}
        onChange={(e)=> setParaTwoDescription(e.target.value)}/>
         </div>
         <div className="publish-box">
          <label>Want's to publish now?</label>
          <select
    value={published === null ? "" : published.toString()} // Convert Boolean to string for dropdown
    onChange={(e) => setPublished(e.target.value === "true")}
  >          <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
         </div>
          <button type='submit' className='create-btn'>Create Blog</button>
      </form>
    </section>
  )
}

export default CreateBlog
