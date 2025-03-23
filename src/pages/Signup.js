import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";
import coverImage from "../asset/image-hotel.webp";

const SignUp = () => {
  const [formValues, setFormValues] = useState(new UserModel({}));
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // Validation rules
  const validateUsername = (username) => {
    if (!username) return "Le nom d'utilisateur est requis.";
    if (!/^[A-Za-z0-9_]{3,15}$/.test(username)) return "Le nom d'utilisateur doit contenir entre 3 et 15 caractères, et ne peut inclure que des lettres, des chiffres et des underscores.";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "L'email est requis.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Veuillez entrer une adresse email valide.";
    return "";
  };

  const validateMobile = (mobile) => {
    if (!mobile) return "Le numéro de téléphone est requis.";
    if (!/^\d{10}$/.test(mobile)) return "Le numéro de téléphone doit contenir exactement 10 chiffres.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Le mot de passe est requis.";
    return "";
  };

  const validateRole = (role) => {
    if (!role) return "Le rôle est requis.";
    return "";
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    errors.username = validateUsername(formValues.username);
    errors.email = validateEmail(formValues.email);
    errors.mobile = validateMobile(formValues.mobile);
    errors.password = validatePassword(formValues.password);
    errors.role = validateRole(formValues.role);
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.values(errors).every((error) => !error)) {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/register-user", formValues);
        if (response.data.success) {
          toast.success(response.data.message || "Inscription réussie !");
          setFormValues(new UserModel({})); // Reset form
          setFormErrors({});
        } else {
          toast.error(response.data.message || "Échec de l'inscription.");
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        toast.error(error.response?.data?.message || "Quelque chose s'est mal passé. Veuillez réessayer plus tard.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Input field component
  const InputField = ({ label, type, name, placeholder, value, error }) => (
    <div className="form-group">
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        style={focusedField === name ? { ...styles.inputField, ...styles.inputFieldFocus } : styles.inputField}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      {error && (
        <span id={`${name}-error`} className="error-message" style={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}>
        <div style={styles.signUpContainer}>
          <h2 style={styles.title}>Inscription</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Champ Nom d'utilisateur */}
            <InputField
              label={<strong>Nom d'utilisateur</strong>}
              type="text"
              name="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={formValues.username}
              error={formErrors.username}
            />

            {/* Champ Email */}
            <InputField
              label={<strong>Email</strong>}
              type="email"
              name="email"
              placeholder="Entrez votre email"
              value={formValues.email}
              error={formErrors.email}
            />

            {/* Champ Téléphone */}
            <InputField
              label={<strong>Téléphone</strong>}
              type="text"
              name="mobile"
              placeholder="Entrez votre numéro de téléphone"
              value={formValues.mobile}
              error={formErrors.mobile}
            />

            {/* Champ Mot de passe */}
            <InputField
              label={<strong>Mot de passe</strong>}
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formValues.password}
              error={formErrors.password}
            />

            {/* Champ Rôle */}
            <div className="form-group">
              <label style={styles.label}><strong>Rôle</strong></label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("role")}
                onBlur={() => setFocusedField(null)}
                style={focusedField === "role" ? { ...styles.inputField, ...styles.inputFieldFocus } : styles.inputField}
                aria-invalid={!!formErrors.role}
                aria-describedby="role-error"
              >
                <option value="">Sélectionnez un rôle</option>
                <option value="admin">Administrateur</option>
                <option value="employer">Employé</option>
              </select>
              {formErrors.role && (
                <span id="role-error" className="error-message" style={styles.errorMessage}>
                  {formErrors.role}
                </span>
              )}
            </div>

            {/* Bouton Soumettre */}
            <button type="submit" style={styles.submitButton}>
              S'inscrire
            </button>
          </form>
          <p style={styles.toggleLink}>
            Vous avez déjà un compte ?{" "}
            <Link to="/login" style={styles.link}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${coverImage})`,
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
    backgroundColor: "rgba(0, 0, 0, 0)", // Fond semi-transparent noir
  },

  signUpContainer: {
    width: "360px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.37), rgba(255, 255, 255, 0.22))", // Dégradé transparent
    backdropFilter: "blur(10px)", // Effet de flou
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
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

  form: {
    width: "100%",
  },

  label: {
    fontSize: "14px",
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
    marginBottom: "15px", // Ajout d'un espace entre les champs de saisie
  },

  inputFieldFocus: {
    boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)", // Ombre dorée au focus
  },

  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
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

  toggleLink: {
    marginTop: "15px",
    textAlign: "center",
    color: "#000",
    fontSize: "14px",
  },

  link: {
    color: "rgb(8, 8, 8)", // Noir pour le lien
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

export default SignUp;