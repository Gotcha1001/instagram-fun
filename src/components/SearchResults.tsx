import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import Link from "next/link";
import PostsGrid from "./PostsGrid";

export default async function SearchResults({ query }: { query: string }) {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: "insensitive" } },
        { name: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 10,
  });

  const posts = await prisma.post.findMany({
    where: {
      description: { contains: query, mode: "insensitive" },
    },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-lg mt-2">{`Search Results For "${query}"`}</h1>

      {profiles?.length > 0 && (
        <div className="grid mt-4 sm:grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <Link
              key={profile.username}
              href={`/users/${profile.username}`}
              className="flex gap-2 mt-3 bg-gray-200 border dark:bg-gray-800 dark:border-gray-700 border-gray-300 p-2 rounded-full"
            >
              <div>
                <Avatar
                  size={"5"}
                  radius="full"
                  fallback="user avatar"
                  src={profile.avatar || ""}
                />
              </div>
              <div className="flex flex-col">
                <h3>{profile.username}</h3>
                <h4 className="text-gray-500 dark:text-gray-300 text-sm">
                  @{profile.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4">
        {/* Pass isOurProfile as false, since we are not showing the user's own posts */}
        <PostsGrid posts={posts} isOurProfile={false} />
      </div>
    </div>
  );
}
