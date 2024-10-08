// Gestion de l'état du profil utilisateur, incluant le chargement, le succès et l'échec des requêtes pour récupérer les informations du profil tout en assurant que les données sont bien synchronisées avec le store Redux.

import { createSlice } from "@reduxjs/toolkit";
import { userProfile } from "./profileThunks";

const initialState = {
  userInfo: null,
  error: null,
  isSuccess: false,
  isLoading: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userInfo = null;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;

// Nb : builder est un outil qui fournit des méthodes comme .addCase() pour associer des actions spécifiques à des modifications d'état. Il permet de déclarer des actions supplémentaires qui ne sont pas définies dans les "reducers" du slice lui-même, mais qui peuvent provenir de thunks ou d'autres actions globales.
