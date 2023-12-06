import arunGamesApi, { ListItemResponse } from "./api";

export type RowItem<T extends Record<string, any> = Record<string, any>> = {
  id: string;
  type: "row";
  name: string;
  values: {
    [K in keyof T]: T[K] extends string ? T[K] : string;
  };
};

export const listTableRows = async <T extends Record<string, any>>(
  tableId: string
) => {
  return arunGamesApi
    .get(`tables/${tableId}/rows`, {
      searchParams: {
        useColumnNames: true,
        visibleOnly: true,
        sortBy: "Natural",
      },
    })
    .json<ListItemResponse<RowItem<T>>>();
};
