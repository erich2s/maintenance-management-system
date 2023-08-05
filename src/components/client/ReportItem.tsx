"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "../StatusBadge";

// 报修单状态
enum Status {
  PENDING, // 待处理，紫色
  ACCEPTED, // 已接受并派工，黄色
  REJECTED, // 已拒绝，红色
  COMPLETED, // 已完成，绿色
}
import { ReportItemType } from "../../../types/reportItemType";
import { formatDate } from "@/lib/utils";
import {
  Clock2,
  DoorOpen,
  HardHat,
  MapPin,
  Phone,
  PinIcon,
  Smartphone,
} from "lucide-react";
export default function ReportItem({
  index,
  id,
  status,
  type,
  createdAt,
  location,
  room,
  worker,
  phone,
  content,
}: ReportItemType & { index: number }) {
  return (
    <>
      <AccordionItem value={String(index)}>
        <Card className="mt-4 overflow-hidden border shadow">
          <AccordionTrigger className="p-3">
            <div className="ml-2 flex w-full items-center justify-between text-base font-bold">
              <div>{type.name}</div>
              {/* <div className="text-sm">{formatDate(createdAt)}</div> */}
              <StatusBadge status={status} />
            </div>
          </AccordionTrigger>
          <Separator className="mx-auto w-full " />
          <AccordionContent className="pt-2">
            <p className="mx-4 mb-2 mt-1 rounded-lg bg-muted p-3">{content}</p>
            <CardContent className="flex flex-col pb-2">
              <div className="flex w-full justify-between">
                <div className="flex items-center ">
                  <MapPin width={16} className="mr-1" />
                  <span className="mr-1">报修地点:</span>
                  <span> {location.name}</span>
                </div>
                <div className="flex items-center ">
                  <DoorOpen width={16} className="mr-1" />
                  <span className="mr-1">房号:</span>
                  <span>{room}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center ">
                <Smartphone width={16} className="mr-1" />
                <div className="flex w-full justify-between">
                  <span>所留电话:</span>
                  <span>{phone}</span>
                </div>
              </div>
              {(status === "ACCEPTED" || status === "COMPLETED") && (
                <div className="my-2 flex w-full justify-between">
                  <div className="flex items-center">
                    <HardHat width={16} className="mr-1" />
                    <span>维修工: </span>
                  </div>
                  <span>
                    {worker?.name}
                    <span className="text-muted-foreground ">
                      ({worker?.phone})
                    </span>
                  </span>
                </div>
              )}
            </CardContent>

            <Separator className="mx-auto w-full" />
            <CardFooter className="flex w-full justify-between px-6 py-2">
              <div className="flex items-center">
                <Clock2 width={16} className="mr-1 " />
                报修时间：
              </div>
              <div>{formatDate(createdAt)}</div>
            </CardFooter>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </>
  );
}
