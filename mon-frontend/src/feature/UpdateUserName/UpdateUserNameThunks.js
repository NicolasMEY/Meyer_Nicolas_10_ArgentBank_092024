// Module qui gère la logique des appels API pour maj du nom utilisateur

import { createAsyncThunk } from "@reduxjs/toolkit";

// Modifier l'UserName
export const updateUser = createAsyncThunk(
  "update/updateUser",
  async ({ userData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing");
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: JSON.stringify({ userName: userData }),
        }
      );

      if (!response.ok) {
        // Si la réponse n'est pas en statut 200, on considère que c'est une erreur
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue("An error occurred. Please try again.");
    }
  }
);
