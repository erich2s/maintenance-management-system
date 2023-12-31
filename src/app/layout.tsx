import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { NavLinksProvider } from "@/context/NavLinksProvider";
import { Inter } from "next/font/google";
import { Viewport } from "next";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "宿舍报修系统",
  description: "广西大学行健文理学院宿舍报修系统",
  authors: [
    {
      name: "Eric Huang",
      url: "https://instagram.com/eric.h2s?igshid=OGQ5ZDc2ODk2ZA==",
    },
    {
      name: "黄士崧",
      url: "https://instagram.com/eric.h2s?igshid=OGQ5ZDc2ODk2ZA==",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json"></link>
      </head>
      <AuthProvider>
        <NavLinksProvider>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </NavLinksProvider>
      </AuthProvider>
    </html>
  );
}
