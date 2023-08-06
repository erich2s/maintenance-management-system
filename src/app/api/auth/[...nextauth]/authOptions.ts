import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const username = credentials?.username;
        const plainPassword = credentials?.password;

        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });
        // 用户名错误
        if (!user) {
          throw new Error("用户不存在");
        } else {
          const match = bcrypt.compareSync(
            plainPassword as string,
            user.password,
          );
          // 密码错误
          if (!match) {
            throw new Error("密码错误");
          }
        }
        return user;
      },
    }),
  ],
  // 自定义登录页等，一旦定义了这个，就会覆盖默认的登录页
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.SECRET,
  callbacks: {
    // 先执行jwt，再执行session
    async jwt({ token, user }) {
      //这个user是从authorize函数返回的
      //在这个函数中将数据库中获取到的user信息添加到token中（自定义）
      if (user) {
        return { ...token, ...user };
      }
      //别把密码返回去了
      return token;
    },
    // 这个函数用于返回给服务端获取session信息
    async session({ session, token }) {
      //这里的token是从jwt函数返回的
      session.user = token as User;
      return session;
    },
  },
  session: {
    /**
     * "jwt" | "database
     * 默认为“jwt”，所以这个session option可以不写
     * 如果设置为“database”，token就是数据库session的token
     * 但当使用database adapter的时候默认开启“database”
     */
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天过期
  },
};
