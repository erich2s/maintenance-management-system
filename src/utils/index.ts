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
  process.env.WEB_PUSH_CONTACT as string,
  process.env.NEXT_PUBLIC_VAPID_KEY as string,
  process.env.PRIVATE_VAPID_KEY as string,
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
