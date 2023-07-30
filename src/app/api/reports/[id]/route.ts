import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // 获取动态路由参数从而从数据库中获取报修单
  const id = Number(params.id);
  const result = await prisma.report.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: { username: true, name: true },
      },
    },
  });
  return NextResponse.json(result);
}
