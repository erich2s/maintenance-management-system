import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
export default function Header() {
  return (
    <>
      <header
        className="
      fixed  top-0 z-20 flex
      h-14 w-full items-center justify-between border-b bg-white/80 px-6 py-8 backdrop-blur-sm backdrop-saturate-200 "
      >
        <h1 className="text text-2xl font-bold text-foreground">Home</h1>
        <Image
          src={avatar}
          alt="avatar"
          width={50}
          className="rounded-full p-[1px] saturate-150"
        />
      </header>
      {/* 占位用 */}
      <div className="h-14 px-6 py-8"></div>
    </>
  );
}
