// Module qui utilise Axios pour faire une requête HTTP afin de modifier le nom d'utilisateur d'un utilisateur

import axios from "axios";

// Modifier l'UserName
const updateUser = async (userData) => {
  // userData représente les données utilisateur qui doivent etre maj
  const token = localStorage.getItem("token"); // récupération du token dans le LS
  const tokenParse = JSON.parse(token);
  const response = await axios.put(
    "http://localhost:3001/api/v1/user/profile",
    userData, // les données à maj passées comme deuxième argument de la fonction put
    {
      headers: {
        Authorization: `Bearer ${tokenParse}`,
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  }
};

const updateUserNameThunks = {
  // objet updateUserNameThunks crée contenant la fct updateUser
  updateUser,
};

export default updateUserNameThunks;
