"use client";

import { NavLinksContext } from "@/context/NavLinksProvider";
import { motion } from "framer-motion";
import { useContext } from "react";

export default function MotionHeaderLabel() {
  const { currentLink } = useContext(NavLinksContext);
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
