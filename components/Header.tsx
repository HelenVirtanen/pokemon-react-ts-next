"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  LayoutDashboard,
  Heart,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { user, isLoading } = useUser();

  const pathname = usePathname();

  const menu = [
    {
      name: "Browse",
      link: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Favourites",
      link: "/favourites",
      icon: <Heart size={22} />,
    },
    {
      name: "Saved",
      link: "/bookmarks",
      icon: <Bookmark size={20} />,
    },
  ];

  if (isLoading) return null;

  return (
    <header className="min-h-[10vh] px-4 md:px-8 lg:px-16 py-6 w-full bg-white flex flex-wrap justify-between items-center shadow-sm gap-4">
      <Link href="/">
        <Image
          src={"/pokemon--logo.png"}
          alt="Pokemon logo"
          width={120}
          height={90}
          style={{ width: "120", height: "auto" }}
        />
      </Link>
      <nav>
        <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8 text-gray-400">
          {menu.map((item, index: number) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`py-2 px-6 text-md flex items-center gap-2 font-bold rounded-lg
                                ${
                                  pathname === item.link
                                    ? "bg-[#ff9800]/15 text-[#ff9800]"
                                    : ""
                                }
                            `}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {user?.sub && !isLoading && (
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none border-none">
              <div className="bg-[#ff9800]/15 flex items-center justify-center gap-2 rounded-lg cursor-pointer">
                <span className="pl-2 text-[#ff9800] text-md font-bold">
                  {user?.name || "User"}
                </span>
                <Image
                  src={user?.picture || "/avatar.png"}
                  width={40}
                  height={40}
                  alt="avater"
                  className="p-1 rounded-lg cursor-pointer"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[160px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer"
              onClick={() => window.location.href= "/auth/logout"}>
                <LogOut />
                Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {!user?.sub && !isLoading && (
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="py-2 px-3 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7]/15 text-[#6c5ce7] hover:bg-[#6c5ce7]/30 transition-all duration-300 ease-in-out"
          >
            <LogIn size={20} />
            Login
          </Link>
          <Link
            href="/auth/login"
            className="py-2 px-3 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7] text-white hover:bg-[#6c5ce7]/90 transition-all duration-300 ease-in-out"
          >
            <UserPlus size={20} />
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
