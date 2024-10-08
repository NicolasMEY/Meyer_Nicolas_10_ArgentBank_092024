import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import profileReducer from "../feature/profile/profile/profileSlice";
import updateUserNameReducer from "../feature/UpdateUserName/UpdateUserNameSlice";

// authReducer : Il s'agit du réducteur gérant l'authentification de l'utilisateur.
// profileReducer : Ce réducteur gère l'état du profil de l'utilisateur.
// updateUserNameReducer : Ce réducteur est responsable de la gestion de l'état du changement de nom d'utilisateur.

export const store = configureStore({
  reducer: {
    //  objet qui spécifie les différents réducteurs qui seront combinés dans le store.
    auth: authReducer, // clé + réducteur
    profile: profileReducer,
    newUserName: updateUserNameReducer,
  },
});

export default store;
