import { prisma } from "@/lib/db";
import { pushNotificationTo } from "@/utils";
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
  // 发消息给用户
  if (result) {
    const user = await prisma.user.findUnique({
      where: {
        id: result.createdById,
      },
      select: {
        subscription: true,
      },
    });
    // 如果用户没有订阅通知，直接返回
    if (user?.subscription === null) {
      console.log("用户没有订阅通知");
      return NextResponse.json(result);
    }
    // 派工通知
    if (result.status === "ACCEPTED") {
      const worker = await prisma.worker.findUnique({
        where: {
          id: result.workerId as number,
        },
        select: {
          name: true,
          phone: true,
        },
      });
      await pushNotificationTo(user?.subscription as any, {
        title: "报修单已被接受✅",
        body: `👷师傅${worker?.name}(${worker?.phone})将会尽快与您联系`,
      });
    }
    // 完工通知
    if (result.status === "COMPLETED") {
      await pushNotificationTo(user?.subscription as any, {
        title: "报修已完工✅",
        body: `如事后有问题请及时联系`,
      });
    }
    // 拒绝通知
    if (result.status === "REJECTED") {
      await pushNotificationTo(user?.subscription as any, {
        title: "报修已被拒绝🙅",
        body: ``,
      });
    }
  }

  return NextResponse.json(result);
}

// 管理员删除一个报告
// export async function DELETE(req: NextRequest) {}
