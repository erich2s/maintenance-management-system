import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

// 管理员获取数据库所有报修单
export async function GET(req: NextRequest) {
  if (await isAdmin(req)) {
    const allReports = await prisma.report.findMany();
    return NextResponse.json(allReports);
  } else {
    return NextResponse.json({ message: "无权访问" });
  }
}
