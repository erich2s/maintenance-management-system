"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
export default function Home() {
  const {data:session} = useSession();
  console.log(session);
  return (
    <>
      <div className=" animate-pulse">高校宿舍报修系统</div>
      <Button
        onClick={() => {
          signOut();
        }}
        className="bg-red-500 hover:bg-red-600"
      >
        sign out
      </Button>
    </>
  );
}
