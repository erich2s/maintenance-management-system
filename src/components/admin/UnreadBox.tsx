import { BellDot, ChevronRight, Construction } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function UnreadBox() {
  return (
    <>
      <div className="flex h-full w-full flex-col px-5 py-4 ">
        <header>
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

function Report() {
  return (
    <div className="relative my-3 flex items-center justify-between rounded-xl border  py-2 pl-8 pr-14 transition-all duration-150 ease-linear hover:cursor-pointer hover:bg-gray-100 ">
      <div>
        <div className="text-sm text-muted-foreground">类型</div>
        <div className="text-md">空调</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">时间</div>
        <div className="text-md">12-01 12:00</div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">地点</div>
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
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="new">新的</TabsTrigger>
        <TabsTrigger value="working">施工中</TabsTrigger>
      </TabsList>
      <TabsContent value="new" className="w-full">
        <ScrollArea className="h-[calc(100vh_-_16.5rem)] w-full pr-3">
          {Array.from({ length: 14 }).map((_, index) => (
            <Report key={index} />
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="working">
        <ScrollArea className="h-[calc(100vh_-_16.5rem)] w-full pr-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Report key={index} />
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
