// 数据类型
type TableReport = ReportItemType;
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
    cell: ({ row }) => {
      return (
        <div className="max-w-[6rem] overflow-hidden text-ellipsis">
          {row.original.type.name}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => {
      const status = row.original.status;
      return <StatusBadge status={status} />;
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
          {row.original.createdBy?.name}
          <span className="text-muted-foreground">
            ({row.original.createdBy?.username})
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
    cell: ({ row }) => {
      return (
        <div className="max-w-[6rem] overflow-hidden text-ellipsis">
          {row.original.location.name}
        </div>
      );
    },
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
    header: "维修工",
    cell: ({ row }) => {
      return (
        <>
          {row.original.worker ? (
            <div className="max-w-[5rem] overflow-hidden text-ellipsis">
              {row.original.worker.name}
            </div>
          ) : (
            <span className="text-muted-foreground ">未派工</span>
          )}
        </>
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
import { useContext, useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { ReportDetailsContext } from "@/context/ReportDetailsProvider";
import { ReportItemType } from "../../../types/reportItemType";
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
    setSize(Math.floor(tbh! / 60));
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
  const reportDetailsContext = useContext(ReportDetailsContext);
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
                    <TableRow
                      key={row.id}
                      className="cursor-pointer "
                      onClick={() => {
                        console.log(row.original);
                        reportDetailsContext.setData({
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
                        });
                        reportDetailsContext.setDialogOpen(true);
                      }}
                    >
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
