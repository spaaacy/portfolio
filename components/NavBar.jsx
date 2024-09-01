"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={`absolute top-4 left-1/2 -translate-x-1/2 flex z-50`}>
      <div className="flex gap-4 items-center justify-center py-2 rounded-full bg-neutral-900 mx-auto px-8">
        <Link href="/" className="hover:text-white text-neutral-300 transition">
          Home
        </Link>
        <Link href="/projects" className="hover:text-white text-neutral-300 transition">
          Projects
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
