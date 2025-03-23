import React, { useState } from 'react';
import gymImage from '../asset/gym.webp';
import restaurationImage from '../asset/restauration.webp';
import spaImage from '../asset/spa.webp';
import emergencyImage from '../asset/emergency.webp';
import roomServiceImage from '../asset/room-service.webp';

import './LearnMore.css';

const LearnMore = () => {
  const [isClicked, setIsClicked] = useState(null);
  const [showDetails, setShowDetails] = useState(Array(5).fill(false)); // Pour gérer l'affichage des détails
  const [ratings, setRatings] = useState(Array(5).fill(0)); // Pour gérer les notes

  const handleCardClick = (index) => {
    setIsClicked(index);
    setTimeout(() => setIsClicked(null), 300);
  };

  const toggleDetails = (index) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  const handleRating = (index, rating) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  return (
    <div className="container">
      {/* Section 1 : Gym et Restauration */}
      <div className="grid-container">
        {[
          {
            image: gymImage,
            icon: 'fas fa-dumbbell',
            title: 'Gym',
            description: 'Notre salle de sport est équipée d\'appareils modernes et d\'un espace dédié aux exercices libres.',
            details: [
              'Équipements : Tapis de course, haltères, machines de musculation.',
              'Heures d\'ouverture : 24/7.',
              'Services inclus : Cours collectifs, vestiaires avec douches.',
            ],
          },
          {
            image: restaurationImage,
            icon: 'fas fa-utensils',
            title: 'Restauration',
            description: 'Découvrez notre restaurant étoilé, où chaque plat est préparé avec des ingrédients frais et locaux.',
            details: [
              'Spécialités : Cuisine française, italienne et asiatique.',
              'Menu : Petit-déjeuner, déjeuner, dîner, brunch dominical.',
              'Options : Plats végétariens, sans gluten et vegan disponibles.',
            ],
          },
          {
            image: spaImage,
            icon: 'fas fa-spa',
            title: 'Spa',
            description: 'Offrez-vous un moment de détente dans notre spa haut de gamme.',
            details: [
              'Soins disponibles : Massages, enveloppements corporels, soins du visage.',
              'Produits utilisés : Marques biologiques et naturelles.',
              'Réservation : Sur place ou en ligne.',
            ],
          },
          {
            image: emergencyImage,
            icon: 'fas fa-medkit',
            title: 'Service d\'urgence',
            description: 'Votre sécurité est notre priorité. Notre équipe médicale est disponible 24/7.',
            details: [
              'Disponibilité : 24 heures sur 24, 7 jours sur 7.',
              'Équipe médicale : Médecins et infirmiers qualifiés.',
              'Contact : Appuyez simplement sur le bouton d\'urgence dans votre chambre.',
            ],
          },
          {
            image: roomServiceImage,
            icon: 'fas fa-concierge-bell',
            title: 'Service d\'étage',
            description: 'Commandez directement depuis votre chambre et profitez d\'un service rapide et efficace.',
            details: [
              'Disponibilité : 24/7.',
              'Options : Boissons, snacks, plats complets.',
              'Délai moyen : 20-30 minutes.',
            ],
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`card ${isClicked === index ? 'clicked' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="image-icon-container">
              <img src={item.image} alt={item.title} className="circle-image" />
              <div className="icon-circle">
                <i className={item.icon}></i>
              </div>
            </div>
            <div className="card-content">
              <h2 className="card-title">{item.title}</h2>
              <p className="card-description">{item.description}</p>
              <button
                className="toggle-details-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(index);
                }}
              >
                {showDetails[index] ? 'Masquer les détails' : 'Afficher les détails'}
              </button>
              <div className={`card-details ${showDetails[index] ? 'show' : ''}`}>
                <ul>
                  {item.details.map((detail, i) => (
                    <li key={i} className="list-item">{detail}</li>
                  ))}
                </ul>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star ${star <= ratings[index] ? 'active' : ''}`}
                      onClick={() => handleRating(index, star)}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnMore;