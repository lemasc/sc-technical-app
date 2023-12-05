import { env } from "@/env.mjs";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { GET } from ".";

type CsrfToken = {
  csrfToken: string;
};

export const getCsrfToken = async (): Promise<CsrfToken> => {
  const request = new NextRequest(env.NEXTAUTH_URL + "/api/auth/csrf", {
    headers: headers(),
  });
  const response = (await GET(request)).json();
  return response;
};
