"use client";
import PageTransition from "@/components/PageTransition";
import Test from "@/components/client/Test";

export default function page() {
  return (
    <>
      <PageTransition>
        <Test />
      </PageTransition>
    </>
  );
}
