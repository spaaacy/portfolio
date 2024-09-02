"use client";

import NavBar from "@/components/NavBar";
import ProjectModal from "@/components/ProjectModal";
import { Kanit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub, FaGlobe, FaGlobeAmericas } from "react-icons/fa";
const kanit = Kanit({ subsets: ["latin"], weight: "600" });

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState();

  return (
    <main>
      <NavBar />
      <h1 className="text-4xl font-bold mt-20">Projects</h1>
      <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-4 mt-8">
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => {
              setProject(p);
              setShowModal(true);
            }}
            className="h-[24rem] relative px-8 py-4 hover:cursor-pointer"
          >
            <div className="flex items-center gap-2 absolute bottom-4 left-4 w-full">
              {p.logo && <Image src={p.logo} width={48} height={48} className="w-12 h-12 rounded-full" />}
              <h2 className={`text-2xl text-white ${p.font ? p.font : ""}`}>{p.name}</h2>
              <div className="flex gap-2 items-center text-xl">
                <Link
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  href={p.github}
                  className="text-neutral-400 hover:text-white"
                >
                  <FaGithub />
                </Link>
                {p.website && (
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    href={p.website}
                    className="text-neutral-400 hover:text-white"
                  >
                    <FaGlobe />
                  </Link>
                )}
              </div>
            </div>
            <Image src={p.banner} objectFit="cover" fill={true} className="-z-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 -z-40 via-black/10" />
          </div>
        ))}
      </div>
      {showModal && <ProjectModal project={project} setShowModal={setShowModal} />}
    </main>
  );
};

export default page;

const projects = [
  {
    name: "EloStack",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi diam, interdum ut massa vel,
                  ullamcorper interdum arcu. In sed scelerisque lacus. Vivamus ut tortor tellus. Donec iaculis ac metus
                  non viverra. Sed condimentum arcu nulla, eget pretium nisi aliquam id. Suspendisse purus lorem,
                  ultrices vel pretium non, facilisis sed leo. Phasellus facilisis commodo imperdiet. Integer
                  condimentum mi ac elit cursus, eget sollicitudin sem bibendum. Maecenas id vestibulum elit. Curabitur
                  at convallis ante. Etiam tincidunt nisl at posuere euismod. Morbi eget mollis diam. Suspendisse
                  rhoncus lacinia tortor. Duis interdum, leo id porttitor accumsan, orci tortor aliquam urna, in
                  pharetra urna ipsum nec est.`,
    github: "https://github.com/spaaacy/elostack",
    banner: "/elostack/elostack_banner.png",
    logo: "/elostack/elostack_logo.png",
    font: kanit.className,
    website: "https://www.elostack.com",
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
  },
  {
    name: "APLanes",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi diam, interdum ut massa vel,
                  ullamcorper interdum arcu. In sed scelerisque lacus. Vivamus ut tortor tellus. Donec iaculis ac metus
                  non viverra. Sed condimentum arcu nulla, eget pretium nisi aliquam id. Suspendisse purus lorem,
                  ultrices vel pretium non, facilisis sed leo. Phasellus facilisis commodo imperdiet. Integer
                  condimentum mi ac elit cursus, eget sollicitudin sem bibendum. Maecenas id vestibulum elit. Curabitur
                  at convallis ante. Etiam tincidunt nisl at posuere euismod. Morbi eget mollis diam. Suspendisse
                  rhoncus lacinia tortor. Duis interdum, leo id porttitor accumsan, orci tortor aliquam urna, in
                  pharetra urna ipsum nec est.`,
    github: "https://github.com/spaaacy/ap-lanes",
    banner: "/aplanes/aplanes_banner.png",
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
  },
  {
    name: "SpeedBurn",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi diam, interdum ut massa vel,
                  ullamcorper interdum arcu. In sed scelerisque lacus. Vivamus ut tortor tellus. Donec iaculis ac metus
                  non viverra. Sed condimentum arcu nulla, eget pretium nisi aliquam id. Suspendisse purus lorem,
                  ultrices vel pretium non, facilisis sed leo. Phasellus facilisis commodo imperdiet. Integer
                  condimentum mi ac elit cursus, eget sollicitudin sem bibendum. Maecenas id vestibulum elit. Curabitur
                  at convallis ante. Etiam tincidunt nisl at posuere euismod. Morbi eget mollis diam. Suspendisse
                  rhoncus lacinia tortor. Duis interdum, leo id porttitor accumsan, orci tortor aliquam urna, in
                  pharetra urna ipsum nec est.`,
    github: "https://github.com/spaaacy/speedburn",
    banner: "/speedburn/speedburn_banner.png",
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
  },
];
