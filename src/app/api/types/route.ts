import { prisma } from "@/lib/db";
import { isAdmin } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 分页，每页10条
  const { searchParams } = new URL(req.url);
  const page = (Number(searchParams.get("page")) || 1) - 1;
  const size = Number(searchParams.get("size"));
  if (size) {
    const data = await prisma.type.findMany({
      skip: page * size,
      take: size,
    });
    const total = await prisma.type.count();
    return NextResponse.json({ data, total });
  } else {
    // 不分页
    console.log("不分页");
    const data = await prisma.type.findMany();
    return NextResponse.json({ data });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const reqData = await req.json();
  const result = await prisma.type.create({
    data: {
      name: reqData.name,
    },
  });
  return NextResponse.json(result);
}
