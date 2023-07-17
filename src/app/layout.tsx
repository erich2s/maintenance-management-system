import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
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
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
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
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
