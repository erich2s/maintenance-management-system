"use client";
import { useEffect, useState } from "react";

export default function page() {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    fetch("/api/users", { cache: "no-store" })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      }),
      [];
  });
  return (
    <>
      <div>用户管理</div>
      {users.map((user: any) => {
        return <div>{user.name}</div>;
      })}
    </>
  );
}
