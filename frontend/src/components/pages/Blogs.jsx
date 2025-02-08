import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import LatestBlog from '../miniComp/LatestBlog'; 

const Blogs = () => {
  const { mode, blogs } = useSelector((state) => state.global);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      {blogs.length === 0 ? <p>No blogs available.</p> : <LatestBlog blogs={blogs} title={"Blogs"} />}
      </article>
  )
}

export default Blogs
