import PageTransition from "@/components/PageTransition";
import InfoCard from "./components/InfoCard";
import ActivityItem from "./components/ActivityItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import ReactPullToRefresh from "react-pull-to-refresh/index";

export default async function page() {
  const session = await getServerSession(authOptions);
  const { name, username, phone } = session?.user!;
  return (
    <>
      <InfoCard name={name} username={username} phone={phone} />
      <PageTransition>
        <h2 className="text-[1.25rem] font-bold">最近活动</h2>
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
      </PageTransition>
    </>
  );
}
