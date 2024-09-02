import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaGraduationCap, FaTools } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";

const Sidebar = ({ parallaxRef }) => {
  return (
    <div
      className="flex flex-col gap-6 bg-neutral-900 p-4 fixed left-0 top-1/2 -translate-y-1/2 text-2xl z-50  backdrop-blur-sm bg-opacity-60"
      ref={parallaxRef}
    >
      <button
        className={`transition text-neutral-300 hover:text-white`}
        type="button"
        onClick={() => parallaxRef.current.scrollTo(0)}
      >
        <GoHomeFill />
      </button>
      <button
        className={`transition text-neutral-300 hover:text-white`}
        type="button"
        onClick={() => parallaxRef.current.scrollTo(1)}
      >
        <FaUser />
      </button>
      <button
        className={`transition text-neutral-300 hover:text-white`}
        type="button"
        onClick={() => parallaxRef.current.scrollTo(1.8)}
      >
        <FaGraduationCap />
      </button>
      <button
        className={`transition text-neutral-300 hover:text-white`}
        type="button"
        onClick={() => parallaxRef.current.scrollTo(2.4)}
      >
        <FaTools />
      </button>
      <button
        className={`transition text-neutral-300 hover:text-white`}
        type="button"
        onClick={() => parallaxRef.current.scrollTo(3.2)}
      >
        <IoShareSocial />
      </button>
    </div>
  );
};

export default Sidebar;
