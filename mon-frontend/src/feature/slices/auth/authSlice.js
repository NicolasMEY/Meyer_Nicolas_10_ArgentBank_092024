// Ce fichier authSlice.js gère l'état d'authentification dans l'application. Il définit les actions et le reducer pour les processus de connexion (loginStart, loginSuccess, loginFailure) et de déconnexion (logoutUser). Il permet de suivre l'état de connexion de l'utilisateur (authentifié ou non), gérer les erreurs, et stocker le token d'authentification. Il simplifie la gestion des actions liées à l'authentification en combinant actions et reducers en un seul endroit avec Redux Toolkit.

import { createSlice } from "@reduxjs/toolkit";
// permet de fusionner l'action et le reducer

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Les reducers sont des fonctions pures qui modifient l'état en réponse à une action. Les reducers définis ici vont gérer les changements de l'état pour l'authentification. RTK génère automatiquement les actions associées aux reducers.

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Démarrer le processus de connexion
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Connexion réussie
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload; // Par exemple, un token JWT
      state.error = null;
    },
    // Échec de la connexion
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload; // Un message d'erreur venant de l'API
    },
    // Déconnexion de l'utilisateur
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null; // Supprimer le token
      state.isLoading = false;
      state.error = null;
    },
  },
});

// l'action et le reducer sont au meme endroit
export const { loginStart, loginSuccess, loginFailure, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;

// Explications :
// loginStart : Démarre le processus de connexion, active le chargement.
// loginSuccess : Récupère et stock le token d'authentification (par exemple un JWT) et marque l'utilisateur comme authentifié.
// loginFailure : En cas d'erreur (par exemple, identifiants incorrects), cela stoppe le chargement et enregistre l'erreur.
// logoutUser : Déconnecte l'utilisateur, supprime le token et réinitialise l'état d'authentification.
