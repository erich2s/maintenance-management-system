"use client";
/// <reference path="@uiw/react-amap-types" />
import PageTransition from "@/components/PageTransition";
import Map from "@/components/admin/Map";
import React, { useEffect, useState } from "react";

export default function page() {
  const [height, setHeight] = useState(0);

  // 监听窗口大小变化
  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 16 * 4);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <PageTransition>
        <div className="flex h-full w-full">
          <div className="w-[40%]">box</div>
          <div className="h-full w-[60%]">
            <Map height={height} />
          </div>
        </div>
      </PageTransition>
    </>
  );
}
