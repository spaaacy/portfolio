"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={`sticky top-4 flex z-20`}>
      <div className="flex gap-4 items-center justify-center py-2 rounded-full bg-neutral-900 mx-auto px-8 backdrop-blur-sm bg-opacity-80">
        <Link href="/" className="hover:text-white text-neutral-300 transition backdrop-filter">
          Home
        </Link>
        <Link href="/projects" className="hover:text-white text-neutral-200 transition">
          Projects
        </Link>
        <Link
          target="_blank"
          href="https://drive.google.com/file/d/14t_tSE5WZP0FP38BcUQzqklO2S_Q-97X/view?usp=sharing"
          className="hover:text-white text-neutral-200 transition"
        >
          Resume
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/aakifmohamed"
          className="hover:text-white text-neutral-200 transition"
        >
          LinkedIn
        </Link>
        <Link
          target="_blank"
          href="https://www.github.com/spaaacy"
          className="hover:text-white text-neutral-200 transition"
        >
          GitHub
        </Link>
        <Link
          target="_blank"
          href="https://www.goodreads.com/review/list/161322226?shelf=%23ALL%23"
          className="hover:text-white text-neutral-200 transition"
        >
          Reading List
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
