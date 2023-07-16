import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ActivityItem() {
  return (
    <>
      <Card className="my-4 border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between  text-base">
            Recent Activity
            <div className=" h-3 w-3 rounded-full bg-green-400/80"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            lacinia lectus vitae tincidunt commodo.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
