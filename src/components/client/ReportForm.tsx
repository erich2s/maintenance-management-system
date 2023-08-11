import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Spinner } from "../Spinner";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  typeId: z.string().min(1, { message: "请选择报修类型" }),
  locationId: z.string().min(1, { message: "请选择地址" }),
  room: z.string().min(1, { message: "请填写房间号" }),
  phone: z
    .string()
    .min(11, { message: "请填写手机号" })
    .max(11, { message: "手机号格式不正确" }),
  content: z.string().min(1, { message: "请填写报修内容" }),
});

export default function ReportForm({
  className,
  setSheetOpen,
}: {
  className?: string;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [locations, setLocations] = useState<
    { id: number; name: string; latitude: number; longitude: number }[]
  >([]);
  useEffect(() => {
    fetch("/api/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.data);
      });
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.data);
      });
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeId: "",
      locationId: "",
      room: "",
      phone: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    const res = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(values),
    });

    setIsLoading(false);
    setSheetOpen(false);
    try {
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("提交成功");
      }
    } catch (error) {
      toast.error("提交失败");
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 py-4"
        >
          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>
                  报修类型
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    {/* <Input {...field} /> */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-36  max-h-40">
                    <ScrollArea className="h-full w-full" type="always">
                      {types.map((type) => (
                        <SelectItem key={type.id} value={String(type.id)}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>地址
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-36  max-h-40">
                    <ScrollArea className="h-full w-full" type="always">
                      {locations.map((location) => (
                        <SelectItem
                          key={location.id}
                          value={String(location.id)}
                        >
                          {location.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>房间号
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                <FormLabel>
                  <span className="text-red-500">* </span>手机号
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">* </span>报修内容
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="填写报修内容"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mx-auto mb-6 mt-4 h-12 w-[90%]"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "提交"}
          </Button>
        </form>
      </Form>
    </>
  );
}
