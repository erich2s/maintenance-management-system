"use client";
import PageTransition from "@/components/PageTransition";
import ReportsTable from "@/components/admin/ReportsTable";
import ReportDetailsProvider from "@/context/ReportDetailsProvider";

export default function page() {
  return (
    <PageTransition>
      <div className="h-full w-full px-7 py-3">
        <ReportDetailsProvider>
          <ReportsTable />
        </ReportDetailsProvider>
      </div>
    </PageTransition>
  );
}
