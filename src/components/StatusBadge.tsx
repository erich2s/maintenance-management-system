import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function StatusBadge({
  status,
  className,
}: {
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  className?: string;
}) {
  return (
    <Badge
      className={cn(
        "inline-flex w-[3.4rem] rounded-full px-2 text-xs font-semibold leading-5",
        status === "PENDING"
          ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
          : status === "ACCEPTED"
          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          : status === "REJECTED"
          ? "bg-red-100 text-red-800 hover:bg-red-200"
          : status === "COMPLETED"
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : "",
        className,
      )}
    >
      {status === "PENDING"
        ? "待处理"
        : status === "ACCEPTED"
        ? "已派工"
        : status === "REJECTED"
        ? "已拒绝"
        : status === "COMPLETED"
        ? "已完成"
        : ""}
    </Badge>
  );
}
