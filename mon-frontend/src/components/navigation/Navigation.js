// Le composant Navigation est principalement responsable de l'affichage du logo de l'application et des liens de navigation, comme le lien vers la page de connexion. Il ajuste les liens disponibles en fonction de l'état d'authentification de l'utilisateur.

import React from "react";
import { useSelector } from "react-redux"; // hook de redux pour accéder à l'état global de l'application
import { Link } from "react-router-dom"; // Utilisez Link de react-router pour la navigation interne sans rechargement de la page
import "./Navigation.css";

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Utilisé pour obtenir l'état d'authentification de l'utilisateur à partir du store Redux

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {isAuthenticated ? ( // Si anthentifié (isAuthenticated est vrai)
            // Affiche un lien vers la page de profil
            <a className="main-nav-item" href="/profile">
              <i className="fa fa-user-circle"></i>
              Profile
            </a>
          ) : (
            // sinon affiche un lien vers la page de connexion en utilisant link pour éviter le rechargement complet de la page
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
