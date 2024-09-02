import NavBar from "@/components/NavBar";
import { Kanit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaGlobe, FaGlobeAmericas } from "react-icons/fa";
const kanit = Kanit({ subsets: ["latin"], weight: "600" });

const page = () => {
  return (
    <main>
      <NavBar />
      <h1 className="text-4xl font-bold mt-20">Projects</h1>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="lg:h-[24rem] relative px-8 py-4">
          <div className="flex items-center gap-2 absolute bottom-4 left-4 w-full">
            <Image src={"/elostack_logo.png"} width={48} height={48} className="w-12 h-12 rounded-full" />
            <h2 className={`text-2xl text-white ${kanit.className}`}>EloStack</h2>
            <div className="flex gap-2 items-center text-xl">
              <Link
                target="_blank"
                href={"https://github.com/spaaacy/elostack"}
                className="text-neutral-400 hover:text-white"
              >
                <FaGithub />
              </Link>
              <Link target="_blank" href={"https://www.elostack.com"} className="text-neutral-400 hover:text-white">
                <FaGlobe />
              </Link>
            </div>
          </div>
          <Image src={"/elostack_banner.png"} objectFit="cover" fill={true} className="-z-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 -z-40 via-black/10" />
        </div>
        <div className="lg:h-[24rem] relative px-8 py-4">
          <div className="flex items-center gap-2 absolute bottom-4 left-4 w-full">
            <h2 className={`text-2xl text-white`}>APLanes</h2>
            <div className="flex gap-2 items-center text-xl">
              <Link
                target="_blank"
                href={"https://github.com/spaaacy/ap-lanes"}
                className="text-neutral-400 hover:text-white"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
          <Image src={"/aplanes_banner.png"} objectFit="cover" fill={true} className="-z-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 -z-40 via-black/10" />
        </div>
        <div className="lg:h-[24rem] relative px-8 py-4">
          <div className="flex items-center gap-2 absolute bottom-4 left-4 w-full">
            <h2 className={`text-2xl text-white`}>SpeedBurn</h2>
            <div className="flex gap-2 items-center text-xl">
              <Link
                target="_blank"
                href={"https://github.com/spaaacy/speedburn"}
                className="text-neutral-400 hover:text-white"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
          <Image src={"/speedburn_banner.png"} objectFit="cover" fill={true} className="-z-50 object-left" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 -z-40 via-black/10" />
        </div>
      </div>
    </main>
  );
};

export default page;
