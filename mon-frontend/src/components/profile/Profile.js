// Le composant Profile est chargé de gérer l'affichage et la mise à jour des informations de profil de l'utilisateur.  Affiche les informations actuelles de l'utilisateur et permet de mettre à jour le nom d'utilisateur. Utilise Redux pour accéder à l'état global (informations de l'utilisateur, état de chargement, erreurs). Utilise l'état local pour gérer le nom d'utilisateur avant la soumission.

import React, { useState } from "react"; //Pour créer le composant et gérer l'état local
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../feature/slices/profile/profileThunks";
import {
  // updateProfile,
  selectUser,
  selectIsLoading,
  selectError,
} from "../../feature/slices/profile/profileSlice";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch(); // Permet d'envoyer des actions au store de Redux
  const userInfo = useSelector(selectUser); // Infos sur l'utilisateur du store
  const isLoading = useSelector(selectIsLoading); // Vérifier si une requête est en cours
  const error = useSelector(selectError);
  const [username, setUsername] = useState(userInfo?.username || ""); // Ici username est l'état local pour stoker le nom d'utilisateur avant de le soumettre et setUsername fct pour maj l'état local du nom d'utilisateur... chaine vide si nul ou undefined

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ username })); // Envoie une action pour maj le profil avec le nouveau nom d'utilisateur
  };

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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Edit Username</label>
          <input
            type="text"
            id="username"
            value={username} // value lié l'état local username (géré avec useState) au champs de saisie du formulaire ; Le contenu du champ de texte est donc toujours égal à la valeur actuelle de l'état username
            onChange={(e) => setUsername(e.target.value)} // est une fonction de rappel (callback) qui est appelée lorsque l'événement onChange se produit. e : Représente l'objet événement (événement onChange ici). Cet objet contient des informations sur l'événement, comme la valeur actuelle du champ de texte. e.target.value : C'est la valeur actuelle du champ de texte (ce que l'utilisateur a saisi). setUsername(e.target.value) : Cette fonction met à jour l'état local username avec la nouvelle valeur saisie par l'utilisateur.
            // À chaque frappe, la fonction de rappel récupère la nouvelle valeur avec e.target.value et met à jour l'état avec setUsername(e.target.value). Ainsi, le contenu du champ et l'état username sont toujours synchronisés.
          />
        </div>
        <button type="submit">Update Username</button>
      </form>
    </div>
  );
};

export default Profile;

// value={username} lie la valeur du champ à l'état local username, permettant au composant de contrôler la valeur du champ.
//onChange={(e) => setUsername(e.target.value)} met à jour l'état username chaque fois que l'utilisateur modifie le contenu du champ de texte, assurant ainsi une synchronisation en temps réel entre la saisie de l'utilisateur et l'état du composant.
