import { ReactNode } from "react";
import Header from "@/components/admin/Header";
import NavSideBar from "@/components/admin/NavSideBar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <NavSideBar />
      <div className="flex h-full w-full flex-col">
        <Header />
        <main className="h-[calc(100vh_-_4rem)] w-full overflow-y-scroll bg-gray-300/20 ">
          {children}
        </main>
      </div>
    </div>
  );
}
