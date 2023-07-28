// utils文件夹是服务器端的工具函数，可以在中间件中使用，也可以在api中使用。

import { NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getToken } from "next-auth/jwt";
export async function isAdmin(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });
  if (token) {
    return token.role === "ADMIN";
  }
  return false;
}
