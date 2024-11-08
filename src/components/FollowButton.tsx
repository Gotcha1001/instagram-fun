"use client";
import { followProfile, unfollowProfile } from "@/actions";
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { Follower } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FollowButtonProps {
  profileIdToFollow: string;
  ourFollow?: Follower | null;
}

export default function FollowButton({
  profileIdToFollow,
  ourFollow = null,
}: FollowButtonProps) {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);

  return (
    <form
      action={async () => {
        setIsFollowed((prev) => !prev);
        if (isFollowed) {
          // unfollow
          await unfollowProfile(profileIdToFollow);
        } else {
          // follow
          await followProfile(profileIdToFollow);
        }
        router.refresh();
      }}
    >
      <Button
        size="3"
        className={`${
          isFollowed
            ? "bg-transparent text-black border-blue-500 dark:text-white dark:border-purple-500"
            : "text-white"
        } dark:hover:border-purple-600`}
        style={{
          background: isFollowed
            ? "transparent"
            : "linear-gradient(to top right, rgb(230, 173, 77) 0%, rgb(207, 33, 66) 80%)",
          padding: "0.5rem",
          borderRadius: "0.375rem",
          border: isFollowed ? "1px solid blue" : "none",
          transition:
            "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (isFollowed) {
            e.currentTarget.style.background =
              "linear-gradient(to top right, rgb(98, 0, 234), rgb(0, 0, 0))";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "purple";
          }
        }}
        onMouseLeave={(e) => {
          if (isFollowed) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "black";
            e.currentTarget.style.borderColor = "blue";
          }
        }}
      >
        {isFollowed ? <UserMinusIcon /> : <UserPlusIcon />}
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
}
