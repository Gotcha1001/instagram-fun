import { prisma } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import PostsGrid from "@/components/PostsGrid";
import ProfileAudio from "@/components/ProfileAudio"; // Import the audio component

export default async function Highlights() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Fetch posts that have a likesCount greater than or equal to 1
  const highlightsPosts = await prisma.post.findMany({
    where: {
      likesCount: {
        gte: 1,
      },
    },
    orderBy: { likesCount: "desc" },
  });

  // Check if the logged-in user is the author of the posts (can be adjusted to match your logic)
  const isOurProfile = highlightsPosts.some(
    (post) => post.author === session.user?.email
  );

  const audioUrl =
    "https://raw.githubusercontent.com/Gotcha1001/My-Images-for-sites-Wes/main/04(80BPM).wav"; // Dynamic audio URL

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto gradient-background7 rounded-lg">
      {/* Pass the audio URL to the ProfileAudio component */}
      <ProfileAudio audioUrl={audioUrl} />

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
        <PostsGrid posts={highlightsPosts} isOurProfile={isOurProfile} />
      </div>
    </main>
  );
}
