// Le composant Profile a pour objectif principal de :
// Afficher les informations actuelles de l'utilisateur.
// Permettre la mise à jour du nom d'utilisateur.
// Gérer l'état local pour le formulaire de mise à jour avant soumission.
// Interagir avec le store Redux pour accéder et mettre à jour les informations utilisateur globales.

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../feature/UpdateUserName/UpdateUserNameThunks";
import "./profile.css";

const Profile = ({ setIsEditing }) => {
  const dispatch = useDispatch();

  // State global avec Redux
  const { userInfo } = useSelector((state) => state.profile); // On récupère les données utilisateur depuis le slice profile du store Redux
  const { data, isSuccess } = useSelector((state) => state.newUserName); // On récupère le statut et les données depuis le slice newUsername qui gère la mise à jour utilisateur

  // State local
  const [userData, setUserData] = useState(userInfo?.userName || ""); //  L'état est initialisé avec le nom d'utilisateur actuel provenant de Redux (userInfo.userName) ou une chaîne vide si userInfo n'est pas défini.

  //  Gestion des évènements du formulaire : chaque fois que l'utilisateur modifie l'input userName, cette fonction met à jour l'état userData avec la nouvelle valeur saisie
  const onChange = (e) => {
    setUserData(e.target.value);
  };

  // Soumission du formulaire et maj du nom d'utilisateur (action updateUser avec userData)
  const handleSubmitUserName = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userData }));
    setIsEditing(false); // Désactive le mode édition aprés la soumission
  };

  // Annulation de l'édition
  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  // Maj des informations utilisateurs lors de la modification : useEffect est utilisé pour surveiller les changements dans [isSucces, userInfo, data] provenant du Redux store, et pour mettre à jour le userProfile et le userData en conséquence.
  useEffect(() => {
    // Si un utilisateur est connecté, alors on actualise le state avec l'userName du profil
    if (userInfo && userInfo.body) {
      setUserData(userInfo.userName);
    }
    // si la mise à jour du nom d'utilisateur réussit (isSuccess) et les nouvelles données disponibles (data.body), on extrait le nouveau nom d'utilisateur et on met à jour les états locaux avec cette nouvelle valeur
    if (isSuccess && data.body) {
      setUserData(data.body.userName);
    }
  }, [isSuccess, userInfo, data]); // dépendances: quand `isSuccess`, `userInfo` ou `data` changent, ce useEffect est déclenché

  return (
    <form className="editForm-container" onSubmit={handleSubmitUserName}>
      <h2 className="editForm-title">Edit user info</h2>
      <div className="editInput-wrapper">
        <label htmlFor="userName">User name:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={userData}
          placeholder={userData} // Affiche le nom d'utilisateur actuel comme placeholder
          onChange={onChange}
          required // champ obligatoire
        />
      </div>
      <div className="editInput-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder={userInfo?.body?.firstName} // affiche le prénom actuel
          disabled // champs désactivé
        />
      </div>
      <div className="editInput-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder={userInfo?.body?.lastName} // affiche le nom de famille actuel
          disabled // champs désactivté
        />
      </div>
      <div className="editName-button-wrapper">
        <button className="editName-button" type="submit">
          Save
        </button>
        <button className="editName-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Profile;
