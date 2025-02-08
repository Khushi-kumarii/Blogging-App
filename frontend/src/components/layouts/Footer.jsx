import React, { useContext } from 'react'
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import { Link, useLocation } from 'react-router-dom';
import { FaInstagramSquare } from "react-icons/fa";
import { FaGitSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const isDashboard =useLocation(`${import.meta.env.VITE_REACT_APP}/dashboard`);
  const { mode } = useSelector((state) => state.global);  // Access mode from Redux state
  return (
    <>
      <footer className={isDashboard.pathname === "/dashboard" 
        ? "hideFooter"
        : mode === "light" 
        ? " light-footer" 
        : " dark-footer"}>

         <div className='container'>
          <div className='about'>
            <h3>About</h3>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type
             specimen book. 
            </p>
            <p>
              <span>Email:</span> khushi@gmail.com
            </p>
            <p>
              <span>Phone</span> 1234567891
            </p>
          </div>
          <div className="quick_links">
            <h3>Quick Links</h3>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/blogs"}>Blogs</Link>
              <Link to={"/about"}>About</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </ul>
          </div>
          <div className="categories">
            <h3>Categories</h3>
            <ul>
              <li>LifeStyle</li>
              <li>Business</li>
              <li>Technology</li>
              <li>Finance</li>
              <li>Economy</li>
              <li>Travel</li>
            </ul>
          </div>
          <div className="news_letter">
            <div>
            <h3>Weekly NewsLetters</h3>
            <p>Sign up for the newsletter and join us.</p>
            </div>
            <div>
              <input type="text" placeholder='Your Email' />
              <button>Subscribe</button>
            </div>
          </div>
         </div>
         
        <div className="container">
          <div className="logo"><span>Blogspire</span></div>
          <div className="links">
            <Link to={"/"} target='_blank'><FaInstagramSquare/></Link>
            <Link to={"/"} target='_blank'><FaGitSquare/></Link>
            <Link to={"/"} target='_blank'><IoLogoYoutube/></Link>
            <Link to={"/"} target='_blank'><FaLinkedin/></Link>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer
