import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import coverImage from "../asset/image-hotel.webp";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    role: "user"
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validateUsername = (username) => {
    if (!username) return "Le nom d'utilisateur est requis.";
    if (!/^[A-Za-z0-9_]{3,15}$/.test(username)) 
      return "3-15 caractères alphanumériques seulement";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "L'email est requis.";
    if (!/\S+@\S+\.\S+/.test(email)) 
      return "Email invalide";
    return "";
  };

  const validateMobile = (mobile) => {
    if (!mobile) return "Le téléphone est requis.";
    if (!/^\d{10}$/.test(mobile)) 
      return "10 chiffres exactement";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Le mot de passe est requis.";
    if (password.length < 6) 
      return "6 caractères minimum";
    return "";
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    errors.username = validateUsername(formValues.username);
    errors.email = validateEmail(formValues.email);
    errors.mobile = validateMobile(formValues.mobile);
    errors.password = validatePassword(formValues.password);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register", 
        {
          username: formValues.username,
          email: formValues.email,
          mobile: formValues.mobile,
          password: formValues.password,
          role: formValues.role // Envoyez directement 'role'
        }
      );

      if (response.data.success) {
        toast.success("Inscription réussie !");
        setFormValues({
          username: "",
          email: "",
          mobile: "",
          password: "",
          role: "user"
        });
      } else {
        toast.error(response.data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error(
        error.response?.data?.message || 
        "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
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
        style={focusedField === name ? { 
          ...styles.inputField, 
          ...styles.inputFieldFocus 
        } : styles.inputField}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
        disabled={isSubmitting}
      />
      {error && (
        <span id={`${name}-error`} style={styles.errorMessage}>
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
            <InputField
              label={<strong>Nom d'utilisateur</strong>}
              type="text"
              name="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={formValues.username}
              error={formErrors.username}
            />

            <InputField
              label={<strong>Email</strong>}
              type="email"
              name="email"
              placeholder="Entrez votre email"
              value={formValues.email}
              error={formErrors.email}
            />

            <InputField
              label={<strong>Téléphone</strong>}
              type="text"
              name="mobile"
              placeholder="Entrez votre numéro"
              value={formValues.mobile}
              error={formErrors.mobile}
            />

            <InputField
              label={<strong>Mot de passe</strong>}
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formValues.password}
              error={formErrors.password}
            />

            <div className="form-group">
              <label style={styles.label}><strong>Rôle</strong></label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("role")}
                onBlur={() => setFocusedField(null)}
                style={focusedField === "role" ? { 
                  ...styles.inputField, 
                  ...styles.inputFieldFocus 
                } : styles.inputField}
                disabled={isSubmitting}
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
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

// Styles - identiques à votre version originale
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
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  signUpContainer: {
    width: "360px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.37), rgba(255, 255, 255, 0.22))",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
    color: "rgb(0, 0, 0)",
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
    color: "rgb(8, 8, 8)",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.3s ease-in-out",
    background: "#ffffff",
    color: "#000",
    marginBottom: "15px",
  },
  inputFieldFocus: {
    boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)",
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
    backgroundColor: "rgb(128, 128, 128)",
    color: "rgba(8, 8, 8, 0.99)",
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
    color: "rgb(8, 8, 8)",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

export default SignUp;