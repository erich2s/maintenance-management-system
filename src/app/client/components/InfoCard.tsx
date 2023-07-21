import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User2 } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type props = {
  name: string; //姓名
  username: string; //学号
};
export default function InfoCard({ name, username }: props) {
  return (
    <>
      <Card className="mb-9  bg-gradient-to-br  from-[#e96443]/80 to-[#904e95]/90 text-card   shadow-xl  ">
        <CardHeader className="py-4">
          <CardTitle className="flex text-lg">校 园 卡</CardTitle>
        </CardHeader>
        <CardContent className="mx-0 my-1 flex items-center justify-around py-0">
          <div className="flex  h-24  w-[70px]  translate-y-3 scale-[1.3] items-center justify-center overflow-hidden  rounded-xl bg-white/50 opacity-80 ">
            <User2 size={60} />
          </div>
          <div className="space-y-1 font-medium ">
            <p>姓名：{name}</p>
            <p>学号：{username}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end  pb-3 ">
          <Image
            src="/school-logo-fill.png"
            width={50}
            height={50}
            alt="school logo"
            className="rounded-full bg-white/90"
          />
        </CardFooter>
      </Card>
    </>
  );
}
