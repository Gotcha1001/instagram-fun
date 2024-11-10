import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import LikesInfo from "./LikesInfo";
import { getSessionEmailOrThrow } from "@/actions";
import Link from "next/link";
import IndividualPostEffect from "./IndividualPostEffect";
import { Profile } from "@prisma/client";
import BookmarkButton from "./BookmarkButton";

export default async function HomePosts({ profiles }: { profiles: Profile[] }) {
  const posts = await prisma.post.findMany({
    where: {
      author: { in: profiles.map((p) => p.email) },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  const likes = await prisma.like.findMany({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: { in: posts.map((p) => p.id) },
    },
  });

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: { in: posts.map((p) => p.id) },
    },
  });

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-12 ">
      {posts.map((post) => {
        const profile = profiles.find((p) => p.email === post.author);
        return (
          <div key={post.id} className="p-2">
            <Link href={`/posts/${post.id}`}>
              <IndividualPostEffect src={post.image} alt="Posts" />
            </Link>

            <div className="flex mt-4 items-center gap-3 justify-between p-1 rounded-lg gradient-background2">
              <div className="flex gap-2 items-center ">
                <Avatar
                  src={profile?.avatar || ""}
                  radius="full"
                  fallback="avatar"
                  size="4"
                />
                <Link
                  href={`/users/${profile?.username}`}
                  className="font-bold text-white"
                >
                  {profile?.name}
                </Link>
              </div>

              <div className="flex gap-2 items-center">
                <LikesInfo
                  showText={false}
                  post={post}
                  sessionLike={
                    likes.find((like) => like.postId === post.id) || null
                  }
                />

                <BookmarkButton
                  post={post}
                  sessionBookmark={
                    bookmarks.find((b) => b.postId === post.id) || null
                  }
                />
              </div>
            </div>
            <p className="mt-3 p-2 text-gray-300">{post.description}</p>
          </div>
        );
      })}
    </div>
  );
}
