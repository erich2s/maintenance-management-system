import PageTransition from "@/components/PageTransition";
import Test from "./components/Test";
import ReactPullToRefresh from "react-pull-to-refresh/index";

export default function page() {
  return (
    <>
      <PageTransition>
        <Test />
      </PageTransition>
    </>
  );
}
