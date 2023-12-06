import { env } from "@/env.mjs";
import cookie from "cookie";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { GET } from ".";

type CsrfToken = {
  csrfToken: string;
  csrfTokenCookie?: string;
};

export const isSecure = env.NEXTAUTH_URL.startsWith("https://");

export const csrfTokenName = `${isSecure ? "__Host-" : ""}authjs.csrf-token`;

export const getCsrfToken = async (): Promise<CsrfToken> => {
  const request = new NextRequest(env.NEXTAUTH_URL + "/api/auth/csrf", {
    headers: headers(),
  });
  const response = await GET(request);
  const { csrfToken } = await response.json();
  let csrfTokenCookie = undefined;
  const cookieHeader = response.headers.get("set-cookie");
  if (cookieHeader) {
    const cookies = cookie.parse(response.headers.get("set-cookie") ?? "");
    csrfTokenCookie = cookies[csrfTokenName];
  }
  return { csrfToken, csrfTokenCookie };
};
