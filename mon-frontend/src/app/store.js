// Le store central pour l'application est configuré ici. Il inclut le slice pour l'authentification

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/slices/auth/authSlice";
// permet de combiner tous les reducers
import profileReducer from "../feature/slices/profile/profileSlice";
import transactionsReducer from "../feature/slices/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    transactions: transactionsReducer,
  },
});

export default store;
