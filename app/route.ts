import { env } from "@/env.mjs";
import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.redirect(env.NEXTAUTH_URL + "/photo");
};
