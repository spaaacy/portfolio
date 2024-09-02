"use client";

import NavBar from "@/components/NavBar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Noto_Serif, Roboto_Mono } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
const noto = Noto_Serif({ subsets: ["latin"], weight: "variable" });
const roboto = Roboto_Mono({ subsets: ["latin"], weight: "variable" });
import { FaGithub, FaGraduationCap, FaTools, FaUser } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

export default function Home() {
  const parallaxRef = useRef();

  return (
    <div className="flex flex-col">
      <NavBar />
      <Sidebar parallaxRef={parallaxRef} />
      <Parallax pages={4} ref={parallaxRef}>
        <ParallaxLayer offset={0}>
          <div>
            <Image fill={true} src={"/squares.png"} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0}>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`drop-shadow-xl ${noto.className} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center`}
          >
            <h1 className="text-7xl font-bold text-center">
              Hello,
              <br />
              I'm Aakif Mohamed
            </h1>
            <h2 className="text-2xl">I build websites</h2>
          </motion.div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} factor={0.8}>
          <div className="fixed top-1/2 -translate-y-1/2 left-[25%] flex flex-col justify-center items-center">
            <div className="w-52 h-52 relative drop-shadow-xl">
              <Image
                src={"/headshot.jpg"}
                width={208}
                height={208}
                style={{ objectFit: "cover" }}
                className="w-52 h-52 rounded-full"
              />
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} factor={0.8}>
          <section
            id="about"
            className="bg-gradient-to-tr from-slate-700 to-indigo-900 drop-shadow-xl text-neutral-50 max-w-[48rem] rounded-xl p-8 fixed top-1/2 -translate-y-1/2 left-[40%]"
          >
            <div className="flex mt-2">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl">About</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi diam, interdum ut massa vel,
                  ullamcorper interdum arcu. In sed scelerisque lacus. Vivamus ut tortor tellus. Donec iaculis ac metus
                  non viverra. Sed condimentum arcu nulla, eget pretium nisi aliquam id. Suspendisse purus lorem,
                  ultrices vel pretium non, facilisis sed leo. Phasellus facilisis commodo imperdiet. Integer
                  condimentum mi ac elit cursus, eget sollicitudin sem bibendum. Maecenas id vestibulum elit. Curabitur
                  at convallis ante. Etiam tincidunt nisl at posuere euismod. Morbi eget mollis diam. Suspendisse
                  rhoncus lacinia tortor. Duis interdum, leo id porttitor accumsan, orci tortor aliquam urna, in
                  pharetra urna ipsum nec est. Cras felis nunc, malesuada quis ipsum non, posuere vehicula tellus. Cras
                  congue dictum ornare. Morbi vitae tincidunt neque. Vestibulum nunc dolor, faucibus vel facilisis ac,
                  laoreet vitae nulla. Phasellus convallis, risus sit amet fermentum elementum, turpis nibh vehicula
                  risus, eget posuere leo dolor eget neque. Praesent egestas scelerisque diam, vel vehicula ante
                  faucibus et. Praesent ultricies vel diam sit amet aliquet. Mauris pellentesque turpis et erat semper,
                  quis molestie felis tristique. Curabitur iaculis diam quis neque volutpat viverra. In eget velit vitae
                  quam venenatis dapibus. Mauris in neque fermentum metus commodo euismod vel eget arcu. Praesent
                  aliquet erat nulla, ac imperdiet arcu pharetra vitae.
                </p>
              </div>
            </div>
          </section>
        </ParallaxLayer>
        <ParallaxLayer offset={1.8} factor={0.6} className="flex flex-col justify-center items-center w-full">
          <div className="w-full max-w-[1260px] flex items-center justify-center flex-col">
            <h3 className={`${roboto.className} text-5xl font-bold text-center py-2 px-4 bg-black text-white w-full`}>
              EDUCATION
            </h3>
            <p className={`${noto.className} mt-8 text-center`}>
              <span className="text-xl font-bold">Master of Science in Computer Science</span>
              <br />
              Florida International University
              <br />
              Miami, FL
              <br />
              Spring 2025
            </p>
            <p className={`${noto.className} mt-8 text-center`}>
              <span className="text-xl font-bold">Bachelor of Science in Computer Science</span>
              <br />
              Asia Pacific University of Technology & Innovation
              <br />
              Kuala Lumpur, Malaysia
              <br />
              Class of 2022
            </p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2.4} factor={0.8} className="flex justify-center items-center">
          <div>
            <h3 className={`${roboto.className} text-5xl font-bold text-center py-2 px-4 bg-black text-white`}>
              SKILLS
            </h3>
            <h2 className={`${roboto.className} text-2xl font-semibold text-center mt-8`}>TECHNOLOGIES</h2>
            <ul className="flex justify-center items-center gap-24 mt-8">
              {technologies_images.map((t, i) => {
                return (
                  <div className="relative flex flex-col justify-center items-center hover:scale-125 transition group">
                    <Image
                      className="h-[100px] w-[100px] object-contain"
                      key={i}
                      src={`/${t}`}
                      width={100}
                      height={100}
                    />
                    <p
                      className={`${roboto.className} mt-4 font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    >
                      {technologies_names[t]}
                      {": "}
                      {technologies_prof[t]}
                    </p>
                  </div>
                );
              })}
            </ul>
            <h2 className={`${roboto.className} text-2xl font-semibold text-center mt-8`}>LANGUAGES</h2>
            <ul className="flex justify-center items-center gap-24 mt-8">
              {languages_images.map((l, i) => {
                return (
                  <div className="relative flex flex-col justify-center items-center hover:scale-125 transition group">
                    <Image
                      className="h-[100px] w-[100px] object-contain"
                      key={i}
                      src={`/${l}`}
                      width={100}
                      height={100}
                    />
                    <p
                      className={`${roboto.className} mt-4 font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    >
                      {languages_names[l]}
                      {": "}
                      {languages_prof[l]}
                    </p>
                  </div>
                );
              })}
            </ul>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3.2} factor={0.5} className="flex flex-col justify-center items-center w-full">
          <div className="w-full max-w-[1260px] flex items-center justify-center flex-col">
            <h3 className={`${roboto.className} text-5xl font-bold text-center py-2 px-4 `}>Contact Me</h3>
            <div className="text-2xl text-black flex gap-4 mt-4">
              <Link
                target="_blank"
                href="mailto:aakifahamath@gmail.com"
                className="p-2 rounded-full text-neutral-500 hover:text-[rgb(199,22,16)] hover:shadow-[0_0_10px_3px_rgba(199,22,16,1)] transition"
              >
                <MdOutlineEmail />
              </Link>
              <Link
                target="_blank"
                href="https://www.github.com/spaaacy"
                className="p-2 rounded-full text-neutral-500 hover:text-[rgb(110,84,148)] hover:shadow-[0_0_10px_3px_rgba(110,84,148,1)] transition"
              >
                <FaGithub />
              </Link>
              <Link
                className="p-2 rounded-full text-neutral-500 hover:text-[rgb(10,102,194)] hover:shadow-[0_0_10px_3px_rgba(10,102,194,0.8)] transition"
                target="_blank"
                href="https://www.linkedin.com/in/aakifmohamed"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                className="p-2 rounded-full text-neutral-500 hover:text-[rgb(8,133,27)] hover:shadow-[0_0_10px_3px_rgba(8,133,27,0.8)] transition"
                target="_blank"
                href="tel:7868678766"
              >
                <FaPhone />
              </Link>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

