import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { ReportItemProps } from "./ReportItem";
import { Button } from "../ui/button";
import { Ban, HardHat } from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "../Spinner";
import "./ReportDetailsStyle.css";
export default function ReportDetails({
  children,
  data,
  className,
}: {
  children: React.ReactNode;
  data: ReportItemProps;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleAccept() {
    // TODO: 用Server Action
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setOpen(false);
    toast.success("派工成功");
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className={className}>
          {children || <></>}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>报修单详情</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground" id="report-details">
            <table className="mb-4 w-full border border-slate-400">
              <tbody>
                <tr>
                  <th>报修单号</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>报修类型</th>
                  <td>{data.type}</td>
                </tr>
                <tr>
                  <th>报修地点</th>
                  <td>{data.location}</td>
                </tr>
                <tr>
                  <th>房号</th>
                  <td>{data.room}</td>
                </tr>
                <tr>
                  <th>报修人</th>
                  <td>
                    {data.createdBy.name}
                    <span className="ml-1 text-muted-foreground">
                      ({data.createdBy.username})
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>联系方式</th>
                  <td>{data.phone}</td>
                </tr>
                <tr>
                  <th>报修时间</th>
                  <td>{formatDate(data.createdAt)}</td>
                </tr>
                <tr>
                  <th>报修内容</th>
                  <td>{data.content}</td>
                </tr>
                {(data.status === "ACCEPTED" ||
                  data.status === "COMPLETED") && (
                  <tr>
                    <th>维修工人</th>
                    <td>
                      <div>
                        {data.worker?.name}
                        <span className="text-muted-foreground ">
                          ({data.worker?.phone})
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {data.status === "PENDING" && (
              <div className="flex  w-full justify-between">
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
            )}
            {data.status === "ACCEPTED" && (
              <div className="flex  w-full justify-end">
                <Button>确认完成</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
