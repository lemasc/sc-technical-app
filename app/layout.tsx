import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
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
        className={`${inter.variable} ${inter.className} ${sarabun.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
