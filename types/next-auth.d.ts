import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // 继承interface User
  import { User } from "next-auth";
  interface JWT extends User {
    /** The JSON Web Token */
    // id: number | string;
    // username: string;
    // name: string;
    // role: string;
    // email: string;
    /** OpenID ID Token */
  }
}
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: number | string;
    username: string;
    name: string;
    role: string;
    email: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}
