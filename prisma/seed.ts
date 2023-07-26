import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 创建两个用户
  await prisma.user.create({
    data: {
      username: "xiaoming",
      name: "小明",
      email: "xiaoming@example.com",
      password: "123456",
    },
  });

  await prisma.user.create({
    data: {
      username: "xiaohong",
      name: "小红",
      email: "xiaohong@example.com",
      password: "123456",
    },
  });

  await prisma.user.create({
    data: {
      username: "admin",
      name: "黄士崧",
      email: "erich2s@qq.com",
      password: "123456",
      role: "ADMIN",
    },
  });

  // 创建两个报修单
  await prisma.report.create({
    data: {
      type: "电脑",
      phone: "13888888888",
      address: "教学楼201",
      content: "电脑不能开机",
      createdById: 1,
    },
  });

  await prisma.report.create({
    data: {
      type: "空调",
      phone: "13999999999",
      address: "宿舍楼101",
      content: "空调坏了",
      createdById: 2,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
