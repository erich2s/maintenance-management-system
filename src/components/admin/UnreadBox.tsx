import {
  BellDot,
  Boxes,
  ChevronRight,
  Clock2,
  Construction,
  MapPin,
  Package,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
export default function UnreadBox() {
  return (
    <>
      <div className="flex h-full w-full flex-col  py-4 ">
        <header className="px-5">
          <h1 className="mt-2 text-lg font-bold">待处理报修单({23})</h1>
          <div className="my-6 flex w-full justify-around">
            <div className="flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary p-1">
                <BellDot className="w-4" color="#fff" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-muted-foreground">新的</div>
                <div className="text-xl">18</div>
              </div>
            </div>
            <div className="flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 p-1">
                <Construction className="w-4" color="#2e2e2e" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-muted-foreground">施工中</div>
                <div className="text-xl">5</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <ReportTabs />
        </main>
      </div>
    </>
  );
}

enum Status {
  PENDING, // 待处理，紫色
  ACCEPTED, // 已接受并派工，黄色
  REJECTED, // 已拒绝，红色
  FINISHED, // 已完成，绿色
}
const statusColor = {
  [Status.PENDING]: "bg-primary",
  [Status.ACCEPTED]: "bg-yellow-400",
  [Status.REJECTED]: "bg-red-400",
  [Status.FINISHED]: "bg-green-400",
};
interface ReportProps {
  status?: Status;
}
function Report({ status }: ReportProps) {
  const color = statusColor[status || Status.PENDING];
  return (
    <div className="relative my-3 flex items-center justify-between rounded-xl border  py-2 pl-8 pr-14 transition-all duration-150 ease-linear hover:cursor-pointer hover:bg-gray-100 ">
      <div
        className={cn("absolute left-0 h-10 w-1.5 rounded-r-md", color)}
      ></div>
      <div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Package width={16} className="mr-1 " />
          类型
        </div>
        <div className="text-md">空调</div>
      </div>
      <div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock2 width={16} className="mr-1 " />
          时间
        </div>
        <div className="text-md">12-01 12:00</div>
      </div>
      <div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin width={16} className="mr-1 " />
          地点
        </div>
        <div className="text-md">行健7栋</div>
      </div>
      <div className="absolute right-[4px]">
        <ChevronRight color="#677489" strokeWidth={1.5} />
      </div>
    </div>
  );
}

function ReportTabs() {
  return (
    <Tabs defaultValue="new" className="flex h-full  w-full flex-col">
      <div className="px-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">新的</TabsTrigger>
          <TabsTrigger value="working">施工中</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="new" className="w-full p-1">
        <ScrollArea className="h-[calc(100vh_-_17rem)] w-full px-4">
          {Array.from({ length: 14 }).map((_, index) => (
            <Report key={index} />
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="working" className="w-full p-1">
        <ScrollArea className="h-[calc(100vh_-_17rem)] w-full px-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Report key={index} status={Status.ACCEPTED} />
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
