// 定义col
import { ColumnDef } from "@tanstack/react-table";
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
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import PageTransition from "../PageTransition";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useSWR from "swr";

interface props {
  url: string;
  columns: ColumnDef<any>[];
  // 对表的增加操作组件，每个页面的都不一样
  children?: React.ReactNode;
  mutateFlag?: boolean;
}

export default function DataTable({
  url,
  columns,
  children,
  mutateFlag,
}: props) {
  // 分页
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  // 记录的总条数
  const [total, setTotal] = useState(0);
  // 获取数据
  const fetcher = (url: string) =>
    fetch(url, { cache: "no-store" }).then((res) => res.json());
  const [dynamicUrl, setDynamicUrl] = useState<string>(url);
  useEffect(() => {
    setDynamicUrl(`${url}?page=${page}&size=${size}`);
  }, [page, size]);
  const { data, isLoading, error, mutate } = useSWR<{
    data: [];
    total: number;
  }>(dynamicUrl, fetcher);
  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);
  useEffect(() => {
    // 监听从父组件的传来的表格左下角的功能区的动态mutateFlag，从而refetch数据
    mutate();
    console.log("mutate");
  }, [mutateFlag]);
  // 定义table
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 获取tableRef的高度
    const tbh = tableRef.current?.clientHeight;
    // 从而动态设置page size
    setSize(Math.floor(tbh! / 55));
  }, [tableRef.current?.clientHeight]);
  return (
    <>
      <PageTransition variant="scale">
        <div className="h-full w-full px-7 py-3">
          <Card
            className="h-[calc(100vh_-_9rem)] w-full overflow-hidden rounded-md"
            ref={tableRef}
          >
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
                        <TableRow key={row.id} className="max-h-[55px]">
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
                          {isLoading ? (
                            <span>Loading...</span>
                          ) : error ? (
                            <span>Error</span>
                          ) : (
                            <span>No data</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </Card>
          <div className="flex items-center justify-between py-2">
            {/* 左下角的自定义功能区 */}
            <div>{children}</div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground ">
                Total: {data?.total || 0},
              </span>
              <span className="text-muted-foreground ">
                Page: {page}/{Math.ceil(total / size)}
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
                disabled={page * size >= total}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
