import { prisma } from "@/utils/prisma";
import { format } from "date-fns";

export async function DayBrowser({ day }: { day: Date }) {
  const category = await prisma.photoSet.groupBy({
    where: {
      takenAt: {
        equals: day,
      },
    },
    by: ["category"],
    orderBy: {
      category: "asc",
    },
  });
  return (
    <div>
      <div className="font-semibold text-sm pl-12 py-3 rounded-r-lg bg-slate-200">
        {format(day, "EE, dd MMMM")}
      </div>
      <ul className="pl-16 py-3 space-y-6 text-sm">
        {category.map(({ category }) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
