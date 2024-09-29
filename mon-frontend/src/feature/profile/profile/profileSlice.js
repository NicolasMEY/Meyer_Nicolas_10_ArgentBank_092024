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
  // ExtraReducers : ce bloc gère les différentes étapes de la requête asynchrone (en attente, succès, rejetée...)
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

// Un slice = une partie de l'état
// builder est un outil qui fournit des méthodes comme .addCase() pour associer des actions spécifiques à des modifications d'état. Il permet de déclarer des actions supplémentaires qui ne sont pas définies dans les "reducers" du slice lui-même, mais qui peuvent provenir de thunks ou d'autres actions globales.
// Les actions asynchrones comme les thunks ont souvent plusieurs étapes : pending (en attente), fulfilled (réussie), et rejected (échouée), et builder permet de gérer chacune de ces étapes.
