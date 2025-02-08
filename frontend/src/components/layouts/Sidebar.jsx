import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { logoutUser } from "../../redux/authSlice";
import { toggleMode } from "../../redux/globalSlice";

const Sidebar = ({ setComponent }) => {
  const [show, setShow] = useState(false);
  const { mode, setMode} = useSelector((state)=>state.global);
  const { setIsAuthenticated, user } = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutUser(toast, navigate));
  };

  // Navigate to home
  const gotoHome = () => {
    setComponent(null); // Reset the component state
    navigate("/");
  };

  const handleComponent = (value) => {
    setComponent(value);
    setShow(false); // Close the sidebar after selecting a component
  };


  return (
    <>
       <div className="icon-wrapper" onClick={() => setShow(!show)}>
        <RxHamburgerMenu />
      </div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setShow(!show)}>
          <FaArrowLeft />
        </div>
        <div className="user-detail">
          <img src={user && user.avatar.url} alt="avatar" />
          <p>{user.name}</p>
        </div>
        <ul>
          <button onClick={() => handleComponent("My Blogs")}>MY BLOGS</button>
          <button onClick={() => handleComponent("Create Blogs")}>CREATE BLOGS</button>
          <button onClick={() => handleComponent("Chart")}>CHART</button>
          <button onClick={() => handleComponent("My Profile")}>MY PROFILE</button>
          <button onClick={gotoHome}>HOME</button>
          <button onClick={handleLogout}>LOGOUT</button>
          <button
            onClick={() => dispatch(toggleMode())}
            className={mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"}
          >
            {mode === "light" ? <CiLight className="light-icon" /> : <MdDarkMode className="dark-icon" />}
          </button>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
