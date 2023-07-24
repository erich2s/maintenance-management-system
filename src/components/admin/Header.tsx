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
import { useState } from "react";
import { Spinner } from "../Spinner";
export default function Header({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
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
        <DropdownMenuContent className="mx-8 p-2">
          <DropdownMenuLabel className="flex items-center gap-4 ">
            <Image
              src={avatar}
              alt="avatar"
              width={50}
              className="rounded-full saturate-150"
            />
            <div>
              <div className="text-base">{session?.user.name}</div>
              <div className="font-light text-gray-500  ">
                @{session?.user.username}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Button
            variant={"outline"}
            onClick={() => {
              setIsLoading(true);
              signOut().then(() => {
                setIsLoading(false);
              });
            }}
            className="h-8 w-full"
          >
            {isLoading ? <Spinner /> : "注销"}
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
