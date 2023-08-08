import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/db";

// 订阅通知
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  const subscription = await req.json();
  console.log(token?.name, "请求订阅通知");
  console.log("subscription", subscription);
  const res = await prisma.user.update({
    where: {
      id: Number(token?.id),
    },
    data: {
      subscription: subscription,
    },
  });
  return NextResponse.json(res);
}
