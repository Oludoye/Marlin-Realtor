"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {session.user.name?.charAt(0) || "U"}
        </div>
        <span className="text-sm">{session.user.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow rounded border z-50">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            {session.user.email}
          </div>

          <div className="border-t" />

          {/* ✅ LOGOUT BUTTON */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
