import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { ReportItemType } from "../../types/reportItemType";

export default function useUncompletedReports() {
  const { data, isLoading, mutate } = useSWR(
    "/api/reports/getUnCompleted",
    (...args) =>
      fetch(...args, { cache: "no-store" }).then((res) => res.json()),
    {
      refreshInterval: 2000,
    },
  );
  const [reports, setReports] = useState<ReportItemType[]>([]);
  useEffect(() => {
    if (data) {
      setReports(data);
    }
  }, [data]);
  // 数据聚合
  const locations = useMemo(() => {
    const result = reports.reduce(
      (
        acc: {
          id: number;
          name: string;
          lat: number;
          lon: number;
          pendingCount: number;
          acceptedCount: number;
        }[],
        report,
      ) => {
        const { location, status } = report;
        const index = acc.findIndex((l) => l.id === location.id);
        // 对于已经存在acc里的地点，
        // 如果是PENDING，pendingCount+1，
        // 如果是ACCEPTED，acceptedCount+1
        if (index !== -1) {
          if (status === "PENDING") {
            acc[index].pendingCount++;
          } else if (status === "ACCEPTED") {
            acc[index].acceptedCount++;
          }
        } else {
          // 对于不存在的地点，新建一个地点对象
          acc.push({
            id: location.id,
            name: location.name,
            lat: location.latitude,
            lon: location.longitude,
            pendingCount: status === "PENDING" ? 1 : 0,
            acceptedCount: status === "ACCEPTED" ? 1 : 0,
          });
        }
        return acc;
      },
      [],
    );
    return result;
  }, [reports]);
  return {
    reports,
    locations,
    isLoading,
    mutate,
  };
}
