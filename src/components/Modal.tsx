"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="bg-black/90 dark:bg-gray-700/80 fixed inset-0 z-10"
    >
      <div className="bg-white rounded-lg left-8 right-8 top-9 bottom-9 fixed dark:bg-black dark:text-white ">
        <div className="top-4 bottom-4 absolute rounded-lg  z-20 overflow-y-auto">
          <div onClick={(ev) => ev.stopPropagation()} className="px-4 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
