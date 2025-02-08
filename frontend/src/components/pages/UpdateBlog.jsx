import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateBlog = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraOneDesc, setParaOneDesc] = useState("");  // Correct field name
  const [paraTwoDesc, setParaTwoDesc] = useState("");  // Correct field name
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP}/api/blog/singleblog/${id}`, { withCredentials: true });

        setTitle(data.blog.title || "");
        setIntro(data.blog.intro || "");
        setCategory(data.blog.category || "");
        setPublished(data.blog.published || false);

        setMainImage(data.blog.mainImage?.url || "");
        setMainImagePreview(data.blog.mainImage?.url || "");

        setParaOneTitle(data.blog.paraOneTitle || "");
        setParaOneDesc(data.blog.paraOneDesc || ""); // Ensure this is populated
        setParaOneImage(data.blog.paraOneImage?.url || "");
        setParaOneImagePreview(data.blog.paraOneImage?.url || "");

        setParaTwoTitle(data.blog.paraTwoTitle || "");
        setParaTwoDesc(data.blog.paraTwoDesc || ""); // Ensure this is populated
        setParaTwoImage(data.blog.paraTwoImage?.url || "");
        setParaTwoImagePreview(data.blog.paraTwoImage?.url || "");
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Error fetching blog data");
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBlog = new FormData();
    updatedBlog.append("title", title);
    updatedBlog.append("intro", intro);
    updatedBlog.append("category", category);
    updatedBlog.append("published", published);
    updatedBlog.append("mainImage", mainImage);
    
   
  updatedBlog.append("paraOneTitle", paraOneTitle || "");
  updatedBlog.append("paraOneDesc", paraOneDesc || ""); // Include even if empty
  updatedBlog.append("paraOneImage", paraOneImage || "");

  updatedBlog.append("paraTwoTitle", paraTwoTitle || "");
  updatedBlog.append("paraTwoDesc", paraTwoDesc || ""); // Include even if empty
  updatedBlog.append("paraTwoImage", paraTwoImage || "");
  
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_REACT_APP}/api/blog/update/${id}`, updatedBlog, { withCredentials: true });
    
      if (data.success) {
        toast.success(data.message || "Blog updated successfully");
    
        // Refetch the updated blog data after success
        const updatedBlogData = await axios.get(`${import.meta.env.VITE_REACT_APP}/api/blog/singleblog/${id}`, { withCredentials: true });
    
        // Optionally, update the state with the new blog data
        setTitle(updatedBlogData.data.blog.title);
        setIntro(updatedBlogData.data.blog.intro);
        setCategory(updatedBlogData.data.blog.category);
        setPublished(updatedBlogData.data.blog.published);
        setMainImage(updatedBlogData.data.blog.mainImage?.url);
        setMainImagePreview(updatedBlogData.data.blog.mainImage?.url);
        setParaOneTitle(updatedBlogData.data.blog.paraOneTitle);
        setParaOneDesc(updatedBlogData.data.blog.paraOneDescription);
        setParaOneImage(updatedBlogData.data.blog.paraOneImage?.url);
        setParaOneImagePreview(updatedBlogData.data.blog.paraOneImage?.url);
        setParaTwoTitle(updatedBlogData.data.blog.paraTwoTitle);
        setParaTwoDesc(updatedBlogData.data.blog.paraTwoDescription);
        setParaTwoImage(updatedBlogData.data.blog.paraTwoImage?.url);
        setParaTwoImagePreview(updatedBlogData.data.blog.paraTwoImage?.url);

      } else {
        toast.error(data.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Error occurred while updating blog");
    }
  };

  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };

  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    };
  };

  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    };
  };

  const { mode } = useSelector((state) => state.global);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3>UPDATE BLOG</h3>
        <form onSubmit={handleUpdate}>
          <div className="category-box">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Blog Category</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Economy">Economy</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="BLOG MAIN TITLE"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <label>BLOG MAIN IMAGE</label>
            <img src={mainImagePreview ? mainImagePreview : mainImage || "/imgPL.webp"} alt="Main Blog" />
            <input type="file" onChange={mainImagePreviewHandler} style={{ border: "none" }} />
          </div>

          <textarea
            rows="25"
            className="intro"
            placeholder="BLOG INTRO..... (Must contain at least 250 characters!)"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />

          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph one title"
              value={paraOneTitle || ""}
              onChange={(e) => setParaOneTitle(e.target.value)}
            />
            <img src={paraOneImagePreview ? paraOneImagePreview : paraOneImage || "/imgPL.webp"} alt="Paragraph One Image" />
            <input type="file" onChange={paraOneImagePreviewHandler} style={{ border: "none" }} />
            <textarea
              rows="10"
              placeholder="Blog First Sub Paragraph Comes Here..."
              value={paraOneDesc || ""}  // Correct field name
              onChange={(e) => setParaOneDesc(e.target.value)}  // Correct field name
            />
          </div>

          <div className="sub-para">
            <input
              type="text"
              placeholder="Paragraph two title"
              value={paraTwoTitle || ""}
              onChange={(e) => setParaTwoTitle(e.target.value)}
            />
            <img src={paraTwoImagePreview ? paraTwoImagePreview : paraTwoImage || "/imgPL.webp"} alt="Paragraph Two Image" />
            <input type="file" onChange={paraTwoImagePreviewHandler} style={{ border: "none" }} />
            <textarea
              rows="10"
              placeholder="Blog Second Sub Paragraph Comes Here..."
              value={paraTwoDesc || ""}  // Correct field name
              onChange={(e) => setParaTwoDesc(e.target.value)}  // Correct field name
            />
          </div>

          <div className="publish-box">
            <label>Published?</label>
            <select
              value={published === null ? "" : published}
              onChange={(e) => setPublished(e.target.value === "true")}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <button type="submit" className="update-btn">
            UPDATE
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateBlog;
