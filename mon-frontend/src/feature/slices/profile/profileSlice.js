// Gestion de l'état du profil, gestion complète et fonctionnelle pour le profil utilisateur, en permettant de récupérer et de mettre à jour les informations du profil tout en assurant que les données sont bien synchronisées avec le store Redux.

import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "./profileThunks";

const initialState = {
  // propriétés qui définissent l'état du profil utilisateur actuel
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
      // permet la maj l'objet userInfo
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // utilisé pour gérer les actions asynchrones qui ne sont pas directement définies dans le slice mais proviennent d'autres fichiers (fetchProfile et updateProfile, thunks)
    builder
      // Gestion des états pour fetchProfile (récupération les informations du profil)
      .addCase(fetchProfile.pending, (state) => {
        // Pending = en attente, isloading = true
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        // fulfilled = réussit, isloading = false
        state.isLoading = false;
        state.userInfo = action.payload; // rappel, payload = données reçues
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        // si la requête échoue
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Gestion des états pour updateProfile (modification des données)
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

export const selectUser = (state) => state.profile.userInfo;
// Ce sélecteur est défini pour accéder plus facilement aux informations utilisateur userInfo dans l'état globale de l'application. Il permet d'extraire des données spécifiques du store. Cela permet d'obtenir directement les données de profil à partir du state.profile.userInfo
export const selectIsLoading = (state) => state.profile.isLoading;
export const selectError = (state) => state.profile.error;

export const { resetProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;

// builder est un outil qui fournit des méthodes comme .addCase() pour associer des actions spécifiques à des modifications d'état. Il permet de déclarer des actions supplémentaires qui ne sont pas définies dans les "reducers" du slice lui-même, mais qui peuvent provenir de thunks ou d'autres actions globales.
// Les actions asynchrones comme les thunks ont souvent plusieurs étapes : pending (en attente), fulfilled (réussie), et rejected (échouée), et builder permet de gérer chacune de ces étapes.
