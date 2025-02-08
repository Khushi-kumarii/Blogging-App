import React from 'react'
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch here
import axios from 'axios';
import toast from 'react-hot-toast';
import { loginUser } from "../../redux/authSlice"; // Adjust the path if necessary

const Login = () => {
  const [email,setEmail]= useState("");
  const[password,setPassword]=useState("");
  const [role,setRole]=useState("");
  const { mode, isAuthenticated } = useSelector((state) => state.global);
  
  const dispatch = useDispatch();
  const navigateTo= useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error('Please fill in all fields.');
      return;
    }
    dispatch(loginUser({ email, password, role, toast, navigate: navigateTo }));
  };
  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
    <>
     <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className='auth-form'>
        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="">SELECT ROLE</option>
            <option value="Reader">READER</option>
            <option value="Author">AUTHOR</option>
          </select>
          
          <div>
            <input type="email"
             value={email} 
             onChange={(e)=>setEmail(e.target.value)} 
             placeholder='Your Email'/>
          </div>
          <div>
            <input type="password"
             value={password} 
             onChange={(e)=>setPassword(e.target.value)} 
             placeholder='Password'/>
          </div>
          <p>Don't have any account ? <Link to={"/register"}>Register Now</Link></p>
          <button type='submit' className='submit-btn'>LOGIN</button>
        </form>
      </section>
    </article> 
    </>
  )
}

export default Login
