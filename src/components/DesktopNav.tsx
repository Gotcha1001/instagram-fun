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

  const navLinks = [
    {
      href: "/",
      icon: <HomeIcon />,
      label: "Home",
    },
    {
      href: "/profile/highlights",
      icon: <LayoutGrid />,
      label: "Highlights",
    },
    {
      href: "/browse",
      icon: <LayoutGrid />,
      label: "Browse",
    },
    {
      href: "/search",
      icon: <SearchIcon />,
      label: "Search",
    },
    {
      href: "/create",
      icon: <CameraIcon />,
      label: "Create",
    },
    {
      href: "/profile",
      icon: <UserIcon />,
      label: "Profile",
    },
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClasses(link.href)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
