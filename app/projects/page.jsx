"use client";

import NavBar from "@/components/NavBar";
import ProjectModal from "@/components/ProjectModal";
import { projects } from "@/public/projects";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub, FaGlobe, FaGlobeAmericas } from "react-icons/fa";

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState();

  return (
    <div className="relative w-full">
      <NavBar />
      <main>
        <h1 className="text-4xl font-bold mt-20">Projects</h1>
        <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-4 mt-8">
          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() => {
                setProject(p);
                setShowModal(true);
              }}
              className="h-[24rem] relative px-8 py-4 hover:cursor-pointer transition group hover:scale-[101%] hover:shadow-[-10px_10px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-[-2px] hover:border hover:border-black"
            >
              <div className="bg-black px-4 py-1 rounded-full flex justify-start items-center gap-2 absolute bottom-4 left-4 backdrop-blur-md bg-opacity-50">
                {p.logo && <Image src={p.logo} width={48} height={48} className="w-10 h-10 rounded-full -ml-3" />}
                <h2 className={` text-2xl text-white ${p.font ? p.font : ""}`}>{p.name}</h2>
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
              <Image src={p.banner.image} fill={true} className={`-z-50 ${p.banner.className}  `} />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 -z-40 via-black/20 group-hover:via-teal-100/5 group-hover:from-teal-100" />
            </div>
          ))}
        </div>
        {showModal && <ProjectModal project={project} setShowModal={setShowModal} />}
      </main>
    </div>
  );
};

export default page;
