import { cn } from "@/lib/utils";
import {
  Ban,
  ChevronRight,
  Clock2,
  HardHat,
  MapPin,
  Package,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import "./ReportItemStyle.css";
export enum Status {
  PENDING, // 待处理，紫色
  ACCEPTED, // 已接受并派工，黄色
  REJECTED, // 已拒绝，红色
  FINISHED, // 已完成，绿色
}
const statusColor = {
  [Status.PENDING]: "bg-primary",
  [Status.ACCEPTED]: "bg-yellow-400",
  [Status.REJECTED]: "bg-red-400",
  [Status.FINISHED]: "bg-green-400",
};
interface ReportProps {
  status?: Status;
  type: string;
  createdAt: string;
  location: string;
  room: string;
  createdBy: string;
  phone: string;
  content: string;
}
export default function ReportItem({
  status,
  type,
  createdAt,
  location,
  room,
  createdBy,
  phone,
  content,
}: ReportProps) {
  const color = statusColor[status || Status.PENDING];
  return (
    <Dialog>
      <DialogTrigger asChild>
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
            <div className="text-md">{createdAt}</div>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>报修单详情</DialogTitle>
          <DialogDescription>
            <table className="my-4 w-full border border-slate-400">
              <tr>
                <th>报修类型</th>
                <td>{type}</td>
              </tr>
              <tr>
                <th>报修地点</th>
                <td>{location}</td>
              </tr>
              <tr>
                <th>房号</th>
                <td>{room}</td>
              </tr>
              <tr>
                <th>报修人</th>
                <td>{createdBy}</td>
              </tr>
              <tr>
                <th>联系方式</th>
                <td>{phone}</td>
              </tr>
              <tr>
                <th>报修时间</th>
                <td>{createdAt}</td>
              </tr>
              <tr>
                <th>报修内容</th>
                <td>{content}</td>
              </tr>
            </table>
            <div className="flex  w-full justify-between ">
              <Button
                variant={"secondary"}
                className="h-10 hover:bg-rose-100 hover:text-rose-500"
                // className="mr-2  bg-rose-500 text-white hover:bg-rose-600 hover:text-white"
              >
                <Ban width={16} className="mr-1" />
                拒绝
              </Button>
              <Button className="h-10 w-20">
                <HardHat width={16} className="mr-1" />
                派工
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
