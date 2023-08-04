"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { NavLinksContext } from "@/context/NavLinksProvider";
import { Yuji_Mai } from "next/font/google";
import { usePathname } from "next/navigation";
const yujiMai = Yuji_Mai({
  weight: "400",
  subsets: ["latin"],
});
export default function NavSideBar() {
  const { links } = useContext(NavLinksContext);
  return (
    <aside className="flex h-screen  min-w-[13rem]  flex-col items-center border-r px-2 py-1">
      {/* Logo */}
      <div className="flex h-14  w-[100%]  select-none items-center justify-center text-xl font-bold">
        <div>
          <Image
            src="/school-logo-purple.png"
            alt="school-logo"
            width={45}
            height={45}
          />
        </div>
        <div className={cn(yujiMai.className, "ml-2")}>西大行健学院</div>
      </div>
      {/* NavLinks */}
      <nav className="mt-3 flex w-full flex-col items-center justify-center px-1 text-[15px]">
        {links.map((link) => {
          if (link.href.startsWith("/admin")) {
            let activeStyle = "";
            if (link.href === usePathname()) {
              activeStyle =
                "hover:bg-primary bg-primary text-primary-foreground";
            }
            return (
              <Link
                href={link.href}
                key={link.label}
                className={cn(
                  "mb-1  flex h-11   w-full  items-center rounded-md px-5 py-2  transition-colors duration-200 ease-in-out hover:bg-gray-100",
                  activeStyle,
                )}
              >
                {link.icon}
                <span className="ml-4">{link.label}</span>
              </Link>
            );
          }
        })}
      </nav>
    </aside>
  );
}
