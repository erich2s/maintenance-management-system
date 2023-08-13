import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  // 获取动态路由参数从而从数据库中获取类型id
  const id = Number(params.id);
  console.log("delete type:", id);
  const deleteReports = prisma.report.deleteMany({
    where: {
      typeId: id,
    },
  });
  const deleteType = prisma.type.delete({
    where: {
      id: id,
    },
  });
  // 级联删除，用事务
  const result = await prisma.$transaction([deleteReports, deleteType]);
  return NextResponse.json(result);
}
