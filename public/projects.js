import { Kanit } from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: "600" });

export const projects = [
  {
    name: "EloStack v2",
    about: `EloStack is your hub to discover and venture on new projects in your journey to programming mastery. Built with learners in mind, our goal is to build a community around personal projects. Whether you're looking to dig into long-term projects or simply work on something on the side, EloStack is there to accomodate all your needs. We value real-world experience over raw time spent writing code, and want to best prepare you for working in teams. Create great projects and build a better portfolio, and escape the lonesome world of personal projects.`,
    github: "https://github.com/spaaacy/elostack",
    banner: { image: "/elostack/elostack_banner.png", className: "object-cover object-right" },
    logo: "/elostack/elostack_logo.png",
    font: kanit.className,
    video: "https://www.youtube.com/embed/-4HMsHo6LLY?si=Uh68nqTu7TdZkuBI",
    website: "https://www.elostack.com",
    stack: [
      "React",
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
    name: "EloStack v1",
    about: `EloStack started out with a completely different concept, aiming to tackle redundancy in the technical screening process of candidates for a job opening. However, it later morphed into an email campaign tool for job seekers to reach recruiters. The content below showcases the latter idea.`,
    github: "https://github.com/spaaacy/elostack-old",
    banner: { image: "/elostack/elostack_old_2.png", className: "object-cover" },
    logo: "/elostack/elostack_logo_old.jpg",
    font: kanit.className,
    video: "https://www.youtube.com/embed/cotuNW5tZTY?si=qWmKg38uheIB3ts4",
    images: ["/elostack/elostack_old_1.png", "/elostack/elostack_old_2.png", "/speedburn/elostack_old_3.png"],
    stack: [
      "React",
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
    banner: { image: "/medicost/hackinmiami.jpg", className: "object-contain object-bottom bg-[#FCBEFF]" },
    stack: ["React", "Next.js", "JavaScript", "TailwindCSS", "Google Gemini", "Google Cloud", "Vercel"],
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
  {
    name: "SpeedBurn",
    about: `An token based blockchain social media application, built around creating "exclusive" communities--similar to a country club--with communities functioning as independant DAOs. Uses the Ethereum blockchain and built using Next.js, Ethers, Solidity, and MongoDB.`,
    github: "https://github.com/spaaacy/speedburn",
    banner: { image: "/speedburn/speedburn_banner.png", className: "object-left object-cover" },
    images: ["/speedburn/speedburn_banner.png"],
    stack: ["React", "Next.js", "JavaScript", "TailwindCSS", "Ethereum", "Solidity"],
  },
];
