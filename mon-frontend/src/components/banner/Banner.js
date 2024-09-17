import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
};

export default Banner;

// Le composant Banner est un élément de présentation qui met en avant les caractéristiques de l'offre de banque d'Argent Bank. Il n'est pas directement lié à la gestion des comptes bancaires ou à l'authentification des utilisateurs, mais il joue un rôle important dans l'interface utilisateur en attirant l'attention sur les avantages de l'offre.

// Pertinence :

// Page d'Accueil : Le composant Banner est particulièrement pertinent pour la page d'accueil ou toute autre page où vous souhaitez promouvoir les avantages de l'Argent Bank de manière visuelle. Il aide à capturer l'intérêt des utilisateurs potentiels et à les inciter à ouvrir un compte.
// Non Pertinent pour les Données d'Utilisateur : Il n’est pas pertinent pour la gestion des données utilisateur ou des informations de compte, donc il n'est pas utilisé pour afficher des informations spécifiques aux utilisateurs connectés ou pour gérer les actions liées aux comptes.
// En résumé, le composant Banner est pertinent pour la page d'accueil ou toute section de promotion, mais il n'a pas besoin d'être intégré dans les composants liés à la gestion des comptes ou à l'authentification.
