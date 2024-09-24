// Page du profil utilisateur

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../components/profile/Profile";
import Account from "../components/account/Account";

const User = () => {
  document.title = "Argent Bank - Profile";

  // hooks et état
  const navigate = useNavigate(); // Permet de naviguer entre les différentes pages de l'app
  const { userInfo } = useSelector((state) => state.profile); // récupéré depuis le store, contient les infos de l'utilisateur connecté
  const [isEditing, setIsEditing] = useState(false); // Etat local qui détermine si l'utilisateur est en mode édition ou non
  const [fullName, setFullName] = useState(""); // Etat local qui stocke le nom du user
  const token = JSON.parse(localStorage.getItem("token"));

  // Effet de bord
  useEffect(() => {
    // Si le token n'existe pas, cela signifie que l'utilisateur n'est pas connecté, et il est redirigé vers la page d'accueil
    if (!token) {
      navigate("/");
    }
    // Si les informations de l'utilisateur sont disponibles (userInfo), le nom complet est formé à partir du prénom (firstName) et du nom de famille (lastName) et est stocké dans l'état fullName.
    if (userInfo) {
      const { firstName, lastName } = userInfo.body;
      setFullName(`${firstName} ${lastName}`);
    }
  }, [userInfo, token, navigate]);

  return (
    <div>
      <main className="main bg-dark">
        <div className="header" style={{ padding: "10px 0" }}>
          {/* Mode édition */}
          {/* Si isEditing est vrai, le composant Profile est affiché pour permettre à l'utilisateur de modifier son nom. Sinon, un message de bienvenue et un bouton "Edit Name" sont affichés. Lorsque ce bouton est cliqué, setIsEditing(true) est appelé pour activer le mode édition */}
          {isEditing ? (
            <Profile setIsEditing={setIsEditing} />
          ) : (
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
