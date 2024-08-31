"use client";

import NavBar from "@/components/NavBar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Noto_Serif } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
const noto = Noto_Serif({ subsets: ["latin"], weight: "600" });

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
          <div className="fixed top-1/2 -translate-y-1/2 left-[20%]">
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
      </Parallax>
    </div>
  );
}
