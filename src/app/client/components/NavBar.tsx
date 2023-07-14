"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const links = [
  { href: "/client", label: "Home" },
  { href: "/client/info", label: "Info" },
];
export default function NavBar({ className }: { className?: string }) {
  const path = usePathname();
  return (
    <>
      <nav
        className={cn(
          "fixed bottom-0 flex h-14  w-full items-center justify-evenly border-t bg-white/80 backdrop-blur backdrop-saturate-200 ",
          className,
        )}
      >
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.href === path && "*"}
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="h-14  w-full "></div>
    </>
  );
}
