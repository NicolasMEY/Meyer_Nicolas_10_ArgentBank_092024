// CAT : Une fonction de Redux Toolkit qui simplifie la gestion des opérations asynchrones (comme les appels API). Elle permet de créer des thunks qui dispatchent automatiquement les actions pending, fulfilled, et rejected basées sur l'état de l'opération asynchrone. En utilisant des thunks (comme createAsyncThunk), on peut encapsuler toute la logique liée à un appel API (démarrage, succès, échec) en un seul endroit. Cela rend le code plus facile à lire et à maintenir, et évite d'avoir à gérer manuellement les actions et les états dans chaque composant. En utilisant des thunks, on peut séparer la logique de gestion des états asynchrones de la logique des composants. Les composants peuvent se concentrer sur l'affichage des données et l'interaction avec l'utilisateur, tandis que les thunks gèrent la logique métier.

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
} from "./authSlice";

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  "auth/loginUser", // Ce thunk effectue une requête de connexion à l'API et dispatch les actions appropriées en fonction du résultat
  // credentials : Les informations d'identification fournies par l'utilisateur (par exemple, nom d'utilisateur et mot de passe). Dispatch : C'est une fonction fournie par Redux qui permet d'envoyer des actions au store Redux
  async (credentials, { dispatch }) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        credentials
      );
      dispatch(loginSuccess(response.data.token));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }
);

// Thunk pour la déconnexion
export const logout = () => (dispatch) => {
  dispatch(logoutUser());
};

// Les thunks définis (loginUser et logout) dispatchent des actions en fonction de l'état des opérations asynchrones, ce qui simplifie la gestion des états de chargement, succès, et erreur dans mon slice Redux.
// Envoyer des Actions : on utilise dispatch pour "envoyer" des actions qui décrivent ce qui doit changer dans l'état de l'application. Par exemple, pour signaler que la connexion a commencé, on dispatch une action comme loginStart.
// Mise à Jour de l'État : Le reducer recevra cette action et mettra à jour l'état du store en conséquence.
