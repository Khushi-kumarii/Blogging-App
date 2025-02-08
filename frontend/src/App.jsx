import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from "./components/pages/Home";
import SingleBlog from './components/pages/SingleBlog';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Blogs from './components/pages/Blogs';
import About from './components/pages/About';
import AllAuthor from './components/pages/AllAuthor';
import Dashboard from './components/pages/Dashboard';
import UpdateBlog from './components/pages/UpdateBlog';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { setBlogs } from "./redux/globalSlice";
import { setUser, setIsAuthenticated } from "./redux/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP}/api/user/myprofile`, {
          withCredentials: true,
        });
        dispatch(setUser(data.user));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        dispatch(setIsAuthenticated(false));
        dispatch(setUser({}));
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP}/api/blog/all`, {
          withCredentials: true,
        });
        dispatch(setBlogs(data.allBlogs)); // Ensure the `data.allBlogs` contains all 7 blogs
        
      } catch (error) {
        dispatch(setBlogs([]));
      }
    };

    fetchUser();
    fetchBlogs();
  }, [dispatch]);

  return (
    <Router>
      <Wrapper />
    </Router>
  );
};

const Wrapper = () => {
  const location = useLocation(); // Get the current path
  const isDashboard = location.pathname === '/dashboard'; // Check if the path is '/dashboard'

  return (
    <>
      {!isDashboard && <Navbar />} {/* Conditionally render Navbar */}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<SingleBlog />} />
        <Route path='/about' element={<About />} />
        <Route path='/authors' element={<AllAuthor />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/blog/update/:id' element={<UpdateBlog />} />
      </Routes>
      {!isDashboard && <Footer />} {/* Conditionally render Footer */}
      <Toaster />
    </>
  );
};

export default App;
