import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const locations = await prisma.location.createMany({
    data: [
      {
        name: "行健7栋",
        latitude: 22.853598,
        longitude: 108.286593,
      },
      {
        name: "行健6栋",
        latitude: 22.853857,
        longitude: 108.28655,
      },
      {
        name: "行健5栋",
        latitude: 22.854129,
        longitude: 108.286556,
      },
      {
        name: "行健4栋",
        latitude: 22.853467,
        longitude: 108.287333,
      },
    ],
  });
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Eric Huang",
        username: "admin",
        role: "ADMIN",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "黄士崧",
        username: "2038940333",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "张三",
        username: "2038940301",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "李四",
        username: "2038940302",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "王五",

        username: "2038940303",
        password: bcrypt.hashSync("123456", 10),
      },

      {
        name: "赵六",
        username: "2038940304",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "孙七",
        username: "2038940305",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "周八",
        username: "2038940306",
        password: bcrypt.hashSync("123456", 10),
      },
      {
        name: "吴九",
        username: "2038940307",
        password: bcrypt.hashSync("123456", 10),
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
