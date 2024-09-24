// authThunks gère l'authentification des utilisateurs (authThunks) qui permet de gérer la connexion et la déconnexion des utilisateurs via des requêtes API. La fonction login envoie les données d'identification de l'utilisateur à l'API, stocke les informations d'utilisateur et le token d'authentification en cas de succès, et gère une option "Remember Me" pour la persistance des informations. La fonction logout permet de supprimer ces données pour déconnecter l'utilisateur.

import axios from "axios";

// Login user
const login = async (userData) => {
  // Fonction asynchrone qui permet de connecter un utilisateur
  const response = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    userData
  );

  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.body.token));
  }

  // Vérifie si la case à cocher "Remember Me" est sélectionnée
  if (document.getElementById("remember-me").checked) {
    localStorage.setItem("email", JSON.stringify(userData.email));
    localStorage.setItem("password", JSON.stringify(userData.password));
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authThunks = {
  // Crée un objet authThunks contenant les fonctions login et logout
  login,
  logout,
};

export default authThunks;

// Les thunks définis (loginUser et logout) dispatchent des actions en fonction de l'état des opérations asynchrones, ce qui simplifie la gestion des états de chargement, succès, et erreur dans mon slice Redux.
// Envoyer des Actions : on utilise dispatch pour "envoyer" des actions qui décrivent ce qui doit changer dans l'état de l'application. Par exemple, pour signaler que la connexion a commencé, on dispatch une action comme loginStart.
// Mise à Jour de l'État : Le reducer recevra cette action et mettra à jour l'état du store en conséquence.
// CAT : Une fonction de Redux Toolkit qui simplifie la gestion des opérations asynchrones (comme les appels API). Elle permet de créer des thunks qui dispatchent automatiquement les actions pending, fulfilled, et rejected basées sur l'état de l'opération asynchrone. En utilisant des thunks (comme createAsyncThunk), on peut encapsuler toute la logique liée à un appel API (démarrage, succès, échec) en un seul endroit. Cela rend le code plus facile à lire et à maintenir, et évite d'avoir à gérer manuellement les actions et les états dans chaque composant. En utilisant des thunks, on peut séparer la logique de gestion des états asynchrones de la logique des composants. Les composants peuvent se concentrer sur l'affichage des données et l'interaction avec l'utilisateur, tandis que les thunks gèrent la logique métier.
