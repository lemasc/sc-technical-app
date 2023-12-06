import { NextRequest, NextResponse } from "next/server";
import { csrfTokenName, getCsrfToken, isSecure } from "./utils/auth/csrfToken";

export const middleware = async (req: NextRequest) => {
  const response = NextResponse.next();
  if (!req.cookies.has(csrfTokenName)) {
    const { csrfTokenCookie } = await getCsrfToken();
    if (csrfTokenCookie) {
      response.cookies.set(csrfTokenName, csrfTokenCookie, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isSecure,
      });
    }
  }
  return response;
};
