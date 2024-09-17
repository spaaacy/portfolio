import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-sm flex items-baseline justify-center">
      {"Built using "}
      <Image alt="next.js" className="inline ml-2" src={"/technologies/nextjs.png"} width={60} height={60} />, deployed
      on <Image alt="vercel" className="inline ml-2 mr-1" src={"/vercel.png"} width={60} height={60} />.
    </footer>
  );
};

export default Footer;
