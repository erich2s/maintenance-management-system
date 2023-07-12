import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "用户名" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const username = credentials?.username;
          // const password = await bcrypt.hashSync(credentials?.password as string, 10);
          const password = credentials?.password;
          try {
            const user = await prisma.user.findUniqueOrThrow({
              where: {
                username: username,
              },
            });
            if (user) {
              const match = await bcrypt.compare(password, user.password);
              if (!match) {  
                return null;
              }
            }
            return user;
          } catch (e) {
            console.log(e);
            return null;
          }
        },
      }),
    ],
    // 自定义登录页等，一旦定义了这个，就会覆盖默认的登录页
    pages: {
      signIn: "/login",
      signOut: "/",
    },
    secret: process.env.SECRET,
    callbacks: {
      // 先执行jwt，再执行session
      async jwt({ token, user }) {
        //这个user是从authorize函数返回的
        //在这个函数中将数据库中的user信息添加到token中（自定义）
      
        if (user) {
          token.id = user.id;
          token.username = user.username;
          token.age = user.age;
          token.role = user.role;
        }
        //别把密码返回去了
        // return { ...token, ...user };
        return token;
      },
      // 这个函数用于返回给服务端获取session信息
      async session({ session, token }) {
        //这里的token是从jwt函数返回的
        session.user = token;
        session.customMsg = "这是自定义的session信息"
        return session;
      },
    },
    // session: {
    //   /**
    //    * 默认为“jwt”，所以这个session option可以不写
    //    * 如果设置为“database”，token就是数据库session的token
    //    * 但当使用database adapter的时候默认开启“database”
    //    */
    //   strategy: "jwt",
    // },
  };