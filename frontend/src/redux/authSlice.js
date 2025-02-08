import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // Set authentication status directly
    },
    setUser: (state, action) => { // Add this reducer
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logout, setLoading,  setIsAuthenticated,setUser,} = authSlice.actions;

// Async Thunk for login
export const loginUser = ({ email, password, role, toast, navigate }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP}/api/user/login`, { email, password, role }, { withCredentials: true });
    toast.success(response.data.message);
    dispatch(loginSuccess(response.data.user)); // Update Redux state
    navigate("/"); // Redirect to the dashboard
  } catch (error) {
    const message = error.response?.data?.message || "Login failed.";
    toast.error(message);
    dispatch(loginFailure(message));
  }
};

// Async Thunk for register
export const registerUser = ({ formData, toast, navigate }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_REACT_APP}/api/user/register`,
      formData,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );
    toast.success(data.message);
    dispatch(loginSuccess(data.user)); // After registration, log the user in
    navigate("/");
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed.";
    toast.error(message);
    dispatch(loginFailure(message));
  }
};

// Async Thunk for logout
export const logoutUser = (toast, navigate) => async (dispatch) => {
  try {
    await axios.get(`${import.meta.env.VITE_REACT_APP}/api/user/logout`, { withCredentials: true });
    toast.success("Logged out successfully.");
    dispatch(logout());
    navigate("/");
  } catch (error) {
    toast.error("Failed to log out.");
  }
};

export default authSlice.reducer;
