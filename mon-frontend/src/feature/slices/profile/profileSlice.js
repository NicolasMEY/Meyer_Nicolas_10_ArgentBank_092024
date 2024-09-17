// COMPOSANT DE LA PAGE DE CONNEXION : Le composant de connexion gère les erreurs si l'authentification échoue et déclenche l'action de connexion.
// Gestion de l'état du profil, gestion complète et fonctionnelle pour le profil utilisateur, en permettant de récupérer et de mettre à jour les informations du profil tout en assurant que les données sont bien synchronisées avec le store Redux.

// profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "./profileThunks"; // Assure-toi que le chemin est correct

const initialState = {
  userInfo: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  updateError: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.isLoading = false;
      state.isUpdating = false;
      state.error = null;
      state.updateError = null;
    },
    setProfile: (state, action) => {
      state.userInfo = action.payload;
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
        state.userInfo = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Gestion des états pour updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.userInfo = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message;
      });
  },
});

export const { resetProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
