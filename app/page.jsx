"use client";

import NavBar from "@/components/NavBar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Noto_Serif, Roboto_Mono } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
const noto = Noto_Serif({ subsets: ["latin"], weight: "variable" });
const roboto = Roboto_Mono({ subsets: ["latin"], weight: "variable" });
import { FaGithub, FaGraduationCap, FaTools, FaUser } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Footer from "@/components/Footer";

export default function Home() {
  const parallaxRef = useRef();

  const [windowWidth, setWindowWidth] = useState(typeof window !== undefined ? window.innerWidth : null);
  console.log(windowWidth);

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar parallaxRef={parallaxRef} />
      <NavBar />

      <Parallax pages={windowWidth < 640 ? 3.8 : 2.8} ref={parallaxRef}>
        <ParallaxLayer offset={0} factor={1} speed={0.7}>
          <div>
            <Image fill={true} src={"/stars.jpg"} className="-z-50" />
            <div className="bg-black bg-opacity-50  h-screen w-screen" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} factor={1} speed={0.2}>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-white drop-shadow-xl ${noto.className} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center`}
          >
            <h1 className="text-6xl font-bold text-center">
              Hello,
              <br />
              I'm Aakif Mohamed
            </h1>
            <h2 className="text-xl font-light mt-4 text-center bg-neutral-900 backdrop-blur-sm px-4 py-2 rounded-full bg-opacity-60 ">
              Full-Stack Developer and Software Engineer
            </h2>
            <div className="text-2xl flex gap-4 mt-4 bg-neutral-900 backdrop-blur-sm px-2 py-1 rounded-full bg-opacity-60">
              <Link
                target="_blank"
                href="https://www.github.com/spaaacy"
                className="p-2 rounded-full hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] transition"
              >
                <FaGithub />
              </Link>
              <Link
                className="p-2 rounded-full hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] transition"
                target="_blank"
                href="https://www.linkedin.com/in/aakifmohamed"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </motion.div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} factor={windowWidth < 640 ? 1 : 0.5} speed={0.2}>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="fixed top-1/2 sm:mr-10 md:mr-20 -translate-y-1/2 right-1/2 flex flex-col justify-center
            items-center"
          >
            <div className="max-sm:w-32 max-sm:h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 relative drop-shadow-xl">
              <Image
                src={"/headshot.jpg"}
                width={208}
                height={208}
                style={{ objectFit: "cover" }}
                className="max-sm:w-32 max-sm:h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full"
              />
            </div>
          </motion.div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} factor={windowWidth < 640 ? 1 : 0.5} speed={0.1}>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col fixed left-[50%] top-1/2 -translate-y-1/2 justify-center items-start gap-4 px-8"
          >
            <h3 className={`${roboto.className} text-2xl font-bold text-center py-2 px-4 text-white bg-black`}>
              Education
            </h3>
            <p className="text-xs -mb-2 italic text-neutral-600">January 2024—April 2024</p>
            <div className="px-4 py-2 border-2 border-black border-dashed rounded w-full md:flex max-md:flex-col gap-8 justify-start items-center">
              <Image src={"/fiu.png"} width={48} height={48} className="w-12 h-12 object-contain" />
              <div>
                <span className="font-bold">Florida International University</span>
                <br />
                Miami, FL
                <br />
                <span className="italic">Master of Science in Computer Science</span>
              </div>
            </div>
            <p className="text-xs -mb-2 italic text-neutral-600">September 2020—August 2023</p>
            <div className="px-4 py-2 border-2 border-black border-dashed rounded w-full md:flex max-md:flex-col gap-8 justify-start items-center">
              <Image src={"/apu.png"} width={48} height={48} className="w-12 h-12 object-contain" />
              <div>
                <span className="font-bold">Asia Pacific University of Technology & Innovation</span>
                <br />
                Kuala Lumpur, Malaysia
                <br />
                <span className="italic">Bachelor of Science in Computer Science</span>
              </div>
            </div>
          </motion.div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={windowWidth < 640 ? 2 : 1.8}
          factor={windowWidth < 640 ? 1.4 : 0.6}
          speed={0.1}
          className=" flex justify-center items-center "
        >
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center"
          >
            <h3 className={`${roboto.className} text-2xl font-bold text-center py-2 px-4 text-white bg-black`}>
              MY TOOLS OF TRADE
            </h3>
            <h2 className={`${roboto.className} text-lg font-semibold text-center mt-8`}>TECHNOLOGIES</h2>
            <ul className="flex justify-center items-center gap-12 mt-8 flex-wrap px-8">
              {technologies_images.map((t, i) => {
                return (
                  <div className="relative flex flex-col justify-center items-center hover:scale-125 transition group gap-2">
                    <p
                      className={`${roboto.className} font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-xs`}
                    >
                      {technologies_names[t]}
                    </p>
                    <Image
                      className="h-[60px] w-[60px] object-contain"
                      key={i}
                      src={`/technologies/${t}`}
                      width={60}
                      height={60}
                    />
                    <p
                      className={`${roboto.className} font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-xs`}
                    >
                      {technologies_prof[t]}
                    </p>
                  </div>
                );
              })}
            </ul>
            <h2 className={`${roboto.className} text-lg font-semibold text-center mt-8`}>LANGUAGES</h2>
            <ul className="flex justify-center items-center gap-12 mt-8 flex-wrap px-8">
              {languages_images.map((l, i) => {
                return (
                  <div className="relative flex flex-col justify-center items-center hover:scale-125 transition group gap-2">
                    <p
                      className={`${roboto.className} font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-xs`}
                    >
                      {languages_names[l]}
                    </p>
                    <Image
                      className="h-[60] w-[60] object-contain"
                      key={i}
                      src={`/languages/${l}`}
                      width={60}
                      height={60}
                    />
                    <p
                      className={`${roboto.className} font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-xs`}
                    >
                      {languages_prof[l]}
                    </p>
                  </div>
                );
              })}
            </ul>
          </motion.div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={windowWidth < 640 ? 3.4 : 2.4}
          factor={0.3}
          speed={0.2}
          className="flex flex-col justify-center items-center w-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-[1260px] flex items-center justify-center flex-col"
          >
            <h3 className={`${roboto.className} max-md:text-3xl md:text-5xl font-bold text-center py-2 px-4 `}>
              Contact Me
            </h3>
            <div className="text-2xl text-black flex gap-4 mt-4">
              <Link
                target="_blank"
                href="mailto:aakifahamath@gmail.com"
                className="p-2 rounded-full text-neutral-500 hover:text-[rgb(199,22,16)] hover:shadow-[0_0_10px_3px_rgba(199,22,16,1)] transition"
              >
                <MdOutlineEmail />
              </Link>

              <Link
                className="p-2 rounded-full text-neutral-500 hover:text-[rgb(8,133,27)] hover:shadow-[0_0_10px_3px_rgba(8,133,27,0.8)] transition"
                target="_blank"
                href="tel:7868678766"
              >
                <FaPhone />
              </Link>
            </div>
          </motion.div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={windowWidth < 640 ? 3.7 : 2.7}
          factor={0.1}
          className="flex flex-col justify-end items-center w-full"
        >
          <Footer />
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
