import React from 'react';

// import { FaDumbbell, FaUtensils, FaClock } from 'react-icons/fa'; // Removed icons
import './FeatureCards.css'; // Import the custom CSS file
// import FoodTracker from './FoodTracker'; // Removed FoodTracker import
// import SnapToTrack from './SnapToTrack'; // Removed SnapToTrack import

const FeatureCard = ({ title, description, image }) => {
  return (
    <>
      {image && (
        <img src={image} alt={title} className="feature-card-image" />
      )}
      {/* Removed icon rendering */}
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </>

  );
};

const FeatureCards = () => {
  const features = [
    {
      title: 'Prevent Injury',
      description: 'Learn techniques and analyze posture to avoid injuries.',
      image: 'https://www.orthobethesda.com/wp-content/uploads/2020/12/How-to-Prevent-Sports-Injuries.jpg' // Image for Prevent Injury
    },
    {
      title: 'Efficient Services',
      description: 'Streamlined tools for tracking and analysis.',
      image: 'https://miro.medium.com/v2/resize:fit:1400/0*J98SBpCmVnr5rxlg' // Image for Efficient Services
    },
    {
      title: 'Better Posture',
      description: 'Improve your posture through analysis and guidance.',
      image: 'https://www.shutterstock.com/image-photo/young-attractive-woman-practicing-yoga-600nw-1518950483.jpg' // Image for Better Posture
    },
  ];

  return (
    <div className="feature-cards-container">
      <h2 className="feature-cards-heading">WORKOUT with better form</h2>
      <div className="feature-cards-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            image={feature.image} // Pass the image prop
          />
        ))}
      </div>
      <p className="feature-cards-footer-text">
        All this is possible with pose estimation and form correction.
      </p>
      {/* Removed FoodTracker component */}
      {/* Removed SnapToTrack component */}
    </div>
  );
};

export default FeatureCards;