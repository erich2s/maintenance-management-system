import Image from "next/image";
import illustration from "@/assets/Admin-Control-Panel.svg";
import bg from "@/assets/bg.png";
import LoginForm from "@/components/LoginForm";
// import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { PageWrapper } from "@/components/PageWrapper";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    }
    redirect("/client");
  }
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center flex md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
        {/* 左边的装饰栏目 */}
        <div className="relative hidden h-full flex-col p-0 text-black dark:border-r lg:flex justify-center select-none ">
          <div className="relative z-20 flex items-center text-lg  w-full h-full">
            <Image
              src={illustration}
              alt="宿舍报修系统"
              className="-scale-x-100"
            />
          </div>
          <Image
            src={bg}
            alt="背景"
            // className="fixed -z-10  h-full left-0 bottom-0 opacity-95 inset-0"
            className="absolute -z-10 w-full  h-full left-0 bottom-0 opacity-95 inset-0"
          />
        </div>
        {/* 右边的登录表单 */}
        <div className="lg:p-8 flex items-center justify-center h-full overflow-y-hidden">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
