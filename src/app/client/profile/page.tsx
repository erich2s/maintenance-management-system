"use client";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import { signOut, useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import {
  BadgeHelp,
  BellDot,
  ChevronRight,
  Github,
  KeyRound,
  LogOut,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "react-use";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
export default function page() {
  const { data: session } = useSession();

  //通知订阅部分
  const [subscription, setSubscription, removeSubscription] =
    useLocalStorage<PushSubscriptionJSON>("subscription");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  useEffect(() => {
    if (subscription?.endpoint) {
      setIsSubscribed(true);
      console.log(subscription);
    } else {
      setIsSubscribed(false);
    }
  }, [subscription]);
  async function subscribe() {
    // serviceWorker只能在https和localhost下使用
    if ("serviceWorker" in navigator) {
      console.log("开始订阅");
      toast.loading("正在请求订阅");
      setIsSubscribing(true);
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
      // 保存订阅到localStorage
      setSubscription(sub);
      // 将订阅发送到服务器
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sub),
      });
      if (res.ok) {
        toast.remove();
        toast.success("订阅成功");
      }
      setIsSubscribing(false);
    } else {
      console.log("serviceWorker不可用");
      toast.error("serviceWorker不可用");
    }
  }
  async function unsubscribe(
    { showToast }: { showToast?: boolean } = { showToast: true },
  ) {
    if ("serviceWorker" in navigator) {
      console.log("开始取消订阅");
      if (showToast) {
        toast.remove();
        toast.loading("正在取消订阅");
      }
      // 注册service worker
      const register = await navigator.serviceWorker.register(
        "/serviceWorker.js",
      );
      // 取消订阅
      register.pushManager.getSubscription().then((sub) => {
        console.log(sub);
        sub
          ?.unsubscribe()
          .then(() => {
            console.log("取消订阅成功");
          })
          .catch((err) => {
            console.log(err);
            toast.remove();
            toast.error("取消订阅失败");
            return;
          });
      });
      // 将订阅发送到服务器
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok && showToast) {
        toast.remove();
        toast.success("取消订阅成功");
      }
      // 清除localStorage
      removeSubscription();
    } else {
      console.log("serviceWorker不可用");
      if (showToast) toast.error("serviceWorker不可用");
    }
  }

  // 注销部分
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="mt-6 flex w-full flex-col items-center">
        <Image
          src={avatar}
          alt="avatar"
          width={95}
          priority
          className="rounded-full saturate-150"
        />
        <h1 className="mt-3 text-2xl font-bold">
          {session ? session.user.name : "Loading..."}
        </h1>
        <p className=" text-muted-foreground ">
          @{session ? session.user.username : "Loading..."}
        </p>
      </div>

      <Card className="mt-8 flex w-full flex-col border px-5  py-1 shadow">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center ">
            <div className="mr-3  w-fit rounded-lg  bg-red-500 p-1.5">
              <BellDot size={22} color="white" />
            </div>
            <span>通知推送</span>
          </div>
          <Switch
            disabled={isSubscribing}
            checked={isSubscribed}
            onCheckedChange={(checked) => {
              if (checked) {
                console.log("开始订阅");
                subscribe();
              } else {
                console.log("取消订阅");
                unsubscribe();
              }
            }}
          />
        </div>
        <Separator />
        <button
          onClick={() => {
            toast.success("不给");
          }}
        >
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center ">
              <div className="mr-3 w-fit  rounded-lg bg-green-500    p-1.5 ">
                <KeyRound size={22} color="white" strokeWidth={2} />
              </div>
              <span>修改密码</span>
            </div>

            <ChevronRight color="#677489" strokeWidth={1.5} />
          </div>
        </button>

        <Separator />
        <button
          onClick={() => {
            toast.remove();
            toast.success("🙏🏻");
          }}
        >
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center ">
              <div className="mr-3 w-fit  rounded-lg bg-blue-500 p-1.5 ">
                <BadgeHelp size={22} color="white" strokeWidth={2} />
              </div>
              <span>联系帮助</span>
            </div>
            <ChevronRight color="#677489" strokeWidth={1.5} />
          </div>
        </button>
        <Separator />
        <button
          onClick={() => {
            window.open("https://github.com/erich2s");
          }}
        >
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center ">
              <div className="mr-3 w-fit  rounded-lg bg-gray-400  p-1.5 ">
                <Github size={22} color="white" strokeWidth={2} />
              </div>
              <span>关于作者</span>
            </div>
            <ChevronRight color="#677489" strokeWidth={1.5} />
          </div>
        </button>
      </Card>
      <Card className="mt-6 flex w-full flex-col   border  px-5  shadow">
        <button
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            // 取消通知订阅
            unsubscribe({ showToast: false });
            signOut()
              .then(() => {})
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          <div className="flex items-center py-3">
            {!isLoading ? (
              <div className="flex items-center">
                <div className="mr-3 w-fit  rounded-lg bg-red-500  p-1.5 ">
                  <LogOut size={22} color="white" />
                </div>
                <span>退出登录</span>
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </button>
      </Card>
    </>
  );
}
