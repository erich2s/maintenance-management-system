import { createContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { ReportItemProps } from "@/../types/ReportItemProps";
import { Button } from "@/components/ui/button";
import { Ban, HardHat } from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/Spinner";
import "./ReportDetailsStyle.css";
import StatusBadge from "@/components/StatusBadge";

export const ReportDetailsContext = createContext<{
  setData: React.Dispatch<React.SetStateAction<ReportItemProps | undefined>>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setData: () => {},
  setDialogOpen: () => {},
});

type worker = {
  id: number;
  name: string;
  phone: string;
};
export default function ReportDetailsProvider({
  children,
  onReportAction,
}: {
  children: React.ReactNode;
  onReportAction?: (
    reportId: number,
    action: "ACCEPTED" | "REJECTED" | "COMPLETED",
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [data, setData] = useState<ReportItemProps>();

  const [workers, setWorkers] = useState<worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string>("");
  useEffect(() => {
    fetch("/api/workers")
      .then((res) => res.json())
      .then((res) => {
        setWorkers(res);
      });
  }, []);
  useEffect(() => {
    if (!open) {
      setSelectedWorker("");
    }
  }, [open]);
  async function handleAccept() {
    setLoading(true);
    await fetch(`/api/reports/${data?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "ACCEPTED",
        workerId: Number(selectedWorker),
      }),
    });
    setLoading(false);
    setOpen(false);
    toast.success("派工成功");
    onReportAction?.(data?.id as number, "ACCEPTED");
  }
  async function handleComplete() {
    setLoading(true);
    await fetch(`/api/reports/${data?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "COMPLETED",
      }),
    });
    setLoading(false);
    setOpen(false);
    toast.success("确认完工");
    onReportAction?.(data?.id as number, "COMPLETED");
  }
  async function handleReject() {
    setRejectLoading(true);
    await fetch(`/api/reports/${data?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "REJECTED",
      }),
    });
    setRejectLoading(false);
    setOpen(false);
    toast.success("已拒绝");
    onReportAction?.(data?.id as number, "REJECTED");
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ReportDetailsContext.Provider
        value={{
          setData: setData,
          setDialogOpen: setOpen,
        }}
      >
        {children}
      </ReportDetailsContext.Provider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center ">
            <span className="mr-2">报修单详情</span>
            <StatusBadge status={data?.status as any} />
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground" id="report-details">
          <table className="mb-4 w-full border border-slate-400">
            <tbody>
              <tr>
                <th>报修单号</th>
                <td>{data?.id}</td>
              </tr>
              <tr>
                <th>报修类型</th>
                <td>{data?.type}</td>
              </tr>
              <tr>
                <th>报修地点</th>
                <td>{data?.location}</td>
              </tr>
              <tr>
                <th>房号</th>
                <td>{data?.room}</td>
              </tr>
              <tr>
                <th>报修人</th>
                <td>
                  {data?.createdBy?.name}
                  <span className="ml-1 text-muted-foreground">
                    ({data?.createdBy?.username})
                  </span>
                </td>
              </tr>
              <tr>
                <th>联系方式</th>
                <td>{data?.phone}</td>
              </tr>
              <tr>
                <th>报修时间</th>
                <td>{formatDate(data?.createdAt) || "null"}</td>
              </tr>
              <tr>
                <th>报修内容</th>
                <td>{data?.content}</td>
              </tr>
              {(data?.status === "ACCEPTED" ||
                data?.status === "COMPLETED") && (
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
          {data?.status === "PENDING" && (
            <div className="flex  w-full justify-between">
              <Button
                onClick={handleReject}
                variant={"secondary"}
                className="h-10 hover:bg-rose-100 hover:text-rose-500"
              >
                {rejectLoading ? (
                  <Spinner width={22} />
                ) : (
                  <>
                    <Ban width={16} className="mr-1" />
                    拒绝
                  </>
                )}
              </Button>
              <div className="flex">
                <Select onValueChange={setSelectedWorker}>
                  <SelectTrigger
                    disabled={loading}
                    className="w-[200px]  rounded-r-none border-r-0 focus:ring-0"
                  >
                    <SelectValue placeholder="选择师傅" />
                  </SelectTrigger>
                  <SelectContent>
                    {workers.map((worker) => (
                      <SelectItem
                        key={worker.id}
                        value={String(worker.id)}
                        className="hover:bg-rose-100 hover:text-rose-500"
                      >
                        {worker.name}{" "}
                        <span className="text-muted-foreground">
                          ({worker.phone})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleAccept}
                  disabled={loading || selectedWorker === ""}
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
          {data?.status === "ACCEPTED" && (
            <div className="flex  w-full justify-end">
              <Button onClick={handleComplete} disabled={loading}>
                {loading ? (
                  <Spinner width={22} />
                ) : (
                  <>
                    <span>确认完成</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
