import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CityProvider } from "@/contexts/CityContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muji Weather App",
  description: "A simple weather app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen`}
      >
        <CityProvider>
          <Header />
          {children}
          <Footer />
        </CityProvider>
      </body>
    </html>
  );
}
