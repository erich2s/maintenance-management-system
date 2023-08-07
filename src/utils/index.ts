// utils文件夹是服务器端的工具函数，可以在中间件中使用，也可以在api中使用。

import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getToken } from "next-auth/jwt";
import webpush from "web-push";
export async function isAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  if (token) {
    return token.role === "ADMIN";
  }
  return false;
}

// 设置 VAPID 详情
webpush.setVapidDetails(
  "mailto:erich2s@qq.com",
  "BDeQByhHcxy084_JFou3rHlqiSpFvPZhUWjQKb1QlU6TjXL8mJd3usKDsQDzEeZ1HJOuultQgtPRlGOqgrrLnQA",
  "rZpj98WVatLMqzgWkC_mQgAbzG3WAZAtiw9hiMW3taY",
);
// 发送web push通知
export function pushNotificationTo(
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
  payload: { title: string; body: string },
) {
  return new Promise((resolve, reject) => {
    webpush
      .sendNotification(
        subscription,
        JSON.stringify({ ...payload, icon: "/school-logo-fill.png" }),
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
