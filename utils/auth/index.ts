import { prisma } from "@/utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { googleProvider } from "./providers";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [googleProvider],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
});
export default auth;
