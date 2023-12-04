import type { Metadata } from "next";
import { Noto_Sans_Thai, Sarabun } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

const noto_sans_thai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "700"],
  variable: "--font-noto-sans",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "700"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "SC Technician Companion App",
  description: "SC Technician Companion App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${noto_sans_thai.variable}  ${sarabun.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
