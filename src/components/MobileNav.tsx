'use client'
import {
  CameraIcon,
  HomeIcon,
  LayoutGrid,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter

export default function MobileNav() {
  const currentPath = usePathname();

  const getLinkClasses = (path: string) =>
    `flex items-center justify-center w-full ${
      currentPath === path ? "text-ig-red" : "text-gray-500 dark:text-gray-300"
    }`;

  return (
    <div className="block lg:hidden fixed bottom-0 left-0 right-0">
      <div className="flex justify-center *:flex *:items-center *:justify-center">
        <div className="pl-2 bg-white dark:bg-black rounded-t-xl w-full relative z-10 flex items-center justify-between">
          <Link href="/" className={getLinkClasses("/")}>
            <HomeIcon />
          </Link>
          <Link href="/search" className={getLinkClasses("/search")}>
            <SearchIcon />
          </Link>
        </div>

        <div className="size-14 relative -top-5 justify-center w-[140px]">
          <div
            className="absolute bg-white bg-clip-text rounded-full border-white
             dark:border-black dark:border-t-transparent dark:border-l-transparent
             border-t-transparent border-l-transparent rotate-45 border-[50px]"
          >
            <div className="border-4 size-16 border-transparent p-1">
              <Link
                href="/create"
                className="-rotate-45 bg-gradient-to-tr from-ig-orange to-ig-red
                 size-12 flex items-center justify-center text-white rounded-full"
              >
                <CameraIcon />
              </Link>
            </div>
          </div>
        </div>

        <div className="pr-2 bg-white dark:bg-black rounded-t-xl w-full relative z-10 flex items-center justify-between">
          <Link href="/browse" className={getLinkClasses("/browse")}>
            <LayoutGrid />
          </Link>
          <Link href="/profile" className={getLinkClasses("/profile")}>
            <UserIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
