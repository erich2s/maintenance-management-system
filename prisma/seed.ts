import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const locations = await prisma.location.createMany({
    data: [
      {
        name: "行健7栋",
        latitude: 22.856264,
        longitude: 108.2824,
      },
      {
        name: "行健6栋",
        latitude: 22.856571,
        longitude: 108.282428,
      },
      {
        name: "行健5栋",
        latitude: 22.856889,
        longitude: 108.28246,
      },
      {
        name: "行健4栋",
        latitude: 22.85623,
        longitude: 108.283372,
      },
    ],
  });
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Eric Huang",
        username: "admin",
        role: "ADMIN",
        email: "tarot1754443943@gmail.com",
        password: "123456",
      },
      {
        name: "黄士崧",
        username: "2038940333",
        email: "erich2s@qq.com",
        password: "123456",
      },
      {
        name: "张三",
        username: "2038940301",
        email: "zhangsan@qq.com",
        password: "123456",
      },
      {
        name: "李四",
        username: "2038940302",
        email: "lisi@example.com",
        password: "123456",
      },
      {
        name: "王五",

        username: "2038940303",
        email: "wangwu@example.com",
        password: "123456",
      },

      {
        name: "赵六",
        username: "2038940304",
        email: "zhaoliu@example.com",
        password: "123456",
      },
      {
        name: "孙七",
        username: "2038940305",
        email: "sunqi@example.com",
        password: "123456",
      },
      {
        name: "周八",
        username: "2038940306",
        email: "zhouba@example.com",
        password: "123456",
      },
    ],
  });
  const types = await prisma.type.createMany({
    data: [
      {
        name: "水电",
      },
      {
        name: "空调",
      },
      {
        name: "门窗",
      },
      {
        name: "其他",
      },
    ],
  });
  const workers = await prisma.worker.createMany({
    data: [
      {
        name: "张力工",
        phone: "13462345678",
      },
      {
        name: "李劳动",
        phone: "13512341234",
      },
      {
        name: "王建业",
        phone: "13887654321",
      },

      {
        name: "赵劳碌",
        phone: "13456789012",
      },
      {
        name: "钱辛勤",
        phone: "13524687913",
      },
    ],
  });

  console.log({ locations, users, types, workers });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });