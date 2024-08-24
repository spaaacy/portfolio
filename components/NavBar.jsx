"use client";

import Link from "next/link";
import { Kanit } from "next/font/google";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
const kanit = Kanit({ subsets: ["latin"], weight: "600" });

const NavBar = () => {
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  return (
    <nav className={`"sticky top-0 border-b border-b-1 border-gray-400 `}>
      <div className={`px-8 lg:px-16 py-2 flex items-center justify-start`}>
        <Link href={"/"} className={`${kanit.className} flex justify-center items-center text-2xl flex-shrink-0`}>
          <span>Aakif Mohamed</span>
        </Link>
        <DesktopNav />
        <MobileNav setShowMobileDropdown={setShowMobileDropdown} showMobileDropdown={showMobileDropdown} />
      </div>
      {showMobileDropdown && <MobileDropdown />}
    </nav>
  );
};

const DesktopNav = () => {
  return (
    <div className="ml-12 flex justify-start items-center gap-4 max-lg:hidden w-full">
      <Link href={""} className={`p-2 hover:text-gray-500`}>
        Slack
      </Link>
    </div>
  );
};

const MobileNav = ({ setShowMobileDropdown, showMobileDropdown }) => {
  return (
    <div className="flex items-center gap-2 ml-auto lg:hidden">
      <button type="button" onClick={() => setShowMobileDropdown(!showMobileDropdown)}>
        <IoMenu className="text-2xl" />
      </button>
    </div>
  );
};

const MobileDropdown = () => {
  return (
    <div className={`flex flex-col justify-center items-center lg:hidden py-2`}>
      <Link href={"https://elostack.slack.com"} className="p-2 hover:bg-gray-300 w-full text-center">
        Slack
      </Link>
    </div>
  );
};

export default NavBar;
