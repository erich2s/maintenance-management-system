"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

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
          <AccordionTrigger className="border-b p-3">
            <div className="ml-2 flex w-full items-center justify-between text-base font-bold">
              <div>{type}</div>
              <div className=" h-3 w-3 rounded-full bg-green-400/80"></div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <p>{content}</p>
          </AccordionContent>
        </Card>{" "}
      </AccordionItem>
    </>
  );
}
