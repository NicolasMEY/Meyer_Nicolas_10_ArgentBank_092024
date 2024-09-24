// Le composant Profile est chargé de gérer l'affichage et la mise à jour des informations de profil de l'utilisateur.  Affiche les informations actuelles de l'utilisateur et permet de mettre à jour le nom d'utilisateur. Utilise Redux pour accéder à l'état global (informations de l'utilisateur, état de chargement, erreurs). Utilise l'état local pour gérer le nom d'utilisateur avant la soumission.

// import React, { useState } from "react"; //Pour créer le composant et gérer l'état local
// import { useSelector, useDispatch } from "react-redux";
// import { updateProfile } from "../../feature/slices/profile/profileThunks";
// import {
//   // updateProfile,
//   selectUser,
//   selectIsLoading,
//   selectError,
// } from "../../feature/slices/profile/profileSlice";

// const Profile = () => {
//   const dispatch = useDispatch(); // Permet d'envoyer des actions au store de Redux
//   const userInfo = useSelector(selectUser); // Infos sur l'utilisateur du store
//   const isLoading = useSelector(selectIsLoading); // Vérifier si une requête est en cours
//   const error = useSelector(selectError);
//   const [username, setUsername] = useState(userInfo?.username || ""); // Ici username est l'état local pour stoker le nom d'utilisateur avant de le soumettre et setUsername fct pour maj l'état local du nom d'utilisateur... chaine vide si nul ou undefined

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProfile({ username })); // Envoie une action pour maj le profil avec le nouveau nom d'utilisateur
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Profil de {userInfo?.username}</h1>
//       <p>Nom: {userInfo?.firstName}</p>
//       <p>Prénom: {userInfo?.lastName}</p>
//       <p>Pseudo: {userInfo?.username}</p>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Edit Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username} // value lié l'état local username (géré avec useState) au champs de saisie du formulaire ; Le contenu du champ de texte est donc toujours égal à la valeur actuelle de l'état username
//             onChange={(e) => setUsername(e.target.value)} // est une fonction de rappel (callback) qui est appelée lorsque l'événement onChange se produit. e : Représente l'objet événement (événement onChange ici). Cet objet contient des informations sur l'événement, comme la valeur actuelle du champ de texte. e.target.value : C'est la valeur actuelle du champ de texte (ce que l'utilisateur a saisi). setUsername(e.target.value) : Cette fonction met à jour l'état local username avec la nouvelle valeur saisie par l'utilisateur.
//             // À chaque frappe, la fonction de rappel récupère la nouvelle valeur avec e.target.value et met à jour l'état avec setUsername(e.target.value). Ainsi, le contenu du champ et l'état username sont toujours synchronisés.
//           />
//         </div>
//         <button type="submit">Update Username</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

// value={username} lie la valeur du champ à l'état local username, permettant au composant de contrôler la valeur du champ.
//onChange={(e) => setUsername(e.target.value)} met à jour l'état username chaque fois que l'utilisateur modifie le contenu du champ de texte, assurant ainsi une synchronisation en temps réel entre la saisie de l'utilisateur et l'état du composant.

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../feature/UpdateUserName/UpdateUserNameSlice";
import "./profile.css";

const Profile = ({ setIsEditing }) => {
  const dispatch = useDispatch();

  // State Redux
  const { userInfo } = useSelector((state) => state.profile); // récupère les données utilisateur depuis le store Redux
  const { data, isSuccess } = useSelector((state) => state.newUserName); // récupère le statut et les données après mise à jour

  // State local
  const [userData, setUserData] = useState({
    // stocke le nom d'utilisateur saisi dans le formulaire (userData) et l'état d'affichage du profil (userProfile)
    userName: "",
    // userInfo?.body?.userName || "",
  });
  // const [userProfile, setUserProfile] = useState(userData.userName);
  const [userProfile, setUserProfile] = useState(""); // stocke le nom d'utilisateur actuel du profil

  //  Capture des changements dans le formulaire : chaque fois que l'utilisateur modifie l'input userName, cette fonction met à jour l'état userData avec la nouvelle valeur saisie
  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // met à jour le champ `userName` dans l'objet `userData`
    }));
  };

  const { userName } = userData;

  // Soumission du formulaire et maj du nom d'utilisateur
  const handleSubmitUserName = (e) => {
    e.preventDefault();

    dispatch(updateUser({ userName })); // updateUser est une action asynchrone Redux définie dans le UpdateUserNameSlice qui envoie une requête au backend pour mettre à jour le nom d'utilisateur.
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
      const userNameProfile = userInfo.body.userName; // extrait le nom d'utilisateur du profil
      setUserProfile(userNameProfile); // met à jour le state local `userProfile`
      setUserData((prevState) => ({
        ...prevState,
        userName: userNameProfile, // pré-remplit l'input avec le nom d'utilisateur actuel
      }));
    }

    // si la mise à jour du nom d'utilisateur réussit (isSuccess), on extrait le nouveau nom d'utilisateur et on met à jour les états locaux avec cette nouvelle valeur
    if (isSuccess && data.body) {
      const newUserName = data.body.userName; // extrait le nouveau nom d'utilisateur après la mise à jour
      setUserProfile(newUserName); // met à jour l'état local avec le nouveau nom d'utilisateur
      setUserData((prevState) => ({
        ...prevState,
        userName: newUserName, // Met à jour l'input avec le nouvel nom d'utilisateur
      }));
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
          value={userName}
          placeholder={userProfile} // Affiche le nom d'utilisateur actuel comme placeholder
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
