import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { registerUser } from "../../redux/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const { mode } = useSelector((state) => state.global);
  const {isAuthenticated}=useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation to ensure no field is empty
    if (!name || !email || !phone || !role || !password || !education || !avatar) {
      toast.error("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("avatar", avatar);

    dispatch(registerUser({ formData, toast, navigate: navigateTo })); 
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleRegister}>
          <h1>REGISTER</h1>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">SELECT ROLE</option>
            <option value="Reader">READER</option>
            <option value="Author">AUTHOR</option>
          </select>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
          <div>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <select value={education} onChange={(e) => setEducation(e.target.value)}>
            <option value="">SELECT YOUR EDUCATION</option>
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div className="avatar">
              <img src={avatarPreview ? `${avatarPreview}` : "/pic.jpg"} alt="avatar" />
            </div>
            <input
              type="file"
              onChange={avatarHandler}
              className="avatar_input_tag"
              style={{ border: "none" }}
            />
          </div>
          <p>
            Already Registered? <Link to={"/login"}>Login Now</Link>
          </p>
          <button type="submit" className="submit-btn">REGISTER</button>
        </form>
      </section>
    </article>
  );
};

export default Register;
