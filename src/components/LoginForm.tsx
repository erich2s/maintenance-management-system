"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./Spinner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
// 动画
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// 注册表单的卡片容器
export default function LoginForm() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="relative w-full space-y-6 py-16 lg:w-[500px]">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src="/school-logo-purple.png"
              alt="广西大学行健文理学院logo"
              width={100}
              height={100}
              className="inset-0 mb-1 rounded-full"
            />
            <motion.ul variants={container} initial="hidden" animate="visible">
              <motion.li variants={item}>
                <h1 className="text-2xl font-semibold tracking-tight">
                  广西大学行健学院宿舍后勤服务
                </h1>
              </motion.li>
              <motion.li variants={item}>
                <p className="text-sm text-muted-foreground">
                  输入学号和密码以登录
                </p>
              </motion.li>
            </motion.ul>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <UserAuthForm />
          </div>
        </CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CardFooter>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <span>Terms of Service</span> and <span>Privacy Policy .</span>
            </p>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
}

// 表单验证
const formSchema = z.object({
  username: z.string().min(2, { message: "学号/邮箱长度不足" }),
  password: z.string().min(4, { message: "密码长度不足" }),
});
// 表单组件
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "eric",
      password: "123456",
    },
  });
  //   登录提交
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        toast.error(res.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        router.push("/");
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <motion.ul variants={container} initial="hidden" animate="visible">
        {/* 表单区域 */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <motion.li variants={item}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.li>
                <motion.li variants={item}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center overflow-hidden">
                            <div
                              onClick={() => {
                                setPasswordVisible(!passwordVisible);
                              }}
                              className="absolute  right-0 flex h-9 w-9 cursor-pointer select-none items-center justify-center border-l opacity-50 hover:opacity-100"
                            >
                              {passwordVisible ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} />
                              )}
                            </div>

                            <Input
                              type={passwordVisible ? "text" : "password"}
                              placeholder="password"
                              {...field}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.li>
                <motion.li variants={item}>
                  <Button
                    disabled={isLoading}
                    className="mb-5 w-full"
                    type="submit"
                  >
                    <AnimatePresence>
                      {isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Spinner className="mx-2 animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Login
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.li>
              </div>
            </div>
          </form>
        </Form>
        {/* SSO区域 */}
        <motion.li variants={item}>
          <div className="relative flex justify-evenly">
            <div className="absolute  inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex w-fit justify-center text-xs uppercase">
              <span className="bg-background   px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </motion.li>
      </motion.ul>
    </div>
  );
}
