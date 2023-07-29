"use client";
import PageTransition from "@/components/PageTransition";
import ReportsTable from "@/components/admin/ReportsTable";
import { useEffect, useState } from "react";
import type { Report } from "@prisma/client";
import useSWR from "swr";
import { Card } from "@/components/ui/card";

export default function page() {
  const { data, isLoading } = useSWR("/api/reports/getAll", (...args) =>
    fetch(...args, { cache: "no-store" }).then((res) => res.json()),
  );
  const [tableData, setTableData] = useState<Report[]>();
  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);
  return (
    <PageTransition>
      <div className="h-full w-full p-7">
        <Card>
          <ReportsTable />
        </Card>
      </div>
    </PageTransition>
  );
}
