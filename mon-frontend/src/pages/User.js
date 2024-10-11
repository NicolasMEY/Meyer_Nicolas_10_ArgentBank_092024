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
  const { data, isSuccess } = useSelector((state) => state.newUserName);
  // Etats locaux avec useState
  const [isEditing, setIsEditing] = useState(false); // Etat local qui détermine si l'utilisateur est en mode édition ou non
  const [fullName, setFullName] = useState(""); // Etat local qui stocke le nom du user

  // Effet de bord pour récupérer les données de l'utilisateur
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  //   if (token) {
  //     dispatch(userProfile(token));
  //   }
  // }, [token, dispatch, navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored Token:", storedToken);

    if (!storedToken) {
      navigate("/");
    } else {
      // dispatch(login.fulfilled({ token: storedToken }));
      dispatch(userProfile(storedToken));
    }
  }, [dispatch, navigate]);

  // Mise à jour du nom complet
  useEffect(() => {
    if (userInfo) {
      const { firstName, lastName } = userInfo;
      if (firstName && lastName) {
        setFullName(`${firstName} ${lastName}`);
      }
    }
  }, [userInfo]);

  // Mise à jour du nom d'utilisateur en cas de changement
  useEffect(() => {
    if (isSuccess && data) {
      const newUserName = data.userName;
      setFullName(newUserName);
    }
  }, [isSuccess, data]);

  return (
    <div>
      <main className="main bg-dark">
        <div className="header" style={{ padding: "10px 0" }}>
          {/* Mode édition */}
          {/* Si isEditing est vrai, le composant Profile est affiché pour permettre à l'utilisateur de modifier son nom. Sinon, un message de bienvenue et un bouton "Edit Name" sont affichés. Lorsque ce bouton est cliqué, setIsEditing(true) est appelé pour activer le mode édition */}
          {isEditing ? (
            <Profile setIsEditing={setIsEditing} setFullName={setFullName} />
          ) : (
            // setIsEditing = prop permettant de sortir du mode édition si false, et un fragment react est rendu ci dessous
            <>
              <h1>
                Welcome back
                <br /> {fullName ? fullName : "User"} !
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
