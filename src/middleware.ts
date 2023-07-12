import { NextResponse, userAgent } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  // 登录了才能进去，不然跳转到登录页面
  if (token) {
    // TODO: 管理员身份只有在非移动端才能访问admin管理页面
    // if (token.role === "ADMIN" ) {
    //   // console.log("admin pc");
    //   return NextResponse.redirect(new URL("/admin", req.url));
    // }
    const path = req.nextUrl.pathname;
    if (path.startsWith("/admin") && token.role !== "ADMIN") {
      console.log(`user ${token.username} ${token.role} is not admin`);
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}
function isMobile(req: NextRequest) {
  return userAgent(req).device.type === "mobile";
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/admin"],
};
