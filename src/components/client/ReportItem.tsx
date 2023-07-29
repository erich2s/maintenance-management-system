"use client";
import { Card } from "@/components/ui/card";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { Separator } from "@/components/ui/separator";

// 报修单状态
enum Status {
  PENDING, // 待处理，紫色
  ACCEPTED, // 已接受并派工，黄色
  REJECTED, // 已拒绝，红色
  COMPLETED, // 已完成，绿色
}
export type ReportItemProps = {
  value: number;
  id: number;
  status?: Status;
  createdAt?: Date;
  createdById?: number;
  type: string;
  phone?: string;
  location?: string;
  room?: string;
  content: string;
};
export default function ReportItem({
  id,
  type,
  content,
  value,
}: ReportItemProps) {
  return (
    <>
      <AccordionItem value={String(value)}>
        <Card className="my-4 overflow-hidden border shadow">
          <AccordionTrigger className="p-3">
            <div className="ml-2 flex w-full items-center justify-between text-base font-bold">
              <div>{type}</div>
              <div className=" h-3 w-3 rounded-full bg-green-400/80"></div>
            </div>
          </AccordionTrigger>
          <Separator className="mx-auto w-[90%] " />
          <AccordionContent className="px-4 pt-2">
            <p className="indent-[2em]">{content}</p>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </>
  );
}
