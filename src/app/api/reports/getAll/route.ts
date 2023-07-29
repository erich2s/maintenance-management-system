import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取数据库所有报修单
export async function GET(req: NextRequest) {
  if (await isAdmin(req)) {
    const allReports = await prisma.report.findMany({
      include: {
        createdBy: {
          select: { username: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    // const result = allReports.map((report) => {
    //   return {
    //     id: report.id,
    //     status: report.status,
    //     createdAt: report.createdAt,
    //     type: report.type,
    //     phone: report.phone,
    //     location: report.location,
    //     room: report.room,
    //     content: report.content,
    //     createdBy:
    //       report.createdBy.name + "(" + report.createdBy.username + ")",
    //   };
    // });
    return NextResponse.json(allReports);
  } else {
    return NextResponse.json({ message: "无权访问" });
  }
}
