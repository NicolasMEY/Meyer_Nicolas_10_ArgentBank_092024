// Page de profil utilisateur

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../components/profile/Profile";
import Account from "../components/account/Account";
import { userProfile } from "../feature/profile/profile/profileThunks"; // action asynchrone thunk) pour récupérer les datas du profil utilisateur via l'API

const User = () => {
  document.title = "Argent Bank - Profile";

  // Navigation et Dispatch
  const navigate = useNavigate(); // Permet de naviguer entre les différentes pages de l'app, par exemple, vers la page d'accueil si l'utilisateur n'est pas authentifié
  const dispatch = useDispatch();
  // Sélection des états redux
  const { userInfo } = useSelector((state) => state.profile); // récupéré depuis le store, contient les infos de l'utilisateur connecté
  const { token } = useSelector((state) => state.auth); // récupéré depuis le store, contient le token de l'utilisateur connecté
  // Etats locaux avec useState
  const [isEditing, setIsEditing] = useState(false); // Etat local qui détermine si l'utilisateur est en mode édition ou non
  const [fullName, setFullName] = useState(""); // Etat local qui stocke le nom du user

  // Effet de bord
  useEffect(() => {
    // Vérification de l'authentification sinon redirection vers la page d'accueil
    if (!token) {
      navigate("/");
    }
    // Récupération des informations utilisateur avec dispatch
    if (token && !userInfo) {
      dispatch(userProfile(token)); // l'action userProfile est dispatchée pour récupérer les informations de l'utilisateur depuis l'API
    }
    // Formation du nom complet : Si les informations de l'utilisateur sont disponibles (userInfo), le nom complet est formé à partir du prénom (firstName) et du nom de famille (lastName) et est stocké dans l'état (fullName).
    if (userInfo && !fullName) {
      const { firstName, lastName } = userInfo;
      setFullName(`${firstName} ${lastName}`);
    }
  }, [userInfo, token, navigate]); // Dépendances : Cet effet doit se réexécuter chaque fois que userInfo, token, navigate, dispatch ou fullName changent, afin de s'assurer que l'état de l'application reste synchronisé avec les données utilisateur et le statut d'authentification

  return (
    <div>
      <main className="main bg-dark">
        <div className="header" style={{ padding: "10px 0" }}>
          {/* Mode édition */}
          {/* Si isEditing est vrai, le composant Profile est affiché pour permettre à l'utilisateur de modifier son nom. Sinon, un message de bienvenue et un bouton "Edit Name" sont affichés. Lorsque ce bouton est cliqué, setIsEditing(true) est appelé pour activer le mode édition */}
          {isEditing ? (
            <Profile setIsEditing={setIsEditing} />
          ) : (
            // setIsEditing = prop permettant de sortir du mode édition si false, et un fragment react est rendu ci dessous
            <>
              <h1>
                Welcome back
                <br /> {fullName} !
              </h1>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Name
              </button>
            </>
          )}
        </div>
        <>
          <Account
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
          />
          <Account
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
          />
          <Account
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
          />
        </>
      </main>
    </div>
  );
};

export default User;
