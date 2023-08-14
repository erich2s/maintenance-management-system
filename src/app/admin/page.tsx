"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/admin/Map"), { ssr: false });
import UnCompletedBox from "@/components/admin/UnCompletedBox";
import { useEffect } from "react";
import { useSubscriptionStore } from "@/stores/subscriptionStore";

export default function page() {
  //通知订阅部分
  const { subscription, subscribe, unsubscribe } = useSubscriptionStore();
  useEffect(() => {
    //  进入主页时，如果没有订阅，就立即订阅
    if (!subscription) {
      subscribe({ showToast: false });
    }
  }, [subscription]);
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
