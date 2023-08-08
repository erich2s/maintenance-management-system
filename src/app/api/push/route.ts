import { prisma } from "@/lib/db";
import { pushNotificationTo } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

// 发送通知
export async function POST(req: NextRequest) {
  const msg = await req.json();
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      subscription: true,
    },
  });

  const res = await pushNotificationTo(user?.subscription as any, {
    ...msg,
  }).catch((e) => {
    console.log(e);
  });
  return NextResponse.json(res);
}
