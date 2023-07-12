import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "./app/api/auth/[...nextauth]/route";
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  console.log(token);
  if (token) {
    if (token.role === "ADMIN") {
      return NextResponse.next();
    } else {
      return NextResponse.json({ message: "unauthorized"});
    }
  }
  const loginUrl = new URL('/login', req.url)
  return NextResponse.redirect(loginUrl)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
