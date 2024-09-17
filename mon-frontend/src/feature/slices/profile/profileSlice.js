// COMPOSANT DE LA PAGE DE CONNEXION : Le composant de connexion gère les erreurs si l'authentification échoue et déclenche l'action de connexion.
// Gestion de l'état du profil

// profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "./profileThunks"; // Assure-toi que le chemin est correct

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Optionnel : ajoute des reducers pour des actions synchrones si nécessaire
    setProfile: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion des états pour fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Gestion des états pour updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
