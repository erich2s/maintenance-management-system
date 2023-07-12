"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <div className=" animate-pulse">高校宿舍报修系统</div>
      <span>
        username: {session?.user.username} role: {session?.user.role}
      </span>
      <Button
        onClick={ () => {
          signOut();
        }}
        className="bg-red-500 hover:bg-red-600"
      >
        sign out
      </Button>
    </>
  );
}
