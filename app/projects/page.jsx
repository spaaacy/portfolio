"use client";

import NavBar from "@/components/NavBar";
import ProjectModal from "@/components/ProjectModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { Kanit } from "next/font/google";
import Footer from "@/components/Footer";
const kanit = Kanit({ subsets: ["latin"], weight: "600" });

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState();

  return (
    <div className="relative w-full">
      <NavBar />
      <main>
        <h1 className="text-4xl font-bold mt-20 max-md:text-center">My Projects</h1>
        <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 gap-4 mt-8">
          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() => {
                if (p.redirect) {
                  window.open(p.website, "_blank");
                } else {
                  setProject(p);
                  setShowModal(true);
                }
              }}
              className="h-[16rem] md:h-[24rem] max-md:max-w-[28rem] w-full mx-auto relative px-8 py-4 hover:cursor-pointer transition group hover:scale-[101%] hover:shadow-[-10px_10px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-[-2px] hover:border hover:border-black"
            >
              {p.inProgress && (
                <p className="text-white font-semibold rounded-full bg-black bg-opacity-60 backdrop-blur px-4 py-2 absolute top-4 right-4">
                  In Progress
                </p>
              )}
              <div className="bg-black px-4 py-1 rounded-full flex justify-start items-center gap-2 absolute bottom-4 left-4 backdrop-blur bg-opacity-50">
                {p.logo && (
                  <Image alt="logo" src={p.logo} width={48} height={48} className="w-10 h-10 rounded-full -ml-3" />
                )}
                <h2 className={` text-2xl text-white ${p.font ? p.font : ""}`}>{p.name}</h2>
                <div className="flex gap-2 items-center text-xl">
                  {p.github && (
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      href={p.github}
                      className="text-neutral-400 hover:text-white"
                    >
                      <FaGithub />
                    </Link>
                  )}
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
              <Image
                alt="banner"
                src={p.banner.image}
                fill={true}
                className={`-z-50 ${p.banner.className} max-sm:object-contain`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 -z-40 via-black/20 group-hover:via-teal-100/5 group-hover:from-teal-100" />
            </div>
          ))}
        </div>
        {showModal && <ProjectModal project={project} setShowModal={setShowModal} />}
      </main>
      <Footer />
    </div>
  );
};

export default page;

