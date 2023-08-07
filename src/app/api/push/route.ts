import { prisma } from "@/lib/db";
import { pushNotificationTo } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const msg = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      username: "admin",
    },
    select: {
      subscription: true,
    },
  });

  const res = await pushNotificationTo(user?.subscription as any, {
    ...msg,
  });
  return NextResponse.json(res);
}
