import NextAuth, { User } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Profile {
    picture: string;
  }

  interface Session {
    user: {
      id: string;
    } & User;
  }
}
