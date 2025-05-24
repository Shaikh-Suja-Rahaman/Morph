import React from 'react';
import './TrainerCarousel.css';
import cleoImage from '../assets/cleo-abram.jpg';
import trainerImage from '../assets/trainer.jpg';
import imagePng from '../assets/image.png';

const trainers = [
  {
    id: 1,
    name: "Cleo Abram",
    specialty: "Strength Training",
    experience: "8 years",
    image: cleoImage,
    description: "Certified strength and conditioning specialist with a passion for helping clients achieve their fitness goals."
  },
  {
    id: 2,
    name: "Mike Chen",
    specialty: "HIIT & Cardio",
    experience: "5 years",
    image: trainerImage,
    description: "HIIT expert specializing in high-intensity interval training and cardiovascular fitness."
  },
  {
    id: 3,
    name: "David Martinez",
    specialty: "CrossFit & Functional Training",
    experience: "6 years",
    image: imagePng,
    description: "CrossFit Level 3 trainer with expertise in functional movement and Olympic lifting."
  }
];

const TrainerCarousel = () => {
  return (
    <div className="trainers-grid">
      {trainers.map((trainer) => (
        <div key={trainer.id} className="trainer-card">
          <img 
            src={trainer.image} 
            alt={trainer.name}
            className="trainer-image"
          />
          <div className="trainer-info">
            <h2>{trainer.name}</h2>
            <h3>{trainer.specialty}</h3>
            <p className="experience">Experience: {trainer.experience}</p>
            <p className="description">{trainer.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainerCarousel; 