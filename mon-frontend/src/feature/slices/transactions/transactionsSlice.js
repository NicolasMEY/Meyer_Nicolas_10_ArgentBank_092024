import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./transactionsThunks"; // créer ce fichier pour les appels API

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const { setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
