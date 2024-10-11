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
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const { userInfo } = useSelector((state) => state.profile);
  const { data, isSuccess } = useSelector((state) => state.newUserName);

  const [userProfiles, setUserProfiles] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("token")); // Récupérer le token depuis localStorage

  // Utilisez useEffect pour récupérer le profil utilisateur si le token est présent
  useEffect(() => {
    if (token) {
      dispatch(userProfile());
    } else {
      dispatch(resetProfile()); // Réinitialisez le profil si le token est absent
    }
  }, [token, dispatch]);

  // useEffect(() => {
  //   // Vérifier la présence du token lors du chargement du composant
  //   const savedToken = localStorage.getItem("token");
  //   console.log("Saved Token:", savedToken);
  //   setToken(savedToken);

  //   // Si un token est trouvé dans localStorage, il envoie l'action userProfile() pour récupérer les données du profil utilisateur.
  //   if (savedToken) {
  //     dispatch(userProfile());
  //   } else {
  //     dispatch(resetProfile());
  //   }
  // }, [dispatch]);

  useEffect(() => {
    // met à jour l'état local userProfiles avec le userName contenu dans l'état userInfo de Redux, lorsque ces informations sont disponibles.
    if (userInfo) {
      console.log("User Info:", userInfo);
      const userName = userInfo.userName;
      setUserProfiles(userName);
    }
  }, [userInfo]);

  useEffect(() => {
    // Si le slice newUserName indique un succès (isSuccess), l'état local userProfiles est mis à jour avec le nouveau nom d'utilisateur
    if (isSuccess && data) {
      const newUserName = data.userName;
      setUserProfiles(newUserName);
    }
  }, [isSuccess, data]);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const savedToken = localStorage.getItem("token");
  //     setToken(savedToken);

  //     if (savedToken) {
  //       dispatch(userProfile());
  //     } else {
  //       // Si le token n'existe pas, tu peux aussi réinitialiser le profil ou d'autres états
  //       dispatch(resetProfile());
  //     }
  //   };

  //   // Écouteur pour les changements de stockage
  //   window.addEventListener("storage", handleStorageChange);

  //   // Nettoyage de l'écouteur d'événements
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, [dispatch]);

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
  const isLoggedIn = token !== null && userProfiles !== "";
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
