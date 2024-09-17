"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={`max-sm:fixed sm:sticky top-4 flex z-20 px-4 left-1/2 max-sm:-translate-x-1/2 max-sm:w-full`}>
      <div className="flex gap-2 sm:gap-6 items-center justify-center py-2 rounded-full bg-neutral-900 mx-auto px-8 backdrop-blur-sm bg-opacity-60 flex-wrap">
        <Link href="/" className="hover:text-white text-neutral-300 transition backdrop-filter max-sm:text-sm mx-2">
          Home
        </Link>
        <Link href="/projects" className="hover:text-white text-neutral-200 transition max-sm:text-sm  mx-2">
          Projects
        </Link>
        <Link
          target="_blank"
          href="https://drive.google.com/file/d/14t_tSE5WZP0FP38BcUQzqklO2S_Q-97X/view?usp=sharing"
          className="hover:text-white text-neutral-200 transition max-sm:text-sm  mx-2"
        >
          Resume
        </Link>
        <Link
          target="_blank"
          href="https://www.goodreads.com/review/list/161322226?sort=rating"
          className="hover:text-white text-neutral-200 transition max-sm:text-sm  mx-2"
        >
          Book List
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
