import { prisma } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // 获取动态路由参数从而从数据库中获取工人id
  const id = Number(params.id);
  console.log("delete worker:", id);
  const deleteReports = prisma.report.deleteMany({
    where: {
      workerId: id,
    },
  });
  const deleteWorker = prisma.worker.delete({
    where: {
      id: id,
    },
  });
  // 级联删除，用事务
  const result = await prisma.$transaction([deleteReports, deleteWorker]);
  return NextResponse.json(result);
}
