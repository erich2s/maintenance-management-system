import Image from "next/image";
import { Yuji_Mai } from "next/font/google";
import { cn } from "@/lib/utils";
const yujiMai = Yuji_Mai({
  weight: "400",
  subsets: ["latin"],
});
export default function NavSideBar() {
  return (
    <aside className="flex h-screen  w-64 flex-col items-center border-r px-2 py-1">
      {/* Logo */}
      <div className="flex h-14  w-[100%]  items-center justify-center  text-xl font-bold">
        <div>
          <Image
            src="/school-logo-purple.png"
            alt="school-logo"
            width={45}
            height={45}
          />
        </div>
        <div className={cn(yujiMai.className, "ml-2")}>西大行健学院</div>
      </div>
      {/* NavLinks */}
      <nav className="flex w-full flex-col items-center justify-center"></nav>
    </aside>
  );
}
