import { env } from "@/env.mjs";
import ky from "ky";

const arunGamesApi = ky.create({
  prefixUrl: `https://coda.io/apis/v1/docs/${env.CODA_DOC_ID}`,
  headers: {
    Authorization: `Bearer ${env.CODA_API_KEY}`,
  },
});

export type ListItemResponse<T> = {
  items: T[];
};

export default arunGamesApi;
