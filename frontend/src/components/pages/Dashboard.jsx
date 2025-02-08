import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import MyProfile from '../miniComp/MyProfile';
import CreateBlog from '../miniComp/CreateBlog';
import Chart from '../miniComp/Chart';
import MyBlogs from '../miniComp/MyBlogs';

const Dashboard = () => {
  const [component,setComponent]=useState("MyBlogs");
  const { mode }= useSelector((state)=> state.global);
  const { isAuthenticated, user }= useSelector((state)=> state.auth);

  if (!isAuthenticated || user?.role === "Reader") {
    return <Navigate to={"/"}/>
  }
  return (
    <section className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}>
       <Sidebar component={component} setComponent={setComponent}/>
       {
        component === "My Profile" ? 
        (<MyProfile/>):component==="Create Blogs"?
        (<CreateBlog/>): component ==="Chart"?
        (<Chart/>):(<MyBlogs/>)
       }
    </section>
  )
}

export default Dashboard
