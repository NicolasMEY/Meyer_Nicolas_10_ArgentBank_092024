// Thunks pour les appels API (login, signup)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
} from "./authSlice";

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch }) => {
    dispatch(loginStart());
    try {
      const response = await axios.post("/api/user/login", credentials);
      dispatch(loginSuccess(response.data.token));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }
);

// Thunk pour la déconnexion
export const logout = () => (dispatch) => {
  dispatch(logoutUser());
  // Ajoute ici la logique pour la déconnexion côté serveur si nécessaire
};
