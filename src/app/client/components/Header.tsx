import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import MotionHeaderLabel from "@/components/MotionHeaderLabel";
export default function Header() {
  return (
    <>
      <header
        className="fixed  top-0 z-20 flex h-14 w-full justify-center bg-white/80  px-6 py-8 backdrop-blur-sm backdrop-saturate-200
      "
      >
        <div className="flex w-full max-w-[75rem] items-center justify-between">
          <MotionHeaderLabel />
          <Image
            src={avatar}
            alt="avatar"
            width={50}
            className="rounded-full p-[1px] saturate-150"
          />
        </div>
      </header>
      {/* 占位用 */}
      <div className="mb-4 h-14 px-6 py-8 "></div>
    </>
  );
}
