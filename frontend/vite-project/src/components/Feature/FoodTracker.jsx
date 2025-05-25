import React from 'react';
import { motion } from 'framer-motion';
import './FoodTracker.css';

const FoodTracker = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const nutritionVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const nutritionItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="food-tracker-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 variants={itemVariants}>Today's Meal</motion.h3>
      <div className="food-content">
        <motion.img
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop"
          alt="Chicken Curry"
          className="food-item-image"
          variants={imageVariants}
          whileHover="hover"
        />
        <motion.p
          className="food-item-name"
          variants={itemVariants}
        >
          Chicken Curry
        </motion.p>
        <motion.div
          className="food-item-info"
          variants={itemVariants}
        >
          <motion.p
            className="confidence"
            variants={itemVariants}
          >
            AI Confidence: 73.3%
          </motion.p>
          <motion.div
            className="nutrition-grid"
            variants={nutritionVariants}
          >
            <motion.div
              className="nutrition-item"
              variants={nutritionItemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              animate={["visible", "pulse"]}
            >
              <span className="nutrition-label">Calories</span>
              <span className="nutrition-value">180 kcal</span>
            </motion.div>
            <motion.div
              className="nutrition-item"
              variants={nutritionItemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              animate={["visible", "pulse"]}
            >
              <span className="nutrition-label">Protein</span>
              <span className="nutrition-value">12g</span>
            </motion.div>
            <motion.div
              className="nutrition-item"
              variants={nutritionItemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              animate={["visible", "pulse"]}
            >
              <span className="nutrition-label">Carbs</span>
              <span className="nutrition-value">10g</span>
            </motion.div>
            <motion.div
              className="nutrition-item"
              variants={nutritionItemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              animate={["visible", "pulse"]}
            >
              <span className="nutrition-label">Fat</span>
              <span className="nutrition-value">10g</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FoodTracker;