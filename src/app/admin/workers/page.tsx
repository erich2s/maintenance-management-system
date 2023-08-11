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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "请输入名字",
  }),
  phone: z.string().min(1, {
    message: "请输入手机号码",
  }),
});
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

  // 定义表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      fetch("/api/workers", {
        method: "POST",
        body: JSON.stringify(values),
      }).then(() => {
        setRefresh((refresh) => !refresh);
        setIsOpened(false);
      }),
      {
        loading: "添加中...",
        success: "添加成功",
        error: "添加失败",
      },
    );
  }
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

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>姓名</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>手机号码</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="float-right w-20 ">
                  创建
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </DataTable>
    </div>
  );
}
