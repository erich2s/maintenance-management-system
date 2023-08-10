"use client";
import DataTable from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Worker } from "@prisma/client";

const columns: ColumnDef<Worker>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "姓名" },
  { accessorKey: "phone", header: "手机号码" },
];
export default function page() {
  return (
    <div>
      <DataTable url="/api/workers" columns={columns} />
    </div>
  );
}
