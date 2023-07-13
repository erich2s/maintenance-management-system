"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "@/components/Spinner";
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <TestComponent />
    </>
  );
}

function TestComponent() {
  const { data: session } = useSession();
  return (
    <>
      <div className=" animate-pulse">高校宿舍报修系统</div>
      <span className="flex">
        username: {session?.user.username || <Spinner />} role:{" "}
        {session?.user.role || <Spinner />}
      </span>
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
