import Header from "./components/Header";
import NavBar from "./components/NavBar";

export default function layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <div className="relative h-screen"> */}
      <Header />
      <main className="container ">{children}</main>
      <NavBar />
      {/* </div> */}
    </>
  );
}
