import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="relative mt-4 h-[196px]  overflow-hidden  rounded-3xl border lg:border lg:shadow-sm">
        <Skeleton className="absolute h-full w-full duration-1000" />
        <Skeleton className="  w-12 rounded-md bg-white " />
      </div>
    </>
  );
}
