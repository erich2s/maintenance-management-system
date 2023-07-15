"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { NavLinksContext } from "@/context/NavLinksProvider";
import { toast } from "react-hot-toast";

export default function NavBar({ className }: { className?: string }) {
  const path = usePathname();
  const { links, setCurrentLink } = useContext(NavLinksContext);
  return (
    <>
      <nav
        className={cn(
          "fixed bottom-0 flex h-[5.5rem] w-full select-none items-center justify-around overflow-hidden  border-t bg-white/80 backdrop-blur backdrop-saturate-200 ",
          className,
        )}
      >
        {links.map((link) => {
          if (link.label === "Add") {
            return (
              <div
                className=" mb-9 flex cursor-pointer flex-col items-center  rounded-xl bg-opacity-40 px-4 py-2"
                onClick={() => {
                  toast.success("请求报修");
                }}
              >
                {link.icon}
              </div>
            );
          }
          return (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setCurrentLink!(link)}
              className="mb-9 flex flex-col items-center  rounded-xl bg-opacity-40 px-4 py-2"
            >
              {path === link.href ? link.iconSelected : link.icon}
            </Link>
          );
        })}
      </nav>
      <div className="h-20  w-full "></div>
    </>
  );
}
