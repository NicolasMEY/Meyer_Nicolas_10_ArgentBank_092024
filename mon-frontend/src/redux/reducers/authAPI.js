// GESTION DES APPELS API POUR LOGIN/LOGOUT : Ce fichier gère les appels API pour la connexion et la déconnexion.

import axios from "axios";

export const loginUserAPI = async (credentials) => {
  return await axios.post("/api/user/login", credentials);
};

export const logoutUserAPI = async () => {
  return await axios.post("/api/user/logout");
};
