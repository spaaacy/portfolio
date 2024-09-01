"use client";

import NavBar from "@/components/NavBar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Noto_Serif, Roboto_Mono } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
const noto = Noto_Serif({ subsets: ["latin"], weight: "600" });
const roboto = Roboto_Mono({ subsets: ["latin"], weight: "variable" });

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Parallax pages={3}>
        <ParallaxLayer speed={0.5}>
          <div>
            <Image fill={true} src={"/squares.png"} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer speed={1}>
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
        <ParallaxLayer offset={0.8} speed={1.1}>
          <div className="fixed top-1/2 -translate-y-1/2 left-[25%]">
            <div className="w-52 h-52 relative drop-shadow-xl">
              <Image src={"/headshot.jpg"} fill={true} style={{ objectFit: "cover" }} className="rounded-full" />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.8} speed={1}>
          <div className="bg-neutral-900 drop-shadow-xl text-neutral-50 max-w-[48rem] rounded-xl p-8 fixed top-1/2 -translate-y-1/2 left-[40%]">
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
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1} className="flex justify-center items-start">
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
                      {technologies[t]}
                    </p>
                  </div>
                );
              })}
            </ul>
            <h2 className={`${roboto.className} text-2xl font-semibold text-center mt-8`}>LANGUAGES</h2>
            <ul className="flex justify-center items-center gap-24 mt-8">
              {languages_images.map((t, i) => {
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
                      {languages[t]}
                    </p>
                  </div>
                );
              })}
            </ul>
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

const languages = {
  "c++.png": "c++",
  "python.webp": "python",
  "js.png": "javascript",
  "kotlin.png": "kotlin",
  "dart.png": "dart",
  "java.png": "java",
  "solidity.svg": "solidity",
};

const technologies = {
  "ethereum.png": "ethereum",
  "flutter.png": "flutter",
  "mongodb.png": "mongodb",
  "nextjs.png": "nextjs",
  "nodejs.png": "nodejs",
  "postgresql.png": "postgresql",
  "react.png": "react",
};
