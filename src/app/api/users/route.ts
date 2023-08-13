import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { isAdmin } from "@/utils";
// 管理员获取所有users
export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  // 分页，每页10条
  const { searchParams } = new URL(req.url);
  const page = (Number(searchParams.get("page")) || 1) - 1;
  const size = Number(searchParams.get("size")) || 10;
  const data = await prisma.user.findMany({
    skip: page * size,
    take: size,
  });
  const total = await prisma.user.count();
  return NextResponse.json({ data, total });
}

// 管理员创建user(s)
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const reqData: { name: string; username: string; password: string }[] =
    await req.json();

  async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  const data = await Promise.all(
    reqData.map(async (item) => {
      return {
        ...item,
        password: await hashPassword(item.password),
      };
    }),
  );

  const result = await prisma.user.createMany({
    data: data as any,
  });
  if (result) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false });
}

// 更新密码
export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  const id = Number(token?.id);
  const reqData = await req.json();
  console.log("reqData:", reqData);
  // 修改密码
  const currentPassword: string = await reqData.currentPassword;
  const newPassword: string = await reqData.newPassword;
  if (currentPassword && newPassword) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const match = bcrypt.compareSync(currentPassword, user!.password);
    if (!match) {
      console.log("密码错误");
      return NextResponse.json({ ok: false });
    }
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  const result = await prisma.user.update({
    where: { id },
    data: {
      password: newPasswordHash,
    },
  });
  return NextResponse.json({ result, ok: true });
}
