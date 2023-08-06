import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await prisma.type.findMany();
  return NextResponse.json(result);
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
