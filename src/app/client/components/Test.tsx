"use client";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Test() {
  const { data: session } = useSession();
  return (
    <>
      <div className=" animate-pulse">高校宿舍报修系统</div>
      <span className="flex">
        username: {session?.user.username || <Spinner />} role:{" "}
        {session?.user.role || <Spinner />}
      </span>
      <Button
        variant="destructive"
        onClick={() => {
          signOut();
        }}
      >
        sign out
      </Button>
    </>
  );
}
