import { prisma } from "@/utils/prisma";
import { DayBrowser } from "./day-browser";

export default async function Browser() {
  const group = await prisma.photoSet.groupBy({
    by: ["takenAt"],
    orderBy: {
      takenAt: "asc",
    },
  });
  return (
    <div className="space-y-4 h-[91vh] py-4 pr-8 overflow-y-auto">
      {group.map(({ takenAt }) => (
        <DayBrowser key={takenAt.toISOString()} day={takenAt} />
      ))}
    </div>
  );
}
