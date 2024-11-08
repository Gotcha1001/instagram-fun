import { prisma } from "@/db";
import PostsGrid from "@/components/PostsGrid"; // Ensure PostsGrid is responsive
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link"; // Import Link for navigation

export default async function Highlights() {
  const session = await auth();

  if (!session) {
    return redirect("/login"); // Redirect to login if not authenticated
  }

  const highlightsPosts = await prisma.post.findMany({
    where: {
      likesCount: {
        gte: 3, // Only posts with 3 or more likes
      },
    },
    orderBy: { likesCount: "desc" }, // Order posts by likes in descending order
  });

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex justify-center mt-12 gap-4">
        <Link className="bg-red-700" href="/">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform transition duration-300 ease-in-out hover:scale-105">
            Go to Home
          </button>
        </Link>
      </div>
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12">
        Most Liked Posts only more than 3 likes displayed here...
      </h1>

      <PostsGrid posts={highlightsPosts} />
    </div>
  );
}
