"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { NavLinksContext } from "@/context/NavLinksProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ReportForm from "./ReportForm";
export default function NavBar({ className }: { className?: string }) {
  const path = usePathname();
  const { links } = useContext(NavLinksContext);
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <nav
          className={cn(
            "fixed  bottom-0 flex h-[5.5rem] w-full select-none items-center justify-around overflow-hidden border-t  bg-white/80 backdrop-blur backdrop-saturate-200 ",
            className,
          )}
        >
          {links.map((link) => {
            if (link.href.startsWith("/client")) {
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
                  className="mb-9 flex flex-col items-center  rounded-xl bg-opacity-40 px-4 py-2"
                >
                  {path === link.href ? link.iconSelected : link.icon}
                </Link>
              );
            }
          })}
        </nav>
        <div className="h-[5.5rem] w-full "></div>
        <SheetContent side={"bottom"} className="rounded-t-3xl">
          <SheetHeader className="mb-2">
            <SheetTitle className="text-xl tracking-wide">
              填写报修单
            </SheetTitle>
          </SheetHeader>
          <ReportForm setSheetOpen={setSheetOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
}
