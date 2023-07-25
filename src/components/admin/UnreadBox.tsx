import { BellDot, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function UnreadBox() {
  return (
    <>
      <div className="px-5 py-4">
        <header>
          <h1 className="mt-2 text-lg font-bold">待处理报修单({23})</h1>
          <div className="my-6 flex w-full justify-around">
            <div className="flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg   bg-primary p-1">
                <BellDot className="w-4" color="#fff" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-muted-foreground">新的</div>
                <div className="text-xl">18</div>
              </div>
            </div>
            <div className="flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg  bg-yellow-400  p-1">
                <Construction className="w-4" color="#2e2e2e" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-muted-foreground">施工中</div>
                <div className="text-xl">5</div>
              </div>
            </div>
          </div>
        </header>
        <main>
          <ReportTabs />
        </main>
      </div>
    </>
  );
}

function ReportItem() {
  return <div>UnreadBox</div>;
}

function ReportTabs() {
  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="new">新的</TabsTrigger>
        <TabsTrigger value="working">施工中</TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="working">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
