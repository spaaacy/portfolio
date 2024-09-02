"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={`absolute top-4 left-1/2 -translate-x-1/2 flex z-20`}>
      <div className="flex gap-4 items-center justify-center py-2 rounded-full bg-neutral-900 mx-auto px-8 backdrop-blur-sm bg-opacity-60">
        <Link href="/" className="hover:text-white text-neutral-300 transition backdrop-filter">
          Home
        </Link>
        <Link href="/projects" className="hover:text-white text-neutral-200 transition">
          Projects
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
