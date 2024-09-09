// Le store central pour l'application est configuré ici. Il inclut le slice pour l'authentification

import authReducer from "../reducers/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// const store = configureStore({
//   reducer: authReducer,
//   devTools: true,
// });

// export default store;
