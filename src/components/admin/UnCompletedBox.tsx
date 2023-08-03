import { BellDot, Construction } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReportItem from "./ReportItem";
import { ReportItemProps } from "./ReportItem";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import PageTransition from "../PageTransition";
import { Spinner } from "../Spinner";
export default function UnCompletedBox() {
  const [reports, setReports] = useState<ReportItemProps[]>([]);
  const { data, isLoading } = useSWR(
    "/api/reports/getUnCompleted",
    (...args) =>
      fetch(...args, { cache: "no-store" }).then((res) => res.json()),
    {
      refreshInterval: 2000,
    },
  );
  useEffect(() => {
    if (data) {
      setReports(data);
    }
  }, [data]);
  const pendingReports = useMemo(() => {
    return reports.filter((report) => report.status == "PENDING");
  }, [reports]);
  const acceptedReports = useMemo(() => {
    return reports.filter((report) => report.status == "ACCEPTED");
  }, [reports]);
  return (
    <>
      <div className="flex h-full w-full flex-col  py-4 ">
        <header className="px-5">
          <h1 className="mt-2 text-lg font-bold">
            未完成报修单
            {reports.length > 0 && <span>({reports.length})</span>}
          </h1>
          <div className="my-6 flex w-full justify-around">
            <div className="flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary p-1">
                <BellDot className="w-4" color="#fff" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-muted-foreground">新的</div>
                <div className="text-xl">{pendingReports.length}</div>
              </div>
            </div>
            <div className="flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 p-1">
                <Construction className="w-4" color="#2e2e2e" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-muted-foreground">施工中</div>
                <div className="text-xl">{acceptedReports.length}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <ReportTabs
            pendingReports={pendingReports}
            acceptedReports={acceptedReports}
            isLoading={isLoading}
          />
        </main>
      </div>
    </>
  );
}

function ReportTabs({
  pendingReports,
  acceptedReports,
  isLoading,
}: {
  pendingReports: ReportItemProps[];
  acceptedReports: ReportItemProps[];
  isLoading: boolean;
}) {
  return (
    <Tabs defaultValue="new" className="flex h-full  w-full flex-col">
      <div className="px-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">新的</TabsTrigger>
          <TabsTrigger
            value="working"
            // className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black/70 "
          >
            施工中
          </TabsTrigger>
        </TabsList>
      </div>
      {!isLoading ? (
        <>
          <TabsContent value="new" className="w-full p-1">
            <ScrollArea
              className="h-[calc(100vh_-_17rem)] w-full px-4"
              type="always"
            >
              <PageTransition>
                {pendingReports.map((report) => (
                  <ReportItem
                    key={report.id}
                    id={report.id}
                    status={report.status}
                    type={report.type}
                    createdAt={report.createdAt!}
                    location={report.location!}
                    room={report.room!}
                    createdBy={report.createdBy}
                    phone={report.phone!}
                    content={report.content}
                  />
                ))}
              </PageTransition>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="working" className="w-full p-1">
            <ScrollArea
              className="h-[calc(100vh_-_17rem)] w-full px-4"
              type="always"
            >
              <PageTransition>
                {acceptedReports.map((report) => (
                  <>
                    <ReportItem
                      key={report.id}
                      id={report.id}
                      status={report.status}
                      type={report.type}
                      createdAt={report.createdAt!}
                      location={report.location!}
                      room={report.room!}
                      createdBy={report.createdBy}
                      phone={report.phone!}
                      content={report.content}
                      worker={report.worker}
                    />
                  </>
                ))}
              </PageTransition>
            </ScrollArea>
          </TabsContent>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </Tabs>
  );
}
