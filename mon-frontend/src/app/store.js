import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/slices/auth/authSlice";
import profileReducer from "../feature/slices/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
