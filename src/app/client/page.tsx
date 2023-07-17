import PageTransition from "@/components/PageTransition";
import InfoCard from "./components/InfoCard";
import ActivityItem from "./components/ActivityItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Accordion } from "@/components/ui/accordion";
// import ReactPullToRefresh from "react-pull-to-refresh/index";

export default async function page() {
  const session = await getServerSession(authOptions);
  const { name, username, phone } = session?.user!;
  const repairs = [
    {
      id: "1",
      type: "空调",
      content:
        "宿舍空调出风口的风非常弱,调到最低温也无法降温,使用空调已无法达到制冷效果,生活学习受到很大影响。请尽快派人来检查修理下空调,谢谢!",
    },
    {
      id: "2",
      type: "热水器",
      content:
        "宿舍热水器可能断电或故障了,关闭开关后无法正常加热供应热水,这几天没有热水洗澡很不方便。请派员检查下热水器情况,看看是不是需要维修,希望能尽快解决没有热水的问题,非常感谢!",
    },
    {
      id: "3",
      type: "门窗",
      content:
        "我们宿舍的门窗关紧后还是有缝隙,担心在外时容易被盗贼挖门而入,影响我们财物安全。请检查下门窗是否关严实,是否需要调整或修理门窗,以保证宿舍安全,谢谢合作!",
    },
    {
      id: "4",
      type: "日用电器",
      content:
        "我宿舍使用的电饭煲在煮饭过程中突然无法工作了,按钮按下后不加热也不显示任何状态,可能电路故障,无法继续使用。打扰您派员来看一下电饭煲情况,如果无法修复希望能更换新的,以保障我们的饮食起居,不胜感激!",
    },
    {
      id: "5",
      type: "灯光",
      content:
        "我们宿舍的吸顶灯和床头灯的灯泡都坏了,尝试换泡也无法点亮,应该是灯座故障。宿舍没有了照明灯光影响学习和生活,请尽快检查电路并更换新的灯泡或吸顶灯,非常感谢!",
    },
    // 省略部分数据
  ];
  return (
    <>
      <InfoCard name={name} username={username} phone={phone} />
      <PageTransition>
        <h2 className="text-[1.25rem] font-bold">最近活动</h2>
        <Accordion type="single" defaultValue="1" collapsible>
          {repairs.map((repair) => (
            <ActivityItem
              key={repair.id}
              id={repair.id}
              type={repair.type}
              content={repair.content}
            />
          ))}
          {/* <ActivityItem id="1" />
          <ActivityItem id="2" />
          <ActivityItem id="3" />
          <ActivityItem id="4" />
          <ActivityItem id="5" />
          <ActivityItem id="6" /> */}
        </Accordion>
      </PageTransition>
    </>
  );
}
