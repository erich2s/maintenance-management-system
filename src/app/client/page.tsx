import PageTransition from "@/components/PageTransition";
import Test from "./components/Test";

export default function page() {
  return (
    <>
      <PageTransition>
        <Test />
      </PageTransition>
    </>
  );
}
