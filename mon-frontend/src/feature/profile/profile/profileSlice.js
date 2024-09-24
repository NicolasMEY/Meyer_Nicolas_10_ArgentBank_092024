// Gestion de l'état du profil utilisateur, incluant le chargement, le succès et l'échec des requêtes pour récupérer les informations du profil tout en assurant que les données sont bien synchronisées avec le store Redux.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileThunks from "./profileThunks";

const initialState = {
  userInfo: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const userProfile = createAsyncThunk(
  // thunk asynchrone pour récupérer les données du profil utilisateur
  "profile/userName",
  async (thunkAPI) => {
    try {
      return await profileThunks.userProfile();
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
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
        state.isError = true;
        state.message = action.payload;
        state.userInfo = null;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;

// Un slice = une partie de l'état
// builder est un outil qui fournit des méthodes comme .addCase() pour associer des actions spécifiques à des modifications d'état. Il permet de déclarer des actions supplémentaires qui ne sont pas définies dans les "reducers" du slice lui-même, mais qui peuvent provenir de thunks ou d'autres actions globales.
// Les actions asynchrones comme les thunks ont souvent plusieurs étapes : pending (en attente), fulfilled (réussie), et rejected (échouée), et builder permet de gérer chacune de ces étapes.
