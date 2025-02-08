import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import authReducer from "./authSlice"; // Import the authSlice

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer, // Add this if you're managing auth state
  },
});
