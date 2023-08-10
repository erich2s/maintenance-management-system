import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取所有维修工
export async function GET(req: NextRequest) {
  const data = await prisma.worker.findMany();
  const total = await prisma.worker.count();
  return NextResponse.json({ data, total });
}

// 管理员创建维修工
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const result = await prisma.worker.createMany({
    data: reqData,
  });
  return NextResponse.json(result);
}
