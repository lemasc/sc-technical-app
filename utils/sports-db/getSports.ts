import { addDays } from "date-fns";
import { listTableRows } from "./core/rows";

export type Sport = {
  Name: string;
  Location?: string;
  "Start Date": Date;
  "End Date": Date;
};

export const getSports = async () => {
  const { items } = await listTableRows<Sport>("grid-ek5r7_bqVF");
  return items
    .map<Sport>(({ values }) => ({
      ...values,
      "Start Date": new Date(values["Start Date"]),
      "End Date": addDays(new Date(values["End Date"]), -1),
    }))
    .sort((a, b) =>
      a["Start Date"].valueOf() >= b["Start Date"].valueOf() ? 1 : -1
    );
};
