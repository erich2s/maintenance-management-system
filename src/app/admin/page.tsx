"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function page() {
  return (
    <>
      <div>admin dashboard</div>
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
