import { ReactNode } from "react";
import Header from "./components/Header";
import NavSideBar from "./components/NavSideBar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <NavSideBar />
      <div className="flex h-full w-full flex-col">
        <Header />
        <main className="h-[calc(100vh_-_3.5rem)] overflow-y-scroll bg-gray-300/20 ">
          {children}
        </main>
      </div>
    </div>
  );
}
