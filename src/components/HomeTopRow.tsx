import { Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function HomeTopRow({
  profiles,
}: {
  profiles: Profile[];
}) {
  return (
    <div className="flex gap-3 mt-3 md:justify-center max-w-full overflow-x-auto p-2 rounded-lg">
      <div>
        <Link href="/create">
          <button className="size-[92px] rounded-full bg-gradient-to-tr from-ig-orange to-ig-red text-white flex items-center justify-center">
            <PlusIcon size={42} />
          </button>
        </Link>
        <p className="text-center text-gray-400 text-sm">New Story...</p>
      </div>
      {profiles.map((profile) => (
        <div key={profile.id} className="w-24 flex justify-center items-center flex-col">
          <div>
            <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
              <div className="inline-block p-0.5 bg-white dark:bg-black rounded-full">
                <Avatar
                  size="6"
                  radius="full"
                  src={profile.avatar || ""}
                  fallback={"avatar"}
                />
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            {profile.username}
          </p>
        </div>
      ))}
    </div>
  );
}
