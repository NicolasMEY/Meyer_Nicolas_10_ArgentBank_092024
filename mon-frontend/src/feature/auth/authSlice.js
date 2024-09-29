// Ce fichier authSlice.js gère l'état d'authentification dans l'application. Il définit les actions et le reducer pour les processus de connexion (isLoading, isSucces, isError, message) et de déconnexion (logoutUser). Il permet de suivre l'état de connexion de l'utilisateur (authentifié ou non), gérer les erreurs, et stocker le token d'authentification.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authThunks from "./authThunks"; // Service contenant les fonctions login et logout pour gérer les requêtes API liées à l'authentification

const initialState = {
  token: null,
  error: null,
  isSuccess: false,
  isLoading: false,
};

// Thunk pour le login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === 200) {
        return { token: data.body.token };
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("An error occurred. Please try again.");
    }
  }
);

// Thunk pour le logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authThunks.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
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
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.error = null;
        state.isLoading = false;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;

// // createSlice est une fonction de Redux Toolkit qui simplifie la création de "slices" (tranches) d'état et les reducers associés. Une slice est une portion de l'état global du store et les actions qui peuvent modifier cet état.
// infos :
// state : Représente l'état actuel de la slice et est modifié par les reducers.
// action : Un objet qui indique qu'une action a eu lieu et peut contenir des données supplémentaires (payload = charge utile).
// action.payload : Contient les données spécifiques à l'action (comme un token d'authentification ou un message d'erreur) et est utilisé pour mettre à jour l'état.
