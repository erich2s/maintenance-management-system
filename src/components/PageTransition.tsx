"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
/**
 * NOTE:因为Framer Motion的大多数组件依赖于client side，直接用motion组件包裹服务端组件会导致Nextjs认为这是一个server component而不是client component，从而导致报错：
 *   https://www.reddit.com/r/nextjs/comments/13bxfho/comment/jjd0wcp/?utm_source=share&utm_medium=web2x&context=3
 *    所以这里手动添加"use client"，用一个PageWrapper的client component包裹所有的页面组件，这样就不会报错了
 *    未来Framer Motion将考虑添加"use client"进入motion组件。
 */
export default function PageWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  // Next.js 13 app router 的bug，exit效果无效
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
