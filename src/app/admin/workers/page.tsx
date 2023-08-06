"use client";
import { useEffect, useState } from "react";
export default function page() {
  const [workers, setWorkers] = useState<any>([]);
  useEffect(() => {
    fetch("/api/workers", { cache: "no-store" })
      .then((res) => res.json())
      .then((res) => {
        setWorkers(res);
      }),
      [];
  });
  return (
    <div>
      工人管理
      {workers.map((worker: any) => {
        return (
          <div>
            {worker.name} {worker.phone}
          </div>
        );
      })}
    </div>
  );
}
