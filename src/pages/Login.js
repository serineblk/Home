import axios from "axios"; // Import d'axios pour effectuer des requêtes HTTP
import React, { useState } from "react"; // Import de React et du hook useState
import { Link, useNavigate } from "react-router-dom"; // Import des composants de routage
import { toast } from "react-toastify"; // Import de toast pour afficher des notifications
import coverPhoto from "../asset/image-hotel.webp"; // Import de l'image de fond

const Login = () => {
  // États pour gérer les champs du formulaire et les erreurs
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [role, setRole] = useState("employer"); // État pour le rôle (par défaut "employer")
  const [errors, setErrors] = useState({}); // État pour stocker les erreurs de validation
  const [isHovered, setIsHovered] = useState(false); // État pour gérer le survol des champs
  const navigate = useNavigate(); // Hook pour naviguer programmatiquement

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const errors = {}; // Objet pour stocker les erreurs
    if (!email) {
      errors.email = "Email is required"; // Erreur si l'email est vide
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"; // Erreur si l'email est invalide
    }
    if (!password) {
      errors.password = "Password is required"; // Erreur si le mot de passe est vide
    }
    return errors; // Retourne les erreurs
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const validationErrors = validateForm(); // Valide le formulaire
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Affiche les erreurs de validation
      return;
    }
    try {
      // Envoie une requête POST pour se connecter
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
        role, // Ajoutez le rôle dans la requête
      });
      if (response.data.success) {
        toast.success("Login successful!"); // Affiche un message de succès
        sessionStorage.setItem("authToken", response.data.token); // Stocke le token dans le sessionStorage
        sessionStorage.setItem("userRole", role); // Stocke le rôle dans le sessionStorage
        navigate("/homeScreen"); // Redirige vers la page d'accueil
      } else {
        toast.error(response.data.message || "Login failed"); // Affiche un message d'erreur
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later." // Affiche un message d'erreur générique
      );
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Overlay pour assombrir l'image de fond */}
      <div style={styles.overlay}>
        {/* Conteneur du formulaire de connexion */}
        <div style={styles.loginContainer}>
          <h2 style={styles.title}>Bienvenue de retour !</h2> {/* Titre plus accueillant */}
          <form onSubmit={handleSubmit}>
            {/* Champ pour l'email */}
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email
                style={{
                  ...styles.inputField,
                  ...(isHovered && styles.inputFieldHover), // Appliquer le style de survol
                }}
                onMouseEnter={() => setIsHovered(true)} // Activer le survol
                onMouseLeave={() => setIsHovered(false)} // Désactiver le survol
                onFocus={(e) => {
                  e.target.style.border = styles.inputFieldFocus.border;
                  e.target.style.boxShadow = styles.inputFieldFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.target.style.border = "2px solid #ccc";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
            </div>
            {/* Champ pour le mot de passe */}
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
                style={{
                  ...styles.inputField,
                  ...(isHovered && styles.inputFieldHover), // Appliquer le style de survol
                }}
                onMouseEnter={() => setIsHovered(true)} // Activer le survol
                onMouseLeave={() => setIsHovered(false)} // Désactiver le survol
                onFocus={(e) => {
                  e.target.style.border = styles.inputFieldFocus.border;
                  e.target.style.boxShadow = styles.inputFieldFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.target.style.border = "2px solid #ccc";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
            </div>
            {/* Champ pour le rôle */}
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Rôle</label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)} // Met à jour l'état du rôle
                style={{
                  ...styles.inputField,
                  ...(isHovered && styles.inputFieldHover), // Appliquer le style de survol
                }}
                onMouseEnter={() => setIsHovered(true)} // Activer le survol
                onMouseLeave={() => setIsHovered(false)} // Désactiver le survol
                onFocus={(e) => {
                  e.target.style.border = styles.inputFieldFocus.border;
                  e.target.style.boxShadow = styles.inputFieldFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.target.style.border = "2px solid #ccc";
                  e.target.style.boxShadow = "none";
                }}
              >
                
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            {/* Bouton de soumission */}
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(isHovered && styles.submitButtonHover), // Appliquer le style de survol
              }}
              onMouseEnter={() => setIsHovered(true)} // Activer le survol
              onMouseLeave={() => setIsHovered(false)} // Désactiver le survol
            >
               Se connecter
            </button>
          </form>
          {/* Lien vers la page d'inscription */}
          <p style={styles.linkContainer}>
          Vous n'avez pas de compte ? {" "}
            <Link to="/signUp" style={styles.link}>S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles pour le composant
const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${coverPhoto})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)", // Fond semi-transparent
  },
  loginContainer: {
    width: "360px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.37), rgba(255, 255, 255, 0.22))", // Dégradé transparent
    backdropFilter: "blur(10px)", // Effet de flou pour un look moderne
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgb(0, 0, 0)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff", // Texte en blanc
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
    color: "rgb(0, 0, 0)", // Noir pour le titre
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  formGroup: {
    width: "100%",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "rgb(8, 8, 8)", // Noir pour les labels
  },
  inputField: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.3s ease-in-out",
    background: "#ffffff", // Fond blanc pour les champs de saisie
    color: "#000", // Texte en noir pour contraste
  },
  inputFieldHover: {
   
    boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)", // Ombre dorée au survol
  },
  inputFieldFocus: {
  
    boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)", // Ombre dorée au focus
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "rgb(128, 128, 128)", // Gris pour le bouton
    color: "rgba(8, 8, 8, 0.99)", // Texte en noir
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    marginTop: "15px",
  },
  linkContainer: {
    marginTop: "15px",
    textAlign: "center",
    color: "#000", // Noir pour le texte
  },
  link: {
    color: "rgb(8, 8, 8)", // Noir pour le lien
    textDecoration: "underline",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
};

export default Login; // Export du composant Login