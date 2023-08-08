import { prisma } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { pushNotificationTo } from "@/utils";

// 用户获取自己所有报修单
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  const result = await prisma.report.findMany({
    where: {
      createdBy: {
        id: Number(token?.id),
      },
    },
    include: {
      worker: {
        select: { name: true, phone: true },
      },
      location: { select: { name: true, id: true } },
      type: {
        select: { id: true, name: true },
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
      phone: reqData.phone,
      content: reqData.content,
      room: reqData.room,
      location: {
        connect: {
          id: Number(reqData.locationId),
        },
      },
      createdBy: {
        connect: {
          id: token?.id as number,
        },
      },
      type: {
        connect: {
          id: Number(reqData.typeId),
        },
      },
    },
  });

  // 发消息给管理员
  const admin = await prisma.user.findUnique({
    where: {
      username: "admin",
    },
    select: {
      subscription: true,
    },
  });
  const count = await prisma.report.count({
    where: {
      status: "PENDING",
    },
  });
  try {
    //empty obj
    if (!admin?.subscription) throw new Error("管理员未订阅通知");
    await pushNotificationTo(admin?.subscription as any, {
      title: "有新的报修单",
      body: `当前尚有${count}条未处理`,
    });
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json(result);
}
