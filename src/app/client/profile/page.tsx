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
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubscriptionStore } from "@/stores/subscriptionStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function page() {
  const { data: session } = useSession();
  //通知订阅部分
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { subscription, subscribe, unsubscribe } = useSubscriptionStore();

  // 注销部分
  const [isLoading, setIsLoading] = useState(false);

  // 修改密码表单
  const formSchema = z.object({
    currentPassword: z.string().min(6, {
      message: "请输入当前密码(6位)",
    }),
    newPassword: z.string().min(6, {
      message: "密码最少6位",
    }),
    confirmPassword: z.string().min(6, {
      message: "请确认新密码",
    }),
  });
  const [isOpened, setIsOpened] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("两次输入的密码不一致");
      return;
    }
    toast.loading("正在修改");
    fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(async (resopnse) => {
      let res = await resopnse.json();
      if (res.ok) {
        setIsOpened(false);
        toast.remove();
        toast.success("修改成功,请重新登录");
        signOut();
      } else {
        toast.remove();
        toast.error("密码错误");
      }
    });
  }
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
            checked={subscription ? true : false}
            onCheckedChange={(checked) => {
              setIsSubscribing(true);
              if (checked) {
                console.log("开始订阅");
                subscribe({ showToast: true });
              } else {
                console.log("取消订阅");
                unsubscribe({ showToast: true });
              }
              setIsSubscribing(false);
            }}
          />
        </div>
        <Separator />
        {/* 修改密码表单 */}
        <Dialog onOpenChange={setIsOpened} open={isOpened}>
          <DialogTrigger asChild>
            <button>
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
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>修改密码</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>原始密码</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>新密码</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>确认新密码</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="float-right">
                  确认修改
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
            window.open("https://erichuang.art");
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
            signOut().finally(() => {
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
