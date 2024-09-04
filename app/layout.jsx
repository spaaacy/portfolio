import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aakif Mohamed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-neutral-100 ${inter.className}`}>{children}</body>
    </html>
  );
}
