// Le composant SignInForm est responsable de l'interface utilisateur pour la connexion. Il gère l'état local pour les champs de saisie, envoie des actions Redux pour le suivi du processus de connexion, et utilise axios pour communiquer avec l'API de connexion. En cas de succès, il redirige l'utilisateur vers la page de profil, et en cas d'échec, il affiche le message d'erreur correspondant.

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../feature/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Signinform.css";
import axios from "axios";

const SignInForm = () => {
  const [username, setUsername] = useState(""); // état local
  const [password, setPassword] = useState(""); // état local
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart()); // Appel pour indiquer que la connexion est en cours
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          username,
          password,
        }
      );
      dispatch(loginSuccess(response.data.token)); // Si la requête réussit, le token est stocké dans Redux avec dispatch.........
      navigate("/user"); // Redirige vers la page User après connexion réussie
    } catch (error) {
      dispatch(loginFailure(error.response.data.message)); // Si la requête échoue, l'erreur est stockée dans Redux avec dispatch ...........
    }
  };

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignInForm;
