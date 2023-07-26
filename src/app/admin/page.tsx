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
        <div className="flex h-full w-full bg-white ">
          <div className="bg-cyan h-[calc(100vh_-_4rem)] w-[40%]">
            <UnreadBox />
          </div>
          <div className="h-full w-[60%]">
            <Map />
          </div>
        </div>
      </PageTransition>
    </>
  );
}
