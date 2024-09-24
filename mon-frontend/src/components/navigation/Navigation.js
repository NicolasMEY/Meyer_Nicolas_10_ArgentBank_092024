// Le composant Navigation est principalement responsable de l'affichage du logo de l'application et des liens de navigation, comme le lien vers la page de connexion. Il ajuste les liens disponibles en fonction de l'état d'authentification de l'utilisateur.

// import React from "react";
// import { useSelector } from "react-redux"; // hook de redux pour accéder à l'état global de l'application
// import { Link } from "react-router-dom"; // Utilisez Link de react-router pour la navigation interne sans rechargement de la page
// import argentBankLogo from "../../assets-images/img/argentBankLogo.png";

// const Navigation = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Utilisé pour obtenir l'état d'authentification de l'utilisateur à partir du store Redux

//   return (
//     <div>
//       <nav className="main-nav">
//         <a className="main-nav-logo" href="/">
//           <img
//             className="main-nav-logo-image"
//             src={argentBankLogo}
//             // src="../assets-images/img/argentBankLogo.png"
//             alt="Argent Bank Logo"
//           />
//           <h1 className="sr-only">Argent Bank</h1>
//         </a>
//         <div>
//           {isAuthenticated ? ( // Si anthentifié (isAuthenticated est vrai)
//             // Affiche un lien vers la page de profil
//             <a className="main-nav-item" href="/">
//               <i className="fa-solid fa-user-circle"></i>
//               Profile
//             </a>
//           ) : (
//             // sinon affiche un lien vers la page de connexion en utilisant link pour éviter le rechargement complet de la page
//             <Link className="main-nav-item" to="/signin">
//               <i className="fa-solid fa-user-circle"></i>
//               Sign In
//             </Link>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navigation;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";
import argentBankLogo from "../../assets-images/img/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../feature/auth/authSlice";
import { resetProfile } from "../../feature/profile/profile/profileSlice";
import { resetUserName } from "../../feature/UpdateUserName/UpdateUserNameSlice";
import { useEffect, useState } from "react";
import { userProfile } from "../../feature/profile/profile/profileSlice";

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //State Redux
  const { user } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.profile);
  const { data, isSuccess } = useSelector((state) => state.newUserName);

  const [userProfiles, setUserProfile] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    // Si un token est trouvé dans localStorage, il envoie l'action userProfile() pour récupérer les données du profil utilisateur.
    if (token) {
      dispatch(userProfile());
    }
  }, [token, dispatch]);

  useEffect(() => {
    // met à jour l'état local userProfiles avec le userName contenu dans l'état userInfo de Redux, lorsque ces informations sont disponibles.
    if (userInfo) {
      const userName = userInfo.body.userName;
      setUserProfile(userName);
    }
  }, [userInfo]);

  useEffect(() => {
    // Si le slice newUserName indique un succès (isSuccess), l'état local userProfiles est mis à jour avec le nouveau nom d'utilisateur
    if (isSuccess && data) {
      const newUserName = data.body.userName;
      setUserProfile(newUserName);
    }
  }, [isSuccess, data]);

  // La fonction onLogout gère la déconnexion de l'utilisateur. Elle envoie l'action logout() pour supprimer les données de l'utilisateur, ainsi que les actions reset() pour réinitialiser les états Redux du profil et du nom d'utilisateur. Elle redirige également l'utilisateur vers la page d'accueil via navigate("/").
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetProfile());
    dispatch(resetUserName());
    navigate("/");
  };

  return (
    <header className="App-header">
      <nav className="main-nav">
        <Link to="./" className='class="main-nav-logo'>
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>
        <div>
          {/* Si un utilisateur est connecté (user existe), le composant affiche le nom d'utilisateur et un bouton logout / Sinon on affiche le lien vers la page de connexion */}
          {user ? (
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
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
