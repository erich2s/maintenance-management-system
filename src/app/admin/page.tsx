"use client";
import PageTransition from "@/components/PageTransition";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/admin/Map"), { ssr: false });
// import Map from "@/components/admin/Map";
import UnCompletedBox from "@/components/admin/UnCompletedBox";

export default function page() {
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
