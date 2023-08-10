"use client";
import DataTable from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Worker } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
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
  const columns: ColumnDef<Worker>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "姓名" },
    { accessorKey: "phone", header: "手机号码" },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => {
        return (
          <button
            onClick={() => {
              toast.promise(
                fetch(`/api/workers/${row.original.id}`, {
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
    <div>
      <DataTable url="/api/workers" columns={columns} mutateFlag={refresh}>
        <Dialog onOpenChange={setIsOpened} open={isOpened}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1 pl-2 pr-2.5">
              <Plus size={18} />
              添加工人
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加工人</DialogTitle>
              <DialogDescription>请填写工人姓名与号码</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </DataTable>
    </div>
  );
}
