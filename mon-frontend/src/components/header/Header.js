// Le header affiche le nom d'utilisateur s'il est connecté, sinon un lien vers la page de connexion.

// import React from "react";
// import "./Header.css";

// const Header = () => {
//   return (
//     <div className="header">
//       <h1>
//         Welcome back
//         <br />
//         Tony Jarvis!
//       </h1>
//       <button className="edit-button">Edit Name</button>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/authSlice";
import "./Header.css";

const Header = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="header">
      {isAuthenticated ? (
        <>
          <h1>
            Welcome back
            <br />
            {user.username || "User"}!
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
