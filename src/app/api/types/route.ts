import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 分页，每页10条
  const { searchParams } = new URL(req.url);
  const page = (Number(searchParams.get("page")) || 1) - 1;
  const size = Number(searchParams.get("size")) || 10;
  const data = await prisma.type.findMany({
    skip: page * size,
    take: size,
  });
  const total = await prisma.type.count();
  return NextResponse.json({ data, total });
}

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const result = await prisma.type.create({
    data: {
      name: reqData.name,
    },
  });
  return NextResponse.json(result);
}
