import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/db";

// 取消订阅通知
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  console.log(token?.name, "取消订阅通知");
  const res = await prisma.user.update({
    where: {
      id: Number(token?.id),
    },
    data: {
      subscription: null as any,
    },
  });
  return NextResponse.json(res);
}
