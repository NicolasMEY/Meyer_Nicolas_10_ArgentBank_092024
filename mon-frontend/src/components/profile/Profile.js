// Affiche les informations du profil utilisateur, récupérées depuis le store Redux.

import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userInfo, isLoading, error } = useSelector((state) => state.profile);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Profil de {userInfo?.username}</h1>
      <p>Nom: {userInfo?.firstName}</p>
      <p>Prénom: {userInfo?.lastName}</p>
      <p>Pseudo: {userInfo?.username}</p>
    </div>
  );
};

export default Profile;
