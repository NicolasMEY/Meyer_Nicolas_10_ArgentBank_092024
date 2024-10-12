// GESTION DES APPELS API POUR LOGIN/LOGOUT : pour les actions asynchrones (API calls), fonction userProfile qui effectue une requête HTTP GET pour récupérer les informations de profil utilisateur à partir d'une API. Il gère l'authentification en utilisant un token stocké dans localStorage, vérifie si le token est présent, traite les réponses de l'API et gère les erreurs potentielles.

// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const userProfile = createAsyncThunk(
//   // thunk asynchrone pour récupérer les données du profil utilisateur
//   "profile/userProfile",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const token = state.auth.token; // vérification si token présent
//     if (!token) {
//       return thunkAPI.rejectWithValue("Token is missing");
//     }

//     // Requête API >>> pour récupération des données
//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/v1/user/profile",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//             accept: "application/json",
//           },
//         }
//       );

//       // Gestion de la réponse
//       if (response.status === 200) {
//         const data = await response.json();
//         return data.body;
//       } else {
//         const errorData = await response.json();
//         return thunkAPI.rejectWithValue(errorData.message);
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue("An error occurred. Please try again.");
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk asynchrone pour récupérer les données du profil utilisateur
export const userProfile = createAsyncThunk(
  "profile/userProfile",
  async (_, thunkAPI) => {
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem("token");

    // Vérification si le token est présent
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing");
    }

    // Requête API pour récupérer les données
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
      if (response.ok) {
        // Utiliser response.ok pour une vérification plus concise
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
