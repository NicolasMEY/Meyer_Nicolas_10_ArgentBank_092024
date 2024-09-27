// GESTION DES APPELS API POUR LOGIN/LOGOUT : pour les actions asynchrones (API calls), fonction userProfile qui effectue une requête HTTP GET pour récupérer les informations de profil utilisateur à partir d'une API. Il gère l'authentification en utilisant un token stocké dans localStorage, vérifie si le token est présent, traite les réponses de l'API et gère les erreurs potentielles

import axios from "axios";

// Récupérer le nom de l'utilistaeur
const userProfile = async () => {
  // fct asynchrone qui recupère les infos du profil user
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token is missing from localStorage");
  }

  // Requête API
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pas besoin de JSON.parse ici si le token est une simple chaîne
        },
      }
    );

    // Gestion de la réponse
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(
      "Failed to fetch user profile:",
      error.response ? error.response.data : error.message
    );
    console.error("Full response:", error.response);
    throw error;
  }
};

const profileService = {
  userProfile,
};

export default profileService;
