"use client";
import { Link, NavLinksContext } from "@/context/NavLinksProvider";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function MotionHeaderLabel() {
  const { links } = useContext(NavLinksContext);
  const [currentLink, setCurrentLink] = useState<Link>(links[0]);
  const path = usePathname();
  useEffect(() => {
    let currentLinkFound = false;
    links.forEach((link) => {
      if (link.href === path && !currentLinkFound) {
        setCurrentLink!(link);
        currentLinkFound = true;
      }
    });
  }, [path]);
  return (
    <motion.h1
      key={currentLink?.href}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="text-2xl font-bold  text-foreground"
      exit={{ opacity: 0, x: -10 }}
    >
      {currentLink?.label}
    </motion.h1>
  );
}
