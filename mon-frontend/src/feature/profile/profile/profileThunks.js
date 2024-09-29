// GESTION DES APPELS API POUR LOGIN/LOGOUT : pour les actions asynchrones (API calls), fonction userProfile qui effectue une requête HTTP GET pour récupérer les informations de profil utilisateur à partir d'une API. Il gère l'authentification en utilisant un token stocké dans localStorage, vérifie si le token est présent, traite les réponses de l'API et gère les erreurs potentielles

// import axios from "axios";

// Récupérer le nom de l'utilistaeur
// const userProfile = async ({ token }) => {};

// const profileService = {
//   userProfile,
// };

// export default profileService;

import { createAsyncThunk } from "@reduxjs/toolkit";

export const userProfile = createAsyncThunk(
  // thunk asynchrone pour récupérer les données du profil utilisateur
  "profile/userProfile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing");
    }

    // Requête API
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );

      // Gestion de la réponse
      if (response.status === 200) {
        const data = await response.json();
        return data.body;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("An error occurred. Please try again.");
    }
  }
);
