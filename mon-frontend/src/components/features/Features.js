import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <div className="feature-item">
          <img
            src="./img/icon-chat.png"
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="feature-item">
          <img
            src="./img/icon-money.png"
            alt="Money Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">
            More savings means higher rates
          </h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className="feature-item">
          <img
            src="./img/icon-security.png"
            alt="Security Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Features;

// Le composant Features présente les principales caractéristiques et avantages de l'Argent Bank. Il est conçu pour mettre en avant les points forts de l’offre de la banque avec des images et des descriptions.

// Pertinence :

// Page d'Accueil ou Page de Présentation : Comme le composant Banner, le composant Features est pertinent pour la page d'accueil ou toute autre page où vous souhaitez présenter les avantages et caractéristiques de la banque aux utilisateurs potentiels.
// Non Pertinent pour les Données d'Utilisateur : Il n’est pas pertinent pour les composants qui gèrent les données des utilisateurs ou les fonctionnalités spécifiques liées à l'authentification et à la gestion des comptes. Il n'affiche pas les informations personnelles des utilisateurs ou les actions liées à leur compte.
// En résumé, le composant Features est bien adapté pour les sections de présentation ou de promotion sur la page d'accueil, mais il n'a pas besoin d'intégrer la logique d'authentification ou de gestion des comptes.
