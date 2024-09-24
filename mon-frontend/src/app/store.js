import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import profileReducer from "../feature/profile/profile/profileSlice";
import updateUserNameReducer from "../feature/UpdateUserName/UpdateUserNameSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    newUserName: updateUserNameReducer,
  },
});

export default store;
