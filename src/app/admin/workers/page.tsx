"use client";
import DataTable from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";

import { Worker } from "cluster";
import { useEffect, useState } from "react";

const columns: ColumnDef<Worker>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "姓名" },
  { accessorKey: "phone", header: "手机号码" },
];
export default function page() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  useEffect(() => {
    fetch("/api/workers", { cache: "no-store" })
      .then((res) => res.json())
      .then((res) => {
        setWorkers(res);
      }),
      [];
  });
  return (
    <div>
      <DataTable data={workers} columns={columns} />
    </div>
  );
}
