"use client";
import PageTransition from "@/components/PageTransition";
import ReportsTable from "@/components/admin/ReportsTable";

export default function page() {
  return (
    <PageTransition>
      <div className="h-full w-full px-7 py-3">
        <ReportsTable />
      </div>
    </PageTransition>
  );
}
