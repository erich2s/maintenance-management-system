import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // 获取动态路由参数从而从数据库中获取报修单
  const id = Number(params.id);
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return NextResponse.json(result);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  console.log("delete worker:", id);
  const deleteReports = prisma.report.deleteMany({
    where: { createdById: id },
  });
  const deleteUser = prisma.user.delete({
    where: { id },
  });
  // 级联删除，用事务
  const result = await prisma.$transaction([deleteReports, deleteUser]);
  return NextResponse.json(result);
}
