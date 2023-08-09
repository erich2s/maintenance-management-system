import InfoCard from "@/components/client/InfoCard";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MyReports from "@/components/client/MyReports";

export default async function page() {
  const session = await getServerSession(authOptions);
  const { name, username } = session?.user!;

  return (
    <>
      <InfoCard name={name} username={username} />
      <MyReports />
    </>
  );
}
