import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { RxHamburgerMenu } from 'react-icons/rx';
import toast from 'react-hot-toast';
import { toggleMode } from "../../redux/globalSlice"; 
import { logoutUser } from '../../redux/authSlice';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for logout confirmation

  const handleNavbar = () => {
    setShow(!show);
  };

  const { mode } = useSelector((state) => state.global);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    dispatch(logoutUser(toast, navigate)); 
    setShowLogoutConfirm(false); // Hide confirmation box after logout
  };

  return (
    <>
      <section className={isDashboard ? "hidenavbar" : mode === "light" ? "header light-navbar" : "header dark-navbar"}>
        <nav>
          <div className='logo'>
            <span>Blogspire</span>
          </div>
          <div className={show ? "links show" : "links"}>
            <ul>
              <li><Link to={"/"} onClick={handleNavbar}>HOME</Link></li>
              <li><Link to={"/blogs"} onClick={handleNavbar}>BLOGS</Link></li>
              <li><Link to={"/authors"} onClick={handleNavbar}>All AUTHORS</Link></li>
              <li><Link to={"/about"} onClick={handleNavbar}>ABOUT</Link></li>
            </ul>
            <div className='btns'>
              <button
                onClick={() => dispatch(toggleMode())}
                className={mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"}
              >
                {mode === "light" ? <CiLight className="light-icon" /> : <MdDarkMode className={"dark-icon"} />}
              </button>
              {isAuthenticated && user.role === "Author" ? (
                <Link to="/dashboard" onClick={handleNavbar} className='dashboard-btn'>DASHBOARD</Link>
              ) : ""}
              {!isAuthenticated ? (
                <Link to={"/login"} onClick={handleNavbar} className='login-btn'>LOGIN</Link>
              ) : (
                <button className='logout-btn' onClick={() => setShowLogoutConfirm(true)}>LOGOUT</button>
              )}
            </div>
          </div>
          <RxHamburgerMenu className='hamburger' onClick={handleNavbar} />
        </nav>
      </section>

      {/* Logout Confirmation Box */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <h3>Are you sure you want to logout?</h3>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={handleLogout}>Yes</button>
              <button className="no-btn" onClick={() => setShowLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
