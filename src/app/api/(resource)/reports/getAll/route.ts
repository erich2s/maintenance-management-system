import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取数据库所有报修单
export async function GET(req: NextRequest) {
  if (await isAdmin(req)) {
    // 分页，每页10条
    const { searchParams } = new URL(req.url);
    const page = (Number(searchParams.get("page")) || 1) - 1;
    const size = Number(searchParams.get("size")) || 10;
    const reports = await prisma.report.findMany({
      skip: page * size,
      take: size,
      include: {
        createdBy: {
          select: { username: true, name: true },
        },
        worker: {
          select: { name: true, phone: true },
        },
        type: {
          select: { id: true, name: true },
        },
        location: {
          select: { id: true, name: true, latitude: true, longitude: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const count = await prisma.report.count();
    return NextResponse.json({ reports, count });
  } else {
    return NextResponse.json({ message: "无权访问" });
  }
}
