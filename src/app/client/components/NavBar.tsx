"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { NavLinksContext } from "@/context/NavLinksProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NavBar({ className }: { className?: string }) {
  const path = usePathname();
  const { links, setCurrentLink } = useContext(NavLinksContext);
  return (
    <>
      <Sheet>
        <nav
          className={cn(
            "fixed  bottom-0 flex h-[5.5rem] w-full select-none items-center justify-around overflow-hidden border-t  bg-white/80 backdrop-blur backdrop-saturate-200 ",
            className,
          )}
        >
          {links.map((link) => {
            if (link.label === "Add") {
              return (
                <SheetTrigger
                  key={link.label}
                  className=" mb-9  flex cursor-pointer flex-col items-center  rounded-xl  bg-opacity-40 px-4 py-2"
                >
                  {link.icon}
                </SheetTrigger>
              );
            }
            return (
              <Link
                href={link.href}
                key={link.label}
                onClick={() => setCurrentLink!(link)}
                className="mb-9 flex flex-col items-center  rounded-xl bg-opacity-40 px-4 py-2"
              >
                {path === link.href ? link.iconSelected : link.icon}
              </Link>
            );
          })}
        </nav>
        <div className="h-[5.5rem] w-full "></div>
        <SheetContent side={"bottom"} className="h-5/6 rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
