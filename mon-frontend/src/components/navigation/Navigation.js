// Le composant Navigation est principalement responsable de l'affichage du logo de l'application et des liens de navigation, comme le lien vers la page de connexion.

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Utilisez Link de react-router pour la navigation interne
import "./Navigation.css";

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
          {isAuthenticated ? (
            <a className="main-nav-item" href="/profile">
              <i className="fa fa-user-circle"></i>
              Profile
            </a>
          ) : (
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
