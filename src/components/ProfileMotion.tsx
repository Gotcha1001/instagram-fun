"use client";

import { motion } from "framer-motion";

interface ProfileMotionProps {
  profile: {
    avatar: string;
  };
}

export default function ProfileMotion({ profile }: ProfileMotionProps) {
  return (
    <div className="size-44 p-2 bg-white dark:bg-black rounded-full">
      <motion.div
        className="size-40 aspect-square overflow-hidden rounded-full"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <img
          className="w-full h-full object-cover size-40 aspect-square overflow-hidden rounded-full"
          src={profile.avatar || ""}
          alt="Avatar"
        />
      </motion.div>
    </div>
  );
}
