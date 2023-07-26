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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import "./ReportItemStyle.css";
import { useState } from "react";
import { Spinner } from "../Spinner";
import { toast } from "react-hot-toast";
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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleAccept() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setOpen(false);
    toast.success("派工成功");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          <table className="mb-4 w-full border border-slate-400">
            <tbody>
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
            </tbody>
          </table>
          <div className="flex  w-full justify-between ">
            <Button
              variant={"secondary"}
              className="h-10 hover:bg-rose-100 hover:text-rose-500"
            >
              <Ban width={16} className="mr-1" />
              拒绝
            </Button>
            <div className="flex">
              <Select>
                <SelectTrigger
                  disabled={loading}
                  className="w-[200px]  rounded-r-none border-r-0 focus:ring-0"
                >
                  <SelectValue placeholder="选择师傅" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">黄师傅 18029375921</SelectItem>
                  <SelectItem value="2">王师傅 12429346921</SelectItem>
                  <SelectItem value="3">邓师傅 18245336921</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleAccept}
                disabled={loading}
                className="h-10 w-20 rounded-l-none border-l-0"
              >
                {!loading ? (
                  <>
                    <HardHat width={16} className="mr-1" />
                    派工
                  </>
                ) : (
                  <>
                    <Spinner width={22} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
