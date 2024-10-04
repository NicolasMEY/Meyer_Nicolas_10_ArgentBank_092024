// Le composant Profile est chargé de gérer l'affichage et la mise à jour des informations de profil de l'utilisateur.  Affiche les informations actuelles de l'utilisateur et permet de mettre à jour le nom d'utilisateur. Utilise Redux pour accéder à l'état global (informations de l'utilisateur, état de chargement, erreurs). Utilise l'état local pour gérer le nom d'utilisateur avant la soumission.

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../feature/UpdateUserName/UpdateUserNameThunks";
import "./profile.css";

const Profile = ({ setIsEditing }) => {
  const dispatch = useDispatch();

  // State Redux
  const { userInfo } = useSelector((state) => state.profile); // On récupère les données utilisateur depuis le store Redux
  const { data, isSuccess } = useSelector((state) => state.newUserName); // On récupère le statut et les données après mise à jour

  // State local
  const [userData, setUserData] = useState(userInfo?.userName || ""); // stocke le nom d'utilisateur saisi dans le formulaire (userData) et l'état d'affichage du profil (userProfile)

  //  Capture des changements dans le formulaire : chaque fois que l'utilisateur modifie l'input userName, cette fonction met à jour l'état userData avec la nouvelle valeur saisie
  const onChange = (e) => {
    setUserData(e.target.value);
  };

  // Soumission du formulaire et maj du nom d'utilisateur
  const handleSubmitUserName = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userData }));
    setIsEditing(false);
  };

  // Annulation de l'édition
  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  // Maj des informations utilisateurs lors de la modification : Le hook useEffect est utilisé pour surveiller les changements dans les données utilisateur provenant du Redux store, et pour mettre à jour le userProfile et le userData en conséquence.
  useEffect(() => {
    // Si un utilisateur est connecté, alors on actualise le state avec l'userName du profil
    if (userInfo && userInfo.body) {
      setUserData(userInfo.userName);
    }

    // si la mise à jour du nom d'utilisateur réussit (isSuccess), on extrait le nouveau nom d'utilisateur et on met à jour les états locaux avec cette nouvelle valeur
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
          required
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
