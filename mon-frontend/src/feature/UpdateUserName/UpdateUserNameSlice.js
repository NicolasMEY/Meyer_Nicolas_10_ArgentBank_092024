// Gestion de la fonctionnalité d'ACTUALISATION du nom d'utilisateur.

import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "./UpdateUserNameThunks";

const initialState = {
  data: null,
  isError: false, // indique s'il y a une erreur lors de la maj
  isSuccess: false,
  isLoading: false,
  message: "", // msg d'erreur ou de succès, en fonction de la réponse
};

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
