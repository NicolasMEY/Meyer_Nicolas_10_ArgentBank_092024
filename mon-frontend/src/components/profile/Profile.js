// Affiche les informations du profil utilisateur, récupérées depuis le store Redux.

import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Profil de {user?.username}</h1>
      <p>Nom: {user?.firstName}</p>
      <p>Prénom: {user?.lastName}</p>
      <p>Pseudo: {user?.username}</p>
    </div>
  );
};

export default Profile;
