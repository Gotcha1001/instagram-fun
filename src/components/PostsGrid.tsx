"use client";
import Masonry from "react-masonry-css";
import { motion, spring } from "framer-motion";
import { Post } from "@prisma/client/edge";
import Link from "next/link";

export default function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-full- mx-auto">
      <Masonry
        breakpointCols={{
          default: 4,
          860: 3,
          700: 2,
          500: 1,
        }}
        className="flex -ml-4 pl-4  "
      >
        {posts.map((post, index) => (
          <Link
            href={`/posts/${post.id}`}
            className="mb-4 p-3 block gap-3 "
            key={index}
          >
            <motion.img
              src={post.image}
              alt={`Image ${index + 1}`}
              initial={{ opacity: 0, scale: 0.9 }} // Start slightly smaller and transparent
              animate={{ opacity: 1, scale: 1 }} // Animate to full size and visibility
              transition={{ duration: 0.5 }} // Smooth transition for load
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                filter: "grayscale(100%) hue-rotate(90deg)", // Combine effects
                transition: { type: spring, stiffness: 500 },
              }}
              whileTap={{
                scale: 0.95, // Scale down on click
                transition: { duration: 0.1 }, // Fast transition for tap
              }}
              className="rounded-2xl  transition duration-100" // Smooth transition for all class changes
            />
          </Link>
        ))}
      </Masonry>
    </div>
  );
}
