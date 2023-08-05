import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取所有维修工
export async function GET(req: NextRequest) {
  const result = await prisma.worker.findMany();
  return NextResponse.json(result);
}

// 管理员创建一个维修工
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const result = await prisma.worker.create({
    data: {
      name: reqData.name,
      phone: reqData.phone,
    },
  });
  return NextResponse.json(result);
}
