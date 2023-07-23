import PageTransition from "@/components/PageTransition";

export default function page() {
  return (
    <PageTransition>
      {Array.from({ length: 20 }).map((_, i) => (
        <div className="flex h-20 w-full items-center justify-center" key={i}>
          <div className="text-4xl font-bold">Page</div>
        </div>
      ))}
    </PageTransition>
  );
}
