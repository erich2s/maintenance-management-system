"use client";
import PageTransition from "@/components/PageTransition";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/admin/Map"), { ssr: false });
// import Map from "@/components/admin/Map";
import UnreadBox from "@/components/admin/UnreadBox";

export default function page() {
  return (
    <>
      <PageTransition>
        <div className="relative flex h-full w-full bg-white">
          <div className="h-full flex-1 ">
            <UnreadBox />
          </div>
          <div className="h-full w-[52vw]">
            <Map />
          </div>
        </div>
      </PageTransition>
    </>
  );
}
