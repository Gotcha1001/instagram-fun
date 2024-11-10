"use client";

import { useRouter } from "next/navigation";
import Masonry from "react-masonry-css";
import { motion, spring } from "framer-motion";
import { Post } from "@prisma/client/edge";
import Link from "next/link";
import { X } from "lucide-react"; // Import X icon from lucide-react

export default function PostsGrid({
  posts,
  isOurProfile,
}: {
  posts: Post[];
  isOurProfile: boolean;
}) {
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Post deleted successfully.");
          router.refresh();
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Failed to delete post.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while deleting the post.");
      }
    }
  };

  return (
    <div className="max-w-full- mx-auto">
      <Masonry
        breakpointCols={{
          default: 4,
          860: 3,
          700: 2,
          500: 1,
        }}
        className="flex -ml-4 pl-4"
      >
        {posts.map((post, index) => (
          <div key={index} className="relative mb-4 p-3 group">
            <Link href={`/posts/${post.id}`} className="block gap-3">
              <motion.img
                src={post.image}
                alt={`Image ${index + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                  filter: "grayscale(100%) hue-rotate(90deg)",
                  transition: { type: spring, stiffness: 500 },
                }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                className="rounded-2xl transition duration-100"
              />
            </Link>
            {isOurProfile && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(post.id);
                }}
                className="absolute top-5 right-5 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-6 h-6 flex items-center justify-center shadow-lg"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </Masonry>
    </div>
  );
}
