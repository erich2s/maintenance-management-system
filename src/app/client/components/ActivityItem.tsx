import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ActivityItem() {
  return (
    <>
      <Card className="my-4 border shadow">
        <CardHeader className="border-b pb-2 pl-3 pt-3">
          <CardTitle className="flex items-center justify-between  text-base">
            <div className="flex">
              {/* <ChevronRight className="mr-1 opacity-40" /> */}
              <ChevronDown className="mr-1 opacity-40" />
              Recent Activity
            </div>
            <div className=" h-3 w-3 rounded-full bg-green-400/80"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            lacinia lectus vitae tincidunt commodo.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
