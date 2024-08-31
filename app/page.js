"use client";

import NavBar from "@/components/NavBar";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Noto_Serif } from "next/font/google";
const noto = Noto_Serif({ subsets: ["latin"], weight: "600" });

export default function Home() {
  return (
    <div className="flex flex-col">
      <Parallax pages={3}>
        <ParallaxLayer speed={1}>
          <NavBar />
          <div
            className={`${noto.className} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center`}
          >
            <h1 className="text-7xl font-bold text-center">
              Hello,
              <br />
              I'm Aakif Mohamed
            </h1>
            <h2 className="text-2xl">I build websites</h2>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
  {
    /* <section className="h-[calc(100dvh)] relative">
      </section> */
  }
}
