import { NavLinksProvider } from "@/context/NavLinksProvider";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Suspense } from "react";

export default function layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavLinksProvider>
        <Header />
        <main className="container max-w-[50rem]">{children}</main>
        <NavBar />
      </NavLinksProvider>
    </>
  );
}
