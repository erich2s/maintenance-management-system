"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function page() {
  return (
    <>
      <PageWrapper>
        <TestComponent />
      </PageWrapper>
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
