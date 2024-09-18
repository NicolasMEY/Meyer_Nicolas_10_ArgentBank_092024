import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../feature/slices/auth/authSlice";
import { selectUser } from "../../feature/slices/profile/profileSlice";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ onEdit }) => {
  // prop onEdit
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // indique si l'utilisateur est connecté ou non
  const user = useSelector(selectUser); // Utilisez le sélecteur (selectUser) pour obtenir les informations de l'utilisateur depuis profileSlice
  const dispatch = useDispatch(); // fonction pour envoyer des actions au store
  const navigate = useNavigate(); // Pour la redirection via react-router-dom

  // Fonction de déconnexion
  const handleLogout = () => {
    dispatch(logoutUser()); // Déclenche l'action pour maj l'état de l'authentification dans le store
    navigate("/"); // Redirige vers la page d'accueil après déconnexion
  };

  return (
    <div className="header">
      {isAuthenticated ? ( // si l'utilisateur est authentifié (true)
        <>
          <h1>
            Welcome back
            <br />
            {user?.username || "User"}!
            {/* msg de bienvenue avec le nom d'utilisateur si absent affiche user */}
          </h1>
          <button className="edit-button" onClick={onEdit}>
            {/* la fonction onEdit est passée en prop au composant header, elle est définie dans la page user >>> permet d'appeler onEdit pour rediriger vers user et Profile */}
            Edit Name
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        // si l'utilisateur n'est pas authentifié affiche ce msg
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Header;
