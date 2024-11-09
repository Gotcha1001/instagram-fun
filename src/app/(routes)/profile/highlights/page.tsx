import { prisma } from "@/db";
import PostsGrid from "@/components/PostsGrid";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Highlights() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const highlightsPosts = await prisma.post.findMany({
    where: {
      likesCount: {
        gte: 1,
      },
    },
    orderBy: { likesCount: "desc" },
  });

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto gradient-background7 rounded-lg">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center mb-8">
          <Link
            href="/profile"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform transition duration-300 ease-in-out hover:scale-105"
          >
            Back to Profile
          </Link>
        </div>
        <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12">
          Most Liked Posts
        </h1>
        <PostsGrid posts={highlightsPosts} />
      </div>
    </main>
  );
}
