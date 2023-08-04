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
      worker: {
        select: { name: true, phone: true },
      },
    },
  });
  return NextResponse.json(result);
}

// 管理员更新一个报告的状态
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const reqData = await req.json();
  const id = Number(params.id);
  console.log({ ...reqData });
  const result = await prisma.report.update({
    where: { id },
    data: { ...reqData },
  });
  return NextResponse.json(result);
}

// 管理员删除一个报告
// export async function DELETE(req: NextRequest) {}
