import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";
import argentBankLogo from "../../assets-images/img/argentBankLogo.webp";
import { useSelector, useDispatch } from "react-redux";
// Actions redux
import { logout, reset } from "../../feature/auth/authSlice";
import { resetProfile } from "../../feature/profile/profile/profileSlice";
import { resetUserName } from "../../feature/UpdateUserName/UpdateUserNameSlice";
import { userProfile } from "../../feature/profile/profile/profileThunks";

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //State Redux
  // const { token } = useSelector((state) => state.auth);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const { userInfo } = useSelector((state) => state.profile);
  const { data, isSuccess } = useSelector((state) => state.newUserName);

  const [userProfiles, setUserProfiles] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("token")); // Récupérer le token depuis localStorage

  // Utilisez useEffect pour récupérer le profil utilisateur si le token est présent

  if (localStorage.getItem("token") && token == null) {
    setToken(localStorage.getItem("token"));
  }

  useEffect(() => {
    if (token) {
      console.log("Token found, dispatching userProfile()");
      dispatch(userProfile(token));
    } else {
      console.log("No token found, resetting profile.");
      dispatch(resetProfile()); // Réinitialisez le profil si le token est absent
    }
  }, [token, dispatch]);

  // // Mettre à jour le nom d'utilisateur local si les infos du profil changent
  // useEffect(() => {
  //   if (userInfo) {
  //     setUserProfiles(userInfo.userName);
  //   }
  // }, [userInfo]);

  // Mettre à jour le nom d'utilisateur local si les infos du profil changent
  useEffect(() => {
    if (userInfo) {
      console.log("User Info retrieved:", userInfo);
      const userName = userInfo.userName;
      setUserProfiles(userName);
    } else {
      setUserProfiles("");
    }
  }, [userInfo]);

  // Mettre à jour le nom d'utilisateur si une modification du nom est réussie
  useEffect(() => {
    if (isSuccess && data) {
      setUserProfiles(data.userName);
    }
  }, [isSuccess, data]);

  // useEffect(() => {
  //   // met à jour l'état local userProfiles avec le userName contenu dans l'état userInfo de Redux, lorsque ces informations sont disponibles.
  //   if (userInfo) {
  //     console.log("User Info:", userInfo);
  //     const userName = userInfo.userName;
  //     setUserProfiles(userName);
  //   }
  // }, [userInfo]);

  // useEffect(() => {
  //   // Si le slice newUserName indique un succès (isSuccess), l'état local userProfiles est mis à jour avec le nouveau nom d'utilisateur
  //   if (isSuccess && data) {
  //     const newUserName = data.userName;
  //     setUserProfiles(newUserName);
  //   }
  // }, [isSuccess, data]);

  // La fonction onLogout gère la déconnexion de l'utilisateur. Elle envoie l'action logout() pour supprimer les données de l'utilisateur, ainsi que les actions reset() pour réinitialiser les états Redux du profil et du nom d'utilisateur. Elle redirige également l'utilisateur vers la page d'accueil via navigate("/").
  const onLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token du localStorage lors de la déconnexion
    setToken(null);
    setUserProfiles(""); // Réinitialiser les informations utilisateur
    dispatch(logout());
    dispatch(reset());
    dispatch(resetProfile());
    dispatch(resetUserName());
    navigate("/");
  };
  const isLoggedIn = !!token && !!userProfiles;
  console.log("Is Logged In:", isLoggedIn);

  return (
    <header className="App-header">
      <nav className="main-nav">
        <Link to="./" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>
        <div>
          {/* Si un utilisateur est connecté (user existe), le composant affiche le nom d'utilisateur et un bouton logout / Sinon on affiche le lien vers la page de connexion */}
          {isLoggedIn ? (
            <>
              <Link className="userName-link" to="/signin">
                <span className="user-name">{userProfiles}</span>
              </Link>
              <i className="fa fa-user-circle"></i>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <i className="fa fa-user-circle"></i>
              <Link to="/signin" className="main-nav-item">
                Sign In
                {/* lien vers la page de connexion */}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
