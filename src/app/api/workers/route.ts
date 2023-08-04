import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取所有维修工
export async function GET(req: NextRequest) {
  const result = await prisma.worker.findMany();
  return NextResponse.json(result);
}
