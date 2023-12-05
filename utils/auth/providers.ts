import { env } from "@/env.mjs";
import GoogleProvider from "next-auth/providers/google";

export const googleProvider = GoogleProvider({
  id: "google",
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  authorization: {
    params: {
      scope: "openid email profile",
    },
  },
});
