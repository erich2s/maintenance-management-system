import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InfoCard() {
  return (
    <>
      <Card className="mb-9 mt-4  bg-transparent bg-gradient-to-br from-[#e96443]/80 to-[#904e95]/90   text-card drop-shadow-xl  backdrop-blur-lg backdrop-filter">
        <CardHeader>
          <CardTitle className="text-base">Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
