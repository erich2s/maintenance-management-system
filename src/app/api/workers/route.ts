import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取所有维修工
export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  // 分页，每页10条
  const { searchParams } = new URL(req.url);
  const page = (Number(searchParams.get("page")) || 1) - 1;
  const size = Number(searchParams.get("size")) || 10;
  const data = await prisma.worker.findMany({
    skip: page * size,
    take: size,
  });
  const total = await prisma.worker.count();
  return NextResponse.json({ data, total });
}

// 管理员创建维修工
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const reqData = await req.json();
  const result = await prisma.worker.createMany({
    data: reqData,
  });
  return NextResponse.json(result);
}
