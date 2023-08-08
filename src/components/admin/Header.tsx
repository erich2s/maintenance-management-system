"use client";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { LogOut } from "lucide-react";
import { useLocalStorage } from "react-use";
export default function Header({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [subscribtion, setSubscribtion, removeSubscription] =
    useLocalStorage<PushSubscriptionJSON>("subscribtion");
  async function unsubscribe() {
    if ("serviceWorker" in navigator) {
      console.log("开始取消订阅");
      // 注册service worker
      const register = await navigator.serviceWorker.register(
        "/serviceWorker.js",
      );
      // 取消订阅
      register.pushManager.getSubscription().then((sub) => {
        console.log(sub);
        sub
          ?.unsubscribe()
          .then(() => {
            console.log("取消订阅成功");
          })
          .catch((err) => {
            console.log(err);

            return;
          });
      });
      // 将订阅发送到服务器
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("取消订阅成功");
      }
      // 清除localStorage
      removeSubscription();
    } else {
      console.log("serviceWorker不可用");
    }
  }
  return (
    <div
      className={cn(
        "flex h-16  w-full items-center justify-between border-b border-t bg-white px-5",
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
              width={48}
              className="rounded-full border  p-[3px] saturate-150"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-4 p-2">
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
            variant={"secondary"}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              signOut().then(() => {
                // 取消通知订阅
                unsubscribe();
                setIsLoading(false);
              });
            }}
            className="h-8 w-full hover:bg-rose-100 hover:text-rose-500"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="flex items-center justify-center">
                <LogOut width={16} className="mr-2" />
                <span>注销</span>
              </div>
            )}
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
