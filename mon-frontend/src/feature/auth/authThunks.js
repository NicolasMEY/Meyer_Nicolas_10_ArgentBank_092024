// authThunks gère l'authentification des utilisateurs (authThunks) qui permet de gérer la connexion et la déconnexion des utilisateurs via des requêtes API. La fonction login envoie les données d'identification de l'utilisateur à l'API, stocke les informations d'utilisateur et le token d'authentification en cas de succès, et gère une option "Remember Me" pour la persistance des informations. La fonction logout permet de supprimer ces données pour déconnecter l'utilisateur.

import axios from "axios";

// Login user
const login = async ({ email, password }) => {
  // Fonction asynchrone qui permet de connecter un utilisateur
  const response = await axios.post("http://localhost:3001/api/v1/user/login", {
    email,
    password,
  });

  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.body.token));
  }

  // Vérifie si la case à cocher "Remember Me" est sélectionnée
  if (document.getElementById("remember-me").checked) {
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("password", JSON.stringify(password));
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
