"use client";
import { bookmarkPost, unbookmarkPost } from "@/actions";
import { Post, Like } from "@prisma/client/wasm";
import { BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookmarkButton({
  post,
  sessionBookmark,
}: {
  post: Post;
  sessionBookmark: Like | null;
}) {
  const router = useRouter();
  const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);

  return (
    <form
      action={async () => {
        setBookmarkedByMe((prev) => !prev);
        if (bookmarkedByMe) {
          // remove bookmark
          await unbookmarkPost(post.id);
        } else {
          // add bookmark
          await bookmarkPost(post.id);
        }
        router.refresh();
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="postId" value={post.id} />
      <button type="submit" className="zoom">
        <BookmarkIcon
          className={
            bookmarkedByMe
              ? "text-white fill-red-600 dark:fill-white"
              : "text-white"
          }
        />
      </button>
    </form>
  );
}
