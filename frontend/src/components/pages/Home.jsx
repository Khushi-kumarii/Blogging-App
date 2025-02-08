import React from 'react';
import HeroSection from "../miniComp/HeroSection";
import TrendingBlog from "../miniComp/TrendingBlog";
import LatestBlog from "../miniComp/LatestBlog";
import PopularAuthor from "../miniComp/PopularAuthor";
import { useSelector } from 'react-redux'; // Use useSelector from react-redux


const Home = () => {
  const { mode, blogs } = useSelector((state) => state.global);
  const filteredBlogs=blogs.slice(0,8);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection/>
      <TrendingBlog/>
      <LatestBlog blogs={filteredBlogs} heading={"Latest Blogs"}/>
      <PopularAuthor/>
    </article>
  )
}

export default Home
