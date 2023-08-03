import { cn, formatDate } from "@/lib/utils";
import { ChevronRight, Clock2, MapPin, Package } from "lucide-react";
import ReportDetails from "./ReportDetails";
const statusColor: Record<string, string> = {
  PENDING: "bg-primary",
  ACCEPTED: "bg-yellow-400",
  REJECTED: "bg-red-400",
  FINISHED: "bg-green-400",
};
export interface ReportItemProps {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  type: string;
  createdAt: string;
  location: string;
  room: string;
  createdBy: {
    name: string;
    username: string;
  };
  worker?: {
    name: string;
    phone: string;
  };
  phone: string;
  content: string;
}
export default function ReportItem({
  id,
  status,
  type,
  createdAt,
  location,
  room,
  createdBy,
  phone,
  content,
}: ReportItemProps) {
  const color = statusColor[status];
  return (
    <ReportDetails
      data={{
        id,
        status,
        type,
        createdAt,
        location,
        room,
        createdBy,
        phone,
        content,
      }}
    >
      <div className="relative my-3 flex items-center justify-between rounded-xl border  py-2 pl-8 pr-14 transition-all duration-150 ease-linear hover:cursor-pointer hover:bg-gray-100 ">
        <div
          className={cn("absolute left-0 h-10 w-1.5 rounded-r-md", color)}
        ></div>
        <div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Package width={16} className="mr-1 " />
            类型
          </div>
          <div className="text-md">{type}</div>
        </div>
        <div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock2 width={16} className="mr-1 " />
            时间
          </div>
          <div className="text-md">{formatDate(createdAt).slice(5)}</div>
        </div>
        <div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin width={16} className="mr-1 " />
            地点
          </div>
          <div className="text-md">{location}</div>
        </div>
        <div className="absolute right-[4px]">
          <ChevronRight color="#677489" strokeWidth={1.5} />
        </div>
      </div>
    </ReportDetails>
  );
}
