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

interface props<T> {
  data: T;
  columns: ColumnDef<T>[];
}

export default function DataTable({ data, columns }: props<any>) {
  // 分页
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  // 记录的总条数
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (data) {
      setCount(data.length);
    }
  }, [data]);

  // 定义table
  const table = useReactTable({
    data: data,
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
          <Card className=" min-h-fit rounded-md" ref={tableRef}>
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
        </div>
      </PageTransition>
    </>
  );
}
