"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={`sticky top-4 rounded-full bg-black opacity-80 mx-auto px-8`}>
      <DesktopNav />
      <MobileNav />
    </nav>
  );
};

const DesktopNav = () => {
  return (
    <div className="flex justify-center items-center gap-4 max-lg:hidden py-2 text-neutral-300 hover:text-neutral-200 transition-colors">
      <Link href={""}>Slack</Link>
    </div>
  );
};

const MobileNav = () => {
  return (
    <div className="flex justify-center items-center gap-2 lg:hidden py-2">
      <Link href={""}>Slack</Link>
    </div>
  );
};

export default NavBar;
