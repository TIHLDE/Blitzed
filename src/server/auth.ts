import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";

import {
  getServerSession,
  DefaultSession,
  NextAuthOptions,
  DefaultUser,
  User,
} from "next-auth";

import { env } from "~/env";
import { db } from "~/server/db";
import { loginToTIHLDE } from "./service/lepton/login";
import {
  getTIHLDEMemberships as getTIHLDEMemberships,
  type MembershipResponse,
} from "./service/lepton/get-memberships";
import { getTIHLDEUser } from "./service/lepton/get-user";
import { DefaultJWT } from "next-auth/jwt";

// Session type declaration (what the backend can access on the user object)
declare module "next-auth" {
  interface User extends DefaultUser {
    nickname: string;
    role: UserRole;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      nickname: string;
      role: UserRole;
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.user.id,
          nickname: token.user.nickname,
          role: token.user.role,
        },
      };
    },
    jwt: async ({ user, token }) => {
      // Initial sign in
      if (user) {
        return {
          user: {
            nickname: user.nickname,
            role: user.role,
            id: user.id,
          },
        };
      }

      // Just return the token back, no need to refresh it :)
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    // Login with TIHLDE username and password
    Credentials({
      id: "tihlde",
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

        const nickname = user.first_name;
        const userId = user.user_id;

        // Check if user is already in db
        const existingUser = await db.user.findUnique({
          where: {
            id: userId,
          },
        });

        // If not, create them
        if (!existingUser) {
          await db.user.create({
            data: {
              id: userId,
              nickname,
              isAnonymous: false,
            },
          });
        }

        const session = {
          id: userId,
          nickname,
          role: getRoleForUser(memberships),
        };
        return session;
      },
    }),
    Credentials({
      name: "Anonymous",
      id: "anonymous",
      credentials: {
        nickname: { label: "Kallenavn", type: "text" },
      },
      async authorize(credentials, _req) {
        if (!credentials) {
          console.error("No credentials sent in login request!");
          return null;
        }

        // Create anon user in db
        const user = await db.user.create({
          data: {
            isAnonymous: true,
            nickname: credentials.nickname,
            // auto-generate cuid id
            id: undefined,
          },
          select: {
            id: true,
          },
        });

        return {
          id: user.id,
          nickname: credentials.nickname,
          role: "ANONYMOUS",
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
