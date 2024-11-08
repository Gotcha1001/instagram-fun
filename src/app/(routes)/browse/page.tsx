import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";

export default async function BrowsePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <div>
      <div className="mb-4 gradient-background2 p-2 rounded-md">
        <h1 className="text-4xl font-bold text-slate-500 animate-bounce text-center">
          Browse
        </h1>
        <p className="text-gray-400 text-center">
          Check Trending Posts and Find Great Inspiration
        </p>
      </div>

      <PostsGrid posts={posts} />
    </div>
  );
}
