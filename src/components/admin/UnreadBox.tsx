import { BellDot, Construction } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReportItem, { Status } from "./ReportItem";
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

function ReportTabs() {
  return (
    <Tabs defaultValue="new" className="flex h-full  w-full flex-col">
      <div className="px-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">新的</TabsTrigger>
          <TabsTrigger
            value="working"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black/70 "
          >
            施工中
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="new" className="w-full p-1">
        <ScrollArea className="h-[calc(100vh_-_17rem)] w-full px-4">
          {Array.from({ length: 14 }).map((_, index) => (
            <ReportItem
              key={index}
              type="洗衣机"
              createdAt="07-26 12:34"
              location="行健7栋"
              room="7-444"
              createdBy="黄士崧"
              phone="18088730141"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis accumsan ullamcorper.Etiam ut erat sit amet ante euismod vulputate vitae in magna. Aliquam erat volutpat. Donec scelerisque eu nisl ac viverra."
            />
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="working" className="w-full p-1">
        <ScrollArea className="h-[calc(100vh_-_17rem)] w-full px-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ReportItem
              key={index}
              status={Status.ACCEPTED}
              type="洗衣机"
              createdAt="07-26 12:34"
              location="行健4栋"
              room="4-203"
              createdBy="Eric"
              phone="18088730141"
              content="得"
            />
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
