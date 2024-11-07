"use client";
import { likePost, removeLikeFromPost } from "@/actions";
import { Post, Like } from "@prisma/client/wasm";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikesInfo({
  post,
  sessionLike,
  showText = true,
}: {
  post: Post;
  sessionLike: Like | null;
  showText?: boolean;
}) {
  const router = useRouter();

  const [likedByMe, setLikedByMe] = useState(!!sessionLike);

  return (
    <form
      action={async (data: FormData) => {
        setLikedByMe((prev) => !prev);
        if (likedByMe) {
          //remove like
          await removeLikeFromPost(data);
        } else {
          // add like
          await likePost(data);
        }
        router.refresh();
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="postId" value={post.id} />
      <button type="submit" className="zoom">
        <HeartIcon className={likedByMe ? "text-red-600 fill-red-600" : "text-white "} />
      </button>
      {showText && <p> {post.likesCount} People like this...</p>}
    </form>
  );
}