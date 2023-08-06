import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取所有users
export async function GET(req: NextRequest) {
  const result = await prisma.user.findMany();
  return NextResponse.json(result);
}
