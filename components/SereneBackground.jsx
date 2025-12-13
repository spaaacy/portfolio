"use client";

import { motion } from "framer-motion";

export default function SereneBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 serene-gradient" />

      <motion.div
        className="absolute -top-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-sky-200/25 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-emerald-200/20 blur-3xl"
        animate={{ x: [0, -90, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-indigo-200/15 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 serene-noise opacity-[0.07]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />
    </div>
  );
}

