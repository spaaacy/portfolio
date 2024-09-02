"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight, FaGithub, FaGlobe } from "react-icons/fa";

const ProjectModal = ({ project, setShowModal }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 bg-black backdrop-blur-sm w-screen h-screen bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col px-6 py-8 rounded-xl lg:w-1/2 h-[48rem] bg-neutral-100 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <div className="flex justify-start items-center text-xl gap-4">
          {project.logo && <Image src={project.logo} width={40} height={40} className="w-10 h-10 rounded-full" />}

          <h1 className={`text-2xl font-semibold ${project.font ? project.font : ""}`}>{project.name}</h1>
          <Link
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            href={project.github}
            className="text-neutral-800 hover:text-neutral-600 text-2xl"
          >
            <FaGithub />
          </Link>
          {project.website && (
            <Link
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              href={project.website}
              className="text-neutral-800 hover:text-neutral-600 text-2xl"
            >
              <FaGlobe />
            </Link>
          )}
        </div>
        <p className="text-sm mt-2">{project.about}</p>
        <div className="flex items-center justify-between w-full relative h-full">
          <button
            type="button"
            onClick={() => setCurrentImage((currentImage + 1) % project.images.length)}
            className="text-2xl text-white z-50 mx-2"
          >
            <FaArrowCircleLeft />
          </button>
          <button
            onClick={() => setCurrentImage((currentImage + 1) % project.images.length)}
            type="button"
            className="text-2xl text-white z-50 mx-2"
          >
            <FaArrowCircleRight />
          </button>
          <Image
            src={project.images[currentImage]}
            fill={true}
            className="w-96 h-96 flex-1 relative"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
