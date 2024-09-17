// GESTION DES APPELS API POUR LOGIN/LOGOUT : pour les actions asyn chrones (API calls) Ce fichier gère les appels API pour la connexion et la déconnexion.

// profileThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer le profil utilisateur
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.get("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

// Thunk pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.put("/api/user/profile", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);
