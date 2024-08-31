"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={`absolute top-4 left-1/2 -translate-x-1/2 flex z-50`}>
      <div className="flex gap-4 items-center justify-center py-2 rounded-full bg-neutral-900 mx-auto px-8">
        <button className="hover:text-neutral-200 text-neutral-300 transition" type={"button"}>
          About
        </button>
        <button className="hover:text-neutral-200 text-neutral-300 transition" type={"button"}>
          Education
        </button>
        <button className="hover:text-neutral-200 text-neutral-300 transition" type={"button"}>
          Skills
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
