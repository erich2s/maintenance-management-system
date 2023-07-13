"use client";
import { AnimatePresence, motion } from "framer-motion";

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3}}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
