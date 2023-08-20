import { urlBase64ToUint8Array } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SubscriptionState = {
  subscription: PushSubscriptionJSON | null;
  subscribe: ({ showToast }: { showToast: boolean }) => Promise<void>;
  unsubscribe: ({ showToast }: { showToast: boolean }) => Promise<void>;
};
export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: null,
      subscribe: async ({ showToast }) => {
        const promise = new Promise(async (resolve, reject) => {
          if (!("serviceWorker" in navigator)) {
            reject("serviceWorker不可用");
            console.log("serviceWorker不可用");
            return;
          }
          console.log("serviceWorker可用");
          const registration = await navigator.serviceWorker.register(
            "/serviceWorker.js",
          );
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_KEY as string,
            ),
          });
          // 保存到localStorage
          set({ subscription });
          // 将订阅发送到服务器
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          });
          console.log(res);
          resolve("订阅成功");
        });
        showToast
          ? toast.promise(promise, {
              loading: "订阅中...",
              success: "订阅成功",
              error: (msg) => msg,
            })
          : promise;
      },
      unsubscribe: async ({ showToast }) => {
        const promise = new Promise<void>(async (resolve, reject) => {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
            try {
              await subscription.unsubscribe();
              set({ subscription: null });
              // 将取消订阅发送到服务器
              const res = await fetch("/api/unsubscribe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log(res);
            } catch (error) {
              reject("取消订阅失败");
            }
          }
          resolve();
        });
        showToast
          ? toast.promise(promise, {
              loading: "取消订阅中...",
              success: "取消订阅成功",
              error: (msg) => msg,
            })
          : promise;
      },
    }),
    {
      name: "subscription-store",
    },
  ),
);
