import { motion } from 'framer-motion';
import { useState } from 'react';

const ImageCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const images = [
    { src: '/images/eda.webp', name: 'Exploratory Data Analysis' },
    { src: '/images/xgboost.webp', name: 'XGBoost' },
    { src: '/images/lightgbm.webp', name: 'LightGBM' },
    { src: '/images/decision-tree.webp', name: 'Decision Tree' },
    { src: '/images/random-forest.webp', name: 'Random Forest' },
    { src: '/images/clustering.webp', name: 'Clustering' },
    { src: '/images/bayesian.webp', name: 'Bayesian Models' },
    { src: '/images/nearest-neighbours.webp', name: 'K-Nearest Neighbors' },
    { src: '/images/classification.webp', name: 'Classification' },
    { src: '/images/regression.webp', name: 'Regression' }
  ];

  const getScaleValue = (index: number) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.25; // Main hovered image
    if (distance === 1) return 1.15; // Adjacent images
    return 1; // Other images
  };

  const getZIndex = (index: number) => {
    if (hoveredIndex === null) return 1;
    
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 30; // Main hovered image
    if (distance === 1) return 20; // Adjacent images
    return 10; // Other images
  };

  return (
    <div className="w-full bg-persian-indigo" style={{ overflow: 'visible' }}>
      <motion.div
        className="flex min-w-fit"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            duration: 20,
            ease: 'linear',
            repeat: Infinity
          }
        }}
      >
        {[...images, ...images].map((item, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-80 md:w-[32rem] aspect-[16/10] relative cursor-pointer"
            style={{ zIndex: getZIndex(index) }}
            animate={{ 
              scale: getScaleValue(index),
              y: hoveredIndex === index ? -20 : 0
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut" 
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => setHoveredIndex(index)}
            onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 2000)}
          >
            <img
              src={item.src}
              alt={`${item.name} - ML Model`}
              className="w-full h-full object-cover"
            />
            
            {/* Service/Model Name Popup */}
            <motion.div
              className="absolute -bottom-12 left-0 right-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: hoveredIndex === index ? 1 : 0,
                y: hoveredIndex === index ? 0 : -10
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h3 className="text-white font-semibold text-lg md:text-xl text-center py-2">
                {item.name}
              </h3>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel;