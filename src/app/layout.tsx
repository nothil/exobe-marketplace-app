import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import MobileNav from "@/components/common/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eXobe Africa | Next-Gen Marketplace",
  description:
    "Empowering African entrepreneurs with modern marketplace trade systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brand-black text-white min-h-screen pb-16 md:pb-0`}
      >
        <Navbar />
        <main className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
