// Ce fichier authSlice.js gère l'état d'authentification dans l'application. Il définit les actions et le reducer pour les processus de connexion (isLoading, isSucces, isError, message) et de déconnexion (logoutUser). Il permet de suivre l'état de connexion de l'utilisateur (authentifié ou non), gérer les erreurs, et stocker le token d'authentification.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authThunks from "./authThunks"; // Module contenant les fonctions login et logout pour gérer les requêtes API liées à l'authentification

const initialState = {
  token: localStorage.getItem("token") || null,
  error: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
};

// // Thunk pour le login
// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const response = await fetch("http://localhost:3001/api/v1/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           accept: "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       const data = await response.json();
//       if (data.status === 200) {
//         return { token: data.body.token };
//       } else {
//         return thunkAPI.rejectWithValue(data.message);
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue("An error occurred. Please try again.");
//     }
//   }
// );

// Thunk pour le login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authThunks.login({ email, password });
      return { token: data.body.token };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer."
      );
    }
  }
);

// Thunk pour le logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authThunks.logout();
});

// Création du slice (authSlice)
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      // Action "reset" : réinitialise certaines propriétés de l'état
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  // ExtraReducers : ce bloc gère les différentes étapes de la requête asynchrone (état des thunks) (login et logout, en attente, succès, rejetée...)
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(login.fulfilled, (state) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        // Stocke le token dans le local storage
        localStorage.setItem("token", action.payload.token);
      })

      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.token = action.payload.token; // Contient les données spécifiques à l'action (comme un token d'authentification ou un message d'erreur) et est utilisé pour mettre à jour l'état.

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.error = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
