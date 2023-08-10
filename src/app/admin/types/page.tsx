"use client";
import DataTable from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Type } from "@prisma/client";

const columns: ColumnDef<Type>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "类型名称",
  },
];

export default function page() {
  return (
    <>
      <DataTable url="/api/types" columns={columns} />
    </>
  );
}
