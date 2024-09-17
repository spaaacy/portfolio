"use client";

import NavBar from "@/components/NavBar";
import { useRef } from "react";
import Sidebar from "@/components/Sidebar";
import { useWindowSize } from "@/hooks/useWindowSize";
import LandingParallax from "@/components/LandingParallax";
import LandingMobile from "@/components/LandingMobile";

export default function Home() {
  const parallaxRef = useRef();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Sidebar parallaxRef={parallaxRef} />
      <NavBar />

      <LandingMobile />
      <LandingParallax parallaxRef={parallaxRef} />
    </div>
  );
}

export const languages_images = [
  "c++.png",
  "python.webp",
  "js.png",
  "kotlin.png",
  "dart.png",
  "java.png",
  "solidity.svg",
];

export const technologies_images = [
  "ethereum.png",
  "flutter.png",
  "mongodb.png",
  "nextjs.png",
  "nodejs.png",
  "postgresql.png",
  "react.png",
];

export const languages_names = {
  "c++.png": "c++",
  "python.webp": "python",
  "js.png": "javascript",
  "kotlin.png": "kotlin",
  "dart.png": "dart",
  "java.png": "java",
  "solidity.svg": "solidity",
};

export const technologies_names = {
  "ethereum.png": "ethereum",
  "flutter.png": "flutter",
  "mongodb.png": "mongodb",
  "nextjs.png": "nextjs",
  "nodejs.png": "nodejs",
  "postgresql.png": "postgresql",
  "react.png": "react",
};

export const technologies_prof = {
  "ethereum.png": "3/5",
  "flutter.png": "4/5",
  "mongodb.png": "4/5",
  "nextjs.png": "5/5",
  "nodejs.png": "5/5",
  "postgresql.png": "5/5",
  "react.png": "5/5",
};

export const languages_prof = {
  "c++.png": "3/5",
  "python.webp": "4/5",
  "js.png": "5/5",
  "kotlin.png": "4/5",
  "dart.png": "4/5",
  "java.png": "4/5",
  "solidity.svg": "4/5",
};
