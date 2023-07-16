import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="relative flex h-screen flex-col items-center justify-center">
        <Image
          src="/school-logo-purple.png"
          width={120}
          height={120}
          alt="school logo"
          className="mb-4"
        />
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
