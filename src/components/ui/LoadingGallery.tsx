import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import images from '../../data/LoaderData';


interface LoadingGalleryProps {
  imgs?: string[];
  duration?: number; // Duration for each image cycle in seconds
}

const LoadingGallery: React.FC<LoadingGalleryProps> = ({
  imgs = images,
  duration = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const cycleImages = async () => {
      while (true) {
        // Slide in animation with parabolic path
        await controls.start({
          x: [-100, 0],
          y: [50, 0, -10, 0],
          scale: [0, 1],
          opacity: [0, 1],
          transition: {
            duration: duration * 0.35,
            ease: "easeOut",
            y: {
              times: [0, 0.5, 0.8, 1],
              type: "tween"
            }
          }
        });

        // Brief pause
        await new Promise(resolve => setTimeout(resolve, duration * 0.3 * 1000));

        // Slide out animation with parabolic path
        await controls.start({
          x: [0, 100],
          y: [0, 0, -10, 50],
          scale: [1, 0],
          opacity: [1, 0],
          transition: {
            duration: duration * 0.35,
            ease: "easeIn",
            y: {
              times: [0, 0.2, 0.5, 1],
              type: "tween"
            }
          }
        });

        // Update to next image
        setCurrentIndex((prev) => (prev + 1) % imgs.length);
      }
    };

    cycleImages();
  }, [controls, duration, imgs.length]);

  return (
    <div className="flex items-center justify-center h-24 w-24">
      <motion.div
        animate={controls}
        style={{ perspective: "1000px" }}
        className="relative"
      >
        <motion.img
          key={currentIndex}
          src={imgs[currentIndex]}
          alt="Loading"
          className="h-16 w-16 rounded-full object-cover"
          style={{ 
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingGallery;