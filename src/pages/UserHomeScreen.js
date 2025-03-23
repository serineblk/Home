import React, { useEffect, useState } from "react"; // Import de React et des hooks useEffect et useState
import axios from "axios"; // Import d'axios pour effectuer des requêtes HTTP
import Header from "../components/Header"; // Import du composant Header (non utilisé dans ce code)

function UserHomeScreen() {
  // État pour stocker les données de l'utilisateur
  const [userData, setUserData] = useState("");

  // Effet qui s'exécute au montage du composant
  useEffect(() => {
    fetchUserDetails(); // Appel de la fonction pour récupérer les détails de l'utilisateur
  }, []); // Tableau de dépendances vide pour exécuter l'effet une seule fois

  // Fonction pour récupérer les détails de l'utilisateur
  const fetchUserDetails = async () => {
    try {
      // Récupère le token d'authentification depuis le sessionStorage
      const token = sessionStorage.getItem("authToken"); // Remplacez par la méthode de récupération du token
      console.log(token); // Affiche le token dans la console (pour le débogage)

      // Vérifie si le token existe
      if (!token) {
        // Si le token n'existe pas, l'utilisateur n'est pas connecté
        // setError('User is not logged in'); // Vous pouvez gérer cette erreur si nécessaire
        return;
      }

      // Effectue une requête GET pour récupérer les détails de l'utilisateur
      const response = await axios.get(
        "http://localhost:3000/api/auth/get-userDetails", // Endpoint de l'API
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
          },
        }
      );

      console.log(response); // Affiche la réponse dans la console (pour le débogage)

      // Vérifie si la requête a réussi
      if (response.data.success) {
        console.log(response.data.user); // Affiche les données de l'utilisateur dans la console
        setUserData(response.data.user); // Met à jour l'état avec les données de l'utilisateur

        // Stocke les informations de l'utilisateur dans le sessionStorage
        let userInfo = {
          isLoggedIn: true, // Indique que l'utilisateur est connecté
          userData: response.data.user, // Stocke les données de l'utilisateur
        };
        sessionStorage.setItem("userData", JSON.stringify(userInfo)); // Convertit en JSON et stocke
      } else {
        // Si la requête échoue, affiche un message d'erreur
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      // Gestion des erreurs
      console.error("Error fetching user details:", err); // Affiche l'erreur dans la console
      console.log(err.response?.data?.message || "An error occurred"); // Affiche un message d'erreur générique
    }
  };

  // Rendu du composant
  return (
    <div>
      {/* Titre de la page */}
      <h2 style={{ textAlign: "center" }}>Welcome to User Home Screen</h2>

      {/* Affichage des données de l'utilisateur */}
      <div style={{ textAlign: "center" }}>
        <h2>
          Name: {userData.name} <br /> Email: {userData.email}
        </h2>
      </div>
    </div>
  );
}

export default UserHomeScreen; // Export du composant UserHomeScreen