import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { authOptions } from "../auth/[...nextauth]/authOptions";

// 设置 VAPID 详情
webpush.setVapidDetails(
  "mailto:contact@my-site.com",
  "BDeQByhHcxy084_JFou3rHlqiSpFvPZhUWjQKb1QlU6TjXL8mJd3usKDsQDzEeZ1HJOuultQgtPRlGOqgrrLnQA",
  "rZpj98WVatLMqzgWkC_mQgAbzG3WAZAtiw9hiMW3taY",
);
// 订阅通知
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  const subscription = await req.json();
  console.log("subscription", subscription);
  const payload = JSON.stringify({
    title: `Hello, ${token?.name}!`,
    body: "Welcome back",
    icon: "/school-logo-fill.png",
  });
  webpush.sendNotification(subscription, payload).catch((error) => {
    console.error(error.stack);
  });
  return NextResponse.json({ ok: true });
}
