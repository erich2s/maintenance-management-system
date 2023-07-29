import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

// 用户获取自己所有报修单
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  const result = await prisma.report.findMany({
    where: {
      createdBy: {
        id: Number(token?.id),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(result);
}

// 用户提交一个报修单
export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const token = await getToken({ req, secret: authOptions.secret });
  const result = await prisma.report.create({
    data: {
      ...reqData,
      createdBy: {
        connect: {
          id: token?.id,
        },
      },
    },
  });
  return NextResponse.json(result);
}

// 管理员更新一个报告的状态
export async function PUT(req: NextRequest) {}

// 管理员删除一个报告
export async function DELETE(req: NextRequest) {}
