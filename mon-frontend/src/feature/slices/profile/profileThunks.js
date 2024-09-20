// GESTION DES APPELS API POUR LOGIN/LOGOUT : pour les actions asynchrones (API calls). Ce fichier gère les appels API pour la connexion et la déconnexion.

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer les informations de profil de l'utilisateur connecté
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState }) => {
    // getState utilisé pour accéder à l'état global de l'app
    const { token } = getState().auth; // On récupère le token de l'utilisateur stocké dans le state auth
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: { Authorization: `Bearer ${token}` }, // On ajoute le token à l'en-tête pour autoriser l'appel
      }
    );
    return response.data; // oOn retourne les données du profil récupéré
  }
);

// Thunk pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { getState }) => {
    const { token } = getState().auth; // Récupère le token d'authentification
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      profileData,
      {
        headers: { Authorization: `Bearer ${token}` }, // En-tête avec le token pour autoriser la mise à jour
      }
    );
    return response.data; // Retourne les données du profil mises à jour
  }
);
