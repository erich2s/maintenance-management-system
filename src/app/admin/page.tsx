"use client";
const Map = dynamic(() => import("@/components/admin/Map"), { ssr: false });
// import Map from "@/components/admin/Map";
import UnCompletedBox from "@/components/admin/UnCompletedBox";
import { useEffect } from "react";
import { useSubscriptionStore } from "@/stores/subscriptionStore";
import dynamic from "next/dynamic";

export default function page() {
  //通知订阅部分
  const { subscription, subscribe, unsubscribe } = useSubscriptionStore();
  useEffect(() => {
    //  进入主页时，如果没有订阅，就立即订阅
    if (!subscription) {
      subscribe({ showToast: false });
    }
  }, []);
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
