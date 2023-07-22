import PageTransition from "@/components/PageTransition";
import InfoCard from "./components/InfoCard";
import ReportItem from "./components/ReportItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Accordion } from "@/components/ui/accordion";
// import ReactPullToRefresh from "react-pull-to-refresh/index";

export default async function page() {
  const session = await getServerSession(authOptions);
  const { name, username } = session?.user!;
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
    // 省略前5条数据

    {
      id: "6",
      type: "桌椅",
      content:
        "我们宿舍的书桌和椅子使用多年都比较松动,特别是椅子坐久了会摇摆不稳,担心影响学샨时的专注度。请派员来看一下桌椅情况,对摇晃的桌椅进行加固或更换新的,以保证我们学习和生活的便利性,谢谢!",
    },
    {
      id: "7",
      type: "地面",
      content:
        "宿舍一个同学的床边地面出现了裂缝并略微下陷,该同学担心会继续扩大从而影响行走安全。请检查一下地面质量,对出现问题的地面进行维修或更换,避免踩空造成扭伤,十分感谢!",
    },
    {
      id: "8",
      type: "墙壁",
      content:
        "我们宿舍的墙壁长期出现渗水,墙角处的墙板表面已经出现明显的霉变和脱落。渗水的墙壁不仅触感潮湿,也担心会导致室内空气质量下降。请检查一下墙壁渗水原因,进行墙面维修和处理,谢谢!",
    },
    {
      id: "9",
      type: "床铺",
      content:
        "我的宿舍床已经使用多年,床垫表面破损凹陷严重,躺上去的感觉特别不舒服。更严重的是,钢丝弹簧已经露出来了,容易扎伤身体。请检查一下床垫质量,对破损老化的床进行更新,确保我们有个良好的睡眠环境,不胜感激!",
    },
    {
      id: "10",
      type: "水龙头",
      content:
        "我们宿舍的水龙头水流已经很细, 关闭后还会持续漏水,担心会浪费很多水资源。请检查下水龙头,看看是不是需要更换新的垫片或整体更换下水龙头,以解决漏水问题,谢谢!",
    },
  ];
  return (
    <>
      <InfoCard name={name} username={username} />
      <PageTransition>
        <h2 className="text-[1.25rem] font-bold">最近活动</h2>
        <Accordion type="single" defaultValue="1" collapsible>
          {repairs.map((repair) => (
            <ReportItem
              key={repair.id}
              id={repair.id}
              type={repair.type}
              content={repair.content}
            />
          ))}
        </Accordion>
      </PageTransition>
    </>
  );
}
