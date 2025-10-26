import { useState } from "react";
import { motion } from "framer-motion";

function Carousel({ activeIndex }) {
  const images = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/help.jpg",
  ];

  return (
    <div className="mt-6 flex flex-col items-center">
      {/* Image Wrapper with Motion */}
      <div className="relative w-1/4 h-40 overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            initial={{ opacity: 0, x: 50 }} // Start off-screen
            animate={
              activeIndex === index
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute w-full h-full object-cover rounded-lg`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
