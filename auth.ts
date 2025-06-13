import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./app/prisma.js";

const { handler, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
  providers: [],
})

export { handler as GET, handler as POST, signIn, signOut, auth }

