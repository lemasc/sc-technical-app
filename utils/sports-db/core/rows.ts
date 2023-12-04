import arunGamesApi, { ListItemResponse } from "./api";

export type RowItem<T extends Record<string, any> = Record<string, any>> = {
  id: string;
  type: "row";
  name: string;
  values: T;
};

export const listTableRows = async <T extends Record<string, any>>(
  tableId: string
) => {
  return arunGamesApi
    .get(`tables/${tableId}/rows`, {
      searchParams: {
        useColumnNames: true,
        visibleOnly: true,
      },
    })
    .json<ListItemResponse<RowItem<T>>>();
};