const languages_images = ["c++.png", "python.webp", "js.png", "kotlin.png", "dart.png", "java.png", "solidity.svg"];

const technologies_images = [
  "ethereum.png",
  "flutter.png",
  "mongodb.png",
  "nextjs.png",
  "nodejs.png",
  "postgresql.png",
  "react.png",
];

const languages_names = {
  "c++.png": "c++",
  "python.webp": "python",
  "js.png": "javascript",
  "kotlin.png": "kotlin",
  "dart.png": "dart",
  "java.png": "java",
  "solidity.svg": "solidity",
};

const technologies_names = {
  "ethereum.png": "ethereum",
  "flutter.png": "flutter",
  "mongodb.png": "mongodb",
  "nextjs.png": "nextjs",
  "nodejs.png": "nodejs",
  "postgresql.png": "postgresql",
  "react.png": "react",
};

const technologies_prof = {
  "ethereum.png": "3/5",
  "flutter.png": "4/5",
  "mongodb.png": "4/5",
  "nextjs.png": "5/5",
  "nodejs.png": "5/5",
  "postgresql.png": "5/5",
  "react.png": "5/5",
};

const languages_prof = {
  "c++.png": "3/5",
  "python.webp": "4/5",
  "js.png": "5/5",
  "kotlin.png": "4/5",
  "dart.png": "4/5",
  "java.png": "4/5",
  "solidity.svg": "4/5",
};
