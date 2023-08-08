"use client";
import ReportItem from "@/components/client/ReportItem";
import { Accordion } from "@/components/ui/accordion";

import { PackageOpen } from "lucide-react";
import { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import useSWR from "swr";
import { Spinner } from "../Spinner";
import { ReportItemType } from "../../../types/reportItemType";
export default function MyReports() {
  const [reports, setReports] = useState<ReportItemType[]>([]);
  const { data, error, isLoading } = useSWR(
    "/api/reports",
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
    console.log(data);
  }, [data]);
  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="w-full text-[1.25rem] font-bold">我的报修</h2>
      {isLoading ? (
        <div className="mt-36  flex flex-col items-center justify-center text-gray-400">
          <Spinner size={60} />
        </div>
      ) : (
        <>
          {reports.length !== 0 ? (
            <PageTransition className="w-full">
              <Accordion
                type="single"
                defaultValue="0"
                className="w-full"
                collapsible
              >
                {reports.map((report, index) => (
                  <ReportItem
                    key={report.id}
                    id={report.id}
                    index={index}
                    type={report.type}
                    content={report.content}
                    createdAt={report.createdAt}
                    worker={report.worker}
                    status={report.status}
                    location={report.location}
                    room={report.room}
                    phone={report.phone}
                  />
                ))}
              </Accordion>
            </PageTransition>
          ) : (
            <div className="mt-36  flex flex-col items-center justify-center text-gray-400">
              <PackageOpen size={60} strokeWidth={1} className="mb-2" />
              暂无数据
            </div>
          )}
        </>
      )}
    </div>
  );
}
