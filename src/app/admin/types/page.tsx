"use client";
import DataTable from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Type } from "@prisma/client";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function page() {
  const [refresh, setRefresh] = useState(false);
  const columns: ColumnDef<Type>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "类型名称",
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => {
        return (
          <button
            onClick={() => {
              toast.promise(
                fetch(`/api/types/${row.original.id}`, {
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

  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <DataTable url="/api/types" columns={columns} mutateFlag={refresh}>
        <Dialog onOpenChange={setIsOpened} open={isOpened}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1 pl-2 pr-2.5">
              <Plus size={18} />
              添加报修类型
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加报修类型</DialogTitle>
              <DialogDescription>请填写报修类型的名称</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </DataTable>
    </>
  );
}
