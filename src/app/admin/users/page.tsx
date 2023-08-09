"use client";
import DataTable from "@/components/admin/DataTable";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { prettyPrintJson } from "pretty-print-json";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "姓名",
  },
  {
    accessorKey: "role",
    header: "角色",
    cell: ({ row }) => {
      return (
        <div className="max-w-[6rem] overflow-hidden text-ellipsis">
          <Badge
            className={cn(
              row.original.role === "ADMIN"
                ? "bg-red-600 hover:bg-red-500"
                : "bg-indigo-600",
              "select-none",
            )}
          >
            {row.original.role}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "用户名",
  },
  {
    accessorKey: "password",
    header: "密码",
    cell: ({ row }) => {
      return (
        <div className="max-w-[6rem] overflow-hidden text-ellipsis">
          {row.original.password}
        </div>
      );
    },
  },

  {
    accessorKey: "subscription",
    header: "订阅",
    cell: ({ row }) => {
      if (row.original.subscription) {
        const jsonHtml = prettyPrintJson.toHtml(row.original.subscription);
        return (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <div className="max-w-[7rem] overflow-hidden text-ellipsis">
                  <code> {JSON.stringify(row.original.subscription)}</code>
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-2">
                <pre
                  className="w-[20rem] overflow-auto rounded-md bg-muted p-2 text-xs"
                  dangerouslySetInnerHTML={{ __html: jsonHtml }}
                ></pre>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        return (
          <div className="max-w-[7rem] overflow-hidden text-ellipsis">
            <code> {JSON.stringify(row.original.subscription)}</code>
          </div>
        );
      }
    },
  },
];

export default function page() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users", { cache: "no-store" })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      });
  }, []);

  return (
    <>
      <DataTable data={users} columns={columns} />
    </>
  );
}
