"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, LayoutDashboard, Heart, LogIn, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';

function Header() {
    const pathname = usePathname();
    
    const menu = [
        {
            name: "Browse",
            link: "/",
            icon: <LayoutDashboard size={20} />
        },
        {
            name: "Favourites",
            link: "/favourites",
            icon: <Heart size={22} />
        },
        {
            name: "Saved",
            link: "/bookmarks",
            icon: <Bookmark size={20} />
        }
    ];

  return (
    <header className="min-h-[10vh] px-16 py-6 w-full bg-white flex justify-between items-center shadow-sm">
        <Link href="#">
          <Image src={'/pokemon--logo.png'} alt='Pokemon logo' width={120} height={90} />
        </Link >
        <nav>
            <ul className='flex items-center gap-8 text-gray-400'>
                {menu.map((item, index:number) => (
                    <li key={index}>
                        <Link 
                            href={item.link}
                            className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
                                ${
                                    pathname === item.link
                                    ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]'
                                    : ''
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
        <div className='flex items-center gap-4'>
            <Link href='/api/auth/login' className='py-2 px-3 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7]/15 text-[#6c5ce7] hover:bg-[#6c5ce7]/30 transition-all duration-300 ease-in-out'>Login
                <LogIn size={20} />
            </Link>
            <Link href='/api/auth/login' className='py-2 px-3 text-sm flex items-center gap-2 font-bold rounded-lg bg-[#6c5ce7] text-white hover:bg-[#6c5ce7]/90 transition-all duration-300 ease-in-out'>Sign up
                <UserPlus size={20} />
            </Link>
        </div>
    </header>
  )
}

export default Header