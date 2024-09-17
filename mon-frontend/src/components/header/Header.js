import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/auth/authSlice";
import { selectUser } from "../../redux/slices/profile/profileSlice"; // Assurez-vous que ce sélecteur est correctement défini
import "./Header.css";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.profile.userInfo); // Utilisez le sélecteur approprié pour obtenir les informations de l'utilisateur
  const dispatch = useDispatch();

  return (
    <div className="header">
      {isAuthenticated ? (
        <>
          <h1>
            Welcome back
            <br />
            {user?.username || "User"}!
          </h1>
          <button className="edit-button">Edit Name</button>
          <button
            className="logout-button"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </button>
        </>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Header;
