// Add this at the top to make DesktopNav a Client Component
"use client";

import { useEffect, useState } from "react";
import {
  CameraIcon,
  HomeIcon,
  LayoutGrid,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../ig.png";
import { Switch } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export default function DesktopNav() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    // Initialize dark mode from localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.querySelector("html")?.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.querySelector("html")?.setAttribute("data-theme", "light");
    }
  }, []);

  const handleThemeSwitch = (isDark: boolean) => {
    const theme = isDark ? "dark" : "light";
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsDarkMode(isDark);
    window.location.reload(); // Reload to apply styles across components
  };

  const getLinkClasses = (path: string) =>
    `flex items-center gap-2 ${
      currentPath === path ? "text-ig-red font-bold" : "text-gray-400"
    }`;

  return (
    <div className="hidden lg:block gradient-background2 px-4 pb-4 w-48 shadow-xl shadow-black">
      <div className="top-4 sticky">
        <div>
          <Image
            className="invert gradient-background3 rounded-2xl"
            src={logo}
            alt="Logo"
          />
          <label className="flex items-center gap-2 mt-2">
            <span>Dark Mode</span>
            <Switch checked={isDarkMode} onCheckedChange={handleThemeSwitch} />
          </label>
          <div className="ml-3 inline-flex flex-col gap-11 justify-center items-center mt-10">
            <Link
              href="/profile/highlights"
              className={getLinkClasses("/browse")}
            >
              <LayoutGrid />
              HighLights
            </Link>
            <Link href="/browse" className={getLinkClasses("/browse")}>
              <LayoutGrid />
              Browse
            </Link>
            <Link href="/search" className={getLinkClasses("/search")}>
              <SearchIcon />
              Search
            </Link>
            <Link href="/" className={getLinkClasses("/")}>
              <HomeIcon />
              Home
            </Link>

            <Link href="/create" className={getLinkClasses("/create")}>
              <CameraIcon />
              Create
            </Link>

            <Link href="/profile" className={getLinkClasses("/profile")}>
              <UserIcon />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
