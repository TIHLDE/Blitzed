import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  type DefaultSession,
  type DefaultUser,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

import { env } from "~/env";
import { db } from "~/server/db";
import { loginToTIHLDE } from "./service/lepton/login";
import {
  getTIHLDEMemberships as getTIHLDEMemberships,
  type MembershipResponse,
} from "./service/lepton/get-memberships";
import { getTIHLDEUser } from "./service/lepton/get-user";

// Session type declaration (what the backend can access on the user object)
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    name: string;
    nickname: string;
    role: UserRole;
    tihldeToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        username: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    // Login with TIHLDE username and password
    Credentials({
      name: "TIHLDE",
      credentials: {
        username: { label: "Brukernavn", type: "text" },
        password: { label: "Passord", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) {
          console.error("No credentials sent in login request!");
          return null;
        }

        const token = await loginToTIHLDE(
          credentials?.username,
          credentials?.password,
        );

        if (!token) {
          console.error("No token from TIHLDE auth response!");
          return null;
        }

        // User is authenticated
        // Check memberships and get user
        const [memberships, user] = await Promise.all([
          getTIHLDEMemberships(token),
          getTIHLDEUser(token, credentials.username),
        ]);

        return {
          id: user.user_id,
          email: user.email,
          image: null,
          name: user.first_name + " " + user.last_name,
          nickname: user.first_name,
          role: getRoleForUser(memberships),
          tihldeToken: token,
        };
      },
    }),
  ],
};

/**
 * The role of a Blitzed user
 *
 * - ADMIN: Can create and edit games, and have admin control
 * - USER: Regular user logged in with TIHLDE
 * - ANONYMOUS: Anonymous user who has not logged in with TIHLDE, and uses a custom name
 */
export type UserRole = "ADMIN" | "USER" | "ANONYMOUS";

/**
 * Get the role of a user, given their memberships (or lack thereof)
 * @param memberships Memberships, if any (null if anonymous user)
 * @returns The role that the user has in Blitzed, aka. what they can access
 */
function getRoleForUser(memberships: MembershipResponse | null): UserRole {
  if (!memberships) {
    return "ANONYMOUS";
  }

  // Allow if user is in allowed group slugs
  if (
    memberships.results.some((r) =>
      env.ALLOWED_GROUP_SLUGS.includes(r.group.slug),
    )
  ) {
    return "ADMIN";
  }

  // Also allow if user is leader in a subgroup (undergruppeleder)
  if (
    memberships.results.some(
      (r) => r.group.type === "SUBGROUP" && r.membership_type === "LEADER",
    )
  ) {
    return "ADMIN";
  }

  // User for the rest of TIHLDE members
  return "USER";
}

export const getServerAuthSession = () => getServerSession(authOptions);
