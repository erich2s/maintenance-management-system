"use client";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import ReactPullToRefresh from "react-pull-to-refresh/index";

export default function page() {
  return (
    <>
      <PageTransition>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="my-4 flex h-20 w-full items-center justify-center bg-blue-300"
          >
            {index}
          </div>
        ))}
      </PageTransition>
    </>
  );
}
