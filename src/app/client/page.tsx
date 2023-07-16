import PageTransition from "@/components/PageTransition";
import InfoCard from "./components/InfoCard";
import Loading from "./loading";
import ActivityItem from "./components/ActivityItem";

// import ReactPullToRefresh from "react-pull-to-refresh/index";

export default function page() {
  return (
    <>
      <PageTransition>
        <InfoCard />
        <h2 className="text-[1.25rem] font-bold"> Recent Activity</h2>
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
