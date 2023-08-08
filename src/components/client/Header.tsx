"use client";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import MotionHeaderLabel from "@/components/MotionHeaderLabel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
export default function Header() {
  const path = usePathname();
  return (
    <>
      <header
        className="fixed  top-0 z-20 flex h-14 w-full justify-center bg-white/80  px-6 py-8 backdrop-blur-sm backdrop-saturate-200
      "
      >
        <div className="flex w-full max-w-[75rem] items-center justify-between">
          <MotionHeaderLabel />
          <AnimatePresence>
            {path !== "/client/info" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{ opacity: 0, y: -5 }}
              >
                <Link href="/client/info">
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={50}
                    className="rounded-full p-[1px] saturate-150"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      {/* 占位用 */}
      <div className="mb-4 h-14 px-6 py-8 "></div>
    </>
  );
}
