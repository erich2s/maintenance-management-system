"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/admin/Map"), { ssr: false });
import UnCompletedBox from "@/components/admin/UnCompletedBox";

export default async function page() {
  return (
    <>
      <div className="flex h-full w-full bg-white">
        <div className="bg-cyan h-[calc(100vh_-_4rem)] w-[40%]">
          <UnCompletedBox />
        </div>
        <div className="h-full w-[60%]">
          <Map />
        </div>
      </div>
    </>
  );
}
