// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, etc.
   */
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: "USER" | "ADMIN";
      ethAddress?: string;
    };
  }

  /**
   * Returned by `callbacks.jwt` and `getToken`
   */
  interface User extends DefaultUser {
    /** Persisted in your Prisma schema */
    role: "USER" | "ADMIN";
    ethAddress?: string;
  }
}
