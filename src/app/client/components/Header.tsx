"use client";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import { useContext } from "react";
import { NavLinksContext } from "@/context/NavLinksProvider";
import { motion } from "framer-motion";
export default function Header() {
  const { currentLink } = useContext(NavLinksContext);
  return (
    <>
      <header
        className="fixed top-0 flex h-14 w-full justify-center   border-b bg-white/80  px-6 py-8 backdrop-blur-sm backdrop-saturate-200
      "
      >
        <div className="z-20 flex w-full max-w-[75rem] items-center justify-between">
          <motion.h1
            key={currentLink?.href}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text text-2xl font-bold  text-foreground"
          >
            {currentLink?.label}
          </motion.h1>
          <Image
            src={avatar}
            alt="avatar"
            width={50}
            className="rounded-full p-[1px] saturate-150"
          />
        </div>
      </header>
      {/* 占位用 */}
      <div className="h-14 px-6 py-8"></div>
    </>
  );
}
