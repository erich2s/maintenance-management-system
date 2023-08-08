import PageTransition from "@/components/PageTransition";
import Header from "@/components/client/Header";
import NavBar from "@/components/client/NavBar";

export default function layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container max-w-[50rem]">{children}</main>
      <NavBar />
    </>
  );
}
