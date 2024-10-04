// Gestion de la fonctionnalité d'ACTUALISATION du nom d'utilisateur dans un store Redux, en envoyant une requête asynchrone à une API et en gérant les différents états de chargement, succès, et erreur.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import updateUserName from "./UpdateUserNameThunks";

const initialState = {
  // état de départ de la partie du store géré
  data: null,
  isError: false, // indique s'il y a une erreur lors de la maj
  isSuccess: false,
  isLoading: false,
  message: "", // msg d'erreur ou de succès, en fonction de la réponse
};

// MAJ du nom d'utilisateur avec CAT (qui, pour rappel, est une fonction fournie par RTk pour gérer les actions asynchrones, comme des appels API)
export const updateUser = createAsyncThunk(
  // updateUser est l'action asynchrone
  "newUserName", // type d'action
  async (data, thunkAPI) => {
    try {
      return await updateUserName.updateUser(data); // Envoi des données à l'API
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message); // Renvoie un msg d'erreur si la requête échoue
    }
  }
);

// Slice pour gérer l'état de la maj (userNameSlice)
export const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    resetUserName: (state) => {
      // Action qui permet de réinitialiser tous les états à leurs valeurs par défaut
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  // ExtraReducers : ce bloc gère les différentes étapes de la requête asynchrone (en attente, succès, erreur...)
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload; // payload = données supplémentaires, la réponse API est stockée dans state.data > le nouveau nom utilisateur
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // renseigné avec l'erreur retournée par l'API
        state.data = null; // les données sont alors remises à null
      });
  },
});

// resetUserName : action exportée pour réinitialiser l'état
export const { resetUserName } = userNameSlice.actions; // Action exportée pour réinitialiser l'état
export default userNameSlice.reducer;
