"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/admin/Map"), { ssr: false });
import UnCompletedBox from "@/components/admin/UnCompletedBox";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";
import { urlBase64ToUint8Array } from "@/lib/utils";

export default function page() {
  const [subscription, setSubscription] =
    useLocalStorage<PushSubscriptionJSON>("subscribtion");
  // 生成pushSubscription，并将其保存到localStorage中后发送到服务器
  async function subscribe() {
    // serviceWorker只能在https和localhost下使用
    if ("serviceWorker" in navigator) {
      console.log("开始订阅");
      // 注册service worker
      const register = await navigator.serviceWorker.register(
        "/serviceWorker.js",
      );
      // 注册订阅
      const sub = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BDeQByhHcxy084_JFou3rHlqiSpFvPZhUWjQKb1QlU6TjXL8mJd3usKDsQDzEeZ1HJOuultQgtPRlGOqgrrLnQA",
        ),
      });
      setSubscription(sub);
      // 将订阅发送到服务器
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sub),
      });
      console.log(res);
    } else {
      console.log("serviceWorker不可用");
    }
  }
  useEffect(() => {
    if (!subscription) {
      subscribe();
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
