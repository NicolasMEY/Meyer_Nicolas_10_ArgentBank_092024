// Ce fichier authSlice.js gère l'état d'authentification dans l'application. Il définit les actions et le reducer pour les processus de connexion (loginStart, loginSuccess, loginFailure) et de déconnexion (logoutUser). Il permet de suivre l'état de connexion de l'utilisateur (authentifié ou non), gérer les erreurs, et stocker le token d'authentification.

import { createSlice } from "@reduxjs/toolkit";
// createSlice est une fonction de Redux Toolkit qui simplifie la création de "slices" (tranches) d'état et les reducers associés. Une slice est une portion de l'état global du store et les actions qui peuvent modifier cet état.

// initial State : structure de l'état avant que les actions ne soient appliquées
const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false, // signale si une opération d'authentification est en cours, comme une connexion ou une déconnexion
  error: null,
};

// reducers : Définit les fonctions qui modifient l'état en réponse à des actions
// auth loginStart ou auth loginSuccess sont des noms d'action

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Démarrer le processus de connexion
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null; // réinitialisation des erreurs
    },
    // Connexion réussie, appelé lorsque la connexion réussit
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload; // Utilise action.payload pour stocker le token d'authentification dans l'état. Le token est passé avec l'action et est utilisé pour mettre à jour state.token.
      state.error = null; // réinitialise les erreurs
    },
    // Échec de la connexion, appelé lorsqu'une erreur se produit durant la connexion
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload; // stocke le msg d'erreur dans error
    },
    // Déconnexion de l'utilisateur
    logoutUser: (state) => {
      state.isAuthenticated = false; // réinitialise l'état d'authentification
      state.token = null; // Supprime le token
      state.isLoading = false;
      state.error = null;
    },
  },
});

// loginStart : Démarre le processus de connexion, active le chargement.
// loginSuccess : Récupère et stock le token d'authentification et marque l'utilisateur comme authentifié.
// loginFailure : En cas d'erreur (par exemple, identifiants incorrects), cela stoppe le chargement et enregistre l'erreur.
// logoutUser : Déconnecte l'utilisateur, supprime le token et réinitialise l'état d'authentification.

export const { loginStart, loginSuccess, loginFailure, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;

// infos :
// state : Représente l'état actuel de la slice et est modifié par les reducers.
// action : Un objet qui indique qu'une action a eu lieu et peut contenir des données supplémentaires (payload = charge utile).
// action.payload : Contient les données spécifiques à l'action (comme un token d'authentification ou un message d'erreur) et est utilisé pour mettre à jour l'état.
