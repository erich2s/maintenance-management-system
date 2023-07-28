import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

//  管理员获取所有未处理完成的报修单（PENDING，ACCEPTED）
export async function GET(req: NextRequest) {
  const result = await prisma.report.findMany({
    where: {
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
    },
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(result);
}