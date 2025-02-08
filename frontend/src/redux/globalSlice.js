import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  mode: "dark",
  loading: false,
  error: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetBlogs: (state) => {
      state.blogs = [];
      state.loading = false;
      state.error = null;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { setBlogs, setLoading, setError, resetBlogs, setMode, toggleMode } = globalSlice.actions;

// Thunk for fetching blogs
export const fetchBlogs = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP}/api/blogs`);
    dispatch(setBlogs(response.data.blogs));
  } catch (error) {
    dispatch(setError(error.message || "Failed to fetch blogs."));
  } finally {
    dispatch(setLoading(false));
  }
};

export default globalSlice.reducer;
