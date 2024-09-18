import React, { useState } from "react";
import Header from "../components/header/Header";
import Account from "../components/account/Account";
import Profile from "../components/profile/Profile";
import Footer from "../components/footer/Footer";
import "../styles/main.css";

const User = () => {
  const [isEditing, setIsEditing] = useState(false); // Gérer l'état d'édition

  const handleEditClick = () => {
    setIsEditing(true); // Passe en mode édition quand on clique sur "Edit name"
  };

  return (
    <div>
      <Header onEdit={handleEditClick} />
      {/* Passe la fonction à Header */}
      <main className="main bg-dark">
        {isEditing ? (
          <Profile />
        ) : (
          // Affiche le composant Profile si on est en mode édition
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default User;

// L'état isEditing détermine si le composant Profile doit être affiché. Lorsque l'utilisateur clique sur "Edit Name" dans le Header, la fonction handleEditClick est appelée, ce qui change l'état isEditing à true, et ainsi le formulaire de modification du nom d'utilisateur dans Profile s'affiche. La page User contient le Header et le Profile. Ce composant doit gérer l'état de savoir si l'utilisateur est en mode édition ou non. L'état isEditing serait défini dans la page User.
