"use client";
import DataTable from "@/components/admin/DataTable";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { prettyPrintJson } from "pretty-print-json";
import { Badge } from "@/components/ui/badge";
import { cn, xlsx2Json } from "@/lib/utils";

import { Copy, Plus, Trash2 } from "lucide-react";
import { useCopyToClipboard } from "react-use";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export default function page() {
  const [state, copyToClipboard] = useCopyToClipboard();
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
                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200",
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
      header: "通知订阅",
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
                <TooltipContent className="relative p-2" onClick={() => {}}>
                  <div className="absolute right-4 top-3">
                    <button
                      className="rounded p-1 hover:bg-gray-200"
                      onClick={() => {
                        copyToClipboard(
                          JSON.stringify(row.original.subscription),
                        );
                        if (state.error) {
                          toast.error("复制失败");
                        } else {
                          toast.remove();
                          toast.success("复制成功");
                        }
                      }}
                    >
                      <Copy
                        size={16}
                        className="text-gray-500 hover:text-gray-700"
                      />
                    </button>
                  </div>
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
              <p>未订阅</p>
            </div>
          );
        }
      },
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => {
        return (
          <button
            onClick={() => {
              toast.promise(
                fetch(`/api/users/${row.original.id}`, {
                  method: "DELETE",
                }).then(() => {
                  setRefresh((refresh) => !refresh);
                }),
                {
                  loading: "删除中...",
                  success: "删除成功",
                  error: "删除失败",
                },
              );
            }}
          >
            <Trash2
              size={16}
              className="scale-110 cursor-pointer hover:text-red-500 "
            />
          </button>
        );
      },
    },
  ];
  const [refresh, setRefresh] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file");
      return;
    }
    xlsx2Json(file)
      .then((json) => {
        fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        })
          .then((res) => {
            if (res.ok) {
              toast.success("导入成功");
              setRefresh(!refresh);
              fileInputRef.current!.value = "";
            } else {
              fileInputRef.current!.value = "";
              toast.error("导入失败");
            }
          })
          .catch((err) => {
            toast.error("导入失败");
            console.error(err);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <DataTable url="/api/users" columns={columns} mutateFlag={refresh}>
        <Button
          className="flex items-center gap-1 pl-2 pr-2.5"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <Plus size={18} />
          批量导入
          <input
            type="file"
            accept=".xlsx"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Button>
      </DataTable>
    </div>
  );
}