export const projects = [
  {
    name: "TryRewind",
    about: `EloStack is your hub to discover and venture on new projects in your journey to programming mastery. Built with learners in mind, our goal is to build a community around personal projects. Whether you're looking to dig into long-term projects or simply work on something on the side, EloStack is there to accomodate all your needs. We value real-world experience over raw time spent writing code, and want to best prepare you for working in teams. Create great projects and build a better portfolio, and escape the lonesome world of personal projects.`,
    banner: { image: "/rewind/rewind_banner.png", className: "object-cover bg-[#170048]" },
    logo: "/rewind/rewind_logo.png",
    website: "https://www.tryrewind.co",
    redirect: true,
  },
  {
    name: "EloStack v2",
    about: `EloStack is your hub to discover and venture on new projects in your journey to programming mastery. Built with learners in mind, our goal is to build a community around personal projects. Whether you're looking to dig into long-term projects or simply work on something on the side, EloStack is there to accomodate all your needs. We value real-world experience over raw time spent writing code, and want to best prepare you for working in teams. Create great projects and build a better portfolio, and escape the lonesome world of personal projects.`,
    github: "https://github.com/spaaacy/elostack",
    banner: { image: "/elostack/elostack_banner.png", className: "object-cover object-right bg-[#170048]" },
    logo: "/elostack/elostack_logo.png",
    font: kanit.className,
    video: "https://www.youtube.com/embed/-4HMsHo6LLY?si=Uh68nqTu7TdZkuBI",
    website: "https://www.elostack.com",
    stack: [
      "React.js",
      "Next.js",
      "JavaScript",
      "Node.js",
      "TailwindCSS",
      "SendGrid",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Google Cloud",
      "Vercel",
      "CRON",
    ],
  },
  {
    name: "EloStack v1",
    about: `EloStack started out with a completely different concept, aiming to tackle redundancy in the technical screening process of candidates for a job opening. However, it later morphed into an email campaign tool for job seekers to reach recruiters. The content below showcases the latter idea.`,
    github: "https://github.com/spaaacy/elostack-old",
    banner: { image: "/elostack/elostack_old_2.png", className: "object-cover object-top bg-[#0F0F1C]" },
    logo: "/elostack/elostack_logo_old.jpg",
    font: kanit.className,
    video: "https://www.youtube.com/embed/cotuNW5tZTY?si=qWmKg38uheIB3ts4",
    images: ["/elostack/elostack_old_1.png", "/elostack/elostack_old_2.png", "/elostack/elostack_old_3.png"],
    stack: [
      "React.js",
      "Next.js",
      "JavaScript",
      "Node.js",
      "TailwindCSS",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Google Cloud",
      "Vercel",
      "CRON",
    ],
  },
  {
    name: "MedXpress",
    inProgress: true,
    about: `Led a 4-person team in building an online platform for purchasing pharmaceuticals as part of an Advanced Software Engineering graduate course.`,
    github: "https://github.com/spaaacy/medxpress",
    banner: { image: "/medxpress/medxpress_banner.png", className: "object-contain object-top bg-white" },
    images: ["/medxpress/medxpress_banner.png"],
    logo: "/medxpress/medxpress_logo.png",
    website: "https://www.medxpress.store",
    stack: ["React.js", "Next.js", "JavaScript", "TailwindCSS", "Vercel", "Supabase", "PostgreSQL"],
  },
  {
    name: "MedXpress",
    inProgress: false,
    about: `Led a 4-person team in building an online platform for purchasing pharmaceuticals as part of an Advanced Software Engineering graduate course.`,
    github: "https://github.com/spaaacy/medxpress",
    banner: { image: "/medxpress/medxpress_banner.png", className: "object-contain object-top bg-white" },
    images: ["/medxpress/medxpress_banner.png"],
    logo: "/medxpress/medxpress_logo.png",
    website: "https://www.medxpress.store",
    stack: ["React.js", "Next.js", "JavaScript", "TailwindCSS", "Vercel", "Supabase", "PostgreSQL"],
  },
  {
    name: "TransactAI",
    about: `
TransactAI is your means of using bank statements to keep track of monthly subscriptions. No longer will Big Tech pocket your money without your knowledge, once again, giving power back to the consumer. Users can upload their PDF for their latest bank statements to our website, which will then use AI to analyze and detect monthly payments to subscription services you might have not been aware of.`,
    github: "https://github.com/spaaacy/transact-ai",
    logo: "/transact-ai/transactai_logo.png",
    banner: { image: "/transact-ai/transactai_banner.jpg", className: "object-cover" },
    video: "https://www.youtube.com/embed/rmgrLsMVDc0?si=Du_rkhKXujdgUFNX",
    website: "https://amipayingfornetflix.com",
    stack: ["React.js", "Next.js", "JavaScript", "TailwindCSS", "Bootstrap", "ChatGPT", "Vercel"],
  },
  {
    name: "APLanes",
    about: `A Ride-hailing application built for my university during undergrad. Worked on the project for 4-months with a colleague with the help of the supervision of the CIO and CTO.`,
    github: "https://github.com/spaaacy/ap-lanes",
    banner: { image: "/aplanes/aplanes_banner.png", className: "object-cover" },
    images: [
      "/aplanes/phone_1.png",
      "/aplanes/phone_2.png",
      "/aplanes/phone_3.png",
      "/aplanes/phone_4.png",
      "/aplanes/phone_5.png",
      "/aplanes/phone_6.png",
    ],
    stack: ["Flutter", "Dart", "Firebase", "AWS", "Google Maps"],
  },
  {
    name: "MediCost",
    about: `MediCost is a user-friendly platform where individuals can enter their symptoms, and they will receive potential diagnoses powered by AI. Additionally, the platform provides estimated treatment costs based on real-world data. This gives users a comprehensive view of their healthcare journey, including financial implications.`,
    github: "https://github.com/kennethcxv/hackinmiami.git",
    website: "https://devpost.com/software/medic-cost",
    banner: { image: "/medicost/hackinmiami.jpg", className: "object-contain sm:object-bottom bg-[#FCBEFF]" },
    stack: ["React.js", "Next.js", "JavaScript", "TailwindCSS", "Google Gemini", "Google Cloud", "Vercel"],
    video: "https://www.youtube.com/embed/4GSu6jT4AB4?si=-pvFWREYto4zYwbP",
  },
  {
    name: "GiveNow",
    about:
      "Location-based charity box idea built for PayHack 2023. Uses phone location to detect nearby charity boxes to donate to. Developed using Flutter.",
    github: "https://github.com/spaaacy/give-now",
    banner: { image: "/give-now/payhack_logo.png", className: "object-contain px-4" },
    images: ["/give-now/home.gif", "/give-now/donation.gif", "/give-now/location.gif"],
    stack: ["Flutter", "Dart", "Google Maps"],
  },
  {
    name: "InsightIQ",
    about: `Uses the ChatGPT API and publicly available Google Reviews of hotels to analyze a hotels positive and negative aspects, and areas of improvement. Features location analysis, monthly analysis, competitor analysis, and individual hotel analysis. Developed using Flutter.`,
    github: "https://github.com/spaaacy/insight-iq",
    banner: { image: "/insight-iq/impacthack_logo.png", className: "object-contain px-4" },
    images: [
      "/insight-iq/location.gif",
      "/insight-iq/business.gif",
      "/insight-iq/monthly.gif",
      "/insight-iq/comparison.gif",
    ],
    stack: ["Flutter", "Dart", "ChatGPT"],
  },
  {
    name: "QuizmifyAI",
    about: `A quiz generator using PDFs built for UM Horizon AI Hackathon 2023. Provided a PDF, the website will generate a quiz for a specified chapter, using vector databases and ChatGPT.`,
    github: "https://github.com/Kevincxv/QuizifyAI.git",
    banner: { image: "/quizmify-ai/horizon_hackathon.jpg", className: "object-contain bg-[#012E2B]" },
    images: ["/quizmify-ai/image_1.png", "/quizmify-ai/image_2.png"],
    stack: ["Streamlit", "Python", "LangChain", "ChatGPT"],
  },
];
