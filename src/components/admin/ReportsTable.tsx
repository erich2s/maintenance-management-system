// 数据类型
type TableReport = {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  createdAt: string;
  createdBy: {
    name: string;
    username: string;
  };
  type: string;
  phone: string;
  location: string;
  room: string;
  content: string;
};
/**
 *  PENDING // 待处理，紫色
  ACCEPTED // 已接受并派工，黄色
  REJECTED // 已拒绝，红色
  COMPLETED // 已完成，绿色
 */
// 定义col
import { ColumnDef } from "@tanstack/react-table";
const columns: ColumnDef<TableReport>[] = [
  {
    accessorKey: "type",
    header: "类型",
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            status === "PENDING"
              ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
              : status === "ACCEPTED"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : status === "REJECTED"
              ? "bg-red-100 text-red-800 hover:bg-red-200"
              : status === "COMPLETED"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : ""
          }`}
        >
          {status === "PENDING"
            ? "待处理"
            : status === "ACCEPTED"
            ? "已派工"
            : status === "REJECTED"
            ? "已拒绝"
            : status === "COMPLETED"
            ? "已完成"
            : ""}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "创建时间",
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
  },
  {
    accessorKey: "createdBy",
    header: "创建人",
    cell: ({ row }) => {
      return (
        <>
          {row.original.createdBy.name}
          <span className="text-muted-foreground">
            ({row.original.createdBy.username})
          </span>
        </>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "联系电话",
  },
  {
    accessorKey: "location",
    header: "位置",
  },
  {
    accessorKey: "room",
    header: "房间",
  },
  {
    accessorKey: "content",
    header: "内容",
    cell: ({ row }) => {
      return (
        <div className="w-44   whitespace-pre-wrap ">
          {row.original.content.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      );
    },
  },
];

// 定义table
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function ReportsTable() {
  const { data } = useSWR("/api/reports/getAll", (...args) =>
    fetch(...args, { cache: "no-store" }).then((res) => res.json()),
  );
  const [tableData, setTableData] = useState<TableReport[]>([]);
  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
