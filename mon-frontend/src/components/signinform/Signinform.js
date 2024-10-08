import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../feature/auth/authSlice"; // importation des actions

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // État des erreurs pour l'e-mail et le mot de passe
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extraction des états nécessaires du slice auth depuis le store Redux
  const { token, error, isSuccess, isLoading } = useSelector(
    (state) => state.auth
  );

  // Gestion des changements dans le formulaire
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      // Met à jour formData en conservant les valeurs précédentes (...prevState) et en modifiant uniquement la valeur du champ modifié.
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fonctionnalité "Remember Me"
  useEffect(() => {
    const rememberEmail = localStorage.getItem("email");
    const rememberPassword = localStorage.getItem("password");
    if (rememberEmail && rememberPassword) {
      // Si les données sont trouvées > maj
      setFormData((prevState) => ({
        ...prevState,
        email: JSON.parse(rememberEmail),
        password: JSON.parse(rememberPassword),
        rememberMe: true,
      }));
    }
  }, []); // s'execute une seule fois lors du montage du composant

  // Gestion de la soumission du formulaire
  const { email, password, rememberMe } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    // Réinitialiser l'état des erreurs
    setErrors({
      emailError: "",
      passwordError: "",
    });

    // Validation côté client
    let valid = true;

    // Validation de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, emailError: "Adresse e-mail invalide" }));
      valid = false;
    }

    // Validation du mot de passe
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        passwordError: "Le mot de passe doit contenir au moins 6 caractères",
      }));
      valid = false;
    }

    if (!valid) return;

    // Dispatch l'action de login
    dispatch(login({ email, password }));
  };

  // Gestion des messages d'erreur et de la navigation après succès
  useEffect(() => {
    if (error) {
      let hasSpecificError = false;
      // Vérifier si l'erreur concerne l'e-mail
      if (/user not found/i.test(error) || /email/i.test(error)) {
        setErrors((prev) => ({
          ...prev,
          emailError: "Email non valide!",
        }));
        hasSpecificError = true;
      }
      // Vérifier si l'erreur concerne le mot de passe
      if (/password/i.test(error)) {
        setErrors((prev) => ({
          ...prev,
          passwordError: "Mot de passe incorrect",
        }));
        hasSpecificError = true;
      }
      // Afficher un message d'erreur générique uniquement si aucune erreur spécifique n'est détectée
      if (!hasSpecificError) {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
      dispatch(reset());
    }
    if (isSuccess || token) {
      navigate("/user");
      dispatch(reset());
    }
  }, [error, isSuccess, token, navigate, dispatch]);

  // Gestion du stockage "Remember Me"
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("password", JSON.stringify(password));
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }, [rememberMe, email, password]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            {errors.emailError && (
              <p className="error-message">{errors.emailError}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            {errors.passwordError && (
              <p className="error-message">{errors.passwordError}</p>
            )}
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              name="rememberMe"
              checked={rememberMe}
              onChange={onChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
            {/* Désactive le bouton si une opération de connexion est en cours. Affiche "Signing In..." si isLoading est vrai, sinon "Sign In". */}
          </button>
        </form>
      </section>
    </main>
  );
}
