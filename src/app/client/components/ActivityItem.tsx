"use client";
import { Card } from "@/components/ui/card";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function ActivityItem({
  id,
  type,
  content,
}: {
  id: string;
  type: string;
  content: string;
}) {
  return (
    <>
      <AccordionItem value={id}>
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
        </Card>{" "}
      </AccordionItem>
    </>
  );
}
