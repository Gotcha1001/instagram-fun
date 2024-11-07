// IndividualPostEffect.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function IndividualPostEffect({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 0.3 }} // Start slightly smaller and transparent
        animate={{ opacity: 1, scale: 1 }} // Animate to full size and visibility
        transition={{ duration: 0.5 }} // Smooth transition for load
        whileHover={{
          scale: 1.0, // Scale up on hover
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)", // Add shadow on hover
        }}
        whileTap={{
          scale: 0.95, // Scale down on click
          transition: { duration: 0.1 }, // Fast transition for tap
        }}
        onHoverStart={() => setIsHovered(true)} // Set hover state to true
        onHoverEnd={() => setIsHovered(false)} // Set hover state to false
        className={`rounded-2xl transition duration-300 ${
          isHovered ? "hue-rotate" : ""
        }`} // Add hue-rotate class on hover
      />
    </div>
  );
}
