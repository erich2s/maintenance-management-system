"use client";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import MotionHeaderLabel from "@/components/MotionHeaderLabel";
export default function Header({ className }: { className?: string }) {
  const { data: session } = useSession();
  return (
    <div
      className={cn(
        "flex h-16  w-full items-center justify-between border-b bg-white px-10",
        className,
      )}
    >
      <MotionHeaderLabel />
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none outline-none">
          <div className="flex  items-center justify-around  rounded-full  p-1">
            <Image
              src={avatar}
              alt="avatar"
              width={42}
              className="rounded-full border p-[1px] saturate-150"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-md text-center">
            @{session?.user.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Button
            variant={"destructive"}
            onClick={() => {
              signOut();
            }}
            className="h-8 w-full"
          >
            signout
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
