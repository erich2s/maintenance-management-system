"use client";
import { Link, NavLinksContext } from "@/context/NavLinksProvider";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useContext, useMemo } from "react";

export default function MotionHeaderLabel() {
  const { links } = useContext(NavLinksContext);
  const path = usePathname();
  const currentLink = useMemo(() => {
    let currentLinkFound = false;
    let _currentLink: Link = links[0];
    links.forEach((link) => {
      if (link.href === path && !currentLinkFound) {
        _currentLink = link;
        currentLinkFound = true;
      }
    });
    return _currentLink;
  }, [path]);

  return (
    <motion.h1
      key={currentLink?.href}
      initial={{ opacity: 0, x: -10 }}
      transition={{ type: "spring", stiffness: 200 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-2xl font-bold text-foreground"
    >
      {currentLink ? currentLink.label : "null"}
    </motion.h1>
  );
}
