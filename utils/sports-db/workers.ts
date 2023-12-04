import { listTableRows } from "./core/rows";

export type Worker<Type extends "ONSITE" | "ONLINE"> = {
  Nickname: string;
  Name: string;
  Section: string;
  "Worker Type": Type;
};

export const getOnsiteWorkers = async () => {
  const { items } = await listTableRows<Worker<"ONSITE">>("grid-SKw9XFNzOZ");
  return items.map(({ values }) => values);
};

export const getOnlineWorkers = async () => {
  const { items } = await listTableRows<Worker<"ONLINE">>("grid-4PGBacpVq1");
  return items.map(({ values }) => values);
};
