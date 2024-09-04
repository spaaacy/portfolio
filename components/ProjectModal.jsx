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
        className="flex flex-col p-6 rounded-xl  lg:w-1/2 h-[42rem] max-h-[48rem] overflow-y-auto bg-neutral-100 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
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
        {project.about && <p className="text-sm mt-2">{project.about}</p>}
        {project.video && (
          <div className="flex flex-col mt-4 text-xl font-semibold">
            <h3>Video</h3>
            <iframe
              width="560"
              height="315"
              src={project.video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="min-h-[28rem] w-full mt-4"
            ></iframe>
          </div>
        )}
        {project.images && (
          <div className="mt-4">
            <h3 className="font-semibold text-xl">Images</h3>
            <div className="flex justify-between items-center flex-1">
              {project.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentImage((currentImage + 1) % project.images.length)}
                  className="text-2xl text-black z-50 mx-2"
                >
                  <FaArrowCircleLeft />
                </button>
              )}
              <div className="flex items-center justify-between w-full relative min-h-[28rem] h-full">
                <Image
                  src={project.images[currentImage]}
                  fill={true}
                  className="w-96 h-96 flex-1 relative"
                  objectFit="contain"
                />
              </div>
              {project.images.length > 1 && (
                <button
                  onClick={() => setCurrentImage((currentImage + 1) % project.images.length)}
                  type="button"
                  className="text-2xl text-black z-50 mx-2"
                >
                  <FaArrowCircleRight />
                </button>
              )}
            </div>
          </div>
        )}

        <ul className="pt-2 mt-auto flex gap-2 justify-start items-center">
          {project.stack.map((s, i) => {
            return (
              <p key={i} className="py-1 px-2 rounded-full bg-neutral-800 text-white text-xs">
                {s}
              </p>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProjectModal;
