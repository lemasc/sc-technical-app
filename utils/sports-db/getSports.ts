import { listTableRows } from "./core/rows";

export const getSports = async () => {
  const { items } = await listTableRows("grid-ek5r7_bqVF");
  return items.map(({ name }) => name);
};
