// Ce fichier authSlice.js gère l'état d'authentification dans l'application. Il définit les actions et le reducer pour les processus de connexion (isLoading, isSucces, isError, message) et de déconnexion (logoutUser). Il permet de suivre l'état de connexion de l'utilisateur (authentifié ou non), gérer les erreurs, et stocker le token d'authentification.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authThunks from "./authThunks"; // Service contenant les fonctions login et logout pour gérer les requêtes API liées à l'authentification

// On récupère l'utilisateur du localStorage
const user = JSON.parse(localStorage.getItem("user")); // Charge l'utilisateur depuis le LS (si un utilisateur est connecté, ses données y sont stockées)

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Thunk pour le login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authThunks.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
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
      state.message = "";
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
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
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
