// 数据类型
type TableReport = {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  createdAt: string;
  createdBy: {
    name: string;
    username: string;
  };
  worker?: {
    name: string;
    phone: string;
  };
  type: string;
  phone: string;
  location: string;
  room: string;
  content: string;
};
/**
  PENDING // 待处理，紫色
  ACCEPTED // 已接受并派工，黄色
  REJECTED // 已拒绝，红色
  COMPLETED // 已完成，绿色
 */
// 定义col
import { ColumnDef } from "@tanstack/react-table";
const columns: ColumnDef<TableReport>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
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
          className={`inline-flex w-[3.4rem] rounded-full px-2 text-xs font-semibold leading-5 ${
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
        <div className="max-w-[6rem] overflow-hidden text-ellipsis">
          {row.original.content}
        </div>
      );
    },
  },
  {
    accessorKey: "worker",
    header: "工人",
    cell: ({ row }) => {
      return (
        <>
          {row.original.worker ? (
            <div className="max-w-[5rem] overflow-hidden text-ellipsis">
              {row.original.worker.name}
              <span className="text-muted-foreground ">
                ({row.original.worker.phone})
              </span>
            </div>
          ) : (
            "未派工"
          )}
        </>
      );
    },
  },
  {
    id: "detail",
    header: "详情",
    cell: ({ row }) => {
      return (
        <ReportDetails
          data={{
            id: row.original.id,
            status: row.original.status,
            type: row.original.type,
            createdAt: row.original.createdAt,
            location: row.original.location,
            room: row.original.room,
            createdBy: row.original.createdBy,
            phone: row.original.phone,
            content: row.original.content,
            worker: row.original.worker,
          }}
        >
          <div className="flex cursor-pointer items-center justify-center  p-1 transition-all duration-150 hover:scale-110 hover:text-muted-foreground ">
            <Info width={18} />
          </div>
        </ReportDetails>
      );
    },
  },
];

// 定义table
import {
  flexRender,
  getCoreRowModel,
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
import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import ReportDetails from "./ReportDetails";
export default function ReportsTable() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  // 记录的总条数
  const [count, setCount] = useState(0);

  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 获取tableRef的高度
    const tbh = tableRef.current?.clientHeight;
    // 从而动态设置page size
    setSize(Math.floor(tbh! / 70));
  }, [tableRef.current?.clientHeight]);

  const { data } = useSWR(
    `/api/reports/getAll?page=${page}&size=${size}`,
    (...args) =>
      fetch(...args, { cache: "no-store" }).then((res) => res.json()),
  );
  const [tableData, setTableData] = useState<TableReport[]>([]);
  useEffect(() => {
    if (data) {
      setTableData(data.reports);
      setCount(data.count);
    }
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Card className="h-[calc(100vh_-_8.8rem)] rounded-md" ref={tableRef}>
        <ScrollArea className="h-full w-full" type="always">
          <div className="h-full">
            <Table className="relative">
              <TableHeader className="bg-muted text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="whitespace-nowrap"
                        >
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
              <TableBody className="w-full">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </Card>
      <div className="flex items-center justify-end space-x-2 py-2">
        <span className="text-muted-foreground ">
          Page: {page}/{Math.ceil(count / size)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page * size >= count}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
