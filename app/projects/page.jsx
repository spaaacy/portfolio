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
            className="h-[24rem] relative px-8 py-4 hover:cursor-pointer transition group hover:scale-[101%]"
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
    banner: { image: "/elostack/elostack_banner.png", className: "object-cover object-right" },
    logo: "/elostack/elostack_logo.png",
    font: kanit.className,
    website: "https://www.elostack.com",
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
    stack: [
      "React",
      "Next.js",
      "JavaScript",
      "Node.js",
      "TailwindCSS",
      "PostgreSQL",
      "Supabase",
      "Google Cloud",
      "Vercel",
      "CRON",
    ],
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
    banner: { image: "/aplanes/aplanes_banner.png", className: "object-cover" },
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
    stack: ["Flutter", "Dart", "Firebase", "AWS", "Google Maps"],
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
    banner: { image: "/speedburn/speedburn_banner.png", className: "object-left object-cover" },
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
    stack: ["React", "Next.js", "JavaScript", "TailwindCSS", "Ethereum", "Solidity"],
  },
  {
    name: "GiveNow",
    github: "https://github.com/spaaacy/give-now",
    banner: { image: "/give-now/payhack_logo.png", className: "object-contain px-4" },
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
    stack: ["Flutter", "Dart", "Google Maps"],
  },
  {
    name: "InsightIQ",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi diam, interdum ut massa vel,
                  ullamcorper interdum arcu. In sed scelerisque lacus. Vivamus ut tortor tellus. Donec iaculis ac metus
                  non viverra. Sed condimentum arcu nulla, eget pretium nisi aliquam id. Suspendisse purus lorem,
                  ultrices vel pretium non, facilisis sed leo. Phasellus facilisis commodo imperdiet. Integer
                  condimentum mi ac elit cursus, eget sollicitudin sem bibendum. Maecenas id vestibulum elit. Curabitur
                  at convallis ante. Etiam tincidunt nisl at posuere euismod. Morbi eget mollis diam. Suspendisse
                  rhoncus lacinia tortor. Duis interdum, leo id porttitor accumsan, orci tortor aliquam urna, in
                  pharetra urna ipsum nec est.`,
    github: "https://github.com/spaaacy/insight-iq",
    banner: { image: "/insight-iq/impacthack_logo.png", className: "object-contain px-4" },
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
    stack: ["Flutter", "Dart", "ChatGPT"],
  },
  {
    name: "QuizmifyAI",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi diam, interdum ut massa vel,
                  ullamcorper interdum arcu. In sed scelerisque lacus. Vivamus ut tortor tellus. Donec iaculis ac metus
                  non viverra. Sed condimentum arcu nulla, eget pretium nisi aliquam id. Suspendisse purus lorem,
                  ultrices vel pretium non, facilisis sed leo. Phasellus facilisis commodo imperdiet. Integer
                  condimentum mi ac elit cursus, eget sollicitudin sem bibendum. Maecenas id vestibulum elit. Curabitur
                  at convallis ante. Etiam tincidunt nisl at posuere euismod. Morbi eget mollis diam. Suspendisse
                  rhoncus lacinia tortor. Duis interdum, leo id porttitor accumsan, orci tortor aliquam urna, in
                  pharetra urna ipsum nec est.`,
    github: "https://github.com/Kevincxv/QuizifyAI.git",
    banner: { image: "/quizmify-ai/horizon_hackathon.jpg", className: "object-contain bg-[#012E2B]" },
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
    stack: ["Streamlit", "Python", "LangChain", "ChatGPT"],
  },
  {
    name: "MediCost",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi diam, interdum ut massa vel,
                  ullamcorper interdum arcu. In sed scelerisque lacus. Vivamus ut tortor tellus. Donec iaculis ac metus
                  non viverra. Sed condimentum arcu nulla, eget pretium nisi aliquam id. Suspendisse purus lorem,
                  ultrices vel pretium non, facilisis sed leo. Phasellus facilisis commodo imperdiet. Integer
                  condimentum mi ac elit cursus, eget sollicitudin sem bibendum. Maecenas id vestibulum elit. Curabitur
                  at convallis ante. Etiam tincidunt nisl at posuere euismod. Morbi eget mollis diam. Suspendisse
                  rhoncus lacinia tortor. Duis interdum, leo id porttitor accumsan, orci tortor aliquam urna, in
                  pharetra urna ipsum nec est.`,
    github: "https://github.com/kennethcxv/hackinmiami.git",
    website: "https://devpost.com/software/medic-cost",
    banner: { image: "/medicost/hackinmiami.jpg", className: "object-contain object-bottom bg-[#FCBEFF]" },
    images: ["/elostack/elostack_banner.png", "/aplanes/aplanes_banner.png", "/speedburn/speedburn_banner.png"],
    stack: ["React", "Next.js", "JavaScript", "TailwindCSS", "Google Gemini", "Google Cloud", "Vercel"],
  },
];
