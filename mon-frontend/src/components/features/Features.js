// Le composant Features présente les principales caractéristiques et avantages de l'Argent Bank. Composant principal de la page index.

import React from "react";

const Features = ({ iconUrl, title, text }) => {
  return (
    <div className="feature-item">
      <img src={iconUrl} alt="icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Features;
