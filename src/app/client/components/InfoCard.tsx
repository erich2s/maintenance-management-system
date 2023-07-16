import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
export default function InfoCard() {
  return (
    <>
      <Card className="mb-9  bg-transparent bg-gradient-to-br from-[#e96443]/80 to-[#904e95]/90   text-card drop-shadow-xl  backdrop-blur-lg backdrop-filter">
        <CardHeader>
          <CardTitle className="text-base">Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="flex justify-end ">
          <Image
            src="/school-logo-fill.png"
            width={60}
            height={60}
            alt="school logo"
            className="rounded-full bg-white/90"
          />
        </CardFooter>
      </Card>
    </>
  );
}
