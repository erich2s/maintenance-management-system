import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取所有users
export async function GET(req: NextRequest) {
  const data = await prisma.user.findMany({ orderBy: { id: "asc" } });
  const total = await prisma.user.count();
  return NextResponse.json({ data, total });
}

// 管理员创建user(s)
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const result = await prisma.user.createMany({
    data: reqData,
  });
  return NextResponse.json(result);
}
